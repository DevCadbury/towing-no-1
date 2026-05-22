import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Battery Boost Surrey | 24/7 Jump-Start Service Near Me",
  description:
    "Dead battery in Surrey or the Lower Mainland? TowingNo.1 provides 24/7 battery boost and jump-start service. Fast dispatch, upfront pricing. Call (778) 838-0014.",
  alternates: { canonical: "https://www.towingno1.com/services/battery-boost" },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/battery-boost",
    title: "Battery Boost Surrey | 24/7 Jump-Start Service Near Me",
    description: "24/7 battery boost and jump-start service in Surrey and the Lower Mainland. Fast dispatch, upfront pricing.",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/battery-boost#service",
  name: "Battery Boost & Jump-Start Service Surrey",
  serviceType: "Battery Boost",
  description: "24/7 battery boost and jump-start service for all vehicles across Surrey and the Lower Mainland. Free battery test included. Licensed and insured.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Surrey" },
    { "@type": "City", name: "Langley" },
    { "@type": "City", name: "Burnaby" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Delta" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can you boost my battery in Surrey?",
      acceptedAnswer: { "@type": "Answer", text: "Our average response time for battery boost service in Surrey is under 15 minutes. Call (778) 838-0014 and we dispatch immediately." },
    },
    {
      "@type": "Question",
      name: "How much does a battery boost cost in Surrey?",
      acceptedAnswer: { "@type": "Answer", text: "We use flat-rate pricing with no hidden fees. Call (778) 838-0014 for an instant quote before we dispatch." },
    },
    {
      "@type": "Question",
      name: "Do you test the battery after boosting?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Our technicians test your battery and charging system after the boost to let you know if the battery needs replacement." },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Battery Boost", item: "https://www.towingno1.com/services/battery-boost" },
  ],
};

export default function BatteryBoostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative h-[380px] flex items-center overflow-hidden bg-navy-950">
        <Image src="/image/Battery_Boost.png" alt="Battery boost jump-start service Surrey — dead car battery" fill className="object-cover opacity-30" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/20" />
        <div className="relative z-10 container-custom">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Battery Boost</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">24/7 Service</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Battery Boost &amp; Jump-Start Service — Surrey &amp; Lower Mainland
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Dead battery? We dispatch in under 15 minutes, jump-start your vehicle on the spot, and test your battery and charging system. Available 24/7.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">24/7 Battery Boost Service in Surrey, BC</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A dead battery is one of the most common roadside emergencies in the Lower Mainland. Whether you left your lights on overnight, your battery is old, or cold weather has drained it, TowingNo.1 dispatches a technician to your location in <strong>under 15 minutes</strong>.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We safely jump-start your vehicle using professional equipment and then test your battery and charging system to let you know if a replacement is needed. This prevents you from getting stranded again.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our battery boost service covers all of Surrey including Guildford, Newton, Fleetwood, Cloverdale, and South Surrey, as well as Langley, Burnaby, Richmond, Coquitlam, White Rock, Delta, and Vancouver.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">What&apos;s Included</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {["Professional jump-start", "Battery voltage test", "Charging system check", "Safe boosting procedures", "All vehicle makes and models", "Available 24/7 including holidays"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5"><path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Signs Your Battery Needs Help</h2>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> Engine cranks slowly or won&apos;t start</li>
                  <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> Headlights or interior lights are dim</li>
                  <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> Battery warning light on dashboard</li>
                  <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> Rapid clicking when turning the key</li>
                  <li className="flex items-start gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> Battery is more than 4 years old</li>
                </ul>
                <p className="mt-4 text-sm text-slate-500">
                  Read more: <Link href="/blog/signs-car-battery-dying" className="text-amber-600 hover:underline">5 Signs Your Car Battery is Dying</Link>
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    { q: "How fast can you boost my battery in Surrey?", a: "Our average response time for battery boost service in Surrey is under 15 minutes. Call (778) 838-0014 and we dispatch immediately." },
                    { q: "How much does a battery boost cost in Surrey?", a: "We use flat-rate pricing with no hidden fees. Call (778) 838-0014 for an instant quote before we dispatch." },
                    { q: "Do you test the battery after boosting?", a: "Yes. Our technicians test your battery and charging system after the boost to let you know if the battery needs replacement." },
                  ].map((faq) => (
                    <div key={faq.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Available Now</p>
                <h3 className="text-xl font-extrabold mb-3">Dead Battery?</h3>
                <p className="text-slate-300 text-sm mb-5">We dispatch in under 15 minutes. Free quote before we send a technician.</p>
                <a href="tel:+17788380014" className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Under 15 min response</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Free battery test included</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> All vehicle types</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> 24/7 including holidays</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Other Services</h3>
                <ul className="space-y-2">
                  {[
                    { href: "/services/emergency-towing", label: "Emergency Towing" },
                    { href: "/services/lockout-service", label: "Lockout Service" },
                    { href: "/services/flat-tire-help", label: "Flat Tire Help" },
                    { href: "/services/fuel-delivery", label: "Fuel Delivery" },
                    { href: "/services/winching-extraction", label: "Winching & Extraction" },
                  ].map((s) => (
                    <li key={s.href}><Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg> {s.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
