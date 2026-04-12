import type { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";

export const metadata: Metadata = {
  title: "Towing Services Surrey | 24/7 Tow Truck Near Me",
  description: "Need towing near me in Surrey? We offer 24/7 tow truck service, battery boosts, flat tire help, lockout support, and recovery across the Lower Mainland.",
  alternates: {
    canonical: "https://towing-no-1.com/services",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/services",
    title: "Towing Services Surrey | 24/7 Tow Truck Near Me",
    description: "24/7 towing and roadside assistance in Surrey and the Lower Mainland with fast dispatch and upfront pricing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Towing Services Surrey | 24/7 Tow Truck Near Me",
    description: "24/7 towing and roadside assistance in Surrey and the Lower Mainland with fast dispatch and upfront pricing.",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "TowingNo.1 Services",
  "description": "24/7 towing and roadside assistance services in British Columbia",
  "url": "https://towing-no-1.com/services",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Emergency Towing",
        "description": "24/7 emergency towing for cars, SUVs, and light trucks across the Lower Mainland BC.",
        "provider": { "@type": "LocalBusiness", "name": "TowingNo.1", "@id": "https://towing-no-1.com/#localbusiness" },
        "areaServed": "Lower Mainland, BC",
        "availableChannel": { "@type": "ServiceChannel", "servicePhone": "+1-778-838-0014" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Roadside Assistance",
        "description": "Battery boost, flat tire help, fuel delivery, and lockout service in BC.",
        "provider": { "@type": "LocalBusiness", "name": "TowingNo.1", "@id": "https://towing-no-1.com/#localbusiness" },
        "areaServed": "Lower Mainland, BC"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Vehicle Recovery & Extraction",
        "description": "Professional winching and extraction for vehicles stuck in mud, snow or ditches in BC.",
        "provider": { "@type": "LocalBusiness", "name": "TowingNo.1", "@id": "https://towing-no-1.com/#localbusiness" },
        "areaServed": "Lower Mainland, BC"
      }
    }
  ]
};

export default function Services() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ServicesContent />
    </>
  );
}

