/**
 * Business facts — single source of truth (anti-drift).
 *
 * Every business claim on the site is declared here exactly once, with a
 * verification status. Components and metadata read from this module instead of
 * hardcoding numbers, so a value can be corrected in ONE place once verified.
 *
 * ENFORCEMENT (scripts/claims-check.mjs):
 *   status "verified"             → may appear in UI + metadata + JSON-LD schema
 *   status "unverified"/"pending" → MUST NOT appear in any JSON-LD schema block,
 *                                   and MUST NOT be rendered as an animated
 *                                   numeric stat (the Counter shows a neutral
 *                                   placeholder instead). May remain in plain
 *                                   marketing copy only, by explicit intent.
 *
 * Do NOT change a value's number/date to make it "look better". Only flip a
 * status to "verified" (and set `source`/`verifiedAt`) when the business
 * provides an authoritative source. See VERIFICATION_REPORT.md.
 */

export type VerificationStatus = "verified" | "unverified" | "pending";

export type BusinessFact<T = string> = {
  value: T;
  status: VerificationStatus;
  /** Where the value was verified (URL, document, system). */
  source?: string;
  /** ISO date the value was last verified. */
  verifiedAt?: string;
};

/** Declare a fact. Kept as a named call so the guard can statically find facts. */
export function fact<T = string>(
  value: T,
  status: VerificationStatus,
  source?: string,
  verifiedAt?: string,
): BusinessFact<T> {
  return {
    value,
    status,
    ...(source ? { source } : {}),
    ...(verifiedAt ? { verifiedAt } : {}),
  };
}

/** True only for verified facts — the gate for schema/metadata emission. */
export function isVerified(f: BusinessFact<unknown>): boolean {
  return f.status === "verified";
}

/* ─── Contact / NAP ─────────────────────────────────────────────────── */
// Statuses follow .kiro/seo-orchestration/SEO-FACT-REGISTER.md.
export const contact = {
  // Register F-01 VERIFIED: the owner confirmed the business name "Towing No. 1"
  // (OWNER-ANSWERS-2026-11-25 #1, D-095). "TowingNo.1" is the visual brand
  // spelling the site keeps (user decision 2026-11-22; WebSite name, D-099).
  name: fact("Towing No. 1", "verified", "Register F-01 VERIFIED: owner confirmed 2026-11-25 (OWNER-ANSWERS #1, D-095)", "2026-11-25"),
  alternateName: fact("TowingNo.1", "verified", "Register F-01 VERIFIED: site brand spelling kept by the user (2026-11-22); alternateName per D-099", "2026-11-25"),
  phoneDisplay: fact("(778) 838-0014", "verified", "Operational dispatch line"),
  phoneTel: fact("+17788380014", "verified", "Operational dispatch line (tel: href)"),
  phoneE164: fact("+1-778-838-0014", "verified", "Operational dispatch line (schema)"),
  email: fact("info@towingno1.com", "verified", "Register F-03 VERIFIED: owner confirmed 2026-11-25 (OWNER-ANSWERS #12, D-095)", "2026-11-25"),
};

/**
 * Physical address — pending owner confirmation.
 *
 * TowingNo.1 is a mobile service-area business. Once a verified primary address
 * is confirmed (e.g. a registered business address, not a fabricated one), add
 * it here and flip the status to "verified". The global LocalBusiness schema in
 * app/layout.tsx reads from this object so only ONE edit is needed.
 *
 * streetAddress and postalCode are "pending" because they have not been
 * confirmed by the owner. Do NOT invent values.
 *
 * Currently the global schema emits addressLocality + addressRegion + country
 * (sufficient for a service-area business), and will automatically gain the
 * full street address once it is provided and verified here.
 */
export const address = {
  streetAddress: fact("", "pending", "Awaiting owner confirmation of registered business address"),
  postalCode:    fact("", "pending", "Awaiting owner confirmation of registered business postal code"),
  city:          fact("Surrey", "verified", "Primary operating city"),
  region:        fact("BC", "verified", "Province"),
  country:       fact("CA", "verified", "Country code"),
};

