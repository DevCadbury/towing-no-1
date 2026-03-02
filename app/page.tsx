import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
  description: "TowingNo.1: 24/7 emergency towing and roadside assistance in BC. Battery boost, flat tire, lockout service, and vehicle recovery across the Lower Mainland.",
  alternates: {
    canonical: "https://towing-no-1.com",
  },
  openGraph: {
    type: "website",
    url: "https://towing-no-1.com",
    title: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
  },
};

export default function Home() {
  return <HomeContent />;
}
