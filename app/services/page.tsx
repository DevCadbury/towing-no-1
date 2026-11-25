import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { isVerified, serviceArea } from "@/lib/business-facts";

// Register F-06 VERIFIED: the 15 owner-confirmed places, read from the single
// source in lib/business-facts.ts (A-227).
const serviceAreaNames = serviceArea.filter(isVerified).map((p) => p.value);
const serviceAreaList = `${serviceAreaNames.slice(0, -1).join(", ")} and ${serviceAreaNames[serviceAreaNames.length - 1]}`;

export const metadata: Metadata = {
  title: "Towing & Roadside Services Surrey BC | 24/7",
  description:
    "Towing and roadside help in Surrey, BC: emergency towing, battery boost, flat tire, lockout, fuel delivery, and winching. 24/7 dispatch at (778) 838-0014.",
  alternates: {
    canonical: "https://www.towingno1.com/services",
  },
  openGraph: {
    type: "website",
    url: "https://www.towingno1.com/services",
    title: "Towing & Roadside Services Surrey BC | 24/7",
    description:
      "24/7 towing and roadside assistance from TowingNo.1 in Surrey, BC. Call (778) 838-0014 any time, day or night.",
    locale: "en_CA",
    images: [
      {
        url: "https://www.towingno1.com/preview.jpg",
        width: 1200,
        height: 630,
        alt: "TowingNo.1 | Towing & Roadside Assistance in BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Towing & Roadside Services Surrey BC | 24/7",
    description:
      "24/7 towing and roadside assistance from TowingNo.1 in Surrey, BC. Call (778) 838-0014 any time, day or night.",
    images: ["https://www.towingno1.com/preview.jpg"],
  },
};

// The ItemList of 10 Service nodes (servicesSchema) was removed: every item
// asserted a service (register F-07, F-14 UNVERIFIED), an areaServed (F-06
// UNVERIFIED) and "Lower Mainland" wording, and an ItemList of plain links
// has no Google search feature. Only VERIFIED facts may appear in JSON-LD
// (D-013, D-016, D-063; ACTION-PLAN A-004, A-005). The visible page is unchanged.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.towingno1.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.towingno1.com/services" },
  ],
};

