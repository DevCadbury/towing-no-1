import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const SEO_KEYWORDS = [
  "tow truck surrey",
  "towing near me",
  "tow truck near me",
  "towing company near me",
  "24/7 towing",
  "towing surrey",
  "surrey towing",
  "tow truck",
  "tow truck now",
  "car towing near me",
  "towing company",
  "towing services surrey",
  "roadside assistance surrey",
  "emergency towing surrey",
  "lower mainland towing",
  "vehicle towing near me",
  "coquitlam towing",
  "port coquitlam towing",
  "burnaby towing",
  "north vancouver towing",
  "richmond towing",
  "vancouver towing",
  "langley towing",
  "white rock towing",
  "vernon towing",
  "flat tire roadside assistance",
  "battery boost service",
  "car lockout service",
  "fuel delivery roadside",
  "winching and recovery",
  "heavy duty towing",
  "truck towing",
  "24/7 tow truck",
];

export const metadata: Metadata = {
  metadataBase: new URL('https://towing-no-1.com'),
  title: {
    default: "Tow Truck Surrey | 24/7 Towing Near Me | TowingNo.1",
    template: "%s | TowingNo.1"
  },
  description: "Need a tow truck near you in Surrey or the Lower Mainland? TowingNo.1 offers 24/7 emergency towing, roadside help, and a free quote before dispatch.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "TowingNo.1" }],
  alternates: {
    canonical: "https://towing-no-1.com",
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://towing-no-1.com",
    siteName: "TowingNo.1",
    title: "Tow Truck Surrey | 24/7 Towing Near Me | TowingNo.1",
    description: "24/7 emergency towing and roadside assistance across Surrey and the Lower Mainland with fast dispatch and upfront pricing.",
    images: [
      {
        url: "https://towing-no-1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tow Truck Surrey | 24/7 Towing Near Me | TowingNo.1",
    description: "24/7 emergency towing and roadside assistance across Surrey and the Lower Mainland with a free quote before dispatch.",
    images: ["https://towing-no-1.com/preview.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://towing-no-1.com/#organization",
                "name": "TowingNo.1",
                "url": "https://towing-no-1.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://towing-no-1.com/logo.png",
                  "width": 684,
                  "height": 365,
                },
                "sameAs": [
                  "https://www.instagram.com/towing.no.1"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1-778-838-0014",
                  "contactType": "customer service",
                  "availableLanguage": "English",
                  "hoursAvailable": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                  }
                }
              },
              {
                "@type": ["LocalBusiness", "AutomotiveBusiness"],
                "@id": "https://towing-no-1.com/#localbusiness",
                "name": "TowingNo.1",
                "description": "24/7 tow truck and roadside assistance in Surrey and the Lower Mainland. Emergency towing, battery boost, flat tire help, lockout service, fuel delivery, and vehicle recovery.",
                "url": "https://towing-no-1.com",
                "telephone": "+1-778-838-0014",
                "email": "info@towing-no-1.com",
                "image": "https://towing-no-1.com/preview.jpg",
                "logo": "https://towing-no-1.com/logo.png",
                "priceRange": "$$",
                "openingHours": "Mo-Su 00:00-23:59",
                "currenciesAccepted": "CAD",
                "paymentAccepted": "Cash, Credit Card, Debit Card",
                "knowsAbout": [
                  "Emergency towing",
                  "Tow truck service",
                  "Roadside assistance",
                  "Battery boost",
                  "Flat tire change",
                  "Vehicle lockout",
                  "Fuel delivery",
                  "Winching and extraction"
                ],
                "areaServed": [
                  { "@type": "City", "name": "Delta", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "White Rock", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Langley", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Burnaby", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Surrey", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Richmond", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Coquitlam", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Port Coquitlam", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Vancouver", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressRegion": "BC",
                  "addressCountry": "CA"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Towing & Roadside Assistance Services",
                  "itemListElement": [
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emergency Towing" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Roadside Assistance" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Battery Boost" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flat Tire Change" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vehicle Recovery" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lockout Service" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fuel Delivery" } },
                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Winching & Extraction" } }
                  ]
                }
              }
            ]
          }) }}
        />
      </head>
      <body className={outfit.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />

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

        {/* ── Google Analytics (GA4) ────────────────────────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-30WWS5SMCS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-30WWS5SMCS');
        `}} />
      </body>
    </html>
  );
}
