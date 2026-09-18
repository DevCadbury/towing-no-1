import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { serviceAreas } from "@/lib/service-areas";
import { faqPageSchema, type FaqItem } from "@/lib/faq";

export const metadata: Metadata = {
  title:
    "Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1",
  description:
    "Stranded in Surrey or the Lower Mainland? TowingNo.1 offers 24/7 emergency towing, battery boost, lockout & flat tire help. Free quote — call (778) 838-0014.",
  keywords: [
    "tow truck surrey",
    "towing near me",
    "tow truck near me",
    "emergency towing surrey",
    "24/7 tow truck",
    "car towing near me",
    "roadside assistance surrey",
    "surrey towing services",
    "towing company surrey bc",
    "battery boost surrey",
    "lockout service surrey",
    "flat tire help surrey",
  ],
  alternates: {
    canonical: "https://www.towingno1.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com",
    title:
      "Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1",
    description:
      "24/7 tow truck and roadside assistance in Surrey and the Lower Mainland. Fast dispatch, upfront pricing, licensed & insured. Call (778) 838-0014.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1",
    description:
      "Call TowingNo.1 for fast 24/7 towing in Surrey and the Lower Mainland. Free quote before dispatch — (778) 838-0014.",
  },
};

const homeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/#emergency-towing-service",
  name: "24/7 Tow Truck and Roadside Assistance — Surrey & Lower Mainland",
  serviceType: "Emergency towing and roadside assistance",
  provider: {
    "@id": "https://www.towingno1.com/#localbusiness",
  },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Coquitlam" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "White Rock" },
    { "@type": "City", name: "Vancouver" },
    { "@type": "City", name: "Delta" },
    { "@type": "City", name: "Maple Ridge" },
  ],
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: {
      "@type": "ContactPoint",
      telephone: "+1-778-838-0014",
      contactType: "customer support",
      availableLanguage: "English",
    },
  },
};

// Single source of truth for the homepage FAQ — used for BOTH the visible
// accordion (HomeContent <FaqSection>) and the FAQPage schema, so they never
// drift. Answers are self-contained (AEO) and carry no unverified figures.
const homeFaq: FaqItem[] = [
  {
    q: "How fast can your tow truck reach me in Surrey?",
    a: "We dispatch the nearest available driver the moment you call (778) 838-0014, and give you a live ETA up front so you know the wait before you commit. We stage drivers across Surrey and the Lower Mainland, so help is usually close by.",
  },
  {
    q: "How much does towing cost in Surrey?",
    a: "We use flat-rate pricing with no hidden fees. The cost depends on vehicle type and distance. Call (778) 838-0014 for an instant quote — we give you a firm price before we dispatch.",
  },
  {
    q: "Do you provide a quote before dispatch?",
    a: "Yes. We provide an upfront quote before dispatch so you know the exact price before service starts. No surprises.",
  },
  {
    q: "What roadside services do you offer besides towing?",
    a: "We provide battery boosts, flat tire changes, lockout service, fuel delivery, and winching and extraction across the Lower Mainland — often solving the problem on the spot without a tow.",
  },
  {
    q: "What areas of the Lower Mainland do you serve?",
    a: "We serve Surrey and the wider Lower Mainland, including Langley, Burnaby, Richmond, Coquitlam, Delta, White Rock, Vancouver, Maple Ridge, and surrounding communities.",
  },
  {
    q: "Do you tow electric vehicles?",
    a: "Yes. Electric vehicles must be transported on a flatbed — never towed with wheels down. We have flatbed trucks available 24/7 for EVs including Tesla, Rivian, and all other makes.",
  },
  {
    q: "Do you provide roadside assistance without towing?",
    a: "Yes. If your issue can be solved on the spot — a flat tire, dead battery, empty tank, or lockout — we fix it right there. A tow is only arranged when the vehicle genuinely can't be driven.",
  },
  {
    q: "Are you available on holidays and weekends?",
    a: "We operate 24 hours a day, 7 days a week, including all statutory holidays. Emergencies don't follow business hours, and neither do we.",
  },
  {
    q: "Can you help if I'm stuck in a ditch or snow?",
    a: "Yes. Our winching and extraction service pulls vehicles out of ditches, mud, and snow banks safely using professional equipment across the Lower Mainland.",
  },
];
const homeFaqSchema = faqPageSchema(homeFaq);

// NOTE: The homepage Review markup (four named 5-star reviews) was removed.
// The reviews were unverified/fabricated (future 2026 dates, no source) and
// self-serving. Do NOT reintroduce Review or AggregateRating structured data
// until (a) real Google Business Profile reviews exist and (b) the current
// Google eligibility rules are checked (self-serving review restrictions apply;
// aggregating third-party reviews is disallowed). Real reviews may be shown to
// users on-page without necessarily being eligible for review rich results.

const homeServiceAreaListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TowingNo.1 Local Service Areas",
  itemListElement: serviceAreas.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://www.towingno1.com/locations/${area.slug}`,
    name: `${area.city} tow truck service`,
  })),
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.towingno1.com/#webpage",
  url: "https://www.towingno1.com",
  name: "Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#hero-summary", "#faq-section"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeServiceAreaListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <HomeContent faq={homeFaq} />
    </>
  );
}
