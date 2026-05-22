import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { serviceAreas } from "@/lib/service-areas";

export const metadata: Metadata = {
  title:
    "Tow Truck Surrey | 24/7 Emergency Towing & Roadside Help | TowingNo.1",
  description:
    "Stranded in Surrey or the Lower Mainland? TowingNo.1 dispatches in under 15 minutes, 24/7. Emergency towing, battery boost, lockout, flat tire & more. Free quote before dispatch — call (778) 838-0014.",
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
      "Tow Truck Surrey | 24/7 Emergency Towing & Roadside Help | TowingNo.1",
    description:
      "24/7 tow truck and roadside assistance in Surrey and the Lower Mainland. Fast dispatch, upfront pricing, licensed & insured. Call (778) 838-0014.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tow Truck Surrey | 24/7 Emergency Towing & Roadside Help | TowingNo.1",
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

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can your tow truck reach me in Surrey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our average response time in Surrey is under 15 minutes depending on traffic and exact location. We dispatch the nearest available driver as soon as you call (778) 838-0014.",
      },
    },
    {
      "@type": "Question",
      name: "How much does towing cost in Surrey?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use flat-rate pricing with no hidden fees. The cost depends on vehicle type and distance. Call (778) 838-0014 for an instant quote — we give you a firm price before we dispatch.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide a quote before dispatch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide an upfront quote before dispatch so you know the exact price before service starts. No surprises.",
      },
    },
    {
      "@type": "Question",
      name: "What roadside services do you offer besides towing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide battery boosts, flat tire changes, lockout service, fuel delivery, and winching and extraction across the Lower Mainland.",
      },
    },
    {
      "@type": "Question",
      name: "What is the fastest way to get a tow truck near me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Call (778) 838-0014 directly. We dispatch the nearest available driver immediately. Average arrival time is under 15 minutes across Surrey and the Lower Mainland.",
      },
    },
    {
      "@type": "Question",
      name: "Do you tow electric vehicles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Electric vehicles must be transported on a flatbed — never towed with wheels down. We have flatbed trucks available 24/7 for EVs including Tesla, Rivian, and all other makes.",
      },
    },
    {
      "@type": "Question",
      name: "Are you available on holidays and weekends?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We operate 24 hours a day, 7 days a week, including all statutory holidays. Emergencies don't follow business hours, and neither do we.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help if I'm stuck in a ditch or snow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our winching and extraction service pulls vehicles out of ditches, mud, and snow banks safely using professional equipment across the Lower Mainland.",
      },
    },
  ],
};

const homeReviewSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.towingno1.com/#localbusiness",
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Sarah M." },
      datePublished: "2026-01-15",
      reviewBody:
        "Called TowingNo.1 at 2 AM when my car broke down on the highway. They arrived in 20 minutes and had me home safely. Excellent service!",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "David K." },
      datePublished: "2026-02-03",
      reviewBody:
        "Got a flat tire on the highway at rush hour. They were there in under 25 minutes and had me on my way. Unbelievable response time!",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Lisa R." },
      datePublished: "2026-02-18",
      reviewBody:
        "Locked my keys in the car at the mall. They opened it in minutes without any damage. Friendly and professional — saved my day!",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: "Tom W." },
      datePublished: "2026-03-05",
      reviewBody:
        "Needed a battery boost early in the morning before work. Quick, easy, and priced fairly. Definitely calling them again.",
    },
  ],
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeReviewSchema) }}
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
      <HomeContent />
    </>
  );
}
