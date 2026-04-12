import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { serviceAreas } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: "Tow Truck Surrey | 24/7 Towing Near Me | TowingNo.1",
  description: "Need towing near you right now? TowingNo.1 dispatches fast across Surrey and the Lower Mainland with 24/7 emergency towing and free upfront quotes.",
  keywords: [
    "tow truck surrey",
    "towing near me",
    "tow truck near me",
    "emergency towing surrey",
    "24/7 tow truck",
    "car towing near me",
    "roadside assistance surrey",
    "surrey towing services",
  ],
  alternates: {
    canonical: "https://towing-no-1.com",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com",
    title: "Tow Truck Surrey | 24/7 Towing Near Me | TowingNo.1",
    description: "24/7 tow truck and roadside assistance in Surrey and the Lower Mainland with fast dispatch and upfront rates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tow Truck Surrey | 24/7 Towing Near Me | TowingNo.1",
    description: "Call TowingNo.1 for fast 24/7 towing in Surrey and the Lower Mainland. Free quote before dispatch.",
  },
};

const homeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://towing-no-1.com/#emergency-towing-service",
  name: "24/7 Tow Truck and Roadside Assistance",
  serviceType: "Emergency towing and roadside assistance",
  provider: {
    "@id": "https://towing-no-1.com/#localbusiness",
  },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Coquitlam" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "White Rock" },
    { "@type": "City", name: "Vancouver" },
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
        text: "Our average response time is under 15 minutes depending on traffic and exact location. We dispatch the nearest available driver as soon as you call.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide a quote before dispatch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We provide an upfront quote before dispatch so you know the price before service starts.",
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
  ],
};

const homeServiceAreaListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TowingNo.1 Local Service Areas",
  itemListElement: serviceAreas.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://towing-no-1.com/locations/${area.slug}`,
    name: `${area.city} tow truck service`,
  })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceAreaListSchema) }}
      />
      <HomeContent />
    </>
  );
}
