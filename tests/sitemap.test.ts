import { describe, it, expect } from "vitest";
import sitemap from "../app/sitemap";

const BASE = "https://www.towingno1.com";

const EXISTING_SERVICE_SLUGS = [
  "emergency-towing",
  "battery-boost",
  "lockout-service",
  "flat-tire-help",
  "fuel-delivery",
  "winching-extraction",
  "vehicle-transport",
  "accident-recovery",
  "roadside-assistance",
];

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists the Cross Border Towing page exactly once", () => {
    const target = `${BASE}/services/cross-border-towing`;
    expect(urls.filter((u) => u === target)).toHaveLength(1);
  });

  it("contains no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("keeps every existing service page", () => {
    for (const slug of EXISTING_SERVICE_SLUGS) {
      expect(urls).toContain(`${BASE}/services/${slug}`);
    }
  });

  it("uses the canonical www domain for every URL", () => {
    for (const u of urls) {
      expect(u.startsWith(BASE)).toBe(true);
    }
  });
});
