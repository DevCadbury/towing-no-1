"use client";

import { useEffect } from "react";
import { mapPrechatData } from "@/lib/tawk-fields";

/**
 * Loads the tawk.to live-chat widget and forwards pre-chat form submissions to
 * our same-origin /api/tawk-prechat endpoint (which notifies WhatsApp via the
 * VPS). The browser never sees the VPS URL/token.
 *
 * Property/Widget IDs are PUBLIC (they appear in the embed URL for every
 * visitor) and are read from NEXT_PUBLIC_* env. The widget only renders when a
 * property id is configured, so with no env the site behaves as before.
 *
 * NOTE: Tawk_API.onPrechatSubmit is NOT fired in the pop-out chat window — do
 * not enable pop-out mode for this workflow (the webhook is the fallback there).
 */

// Public tawk.to identifiers (they ship in the client embed URL, so not secret).
// Defaults are the Towingno1 widget; NEXT_PUBLIC_* env vars override them if set.
const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "6ad38462262b6e34d0161523";
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "1k553qbfq";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

export default function TawkWidget() {
  useEffect(() => {
    if (!PROPERTY_ID) return; // disabled only if explicitly overridden to empty
    if (document.getElementById("tawk-embed-script")) return; // avoid double-injection

    const tawkApi = (window.Tawk_API = window.Tawk_API || {});
    window.Tawk_LoadStart = new Date();

    let lastKey = "";
    let lastAt = 0;

    const getRecaptchaToken = async (): Promise<string> => {
      if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return "";
      try {
        return await new Promise<string>((resolve) => {
          window.grecaptcha!.ready(() => {
            window
              .grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: "prechat" })
              .then(resolve)
              .catch(() => resolve(""));
          });
        });
      } catch {
        return "";
      }
    };

    // Fired when the visitor submits the pre-chat form (Name/Phone/From/To).
    tawkApi.onPrechatSubmit = (data: unknown) => {
      void (async () => {
        try {
          const fields = mapPrechatData(data);
          if (!fields.name && !fields.phone && !fields.from && !fields.to) return;

          // Client-side once-guard against a rapid duplicate fire.
          const key = `${fields.name}|${fields.phone}|${fields.from}|${fields.to}`;
          const now = Date.now();
          if (key === lastKey && now - lastAt < 10_000) return;
          lastKey = key;
          lastAt = now;

          const recaptchaToken = await getRecaptchaToken();
          await fetch("/api/tawk-prechat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...fields, recaptchaToken }),
            keepalive: true,
          });
        } catch {
          // Never interfere with the chat experience.
        }
      })();
    };

    // Load reCAPTCHA v3 (when configured) so a "prechat" token is available.
    if (RECAPTCHA_SITE_KEY && !document.getElementById("recaptcha-v3-script")) {
      const rc = document.createElement("script");
      rc.id = "recaptcha-v3-script";
      rc.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      rc.async = true;
      document.head.appendChild(rc);
    }

    // Inject the tawk.to embed.
    const script = document.createElement("script");
    script.id = "tawk-embed-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, []);

  return null;
}
