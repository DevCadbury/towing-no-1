import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import CallTracking from "@/components/CallTracking";
import TawkWidget from "@/components/TawkWidget";
import {
  address,
  claims,
  contact,
  geo,
  isVerified,
  payment,
  serviceArea,
  social,
} from "@/lib/business-facts";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Google Search Console verification token, supplied via the environment.
// When unset/empty the verification meta tag is omitted entirely so no
// placeholder is ever emitted into the document <head>.
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.towingno1.com"),
  title: {
    default: "Tow Truck Surrey | 24/7 Emergency Towing & Roadside Help | TowingNo.1",
    template: "%s | TowingNo.1",
  },
  description:
    "Need a tow truck in Surrey, BC? TowingNo.1 offers 24/7 emergency towing and roadside help. Call (778) 838-0014 any time, day or night.",
  authors: [{ name: "TowingNo.1" }],
  alternates: {
    canonical: "https://www.towingno1.com",
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  // Favicons are provided via the Next.js file convention: app/icon.png
  // (browser tab) and app/apple-icon.png (iOS home screen). Do not add a
  // metadata.icons block pointing at /logo.png — that shipped a 307KB,
  // non-square image as the favicon and duplicated the auto-generated tags.
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.towingno1.com",
    siteName: "TowingNo.1",
    title: "Tow Truck Surrey | 24/7 Emergency Towing & Roadside Help | TowingNo.1",
    description:
      "24/7 emergency towing and roadside assistance from TowingNo.1 in Surrey, BC. Call (778) 838-0014 any time, day or night.",
    images: [
      {
        url: "https://www.towingno1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "24/7 Emergency Towing BC | TowingNo.1: We Are Coming To You",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tow Truck Surrey | 24/7 Emergency Towing & Roadside Help | TowingNo.1",
    description:
      "24/7 emergency towing and roadside assistance from TowingNo.1 in Surrey, BC. Call (778) 838-0014 any time, day or night.",
    images: ["https://www.towingno1.com/preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD values below are read from lib/business-facts.ts and emitted only
// when the fact is "verified" (register SEO-FACT-REGISTER.md). Never add a
// street address, postal code, coordinates, map link, rating, review, licence,
// insurer or response time here (D-099).
const verifiedName = isVerified(contact.name) ? { name: contact.name.value } : {};
const verifiedAlternateName = isVerified(contact.alternateName)
  ? { alternateName: contact.alternateName.value }
  : {};
const verifiedSameAs = [social.facebook, social.instagram]
  .filter(isVerified)
  .map((f) => f.value);

// Register F-06: the 15 owner-confirmed places. These five are communities or
// neighbourhoods rather than incorporated cities, so they are typed `Place`.
const NON_CITY_PLACES = new Set(["Aldergrove", "Cloverdale", "South Surrey", "Ladner", "Tsawwassen"]);
const areaServed = serviceArea.filter(isVerified).map((f) => ({
  "@type": NON_CITY_PLACES.has(f.value) ? "Place" : "City",
  name: f.value,
  containedInPlace: { "@type": "AdministrativeArea", name: geo.province.value },
}));

// Register F-07, F-14, F-34: owner-confirmed services, named as on the site.
// Names only: no price, area, description or URL (A-216).
const SERVICE_NAMES = [
  "Emergency Towing",
  "Roadside Assistance",
  "Flat Tire Help",
  "Battery Boost",
  "Accident Recovery",
  "Lockout Service",
  "Fuel Delivery",
  "Winching & Extraction",
  "Vehicle Transport",
  "Cross Border Towing",
  "Underground Parking Towing",
];

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.towingno1.com/#organization",
      ...verifiedName,
      ...verifiedAlternateName,
      url: "https://www.towingno1.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.towingno1.com/logo.png",
        width: 684,
        height: 365,
      },
      // Register F-12 VERIFIED (owner confirmed 2026-11-25).
      ...(verifiedSameAs.length ? { sameAs: verifiedSameAs } : {}),
      // Register F-27 VERIFIED: founded 2026.
      ...(isVerified(claims.foundingYear) ? { foundingDate: claims.foundingYear.value } : {}),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phoneE164.value,
        contactType: "customer service",
        // availableLanguage removed: no register row (D-014, A-004).
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    },
    {
      "@type": ["LocalBusiness", "AutomotiveBusiness"],
      "@id": "https://www.towingno1.com/#localbusiness",
      ...verifiedName,
      ...verifiedAlternateName,
      // Built only from VERIFIED register facts: F-01 (name), F-04 (24/7),
      // F-05 (Surrey, BC) and F-23 (statutory holidays). No region phrase.
      description: `${contact.name.value} in ${address.city.value}, ${address.region.value} is open 24 hours a day, 7 days a week, including statutory holidays.`,
      url: "https://www.towingno1.com",
      telephone: contact.phoneE164.value,
      // Register F-03 VERIFIED (owner confirmed 2026-11-25).
      ...(isVerified(contact.email) ? { email: contact.email.value } : {}),
      image: "https://www.towingno1.com/preview.jpg",
      logo: "https://www.towingno1.com/logo.png",
      // priceRange removed — no fixed pricing is published on the site.
      openingHours: "Mo-Su 00:00-23:59",
      // Register F-13/F-19 VERIFIED. currenciesAccepted stays out: no register
      // row (D-014, D-099).
      ...(isVerified(payment.methods) ? { paymentAccepted: payment.methods.value } : {}),
      // Register F-06 VERIFIED: exactly the 15 owner-confirmed places.
      ...(areaServed.length ? { areaServed } : {}),
      // Register F-07, F-14, F-34 VERIFIED: service names only.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Towing and roadside services",
        itemListElement: SERVICE_NAMES.map((serviceName) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: serviceName },
        })),
      },
      address: {
        "@type": "PostalAddress",
        // streetAddress and postalCode are populated from lib/business-facts.ts
        // once the owner provides and verifies the registered address. Do NOT
        // hardcode a fabricated address. When verified, this block will include
        // streetAddress and postalCode automatically.
        ...(address.streetAddress.status === "verified" && address.streetAddress.value
          ? { streetAddress: address.streetAddress.value }
          : {}),
        ...(address.postalCode.status === "verified" && address.postalCode.value
          ? { postalCode: address.postalCode.value }
          : {}),
        addressLocality: address.city.value,
        addressRegion: address.region.value,
        addressCountry: address.country.value,
      },
      // NOTE: aggregateRating / Review markup intentionally removed. It was
      // unverified (4.9 / 127 with no source) and self-serving. Do NOT
      // reintroduce review or rating structured data until (a) real reviews
      // exist and (b) the current Google eligibility rules have been checked —
      // local-business review markup is subject to self-serving restrictions
      // (incl. reviews the business controls) and Google disallows aggregating
      // reviews/ratings from other sites. Genuine reviews may be shown to users
      // on-page without necessarily being eligible for review rich results.
      //
      // knowsAbout is not restored (A-216). streetAddress, postalCode, geo and
      // hasMap stay out: the owner has no customer-facing location (F-05,
      // CR-01a, D-099).
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Warm up the tawk.to chat origins so the widget appears faster */}
        <link rel="preconnect" href="https://embed.tawk.to" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://va.tawk.to" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.tawk.to" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5G2X36L7');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2962382436663193"
          crossOrigin="anonymous"
        />
        {/* End Google AdSense */}
        {/* Favicon <link> tags are auto-generated by Next.js from
            app/icon.png and app/apple-icon.png — no manual tags needed. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className={outfit.className}>
        {/* Google Analytics + Google Ads — single gtag.js load (deduped) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-30WWS5SMCS"
        />
        <Script
          id="google-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-30WWS5SMCS');
              gtag('config', 'AW-17934610144');
            `,
          }}
        />
        {/* End Google Analytics + Ads */}
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5G2X36L7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
        <CallTracking />

        {/* ── tawk.to live-chat widget (pre-chat form -> WhatsApp lead) ── */}
        <TawkWidget />
      </body>
    </html>
  );
}