const allServices = [
  {
    id: "emergency-towing",
    href: "/services/emergency-towing",
    img: "/image/Emergency_Towin.png",
    alt: "Emergency towing service in Surrey: TowingNo.1 tow truck loading a car",
    title: "Emergency Towing",
    badge: "24/7",
    desc: "Light-duty wheel-lift towing for breakdowns, collisions, and stalled vehicles.",
    bullets: ["Nearest available driver", "Light-duty wheel-lift towing", "Cars, SUVs and light trucks", "Tow to the destination you choose"],
  },
  {
    id: "flat-tire",
    href: "/services/flat-tire-help",
    img: "/image/Flat_Tire_Hel.png",
    alt: "Flat tire roadside assistance in Surrey: technician changing a tire",
    title: "Flat Tire Help",
    badge: "Fast",
    desc: "Spare tire installation on site or a tow to the nearest tire shop. We respond to flat tires on highways and parking lots across the Lower Mainland.",
    bullets: ["Spare tire installed on site", "Tow to tire shop if needed", "Highway & parking lot response", "Cars, SUVs, and light trucks"],
  },
  {
    id: "battery-boost",
    href: "/services/battery-boost",
    img: "/image/Battery_Boost.png",
    alt: "Battery boost and jump start service in Surrey for a dead car battery",
    title: "Battery Boost",
    badge: "Quick",
    desc: "Professional jump start service across Surrey and the Lower Mainland, with a tow to a shop if the vehicle still won't start.",
    bullets: ["Professional jump start", "Tow if it still won't start", "Safe boosting procedures", "Available 24/7"],
  },
  {
    id: "roadside-assistance",
    href: "/services/roadside-assistance",
    img: "/image/Battery_Boost.png",
    alt: "Roadside assistance service: technician helping a stranded driver",
    title: "Roadside Assistance",
    badge: "On the spot",
    desc: "Battery boost, flat tire help, lockout service, fuel delivery, and breakdown support. We fix the problem on the spot when possible.",
    bullets: ["Battery boost & jump start", "Flat tire & lockout service", "Fuel delivery", "Towing when needed"],
  },
  {
    id: "accident-recovery",
    href: "/services/accident-recovery",
    img: "/image/Accident_Recover.png",
    alt: "Accident recovery towing in Surrey: damaged vehicle being loaded on a truck",
    title: "Accident Recovery",
    badge: "Collision",
    desc: "Professional collision scene handling and safe transport of damaged vehicles to the repair shop, home or storage facility you choose.",
    bullets: ["Professional recovery driver", "Damaged vehicle transport", "Safe securing techniques", "Tow bill provided for your records"],
  },
  {
    id: "lockout",
    href: "/services/lockout-service",
    img: "/image/Lockout_Servic.png",
    alt: "Car lockout service in Surrey: keys locked inside the vehicle",
    title: "Lockout Service",
    badge: "Damage-free",
    desc: "We guarantee damage-free lockout service. Careful entry techniques protect the lock, door, and window when you are locked out. Available 24/7.",
    bullets: ["Damage-free lockout guarantee", "Careful entry techniques", "Keys locked in the car or trunk", "Available day or night"],
  },
  {
    id: "vehicle-transport",
    href: "/services/vehicle-transport",
    img: "/image/Vehicle_Transpor.png",
    alt: "Vehicle transport service in the Lower Mainland: car on a truck",
    title: "Vehicle Transport",
    badge: "Secure",
    desc: "Vehicle transport across Surrey and the Lower Mainland, and long-distance towing within BC, for vehicles that run and vehicles that don't, by light-duty wheel-lift tow.",
    bullets: ["Light-duty wheel-lift towing", "Vehicles that run or don't", "Pickup and delivery addresses you choose", "Call to arrange the move"],
  },
  {
    id: "fuel-delivery",
    href: "/services/fuel-delivery",
    img: "/image/Fuel_Deliver.png",
    alt: "Emergency fuel delivery service in Surrey: gas delivered to a stranded vehicle",
    title: "Fuel Delivery",
    badge: "Emergency",
    desc: "Run out of gas? We deliver gasoline or diesel directly to your location so you can reach the nearest station.",
    bullets: ["Gasoline & diesel available", "Highway & roadside delivery", "Available 24/7"],
  },
  {
    id: "winching",
    href: "/services/winching-extraction",
    img: "/image/Winching_Extractio.png",
    alt: "Winching and extraction service in BC: vehicle stuck in a ditch being pulled out",
    title: "Winching & Extraction",
    badge: "Recovery",
    desc: "Professional winching and extraction for vehicles stuck in ditches, mud, snow, or off road. We pull your vehicle out with a controlled, careful recovery.",
    bullets: ["Safe winching techniques", "Ditch, mud & snow recovery", "Off-road and roadside recovery", "Controlled, careful recovery"],
  },
  {
    id: "cross-border-towing",
    href: "/services/cross-border-towing",
    img: "/image/cross_border_towing.jpeg",
    alt: "TowingNo.1 tow truck towing a car on the highway near the Canada and U.S. border crossing",
    title: "Cross Border Towing",
    badge: "Canada & U.S.",
    desc: "Towing and vehicle transportation between Canada and the United States. Share your pickup and destination, and our team confirms the route, vehicle, and quote before anything is booked.",
    bullets: ["Canada to U.S. and U.S. to Canada requests", "Route and vehicle confirmed first", "Quote to review before booking", "Border paperwork stays separate from the tow"],
  },
  {
    id: "underground-parking-towing",
    href: "/services/underground-parking-towing",
    img: "/preview.jpg",
    alt: "TowingNo.1 wheel-lift tow truck towing a black SUV on a road",
    title: "Underground Parking Towing",
    badge: "Low clearance",
    desc: "Stuck in an underground parkade? We specialize in it. Our tow truck has a low clearance height, so it can reach most low-clearance parkades and parking garages where standard tow trucks can't fit.",
    bullets: ["Underground parkades & parking garages", "Low-clearance tow truck", "Cars, SUVs and light trucks", "Tow to the destination you choose"],
  },
];

