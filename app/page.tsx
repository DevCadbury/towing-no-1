import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "24/7 Emergency Towing Surrey BC | Fast Roadside Assistance",
  description: "TowingNo.1 provides fast, reliable 24/7 emergency towing and roadside assistance in Surrey, BC. Call now for affordable towing, battery boost, flat tire help, and vehicle recovery.",
  openGraph: {
    title: "24/7 Emergency Towing Surrey BC | TowingNo.1",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in Surrey, British Columbia.",
  },
};

export default function Home() {
  return <HomeContent />;
}
