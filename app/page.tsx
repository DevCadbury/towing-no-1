import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { serviceAreas } from "@/lib/service-areas";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { contact, isVerified, serviceArea } from "@/lib/business-facts";

// Register F-06 VERIFIED: the 15 owner-confirmed places, as "A, B, ... and O".
const servedPlaces = serviceArea.filter(isVerified).map((f) => f.value);
const servedPlacesText = `${servedPlaces.slice(0, -1).join(", ")} and ${servedPlaces[servedPlaces.length - 1]}`;

export const metadata: Metadata = {
  title:
    "Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1",
  description:
    "Tow truck in Surrey, BC, 24/7. TowingNo.1 provides emergency towing and roadside assistance day and night. Call (778) 838-0014 for help now.",
  // keywords meta intentionally omitted — Google ignores it for ranking and
  // a large list is dead weight / stuffing signal in the raw HTML source.
  alternates: {
    canonical: "https://www.towingno1.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com",
    title:
      "Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1",
    description:
      "24/7 tow truck and roadside assistance in Surrey, BC. Call TowingNo.1 at (778) 838-0014 any time, day or night.",
    locale: "en_CA",
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
    title:
      "Tow Truck Surrey | 24/7 Emergency Towing | TowingNo.1",
    description:
      "Call TowingNo.1 for 24/7 towing and roadside help in Surrey, BC at (778) 838-0014.",
    images: ["https://www.towingno1.com/preview.jpg"],
  },
};

// The homepage Service node (homeServiceSchema) was removed: it asserted
// services (register F-07 UNVERIFIED), a city list (F-06 UNVERIFIED) and the
// "Lower Mainland" region wording. Only VERIFIED facts may appear in JSON-LD
// (D-013, D-016, D-063; ACTION-PLAN A-004, A-005).

// Single source of truth for the homepage FAQ — used for BOTH the visible
// accordion (HomeContent <FaqSection>) and the FAQPage schema, so they never
// drift. Answers are self-contained (AEO) and carry no unverified figures.
const homeFaq: FaqItem[] = [
  {
    q: "How fast can your tow truck reach me in Surrey?",
    a: "We dispatch the nearest available driver when you call (778) 838-0014. Fast local dispatch; arrival times vary by location and road conditions.",
  },
  {
    q: "How much does towing cost in Surrey?",
    a: "Prices are not listed on this site because every call is different. Call (778) 838-0014, tell the dispatcher your location, your vehicle, and the help you need, and ask about the cost before anyone is sent.",
  },
  {
    q: "What roadside services do you offer besides towing?",
    a: "We provide battery boosts, spare-tire changes, lockout service, fuel delivery, and winching and extraction, often solving the problem on the spot without a tow.",
  },
  {
    q: "Which areas do you serve?",
    a: `We serve ${servedPlacesText}, BC, and answer calls 24/7. Call (778) 838-0014 and tell the dispatcher where you are.`,
  },
  {
    q: "Do you tow electric vehicles?",
    a: "It depends on the vehicle. Many electric vehicles must not be towed with their drive wheels on the ground, so tell the dispatcher the make and model when you call (778) 838-0014 and ask whether the job can be done.",
  },
  {
    q: "Do you provide roadside assistance without towing?",
    a: "Yes. If your issue can be solved on the spot (a flat tire you can swap for the spare, a dead battery, an empty tank, or a lockout), we handle it right there. A tow is only arranged when the vehicle can't be driven.",
  },
  {
    q: "Are you available at night and on weekends?",
    a: "Yes. We operate 24 hours a day, 7 days a week, including statutory holidays. Emergencies don't follow business hours, so call (778) 838-0014 whenever you need help.",
  },
  {
    q: "Can you help if I'm stuck in a ditch or snow?",
    a: "Yes. Our winching and extraction service pulls vehicles out of ditches, mud, and snow banks. Call (778) 838-0014 and describe where the vehicle is stuck.",
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.towingno1.com/#website",
  // Site name stays the visible brand "TowingNo.1" (equals og:site_name and
  // the title suffix); the owner-confirmed business name is the alternate
  // (register F-01, D-099, Google "Site names" guidance).
  name: contact.alternateName.value,
  alternateName: [contact.name.value],
  url: "https://www.towingno1.com",
  publisher: {
    "@id": "https://www.towingno1.com/#organization",
  },
};

// speakableSchema removed — Google dropped SpeakableSpecification support
// (~2023); the empty block added noise to JSON-LD with no ranking benefit.

export default function Home() {
  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeContent faq={homeFaq} />
    </>
  );
}