export default function Services() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden text-white pt-[76px]">
        <Image src="/service.jpg" alt="TowingNo.1 towing and roadside assistance services in Surrey BC" fill className="object-cover object-center" loading="eager" fetchPriority="high" sizes="100vw" />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 container-custom py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-amber-400">Services</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">What we offer</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
            Towing &amp; Roadside Assistance Services in Surrey, BC
          </h1>
          <p className="text-white/85 text-lg md:text-xl max-w-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            Comprehensive towing and roadside solutions, available 24/7 across Surrey and the Lower Mainland.
          </p>
        </div>
      </section>

      {/* Pricing teaser */}
      <div className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="container-custom text-center">
          <p className="text-sm font-semibold text-amber-800 leading-relaxed">
            <svg className="w-4 h-4 text-amber-600 inline-block align-middle mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/></svg>
            <strong>A flat rate quote wherever possible</strong>, based on the location, vehicle, and service you describe. Call{" "}
            <a href="tel:+17788380014" className="underline hover:text-amber-900 whitespace-nowrap">(778) 838-0014</a>{" "}
            and ask for a quote before we dispatch.
          </p>
        </div>
      </div>

      {/* Overview / Intro */}
      <section className="pt-16 pb-4 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">One call, every roadside problem</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              Complete Towing &amp; Roadside Assistance for the Lower Mainland
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                TowingNo.1 brings every roadside service under one phone number for drivers in {serviceAreaList}. Whether your car has died in a parkade, you have a flat on a highway shoulder, or your vehicle has slid into a ditch on a back road, the same local team handles the call from the first ring to the moment you are moving again.
              </p>
              <p>
                Each service listed below is available 24 hours a day, 7 days a week, including statutory holidays and overnight hours when most shops are closed. We dispatch the nearest available driver; arrival times vary by location and road conditions. Wherever possible we give you a flat rate quote before we dispatch, based on the location, vehicle, and service you describe, and the driver explains any change before going ahead if conditions on site differ materially.
              </p>
              <p>
                We provide light-duty wheel-lift towing for cars, SUVs and light trucks. Our tow truck has a low clearance height, so it can reach most low-clearance parkades and parking garages where standard tow trucks can&apos;t fit. Many all wheel drive cars and electric vehicles should not be towed with any wheels on the road, so tell the dispatcher your vehicle&apos;s make, drive type and condition when you call. Those details help the driver plan the tow for a highway shoulder, a tight underground parkade, or an icy grade.
              </p>
              <p>
                Wherever possible we aim to fix the problem on the spot with a boost, a tire change, a lockout, or a splash of fuel, so you avoid a tow altogether. When your vehicle genuinely cannot be driven, we transport it carefully to the shop, dealership, or address you choose. Explore the full range of services below, or call <a href="tel:+17788380014" className="font-semibold text-amber-600 hover:text-amber-700">(778) 838-0014</a> and tell us what has gone wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="space-y-14">
            {allServices.map((svc, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className={`grid md:grid-cols-2 ${isEven ? "" : "md:[&>*:first-child]:order-2"}`}>
                    <div className="relative h-72 md:h-auto min-h-[320px] overflow-hidden group bg-slate-100">
                      <Image src={svc.img} alt={svc.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute top-4 left-4 inline-block bg-amber-400 text-gray-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {svc.badge}
                      </span>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">{svc.title}</h2>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">{svc.desc}</p>
                      <ul className="space-y-2 mb-6">
                        {svc.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0" aria-hidden="true">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                                <path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link href={svc.href} className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
                        Learn more about {svc.title}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Ready when you are</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Need Any of These Services?
            </h2>
            <p className="text-white/60 mb-10 text-base">
              We&apos;re dispatching 24/7, including nights, weekends and statutory holidays. Free quote wherever possible, before dispatch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+17788380014" className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 px-10 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                (778) 838-0014
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-xl text-base border border-white/25 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
