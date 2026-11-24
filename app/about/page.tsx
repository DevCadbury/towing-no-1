import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About TowingNo.1 | 24/7 Towing & Roadside Assistance in BC",
  description:
    "About TowingNo.1, a 24/7 towing and roadside assistance company in Surrey, BC. How we take your call and what to expect. Call (778) 838-0014.",
  alternates: {
    canonical: "https://www.towingno1.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/about",
    title: "About TowingNo.1 | 24/7 Towing & Roadside Assistance in BC",
    description:
      "24/7 towing and roadside assistance from TowingNo.1 in Surrey, BC. Call (778) 838-0014 any time of day or night.",
    locale: "en_CA",
    images: [
      {
        url: "https://www.towingno1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "TowingNo.1 | Towing & Roadside Assistance in BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TowingNo.1 | 24/7 Towing & Roadside Assistance in BC",
    description:
      "24/7 towing and roadside assistance from TowingNo.1 in Surrey, BC. Call (778) 838-0014 any time of day or night.",
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
