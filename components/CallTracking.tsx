"use client";

import { useEffect } from "react";
import { trackCall } from "@/lib/analytics";

/**
 * Global click-to-call tracking.
 *
 * Mounted once in the root layout, this attaches a single capture-phase click
 * listener that fires a `call_click` GA4 event for EVERY `tel:` link on the
 * site — including links rendered by server components (Footer, service and
 * location pages, blog) that cannot carry an onClick handler. This replaces the
 * old single hero-only `call_dialog_open` event with complete coverage and zero
 * per-link wiring.
 *
 * Label priority: an explicit `data-call-location` attribute on the link wins;
 * otherwise the current page path is used, giving useful per-page attribution.
 */
export default function CallTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      const link = el?.closest?.('a[href^="tel:"]') as HTMLElement | null;
      if (!link) return;
      const explicit = link.getAttribute("data-call-location");
      trackCall(explicit || `page:${window.location.pathname}`);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
