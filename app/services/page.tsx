import type { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";

export const metadata: Metadata = {
  title: "Towing Services BC | Emergency Towing & Roadside Assistance",
  description: "24/7 towing and roadside assistance in BC. Emergency towing, flat tire help, battery boost, vehicle recovery, and lockout service across the Lower Mainland.",
  alternates: {
    canonical: "https://towing-no-1.com/services",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/services",
    title: "Towing Services BC | Emergency Towing & Roadside Assistance",
    description: "Complete towing and roadside assistance services in BC. Emergency towing, flat tire help, battery boost, vehicle recovery, and lockout service.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Towing Services BC | Emergency Towing & Roadside Assistance",
    description: "Complete towing and roadside assistance services in BC. Emergency towing, flat tire help, battery boost, vehicle recovery, and lockout service.",
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
        "availableChannel": { "@type": "ServiceChannel", "servicePhone": "+1-778-859-1457" }
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

