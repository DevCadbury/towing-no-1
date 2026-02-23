import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://towing-no-1.vercel.app'),
  title: {
    default: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    template: "%s | TowingNo.1 - We Are Coming To You"
  },
  description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia. Affordable towing services, battery boost, flat tire help, and vehicle recovery.",
  keywords: [
    "emergency towing BC",
    "24/7 roadside assistance BC",
    "affordable towing Lower Mainland",
    "tow truck Vancouver",
    "vehicle recovery BC",
    "towing Delta",
    "towing White Rock",
    "towing Langley",
    "towing Burnaby",
    "battery boost BC",
    "flat tire help BC",
    "roadside assistance Surrey",
    "TowingNo1",
  ],
  authors: [{ name: "TowingNo.1" }],
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://towing-no-1.vercel.app",
    siteName: "TowingNo.1",
    title: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
    images: [
      {
        url: "https://towing-no-1.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
    images: ["https://towing-no-1.vercel.app/preview.jpg"],
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="canonical" href="https://towing-no-1.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://towing-no-1.com",
            "name": "TowingNo.1",
            "description": "24/7 emergency towing and roadside assistance in British Columbia. Serving Delta, White Rock, Langley, Burnaby and the Lower Mainland.",
            "url": "https://towing-no-1.com",
            "telephone": "+17788591457",
            "email": "info@towing-no-1.com",
            "image": "https://towing-no-1.vercel.app/preview.jpg",
            "logo": "https://towing-no-1.vercel.app/logo.png",
            "priceRange": "$$",
            "openingHours": "Mo-Su 00:00-23:59",
            "areaServed": [
              "Delta, BC",
              "White Rock, BC",
              "Langley, BC",
              "Burnaby, BC",
              "Surrey, BC",
              "Lower Mainland, BC"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            "sameAs": [
              "https://towing-no-1.com",
              "https://towing-no-1.vercel.app"
            ],
            "serviceType": [
              "Emergency Towing",
              "Roadside Assistance",
              "Battery Boost",
              "Flat Tire Change",
              "Vehicle Recovery",
              "Lockout Service"
            ]
          }) }}
        />
      </head>
      <body className={outfit.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* ── Reamaze live-chat widget ──────────────────────────────── */}
        <Script id="reamaze-config" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          var _support = _support || { 'ui': {}, 'user': {} };
          _support['account'] = '14d9241b-cb1a-4379-a0d3-f9cb700e9592';
          _support['ui']['contactMode'] = 'mixed';
          _support['ui']['enableKb'] = 'true';
          _support['ui']['mailbox'] = '76149070';
          _support['ui']['styles'] = {
            widgetColor: '#a6170e',
            gradient: true,
          };
          _support['ui']['shoutboxFacesMode'] = '';
          _support['ui']['widget'] = {
            allowBotProcessing: 'false',
            slug: 'towing-no-1',
            label: {
              text: '\\u{1F44B} Hi there! Need roadside help?\\nWe\u2019re available 24/7 across the Lower Mainland.\\nHow can we assist you today?',
              mode: 'notification',
              delay: 3,
              duration: 30,
              primary: '\\u{1F44B} Hi there! Need roadside help?\\nWe\u2019re available 24/7 across the Lower Mainland with an average response time under 15 minutes.\\n\\nHow can we help you today?',
              secondary: '',
              sound: true,
            },
            position: 'bottom-right',
          };
          _support['ui']['overrides'] = _support['ui']['overrides'] || {};
          _support['ui']['overrides']['confirmationMessage'] = 'Thank you! We\u2019ve received your request.\\nA dispatcher is reviewing your details now.\\nWe\u2019ll respond shortly with your ETA and pricing.\\n\\nIf this is urgent, please tap Call Now for immediate assistance.';
          _support['apps'] = {
            recentConversations: {},
            faq: { enabled: true },
          };
        `}} />
        <Script
          src="https://cdn.reamaze.com/assets/reamaze-loader.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
