import { describe, it, expect, vi } from "vitest";
import { notifyWhatsApp, signNotifyRequest, type NotifyPayload } from "../lib/whatsapp-notify";

const PAYLOAD: NotifyPayload = {
  type: "chat",
  source: "prechat",
  data: { name: "Jane", phone: "1", from: "A", to: "B" },
};

function okFetch(captured: { url?: string; init?: RequestInit }) {
  return vi.fn(async (url: string, init: RequestInit) => {
    captured.url = url;
    captured.init = init;
    return new Response(JSON.stringify({ ok: true, status: "sent" }), { status: 200 });
  }) as unknown as typeof fetch;
}

describe("notifyWhatsApp", () => {
  it("is disabled (no-op) when backend URL or token is missing", async () => {
    const res = await notifyWhatsApp(PAYLOAD, { backendUrl: "", token: "", fetchImpl: okFetch({}) });
    expect(res.status).toBe("disabled");
  });

  it("refuses to send over plain public HTTP (no fetch call)", async () => {
    const captured = {};
    const f = okFetch(captured);
    const res = await notifyWhatsApp(PAYLOAD, {
      backendUrl: "http://203.0.113.5:5000",
      token: "t",
      fetchImpl: f,
    });
    expect(res.status).toBe("skipped");
    expect(res.reason).toBe("insecure_backend");
    expect(f).not.toHaveBeenCalled();
  });

  it("allows plain HTTP (any host) only when insecure transport is explicitly permitted", async () => {
    const captured: { url?: string } = {};
    const res = await notifyWhatsApp(PAYLOAD, {
      backendUrl: "http://203.0.113.5:5000",
      token: "t",
      allowInsecure: true,
      fetchImpl: okFetch(captured),
    });
    expect(res.ok).toBe(true);
    expect(captured.url).toBe("http://203.0.113.5:5000/api/notify");
  });

  it("signs the request correctly over https and reports sent", async () => {
    const captured: { url?: string; init?: RequestInit } = {};
    const token = "shared-secret";
    const now = 1_700_000_000_000;
    const nonce = "fixednonce1234567890";
    const res = await notifyWhatsApp(PAYLOAD, {
      backendUrl: "https://bot.example.com",
      token,
      now,
      nonce,
      fetchImpl: okFetch(captured),
    });

    expect(res.ok).toBe(true);
    expect(res.status).toBe("sent");
    expect(captured.url).toBe("https://bot.example.com/api/notify");

    const headers = captured.init!.headers as Record<string, string>;
    const body = captured.init!.body as string;
    expect(body).toBe(JSON.stringify(PAYLOAD));
    expect(headers["x-notify-timestamp"]).toBe(String(now));
    expect(headers["x-notify-nonce"]).toBe(nonce);
    expect(headers["x-notify-signature"]).toBe(signNotifyRequest(token, String(now), nonce, body));
  });

  it("maps a 429 to rate_limited", async () => {
    const f = vi.fn(async () => new Response("", { status: 429 })) as unknown as typeof fetch;
    const res = await notifyWhatsApp(PAYLOAD, { backendUrl: "https://bot.example.com", token: "t", fetchImpl: f });
    expect(res.ok).toBe(false);
    expect(res.status).toBe("rate_limited");
    expect(res.httpStatus).toBe(429);
  });

  it("returns error (never throws) on network failure", async () => {
    const f = vi.fn(async () => {
      throw new Error("ECONNREFUSED");
    }) as unknown as typeof fetch;
    const res = await notifyWhatsApp(PAYLOAD, { backendUrl: "https://bot.example.com", token: "t", fetchImpl: f });
    expect(res.ok).toBe(false);
    expect(res.status).toBe("error");
  });

  it("aborts and returns error on timeout", async () => {
    const f = ((_url: string, init: RequestInit) =>
      new Promise((_resolve, reject) => {
        init.signal?.addEventListener("abort", () => {
          reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
        });
      })) as unknown as typeof fetch;
    const res = await notifyWhatsApp(PAYLOAD, {
      backendUrl: "https://bot.example.com",
      token: "t",
      timeoutMs: 20,
      fetchImpl: f,
    });
    expect(res.ok).toBe(false);
    expect(res.status).toBe("error");
  });
});
