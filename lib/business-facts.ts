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

/* ─── Contact / NAP (operational — verified) ───────────────────────── */
export const contact = {
  name: fact("TowingNo.1", "verified", "Operating business name"),
  phoneDisplay: fact("(778) 838-0014", "verified", "Operational dispatch line"),
  phoneTel: fact("+17788380014", "verified", "Operational dispatch line (tel: href)"),
  phoneE164: fact("+1-778-838-0014", "verified", "Operational dispatch line (schema)"),
  email: fact("info@towingno1.com", "verified", "Operational business email"),
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
  region: fact("Surrey and the Lower Mainland", "verified", "Stated service region; matches /locations pages"),
  province: fact("British Columbia", "verified", "Stated service region"),
};

/* ─── Social profiles + map link (operational — verified) ──────────── */
// Single, editable source for social URLs and the Google Maps deep link.
// Update a value HERE and every consumer (Footer icons, Organization `sameAs`,
// the clickable address) picks it up — no URLs scattered across components.
export const social = {
  facebook: fact("https://www.facebook.com/people/Towing-No-1/61592728132909/", "verified", "Official Facebook page"),
  instagram: fact("https://www.instagram.com/towing.no.1", "verified", "Official Instagram profile"),
};

// The location shown to users (kept verbatim in the UI) and the map target it
// links to. Change `mapsQuery` to re-point the clickable address.
export const mapsQuery = "Metro Vancouver, British Columbia, Canada";
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  mapsQuery,
)}`;

/* ─── Marketing claims (UNVERIFIED until the business confirms) ─────── */
// String values here are deliberately worded to match how they appear in
// schema/prose so the guard can detect any leak into JSON-LD.
export const claims = {
  /** Marketing response-time phrase. Allowed in plain marketing copy ONLY. */
  responseTimeClaim: fact("under 15 minutes", "unverified", "Awaiting dispatch-log / GBP timing data"),
  foundingYear: fact("2010", "unverified", "Awaiting business registration record"),
  /** Free-text licensing phrase (as it appears in prose/descriptions). */
  licensedInsured: fact("licensed and insured", "unverified", "Awaiting business licence # + insurance policy"),
  topRated: fact("top-rated towing service in BC", "unverified", "Superlative — no supporting source"),
  /** Rating/review numbers are NOT emitted anywhere until real GBP data exists. */
  rating: fact("4.9", "unverified", "No verified Google Business Profile rating provided"),
  reviewCount: fact("127", "unverified", "No verified review count provided"),
};

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
  yearsInBusiness: { value: 15, status: "unverified", suffix: "+", placeholder: "Established", source: "Awaiting business registration record" },
  happyCustomers: { value: 5000, status: "unverified", suffix: "+", placeholder: "Trusted", source: "Awaiting internal job records" },
  trucksInFleet: { value: 20, status: "unverified", suffix: "+", placeholder: "Full fleet", source: "Awaiting fleet / insurance records" },
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
