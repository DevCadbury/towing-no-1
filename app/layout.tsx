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
    default: "TowingNo.1 – We Come to You | 24/7 Emergency Towing BC",
    template: "%s | TowingNo.1 – We Come to You"
  },
  description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia. Affordable towing services, battery boost, flat tire help, and vehicle recovery.",
  keywords: ["emergency towing BC", "24/7 roadside assistance", "affordable towing BC", "tow truck BC", "vehicle recovery BC", "towing Lower Mainland"],
  authors: [{ name: "TowingNo.1" }],
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.towing-no-1.com",
    siteName: "TowingNo.1",
    title: "TowingNo.1 – We Come to You | 24/7 Emergency Towing BC",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
    images: [
      {
        url: "/background_home.png",
        width: 2752,
        height: 1536,
        alt: "TowingNo.1 tow truck – We Come to You, 24/7 Emergency Towing BC"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TowingNo.1 – We Come to You | 24/7 Emergency Towing BC",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
    images: ["/background_home.png"],
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
