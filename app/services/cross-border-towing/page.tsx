import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { faqPageSchema, type FaqItem } from "@/lib/faq";
import { serviceAreaCompact } from "@/lib/service-areas";
import OfficialResources from "@/components/OfficialResources";

const PAGE_URL = "https://www.towingno1.com/services/cross-border-towing";
const HERO_IMAGE = "/image/cross_border_towing.jpeg";
const HERO_ALT = "TowingNo.1 tow truck pulling a sedan toward the Canada and U.S. border inspection lanes";

export const metadata: Metadata = {
  title: {
    absolute: "Cross Border Towing Services | TowingNo.1",
  },
  description:
    "Looking for cross border towing between Canada and the U.S.? Contact TowingNo.1 to discuss vehicle transportation, pickup, destination, and a quote.",
  alternates: { canonical: "https://www.towingno1.com/services/cross-border-towing" },
  keywords: [
    "cross border towing",
    "cross border towing services",
    "Canada to USA vehicle towing",
    "USA to Canada vehicle towing",
    "cross border vehicle transportation",
    "long distance vehicle towing",
  ],
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services/cross-border-towing",
    title: "Cross Border Towing Services | TowingNo.1",
    description:
      "Cross border towing and vehicle transportation between Canada and the U.S. Share your pickup and destination, and our team confirms the details.",
    images: [{ url: HERO_IMAGE, width: 1500, height: 837, alt: HERO_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cross Border Towing Services | TowingNo.1",
    description:
      "Cross border towing and vehicle transportation between Canada and the U.S. Share your pickup and destination, and our team confirms the details.",
    images: [HERO_IMAGE],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.towingno1.com/services/cross-border-towing#service",
  name: "Cross Border Towing Services",
  serviceType: "Cross Border Towing",
  description:
    "Cross border towing and vehicle transportation between Canada and the United States in either direction, arranged after the route, vehicle, and timing are confirmed.",
  provider: { "@id": "https://www.towingno1.com/#localbusiness" },
  areaServed: serviceAreaCompact,
};

const faq: FaqItem[] = [
  {
    q: "What is cross border towing?",
    a: "Cross border towing is moving a vehicle by tow truck between Canada and the United States, in either direction. TowingNo.1 handles the towing and transportation side of the trip. Border requirements such as customs declarations are a separate step that the vehicle owner should confirm with the border agencies.",
  },
  {
    q: "Can I request towing between Canada and the United States?",
    a: "Yes. You can ask about moves from Canada to the U.S. or from the U.S. to Canada. Share your pickup location, destination, and vehicle details, and our team will confirm whether the trip can be arranged and what it involves.",
  },
  {
    q: "Can you transport a vehicle that is not running?",
    a: "In many cases, yes. Let us know whether the vehicle starts, rolls, steers, and brakes, and describe any damage. Those details decide which equipment is needed, and our team confirms whether the move can go ahead before giving you a quote.",
  },
  {
    q: "What information is needed for a cross border towing quote?",
    a: "Please share the pickup location, the destination, the vehicle make and model, its current condition, and when you would like it moved. A phone number or email helps our team follow up with any questions.",
  },
  {
    q: "How much does cross border towing cost?",
    a: "There is no standard price, because every trip is different. The cost depends on the distance, the route, the vehicle, its condition, and the timing you need. Send us the details and we will give you a quote to review before anything is booked.",
  },
  {
    q: "What documents may be needed for cross border vehicle transportation?",
    a: "It depends on the vehicle and on whether it is only crossing the border or being imported or exported. Proof of ownership, such as the registration or title, and valid identification are commonly requested. The Canada Border Services Agency and U.S. Customs and Border Protection set the actual requirements, so please check with them before the trip.",
  },
];
const faqSchema = faqPageSchema(faq);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",                item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services",            item: "https://www.towingno1.com/services" },
    { "@type": "ListItem", position: 3, name: "Cross Border Towing", item: PAGE_URL },
  ],
};

const steps = [
  {
    step: "1",
    title: "Share Your Pickup and Destination",
    body: "Tell us where the vehicle is now and where it needs to go. A full address is best, although a business name or a nearby intersection is enough to get the conversation started.",
  },
  {
    step: "2",
    title: "Discuss the Vehicle and Transport Needs",
    body: "We ask for the make, model, and condition of the vehicle, and whether it starts, rolls, steers, and brakes. We also ask about your timing and about access at either end, such as a narrow driveway or a parking garage.",
  },
  {
    step: "3",
    title: "Confirm the Service and Quote",
    body: "Our team confirms whether the trip can be arranged and what it involves, then gives you a quote to review. Nothing is booked and nothing moves until you agree to go ahead.",
  },
];

