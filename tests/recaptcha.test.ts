import { describe, it, expect, vi } from "vitest";
import { verifyRecaptcha } from "../lib/recaptcha";

function jsonFetch(payload: unknown, status = 200) {
  return vi.fn(async () => new Response(JSON.stringify(payload), { status })) as unknown as typeof fetch;
}

describe("verifyRecaptcha", () => {
  it("skips (ok) when no secret is configured", async () => {
    const res = await verifyRecaptcha("anything", { secret: "", fetchImpl: jsonFetch({}) });
    expect(res.ok).toBe(true);
    expect(res.reason).toBe("not_configured");
  });

  it("fails when secret is set but token missing", async () => {
    const res = await verifyRecaptcha("", { secret: "s", fetchImpl: jsonFetch({}) });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe("missing_token");
  });

  it("passes for a successful high-score response", async () => {
    const res = await verifyRecaptcha("t", { secret: "s", expectedAction: "prechat", fetchImpl: jsonFetch({ success: true, score: 0.9, action: "prechat" }) });
    expect(res.ok).toBe(true);
    expect(res.score).toBe(0.9);
  });

  it("fails on low score", async () => {
    const res = await verifyRecaptcha("t", { secret: "s", fetchImpl: jsonFetch({ success: true, score: 0.1 }) });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe("low_score");
  });

  it("fails on action mismatch", async () => {
    const res = await verifyRecaptcha("t", { secret: "s", expectedAction: "prechat", fetchImpl: jsonFetch({ success: true, score: 0.9, action: "contact" }) });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe("action_mismatch");
  });

  it("fails on success=false", async () => {
    const res = await verifyRecaptcha("t", { secret: "s", fetchImpl: jsonFetch({ success: false }) });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe("failed");
  });

  it("returns error (not throw) on network failure", async () => {
    const f = vi.fn(async () => { throw new Error("net"); }) as unknown as typeof fetch;
    const res = await verifyRecaptcha("t", { secret: "s", fetchImpl: f });
    expect(res.ok).toBe(false);
    expect(res.reason).toBe("error");
  });
});
