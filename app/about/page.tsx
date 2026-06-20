import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About TowingNo.1 | Licensed & Insured Towing in BC Since 2010",
  description: "TowingNo.1 has served the Lower Mainland since 2010. Licensed & insured, honest flat-rate pricing, fast response times, and professional drivers across Surrey and BC.",
  alternates: {
    canonical: "https://www.towingno1.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/about",
    title: "About TowingNo.1 | BC's Trusted Towing Company Since 2010",
    description: "Learn about TowingNo.1, British Columbia's most trusted towing company since 2010. Fast response, honest pricing, and professional service across the Lower Mainland.",
    images: [
      {
        url: "https://www.towingno1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "TowingNo.1 - Trusted Towing Company in BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TowingNo.1 | BC's Trusted Towing Company Since 2010",
    description: "Learn about TowingNo.1, British Columbia's most trusted towing company since 2010.",
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

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutContent />
    </>
  );
}
