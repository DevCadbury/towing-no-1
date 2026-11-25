import { describe, it, expect, vi, afterEach } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "../app/sitemap";
import { blogPosts } from "../lib/blog-posts";
import { parsePostDate, postDateISO } from "../lib/post-dates";

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
  "underground-parking-towing",
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

describe("sitemap lastmod (A-002, A-003)", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not depend on the build time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-03-01T08:00:00Z"));
    const first = JSON.stringify(sitemap());
    vi.setSystemTime(new Date("2027-06-15T20:30:00Z"));
    const second = JSON.stringify(sitemap());
    expect(second).toBe(first);
  });

  it("gives every non-blog route an explicit fixed date", () => {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const src = readFileSync(path.join(here, "..", "app", "sitemap.ts"), "utf8");
    for (const entry of sitemap()) {
      const p = entry.url.slice(BASE.length) || "/";
      if (p.startsWith("/blog/")) continue;
      expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(src).toContain(`"${p}": "${entry.lastModified}"`);
    }
  });

  it("uses the post's visible date (updatedDate first) at 12:00 UTC", () => {
    const byUrl = new Map(sitemap().map((e) => [e.url, e.lastModified]));
    for (const post of blogPosts) {
      const expected = parsePostDate(post.updatedDate ?? post.date);
      expect(expected).not.toBeNull();
      expect(byUrl.get(`${BASE}/blog/${post.slug}`)).toBe(expected!.toISOString());
    }
  });
});

describe("post dates", () => {
  it("parses a human date as the same calendar day at 12:00 UTC", () => {
    expect(parsePostDate("October 1, 2026")?.toISOString()).toBe("2026-10-01T12:00:00.000Z");
    expect(parsePostDate("Feb 5, 2026")?.toISOString()).toBe("2026-02-05T12:00:00.000Z");
    expect(parsePostDate("2026-08-20")?.toISOString()).toBe("2026-08-20T12:00:00.000Z");
  });

  it("rejects impossible or unknown dates", () => {
    expect(parsePostDate("February 30, 2026")).toBeNull();
    expect(parsePostDate("Smarch 1, 2026")).toBeNull();
    expect(parsePostDate("soon")).toBeNull();
  });

  it("clamps future dates and falls back to now for invalid input", () => {
    const now = new Date("2026-11-24T00:00:00.000Z");
    expect(postDateISO("December 25, 2026", now)).toBe(now.toISOString());
    expect(postDateISO("not a date", now)).toBe(now.toISOString());
    expect(postDateISO("October 1, 2026", now)).toBe("2026-10-01T12:00:00.000Z");
  });
});
