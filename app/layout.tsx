import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.towing-no-1.com'),
  title: {
    default: "TowingNo.1 - 24/7 Emergency Towing Surrey BC | Roadside Assistance",
    template: "%s | TowingNo.1"
  },
  description: "Fast, reliable 24/7 emergency towing and roadside assistance in Surrey, British Columbia. Affordable towing services, battery boost, flat tire help, and vehicle recovery.",
  keywords: ["towing Surrey BC", "emergency towing Surrey", "24/7 roadside assistance Surrey", "affordable towing Surrey BC", "tow truck Surrey", "vehicle recovery Surrey"],
  authors: [{ name: "TowingNo.1" }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.towing-no-1.com",
    siteName: "TowingNo.1",
    title: "TowingNo.1 - 24/7 Emergency Towing Surrey BC",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in Surrey, British Columbia.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "TowingNo.1 - Emergency Towing Surrey BC"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TowingNo.1 - 24/7 Emergency Towing Surrey BC",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in Surrey, British Columbia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={outfit.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