/* ─── Geography (operational — verified) ───────────────────────────── */
// The concrete served-city list lives in lib/service-areas.ts (each has a
// location page). This is the human-facing region phrasing only.
export const geo = {
  // This region phrase is not the owner-confirmed F-06 place list (see
  // `serviceArea` below), so it stays "unverified" (D-099; A-034, D-063).
  // Do not add this phrase to any JSON-LD.
  region: fact("Surrey and the Lower Mainland", "unverified", "Register F-06 UNVERIFIED: stated service region, single source (website); A-034, D-063"),
  province: fact("British Columbia", "verified", "Register F-05 VERIFIED: province of the verified locality Surrey, BC"),
};

// Register F-06 VERIFIED: exactly the 15 places the owner confirmed on
// 2026-11-25 (OWNER-ANSWERS #4, D-095), in the owner's order. The places in
// register F-22 are UNVERIFIED: do not add them here.
const F06_SOURCE = "Register F-06 VERIFIED: owner confirmed 2026-11-25 (OWNER-ANSWERS #4, D-095)";
export const serviceArea: BusinessFact<string>[] = [
  fact("Surrey", "verified", F06_SOURCE, "2026-11-25"),
  fact("Vancouver", "verified", F06_SOURCE, "2026-11-25"),
  fact("Burnaby", "verified", F06_SOURCE, "2026-11-25"),
  fact("Richmond", "verified", F06_SOURCE, "2026-11-25"),
  fact("Langley", "verified", F06_SOURCE, "2026-11-25"),
  fact("Delta", "verified", F06_SOURCE, "2026-11-25"),
  fact("White Rock", "verified", F06_SOURCE, "2026-11-25"),
  fact("Coquitlam", "verified", F06_SOURCE, "2026-11-25"),
  fact("Maple Ridge", "verified", F06_SOURCE, "2026-11-25"),
  fact("Aldergrove", "verified", F06_SOURCE, "2026-11-25"),
  fact("Cloverdale", "verified", F06_SOURCE, "2026-11-25"),
  fact("South Surrey", "verified", F06_SOURCE, "2026-11-25"),
  fact("Pitt Meadows", "verified", F06_SOURCE, "2026-11-25"),
  fact("Ladner", "verified", F06_SOURCE, "2026-11-25"),
  fact("Tsawwassen", "verified", F06_SOURCE, "2026-11-25"),
];

/* ─── Payment ───────────────────────────────────────────────────────── */
// Register F-13 and F-19 VERIFIED: owner confirmed 2026-11-25 (OWNER-ANSWERS
// #14, D-095). Customers pay the driver directly on site.
export const payment = {
  methods: fact("Cash, Credit Card, Debit Card, Contactless, Apple Pay, Google Pay", "verified", "Register F-13/F-19 VERIFIED: owner confirmed 2026-11-25 (OWNER-ANSWERS #14, D-095)", "2026-11-25"),
};

/* ─── Social profiles + map link ────────────────────────────────────── */
// Single, editable source for social URLs and the Google Maps deep link.
// Update a value HERE and every consumer (Footer icons, the clickable address)
// picks it up — no URLs scattered across components.
// Register F-12 VERIFIED: both profiles owner confirmed 2026-11-25
// (OWNER-ANSWERS #13, D-095). The Instagram URL is the owner's share link with
// its tracking query string removed; the old dotted handle is wrong.
export const social = {
  facebook: fact("https://www.facebook.com/people/Towing-No-1/61592728132909/", "verified", "Register F-12 VERIFIED: owner confirmed 2026-11-25 (OWNER-ANSWERS #13, D-095)", "2026-11-25"),
  instagram: fact("https://www.instagram.com/towingno1", "verified", "Register F-12 VERIFIED: owner confirmed 2026-11-25 (OWNER-ANSWERS #13, D-095)", "2026-11-25"),
};

