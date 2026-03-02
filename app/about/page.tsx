import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About TowingNo.1 | BC's Trusted Towing Company Since 2010",
  description: "TowingNo.1 has served the Lower Mainland since 2010. Honest pricing, fast response times, and professional drivers — BC's most trusted towing company.",
  alternates: {
    canonical: "https://towing-no-1.com/about",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/about",
    title: "About TowingNo.1 | BC's Trusted Towing Company Since 2010",
    description: "Learn about TowingNo.1, British Columbia's most trusted towing company since 2010. Fast response, honest pricing, and professional service across the Lower Mainland.",
    images: [
      {
        url: "https://towing-no-1.com/preview.jpg",
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
    images: ["https://towing-no-1.com/preview.jpg"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