const situations = [
  {
    title: "Vehicle Breakdowns",
    body: "A vehicle that breaks down on a trip to or from the United States may need to go back to a mechanic you trust, or on to a shop near where it was headed. Once we know where it is, we can talk through the options with you.",
  },
  {
    title: "Accident Damaged Vehicles",
    body: "After a collision, a vehicle that is unsafe to drive may still need to reach a repair facility or its owner on the other side of the border. Describing the damage up front helps us plan how it would be loaded and secured.",
  },
  {
    title: "Vehicles That Don't Run",
    body: "A car that will not start can often still be moved with suitable equipment. Tell us whether it rolls, steers, and brakes, because those details decide whether the trip is possible and how the vehicle would be loaded.",
  },
  {
    title: "Relocations",
    body: "Moving to a new home across the border sometimes means a vehicle has to travel separately from you. We can look at how the transport could fit around your move dates.",
  },
  {
    title: "Moving a Vehicle to Another Location",
    body: "You might be selling a vehicle, buying one from a seller in the other country, or sending one to a family member. If the move is part of importing or exporting the vehicle, extra border steps apply, so check those with the border agencies first.",
  },
];

const quoteDetails = [
  { title: "Pickup location",                  body: "The address or nearest intersection where the vehicle is sitting right now." },
  { title: "Destination",                      body: "Where the vehicle needs to end up, on either side of the border." },
  { title: "Vehicle make and model",           body: "The year, make, and model help us choose a suitable truck for the trip." },
  { title: "Vehicle condition",                body: "Whether it starts, rolls, steers, and brakes, along with any damage we should know about." },
  { title: "Preferred transportation timing",  body: "The date you have in mind and how flexible that date is." },
  { title: "Your contact details",             body: "A phone number or email address so our team can reach you with questions." },
];

const relatedServices = [
  { href: "/services/vehicle-transport",   label: "Vehicle Transport" },
  { href: "/services/emergency-towing",    label: "Emergency Towing" },
  { href: "/services/accident-recovery",   label: "Accident Recovery" },
  { href: "/services/roadside-assistance", label: "Roadside Assistance" },
  { href: "/services/winching-extraction", label: "Winching & Extraction" },
];

const footerLinks = [
  { href: "/services",                     label: "All services" },
  { href: "/services/vehicle-transport",   label: "Vehicle transport" },
  { href: "/services/emergency-towing",    label: "Emergency towing" },
  { href: "/services/accident-recovery",   label: "Accident recovery" },
  { href: "/services/roadside-assistance", label: "Roadside assistance" },
  { href: "/locations/surrey",             label: "Towing Surrey" },
  { href: "/locations/langley",            label: "Towing Langley" },
  { href: "/contact#request-a-tow",        label: "Request a tow" },
];

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
    </svg>
  );
}

