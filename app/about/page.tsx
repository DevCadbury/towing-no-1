import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About TowingNo.1 | 24/7 Towing & Roadside Assistance in BC",
  description:
    "TowingNo.1 is a 24/7 towing and roadside assistance company serving Surrey and the Lower Mainland with flat-rate pricing and professional drivers.",
  alternates: {
    canonical: "https://www.towingno1.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/about",
    title: "About TowingNo.1 | 24/7 Towing & Roadside Assistance in BC",
    description:
      "24/7 towing and roadside assistance across Surrey and the Lower Mainland. Flat-rate pricing, professional drivers, and local dispatch.",
    images: [
      {
        url: "https://www.towingno1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "TowingNo.1 - Towing & Roadside Assistance in BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TowingNo.1 | 24/7 Towing & Roadside Assistance in BC",
    description:
      "24/7 towing and roadside assistance across Surrey and the Lower Mainland. Flat-rate pricing, professional drivers, and local dispatch.",
    images: ["https://www.towingno1.com/preview.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.towingno1.com/about" },
  ],
};

// NOTE: The About page previously emitted a second `Organization` node (with the
// same @id as the global one in app/layout.tsx) that re-introduced unverified
// `foundingDate: "2010"` and "licensed and insured" into JSON-LD. That duplicate,
// contradictory entity was removed. Organization identity is emitted once, in the
// root layout's global @graph; the About page keeps only its BreadcrumbList.
export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutContent />
    </>
  );
}