// The location shown to users (kept verbatim in the UI) and the map target it
// links to. Change `mapsQuery` to re-point the clickable address.
export const mapsQuery = "Metro Vancouver, British Columbia, Canada";
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapsQuery,
)}`;

/* ─── Marketing claims ───────────────────────────────────────────────── */
// String values here are deliberately worded to match how they appear in
// schema/prose so the guard can detect any leak into JSON-LD.
// `responseTimeClaim` and `licensedInsured` stay "unverified" on purpose:
// they are JSON-LD guards (claims-check CHECK 4). The register allows F-08 and
// F-09 in copy only, never in JSON-LD (D-099).
// These internal notes are never rendered; excluded from the copy check.
// copy-check-ignore-start
export const claims = {
  /** Marketing response-time phrase. Never in JSON-LD; never a promise. */
  responseTimeClaim: fact("under 15 minutes", "unverified", "JSON-LD guard: register F-09 is copy-only with qualified wording, never JSON-LD (D-097, D-099)"),
  foundingYear: fact("2026", "verified", "Register F-27 VERIFIED: founded 2026, owner confirmed 2026-11-25 (OWNER-ANSWERS #8, D-095). The earlier year (F-10) is owner confirmed FALSE", "2026-11-25"),
  /** Free-text licensing phrase (as it appears in prose/descriptions). */
  licensedInsured: fact("licensed and insured", "unverified", "JSON-LD guard: register F-08 is a general copy/metadata claim only, never JSON-LD; no licence number or insurer supplied (D-099)"),
  topRated: fact("top-rated towing service in BC", "unverified", "Superlative — no supporting source"),
  /** Rating/review numbers are NOT emitted anywhere until real GBP data exists. */
  rating: fact("4.9", "unverified", "No verified Google Business Profile rating provided"),
  reviewCount: fact("127", "unverified", "No verified review count provided"),
};
// copy-check-ignore-end

/* ─── Animated stat facts (Home + About) ───────────────────────────────
 * The Counter renders `value` (with prefix/suffix) ONLY when status is
 * "verified"; otherwise it renders `placeholder` (neutral, non-numeric) so it
 * never ships 0 / <0 / an invented number. Update the number AND flip status
 * together once verified.
 */
export type StatFact = {
  value: number;
  status: VerificationStatus;
  prefix?: string;
  suffix?: string;
  /** Shown verbatim when status !== "verified". Must be non-numeric + truthful. */
  placeholder: string;
  source?: string;
};

export const stats: Record<string, StatFact> = {
  // "24/7 availability" is the advertised operating model, not a measured metric.
  alwaysAvailable: { value: 24, status: "verified", suffix: "/7", placeholder: "24/7", source: "Advertised 24/7 dispatch model" },
  responseTime: { value: 15, status: "unverified", prefix: "<", suffix: " min", placeholder: "Fast", source: "Awaiting dispatch-log / GBP timing data" },
  // No years-in-business figure exists: founded 2026 (F-27), "15+ years" and
  // "Established" are owner confirmed FALSE (F-10). `value` 0 is not a claim
  // and is never rendered (status stays "unverified"). Read only by
  // components/HomeContent.tsx until A-229 replaces that card.
  yearsInBusiness: { value: 0, status: "unverified", placeholder: "Surrey, BC", source: "Register F-10 owner confirmed FALSE (no years figure); placeholder from F-05 VERIFIED locality" },
  happyCustomers: { value: 5000, status: "unverified", suffix: "+", placeholder: "Trusted", source: "Awaiting internal job records" },
};

/** Resolve a stat to the string to display (number when verified, else placeholder). */
export function statText(s: StatFact): string {
  if (s.status !== "verified") return s.placeholder;
  return `${s.prefix ?? ""}${s.value}${s.suffix ?? ""}`;
}

/* ─── Inputs we are explicitly waiting on from the business (pending) ─── */
export const pendingInputs = {
  googleAdsConversionLabel: fact("", "pending", "Provide the conversion label from Google Ads account AW-17934610144"),
  blogPublishDates: fact("", "pending", "Provide real article publish dates (current dates are placeholders)"),
  reviewData: fact("", "pending", "Provide Google Business Profile link / real reviews before ANY review markup"),
  licenceNumber: fact("", "pending", "Provide BC business licence number + insurer if licensing is to be substantiated on-site"),
};
