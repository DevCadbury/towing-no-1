import { describe, it, expect, vi, beforeEach } from "vitest";
import { processPrechat, type PrechatDeps } from "../lib/prechat";
import { mapPrechatData, describeShape } from "../lib/tawk-fields";
import { rateLimit, resetRateLimit, ipFromHeaders } from "../lib/rate-limit";

function makeDeps(over: Partial<PrechatDeps> = {}): PrechatDeps & { notify: ReturnType<typeof vi.fn> } {
  const notify = vi.fn(async () => ({ ok: true, status: "sent" }));
  return {
    verifyRecaptcha: async () => ({ ok: true }),
    rateLimit: () => ({ allowed: true }),
    ipFromHeaders: () => "1.2.3.4",
    notify,
    ...over,
  } as PrechatDeps & { notify: ReturnType<typeof vi.fn> };
}

function headerGetter(map: Record<string, string> = {}) {
  return (name: string) => map[name.toLowerCase()] ?? null;
}

const validBody = JSON.stringify({ name: "Jane", phone: "778-555-0100", from: "Surrey", to: "Langley", recaptchaToken: "t" });

describe("processPrechat", () => {
  it("accepts a valid submission and triggers one notification", async () => {
    const deps = makeDeps();
    const res = await processPrechat({ raw: validBody, getHeader: headerGetter(), deps, env: {} as NodeJS.ProcessEnv });
    expect(res.httpStatus).toBe(200);
    expect(deps.notify).toHaveBeenCalledTimes(1);
    const payload = deps.notify.mock.calls[0][0];
    expect(payload).toMatchObject({
      type: "chat",
      source: "prechat",
      data: { name: "Jane", phone: "778-555-0100", from: "Surrey", to: "Langley" },
    });
  });

  it("rejects invalid JSON with 400", async () => {
    const deps = makeDeps();
    const res = await processPrechat({ raw: "{not json", getHeader: headerGetter(), deps, env: {} as NodeJS.ProcessEnv });
    expect(res.httpStatus).toBe(400);
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("requires a name", async () => {
    const deps = makeDeps();
    const res = await processPrechat({
      raw: JSON.stringify({ phone: "1", from: "A", to: "B" }),
      getHeader: headerGetter(),
      deps,
      env: {} as NodeJS.ProcessEnv,
    });
    expect(res.httpStatus).toBe(400);
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("rejects oversized payloads with 413", async () => {
    const deps = makeDeps();
    const big = JSON.stringify({ name: "x".repeat(9000) });
    const res = await processPrechat({ raw: big, getHeader: headerGetter(), deps, env: {} as NodeJS.ProcessEnv });
    expect(res.httpStatus).toBe(413);
  });

  it("returns 429 when rate limited", async () => {
    const deps = makeDeps({ rateLimit: () => ({ allowed: false }) });
    const res = await processPrechat({ raw: validBody, getHeader: headerGetter(), deps, env: {} as NodeJS.ProcessEnv });
    expect(res.httpStatus).toBe(429);
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("returns 400 when reCAPTCHA verification fails", async () => {
    const deps = makeDeps({ verifyRecaptcha: async () => ({ ok: false, reason: "low_score" }) });
    const res = await processPrechat({ raw: validBody, getHeader: headerGetter(), deps, env: {} as NodeJS.ProcessEnv });
    expect(res.httpStatus).toBe(400);
    expect(deps.notify).not.toHaveBeenCalled();
  });

  it("strips control characters from fields (sanitization)", async () => {
    const deps = makeDeps();
    const raw = JSON.stringify({ name: "Jane\u0007", phone: "1\n2", from: "A", to: "B", recaptchaToken: "t" });
    await processPrechat({ raw, getHeader: headerGetter(), deps, env: {} as NodeJS.ProcessEnv });
    const payload = deps.notify.mock.calls[0][0];
    expect(payload.data.name).toBe("Jane");
    expect(payload.data.phone).toBe("1 2");
  });

  it("never leaks downstream status (always {ok:true} on accept)", async () => {
    const deps = makeDeps({ notify: vi.fn(async () => ({ ok: false, status: "rate_limited" })) as PrechatDeps["notify"] });
    const res = await processPrechat({ raw: validBody, getHeader: headerGetter(), deps, env: {} as NodeJS.ProcessEnv });
    expect(res.httpStatus).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

describe("mapPrechatData (defensive label mapping)", () => {
  it("maps a questions[] shape by label", () => {
    const data = {
      name: "Jane",
      questions: [
        { label: "Phone no", answer: "778-555-0100" },
        { label: "From", answer: "Surrey" },
        { label: "To", answer: "Langley" },
      ],
    };
    expect(mapPrechatData(data)).toEqual({
      name: "Jane",
      phone: "778-555-0100",
      from: "Surrey",
      to: "Langley",
      email: "",
    });
  });

  it("maps the actual tawk pre-chat labels (Roadside Assistance From?/to)", () => {
    const data = {
      name: "Jane",
      phone: "+91 98765 43210",
      questions: [
        { label: "Roadside Assistance From?", answer: "Surrey" },
        { label: "Roadside Assistance to", answer: "Langley" },
      ],
    };
    const m = mapPrechatData(data);
    expect(m.name).toBe("Jane");
    expect(m.phone).toBe("+91 98765 43210");
    expect(m.from).toBe("Surrey");
    expect(m.to).toBe("Langley");
  });

  it("maps a flat label->value object", () => {
    const data = { Name: "Bob", "Phone Number": "111", From: "X", To: "Y", Email: "b@x.com" };
    const m = mapPrechatData(data);
    expect(m.name).toBe("Bob");
    expect(m.phone).toBe("111");
    expect(m.from).toBe("X");
    expect(m.to).toBe("Y");
    expect(m.email).toBe("b@x.com");
  });

  it("maps an array of {label, value} pairs", () => {
    const data = [
      { label: "Name", value: "Al" },
      { label: "Pickup", value: "Airport" },
      { label: "Destination", value: "Downtown" },
    ];
    const m = mapPrechatData(data);
    expect(m.name).toBe("Al");
    expect(m.from).toBe("Airport");
    expect(m.to).toBe("Downtown");
  });

  it("returns empty strings for missing fields (no guessing)", () => {
    expect(mapPrechatData({ name: "Solo" })).toEqual({ name: "Solo", phone: "", from: "", to: "", email: "" });
  });

  it("describeShape returns labels but no answers (PII-safe)", () => {
    const shape = describeShape({ name: "Jane", questions: [{ label: "Phone no", answer: "SECRET" }] });
    expect(shape.labels).toContain("Phone no");
    expect(JSON.stringify(shape)).not.toContain("SECRET");
  });
});

describe("rate-limit helpers", () => {
  beforeEach(() => resetRateLimit());

  it("allows up to the limit then blocks within the window", () => {
    const now = 1000;
    expect(rateLimit("k", 2, 1000, now).allowed).toBe(true);
    expect(rateLimit("k", 2, 1000, now).allowed).toBe(true);
    expect(rateLimit("k", 2, 1000, now).allowed).toBe(false);
    // Window resets.
    expect(rateLimit("k", 2, 1000, now + 1001).allowed).toBe(true);
  });

  it("ipFromHeaders takes the first x-forwarded-for hop, falls back to x-real-ip", () => {
    expect(ipFromHeaders((n) => (n === "x-forwarded-for" ? "9.9.9.9, 10.0.0.1" : null))).toBe("9.9.9.9");
    expect(ipFromHeaders((n) => (n === "x-real-ip" ? "8.8.8.8" : null))).toBe("8.8.8.8");
    expect(ipFromHeaders(() => null)).toBe("unknown");
  });
});
