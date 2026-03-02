import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact TowingNo.1 | 24/7 Emergency Towing BC",
  description: "Contact TowingNo.1 for fast, reliable roadside assistance in BC. Call (778) 859-1457 anytime — available 24/7 for emergency towing across the Lower Mainland.",
  alternates: {
    canonical: "https://towing-no-1.com/contact",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com/contact",
    title: "Contact TowingNo.1 | 24/7 Emergency Towing BC",
    description: "Get in touch with BC's trusted towing company. Available 24/7 for emergency roadside assistance across the Lower Mainland.",
    images: [
      {
        url: "https://towing-no-1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Contact TowingNo.1 - 24/7 Emergency Towing BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TowingNo.1 | 24/7 Emergency Towing BC",
    description: "Get in touch with BC's trusted towing company. Available 24/7 for emergency roadside assistance across the Lower Mainland.",
    images: ["https://towing-no-1.com/preview.jpg"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
