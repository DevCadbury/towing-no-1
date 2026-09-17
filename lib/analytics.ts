/**
 * Client-side conversion analytics (GA4 + Google Ads).
 *
 * Every function is a safe no-op on the server or when gtag has not loaded.
 * These fire GA4 events on the existing gtag pipeline (loaded in app/layout.tsx:
 * GA4 G-30WWS5SMCS + Google Ads AW-17934610144).
 *
 * The Google Ads CONVERSION LABEL is still pending (see
 * lib/business-facts.ts → pendingInputs.googleAdsConversionLabel). Until a real
 * label is provided we fire GA4 events only and DO NOT send an Ads conversion,
 * so no malformed/incomplete conversion is ever reported.
 */

import { pendingInputs } from "@/lib/business-facts";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const ADS_ID = "AW-17934610144";

function gtagEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Fire the Google Ads conversion — only when a real label is configured. */
function fireAdsConversion() {
  const label = pendingInputs.googleAdsConversionLabel.value;
  if (!label) return; // label pending — skip until provided
  gtagEvent("conversion", { send_to: `${ADS_ID}/${label}` });
}

/** A click on any click-to-call CTA. `location` describes where it fired. */
export function trackCall(location: string) {
  gtagEvent("call_click", { event_category: "engagement", event_label: location });
  fireAdsConversion();
}

/** A completed contact/quote form submission (a lead). */
export function trackLead(location = "contact_form") {
  gtagEvent("generate_lead", { event_category: "engagement", event_label: location });
  fireAdsConversion();
}
