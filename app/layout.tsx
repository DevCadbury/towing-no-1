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

const SEO_KEYWORDS = [
  "towing capacity",
  "vancouver towing",
  "towing vancouver",
  "car towing",
  "toyota",
  "towing company",
  "towing near me",
  "busters towing",
  "clover towing",
  "towing service",
  "bcaa",
  "bcaa towing",
  "kelowna towing",
  "towing kelowna",
  "towing surrey",
  "surrey towing",
  "tow truck",
  "reliable towing",
  "tacoma towing capacity",
  "towing services",
  "coquitlam towing",
  "towing coquitlam",
  "mario's towing",
  "towing burnaby",
  "marios towing",
  "burnaby towing",
  "chilliwack towing",
  "tundra towing capacity",
  "richmond towing",
  "langley towing",
  "towing richmond",
  "totem towing",
  "toyota tacoma towing capacity",
  "rav4 towing capacity",
  "mid island towing",
  "jacks towing",
  "mundies towing",
  "jamie davis towing",
  "busters towing vancouver",
  "maple ridge towing",
  "vernon towing",
  "drake towing",
  "penticton towing",
  "toyota tundra towing capacity",
  "mission towing",
  "ford canada",
  "towing company near me",
  "towing company vancouver",
  "vancouver towing company",
  "ford ranger towing capacity",
  "f150 towing capacity",
  "honda pilot towing capacity",
  "aj towing",
  "toyota canada",
  "mario's towing kelowna",
  "bcaa membership",
  "rusty towing",
  "hope towing",
  "heavy duty towing",
  "cranbrook towing",
  "tiger towing",
  "quiring towing",
  "motorcycle towing",
  "ron's towing prince george",
  "drakes towing",
  "cooper's towing",
  "all ways towing",
  "extreme towing",
  "lake city towing",
  "harken towing",
  "van horne towing",
  "debos towing",
  "brian's towing",
  "blackjack towing",
  "bcaa towing rules",
  "pepes towing",
  "heavy towing near me",
  "reliable towing chilliwack",
  "cloverdale towing",
  "heavy truck towing",
  "roberts towing",
  "rons towing",
  "coopers towing",
  "bcaa roadside assistance",
  "canuck towing",
  "towing service near me",
  "del oro towing",
  "mitchells towing",
  "ford towing calculator",
  "wally's towing",
  "bayview towing",
  "bens towing",
  "marios towing kamloops",
];

export const metadata: Metadata = {
  metadataBase: new URL('https://towing-no-1.com'),
  title: {
    default: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    template: "%s | TowingNo.1"
  },
  description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia. Affordable towing services, battery boost, flat tire help, and vehicle recovery.",
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
    title: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
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
    title: "24/7 Emergency Towing BC | TowingNo.1 - We Are Coming To You",
    description: "Fast, reliable 24/7 emergency towing and roadside assistance in British Columbia.",
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
                "@type": "LocalBusiness",
                "@id": "https://towing-no-1.com/#localbusiness",
                "name": "TowingNo.1",
                "description": "24/7 emergency towing and roadside assistance in British Columbia. Serving Delta, White Rock, Langley, Burnaby and the Lower Mainland.",
                "url": "https://towing-no-1.com",
                "telephone": "+1-778-838-0014",
                "email": "info@towing-no-1.com",
                "image": "https://towing-no-1.com/preview.jpg",
                "logo": "https://towing-no-1.com/logo.png",
                "priceRange": "$$",
                "openingHours": "Mo-Su 00:00-23:59",
                "currenciesAccepted": "CAD",
                "paymentAccepted": "Cash, Credit Card, Debit Card",
                "areaServed": [
                  { "@type": "City", "name": "Delta", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "White Rock", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Langley", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Burnaby", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } },
                  { "@type": "City", "name": "Surrey", "containedInPlace": { "@type": "AdministrativeArea", "name": "British Columbia" } }
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
