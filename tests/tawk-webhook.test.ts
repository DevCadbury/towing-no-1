import { describe, it, expect, vi } from "vitest";
import {
  computeTawkSignature,
  verifyTawkSignature,
  parseTawkChatStart,
  processTawkWebhook,
  type TawkWebhookDeps,
} from "../lib/tawk-webhook";

const SECRET = "tawk-webhook-secret";

function chatStartPayload(over: Record<string, unknown> = {}) {
  return {
    event: "chat:start",
    chatId: "chat-abc-123",
    time: "2026-10-17T22:45:00.000Z",
    domain: "www.towingno1.com",
    message: { text: "Hi, I need a tow", type: "msg", sender: { type: "visitor" } },
    visitor: { name: "Jane", email: "jane@example.com", city: "Surrey", country: "CA" },
    property: { id: "p1", name: "Towingno1" },
    ...over,
  };
}

function makeDeps(over: Partial<TawkWebhookDeps> = {}): TawkWebhookDeps & { notify: ReturnType<typeof vi.fn> } {
  const notify = vi.fn(async () => ({ ok: true, status: "sent" }));
  return {
    rateLimit: () => ({ allowed: true }),
    ipFromHeaders: () => "203.0.113.5",
    notify,
    ...over,
  } as TawkWebhookDeps & { notify: ReturnType<typeof vi.fn> };
}

function headers(map: Record<string, string>) {
  return (name: string) => map[name.toLowerCase()] ?? null;
}

describe("tawk signature", () => {
  it("verifies a correct hex signature", () => {
    const raw = JSON.stringify(chatStartPayload());
    const sig = computeTawkSignature(raw, SECRET, "hex");
    expect(verifyTawkSignature(raw, sig, SECRET)).toBe(true);
  });

  it("verifies a correct base64 signature (defensive)", () => {
    const raw = JSON.stringify(chatStartPayload());
    const sig = computeTawkSignature(raw, SECRET, "base64");
    expect(verifyTawkSignature(raw, sig, SECRET)).toBe(true);
  });

  it("rejects a wrong signature / wrong secret / tampered body", () => {
    const raw = JSON.stringify(chatStartPayload());
    const sig = computeTawkSignature(raw, SECRET, "hex");
    expect(verifyTawkSignature(raw, "deadbeef", SECRET)).toBe(false);
    expect(verifyTawkSignature(raw, sig, "other-secret")).toBe(false);
    expect(verifyTawkSignature(raw + "x", sig, SECRET)).toBe(false);
    expect(verifyTawkSignature(raw, null, SECRET)).toBe(false);
  });
});

describe("parseTawkChatStart", () => {
  it("extracts documented fields", () => {
    const p = parseTawkChatStart(chatStartPayload());
    expect(p).toMatchObject({
      event: "chat:start",
      chatId: "chat-abc-123",
      name: "Jane",
      email: "jane@example.com",
      message: "Hi, I need a tow",
      senderType: "visitor",
    });
  });

  it("is safe when optional objects are missing", () => {
    const p = parseTawkChatStart({ event: "chat:start", chatId: "x" });
    expect(p.name).toBe("");
    expect(p.email).toBe("");
    expect(p.message).toBe("");
  });
});

describe("processTawkWebhook", () => {
  const env = (over: Record<string, string> = {}) => ({ TAWK_WEBHOOK_SECRET: SECRET, ...over }) as NodeJS.ProcessEnv;

  it("503 when the secret is not configured", async () => {
    const deps = makeDeps();
    const raw = JSON.stringify(chatStartPayload());
    const res = await processTawkWebhook({ raw, getHeader: headers({}), env: {} as NodeJS.ProcessEnv, deps });
    expect(res.httpStatus).toBe(503);
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("401 on invalid signature", async () => {
    const deps = makeDeps();
    const raw = JSON.stringify(chatStartPayload());
    const res = await processTawkWebhook({ raw, getHeader: headers({ "x-tawk-signature": "bad" }), env: env(), deps });
    expect(res.httpStatus).toBe(401);
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("ignores non chat:start events (200, no notify)", async () => {
    const deps = makeDeps();
    const raw = JSON.stringify(chatStartPayload({ event: "chat:end" }));
    const sig = computeTawkSignature(raw, SECRET);
    const res = await processTawkWebhook({ raw, getHeader: headers({ "x-tawk-signature": sig }), env: env({ TAWK_WEBHOOK_NOTIFY_FALLBACK: "true" }), deps });
    expect(res.httpStatus).toBe(200);
    expect(res.body).toMatchObject({ status: "ignored" });
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("acknowledges without notifying when fallback is disabled (default)", async () => {
    const deps = makeDeps();
    const raw = JSON.stringify(chatStartPayload());
    const sig = computeTawkSignature(raw, SECRET);
    const res = await processTawkWebhook({ raw, getHeader: headers({ "x-tawk-signature": sig }), env: env(), deps });
    expect(res.httpStatus).toBe(200);
    expect(res.body).toMatchObject({ status: "acknowledged" });
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("forwards a fallback notification when enabled", async () => {
    const deps = makeDeps();
    const raw = JSON.stringify(chatStartPayload());
    const sig = computeTawkSignature(raw, SECRET);
    const res = await processTawkWebhook({
      raw,
      getHeader: headers({ "x-tawk-signature": sig }),
      env: env({ TAWK_WEBHOOK_NOTIFY_FALLBACK: "true" }),
      deps,
    });
    expect(res.httpStatus).toBe(200);
    expect(deps.notify).toHaveBeenCalledTimes(1);
    const payload = deps.notify.mock.calls[0][0];
    expect(payload).toMatchObject({
      type: "chat",
      source: "webhook",
      chatEventId: "chat-abc-123",
      data: { name: "Jane", email: "jane@example.com", message: "Hi, I need a tow" },
    });
  });

  it("ignores agent-originated starts even with fallback enabled", async () => {
    const deps = makeDeps();
    const raw = JSON.stringify(chatStartPayload({ message: { text: "hello", sender: { type: "agent" } } }));
    const sig = computeTawkSignature(raw, SECRET);
    const res = await processTawkWebhook({ raw, getHeader: headers({ "x-tawk-signature": sig }), env: env({ TAWK_WEBHOOK_NOTIFY_FALLBACK: "true" }), deps });
    expect(res.httpStatus).toBe(200);
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("returns 503 (retry) when a fallback notify hits a transport error", async () => {
    const deps = makeDeps({ notify: vi.fn(async () => ({ ok: false, status: "error" })) as TawkWebhookDeps["notify"] });
    const raw = JSON.stringify(chatStartPayload());
    const sig = computeTawkSignature(raw, SECRET);
    const res = await processTawkWebhook({ raw, getHeader: headers({ "x-tawk-signature": sig }), env: env({ TAWK_WEBHOOK_NOTIFY_FALLBACK: "true" }), deps });
    expect(res.httpStatus).toBe(503);
  });
});
