import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "TowingNo.1 – We Come to You | 24/7 Emergency Towing BC",
  description: "TowingNo.1 provides fast, reliable 24/7 emergency towing and roadside assistance in BC. Call now for affordable towing, battery boost, flat tire help, and vehicle recovery.",
  openGraph: {
    title: "TowingNo.1 – We Come to You | 24/7 Emergency Towing BC",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
    images: [
      {
        url: "/background_home.png",
        width: 2752,
        height: 1536,
        alt: "TowingNo.1 tow truck – We Come to You, 24/7 Emergency Towing BC"
      }
    ],
  },
};

export default function Home() {
  return <HomeContent />;
}