function Check() {
  return (
    <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
        <path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function CrossBorderTowingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-[76px]">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950 to-navy-900" aria-hidden="true" />
        <div className="relative z-10 container-custom py-12 md:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 text-xs text-slate-400">
                  <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/services" className="hover:text-amber-400 transition-colors">Services</Link></li>
                  <li aria-hidden="true">/</li>
                  <li className="text-amber-400">Cross Border Towing</li>
                </ol>
              </nav>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Canada and U.S. Vehicle Moves</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Cross Border Towing Services
              </h1>
              <p className="text-white/80 text-lg max-w-xl mb-8">
                Need to transport your vehicle across the Canada and United States border? TowingNo.1 helps you
                arrange vehicle transportation with a straightforward process tailored to your pickup location,
                destination, and towing requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact#request-a-tow"
                  className="btn-call-highlight inline-flex items-center justify-center gap-2 rounded-xl py-4 px-8 text-base font-bold w-full sm:w-auto"
                >
                  Request a Tow
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base border border-white/25 transition-all duration-200 w-full sm:w-auto"
                >
                  Contact Us
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Prefer to talk it through? Call{" "}
                <a
                  href="tel:+17788380014"
                  data-call-location="cross_border_hero"
                  className="font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap"
                >
                  (778) 838-0014
                </a>
                .
              </p>
            </div>
            <div className="mt-10 lg:mt-0">
              <Image
                src={HERO_IMAGE}
                alt={HERO_ALT}
                width={1500}
                height={837}
                className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {/* H2: About Cross Border Towing */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">About Cross Border Towing</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Cross border towing gets a vehicle from one side of the Canada and United States border to the
                  other on a tow truck, and it works in either direction. You can ask us about Canada to USA vehicle
                  towing when a car needs to head south, or about USA to Canada vehicle towing when one needs to
                  come back north.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  These trips are usually much longer than a tow across town, so they are planned ahead rather
                  than rushed. Long distance vehicle towing needs a suitable truck, a clear route, and timing that
                  works for you as well as for the crossing. That is why we look at every request on its own
                  details instead of treating every trip the same way.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5">
                  There are two ways to start. Call{" "}
                  <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700 whitespace-nowrap">(778) 838-0014</a>,
                  or fill out the{" "}
                  <Link href="/contact#request-a-tow" className="font-semibold text-amber-600 hover:text-amber-700">request form on our contact page</Link>.
                  The form has separate fields for your pickup location and your destination, so our team can
                  begin planning as soon as your message arrives.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h3 className="font-bold text-navy-900 text-sm mb-2">Towing Is Separate From Border Clearance</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Our part of the trip is towing and transporting your vehicle. Customs declarations, import or
                    export paperwork, inspections, and any other border requirements are separate from the tow
                    itself. Please confirm what applies to your vehicle with the Canada Border Services Agency and
                    U.S. Customs and Border Protection before the trip, so there are no surprises when you reach
                    the border.
                  </p>
                </div>
              </div>

              {/* H2: How Cross Border Towing Works */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">How Cross Border Towing Works</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  Every request moves through the same three steps, so you always know what happens next and
                  nothing is booked without your approval.
                </p>
                <ol className="space-y-5">
                  {steps.map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-amber-400 text-gray-900 font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-bold text-navy-900 text-base mb-1">{item.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* H2: When You May Need Cross Border Towing */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">When You May Need Cross Border Towing</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  People ask about cross border towing for many different reasons. These are some of the most
                  common:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {situations.map((item) => (
                    <div key={item.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 text-sm mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed mt-5">
                  Availability depends on the specific vehicle, the route, and the circumstances of each trip. Our
                  team confirms the details with you before anything is booked, so it is worth asking even if you
                  are unsure whether your situation fits.
                </p>
              </div>

              {/* H2: Information Needed for a Quote */}
              <div>
                <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Information Needed for a Quote</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The more we know at the start, the sooner we can tell you whether a trip can be arranged. Please
                  have these details ready when you call or fill out the form:
                </p>
                <ul className="space-y-3">
                  {quoteDetails.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <Check />
                      <div>
                        <p className="font-bold text-navy-900 text-sm mb-0.5">{item.title}</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official border resources */}
              <OfficialResources
                heading="Official Border Resources"
                intro="Border rules change, so check the current requirements for your vehicle with the official agencies before the trip."
                items={[
                  { href: "https://www.cbsa-asfc.gc.ca/", label: "Canada Border Services Agency (CBSA)", note: "Rules for entering Canada, including bringing in a vehicle" },
                  { href: "https://www.cbp.gov/", label: "U.S. Customs and Border Protection (CBP)", note: "Rules for entering the United States and for vehicle exports" },
                  { href: "https://www.riv.ca/", label: "Registrar of Imported Vehicles (RIV)", note: "The program for vehicles imported into Canada from the United States" },
                ]}
                disclaimer="External links to official border and vehicle import resources. TowingNo.1 is an independent towing company and is not affiliated with these organizations."
              />

              {/* H2: FAQ */}
              <div id="faq-section">
                <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Cross Border Towing FAQs</h2>
                <div className="space-y-4">
                  {faq.map((item) => (
                    <div key={item.q} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h3 className="font-bold text-navy-900 mb-2 text-sm">{item.q}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer links */}
              <div className="text-sm text-slate-600 flex flex-wrap gap-4 pt-4 border-t border-slate-100">
                {footerLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="font-semibold text-amber-600 hover:text-amber-700">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-navy-950 rounded-2xl p-6 text-white sticky top-24">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">Plan Your Trip</p>
                <h3 className="text-xl font-extrabold mb-3">Plan a Cross Border Tow</h3>
                <p className="text-slate-300 text-sm mb-5">
                  Send us the pickup, the destination, and a few details about the vehicle, and we will explain
                  what the trip would involve.
                </p>
                <Link
                  href="/contact#request-a-tow"
                  className="btn-call-highlight flex items-center justify-center gap-2 w-full rounded-xl py-3.5 px-5 text-sm font-bold"
                >
                  Request a Tow
                </Link>
                <a
                  href="tel:+17788380014"
                  data-call-location="cross_border_sidebar"
                  className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl py-3 px-5 text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (778) 838-0014
                </a>
                <ul className="mt-5 space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Canada to U.S. and U.S. to Canada</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Route and vehicle confirmed first</li>
                  <li className="flex items-center gap-2"><span className="text-amber-400" aria-hidden="true">✓</span> Quote to review before booking</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h3 className="font-bold text-navy-900 mb-3 text-sm">Related Services</h3>
                <ul className="space-y-2">
                  {relatedServices.map((s) => (
                    <li key={s.href}>
                      <Link href={s.href} className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                        <ArrowIcon /> {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Ready to plan the trip?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Need Cross Border Towing?
            </h2>
            <p className="text-white/60 mb-10 text-base">
              Share your pickup location and destination with TowingNo.1 to discuss your vehicle transportation
              requirements.
            </p>
            <Link
              href="/contact#request-a-tow"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 px-10 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              Request a Tow
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
