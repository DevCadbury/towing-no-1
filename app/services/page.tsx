import type { Metadata } from "next";
import ServicesContent from "@/components/ServicesContent";

export const metadata: Metadata = {
  title: "Our Services - 24/7 Towing & Roadside Assistance Surrey BC",
  description: "Complete towing and roadside assistance services in Surrey, BC. Emergency towing, flat tire help, battery boost, vehicle recovery, lockout service, and long distance towing.",
  openGraph: {
    title: "Towing Services Surrey BC | TowingNo.1",
    description: "Comprehensive 24/7 towing and roadside assistance services in Surrey, British Columbia.",
  },
};

export default function Services() {
  return <ServicesContent />;
}
