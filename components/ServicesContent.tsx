"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const allServices = [
  {
    id: "emergency-towing",
    img: "/image/Emergency_Towing.png",
    title: "Emergency Towing (24/7 Service)",
    badge: "24/7",
    paras: [
      "We tow cars, SUVs, and light trucks safely at any time of day. Our operators secure your vehicle properly and transport it with care.",
      "When your vehicle breaks down unexpectedly, our towing service provides fast response 24/7, ensuring your vehicle is transported safely to your destination of choice.",
    ],
    bullets: ["24/7 emergency response", "Safe vehicle transport", "Towing to repair shop or home", "All vehicle types accepted"],
  },
  {
    id: "flat-tire",
    img: "/image/Flat_Tire_Help.png",
    title: "Flat Tire Help",
    badge: "Fast",
    paras: [
      "We replace or fix flat tires on-site so you can continue driving without delay.",
      "Whether you're on the highway or in a parking lot, our team arrives quickly with the tools needed to get you moving again safely.",
    ],
    bullets: ["On-site tire changes", "Towing to tire shop if needed", "Professional tire installation", "Quick response time"],
  },
  {
    id: "battery-boost",
    img: "/image/Battery_Boost .png",
    title: "Battery Boost and Jumpstart",
    badge: "Quick",
    paras: [
      "If your vehicle won't start, we jump-start it immediately and help you get back on the road.",
      "Our technicians safely boost your battery and ensure your vehicle is ready to drive. We also test your battery and charging system.",
    ],
    bullets: ["Quick jumpstart service", "Battery testing available", "Safe boosting procedures", "Available 24/7"],
  },
  {
    id: "accident-recovery",
    img: "/image/Accident_Recovery.png",
    title: "Accident Recovery",
    badge: "Expert",
    paras: [
      "We handle accident recovery carefully and transport damaged vehicles safely to the right destination.",
      "From minor fender benders to serious collisions, our team has the skills and equipment to recover your vehicle securely without causing additional damage.",
    ],
    bullets: ["Professional accident recovery", "Damaged vehicle transport", "Safe securing techniques", "Insurance coordination available"],
  },
  {
    id: "lockout",
    img: "/image/Lockout_Service.png",
    title: "Lockout Service",
    badge: "No damage",
    paras: [
      "If you lock your keys inside, our team opens your vehicle safely without causing damage.",
      "Our experienced technicians use professional tools and techniques to unlock your vehicle quickly.",
    ],
    bullets: ["Fast lockout response", "No damage to vehicle", "Professional tools and techniques", "Available day or night"],
  },
  {
    id: "vehicle-transport",
    img: "/image/Vehicle_Transport.png",
    title: "Vehicle Transport",
    badge: "Secure",
    paras: [
      "We move vehicles securely between locations with on-time pickup and delivery by professional tow operators.",
      "Whether you're relocating or need to transport a non-running vehicle across the province, we provide reliable transportation for any distance.",
    ],
    bullets: ["Secure vehicle transport", "On-time pickup and delivery", "Professional tow operators", "Province-wide coverage"],
  },
  {
    id: "fuel-delivery",
    img: "/image/Fuel_Delivery.png",
    title: "Fuel Delivery",
    badge: "Emergency",
    paras: [
      "If you run out of fuel, we deliver what you need so you can reach the nearest station easily.",
      "Our fuel delivery service brings gasoline or diesel directly to your location, getting you back on the road quickly without the need for a tow.",
    ],
    bullets: ["Emergency fuel delivery", "Gasoline and diesel available", "Quick roadside service", "Available 24/7"],
  },
  {
    id: "winching",
    img: "/image/Winching_Extraction.png",
    title: "Winching and Extraction",
    badge: "Heavy-duty",
    paras: [
      "If your vehicle gets stuck in mud, snow, or a ditch, we pull it out safely using proper winching techniques.",
      "Our team uses professional winching equipment to extract your vehicle from challenging situations without damage.",
    ],
    bullets: ["Safe winching techniques", "Mud, snow, and ditch recovery", "Professional equipment", "Minimal vehicle damage"],
  },
  {
    id: "roadside-assistance",
    img: "/image/Roadside_Assistance.png",
    title: "General Roadside Assistance",
    badge: "All-in-one",
    paras: [
      "Comprehensive roadside help for situations that don't fit a single category. Our team handles it all, fast.",
      "From minor mechanical issues to unexpected breakdowns, we dispatch the right crew with the right equipment.",
    ],
    bullets: ["Wide range of roadside help", "Certified technicians", "Fast dispatch citywide", "Available 24/7"],
  },
];

export default function ServicesContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[420px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/image/Emergency_Towing.png"
          alt="Our Services"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 container-custom">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">What we offer</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
              Our Services
            </h1>
            <p className="text-white/85 text-lg md:text-xl max-w-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              Comprehensive roadside assistance and towing solutions — available 24/7 across Surrey and the Lower Mainland.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ── Services List ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="space-y-14">
            {allServices.map((svc, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={svc.id}
                  id={svc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className={`grid md:grid-cols-2 ${isEven ? "" : "md:[&>*:first-child]:order-2"}`}>
                    {/* Image panel */}
                    <div className="relative h-72 md:h-auto min-h-[320px] overflow-hidden group bg-slate-100">
                      <Image
                        src={svc.img}
                        alt={svc.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                      {/* Clean dark scrim for badge legibility */}
                      <div className="absolute inset-0 bg-black/20" />
                      <span className="absolute top-4 left-4 inline-block bg-amber-400 text-gray-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {svc.badge}
                      </span>
                    </div>

                    {/* Text panel */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {svc.title}
                      </h2>
                      {svc.paras.map((p, pi) => (
                        <p key={pi} className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 last:mb-0">
                          {p}
                        </p>
                      ))}
                      <ul className="mt-5 space-y-2">
                        {svc.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                                <path d="M2 6l3 3 5-5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl mx-auto text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">Ready when you are</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Need Any of These Services?
            </h2>
            <p className="text-white/60 mb-10 text-base">
              We're dispatching 24/7 — including nights, weekends, and holidays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+16045551234"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 px-10 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                Call (604) 555-1234
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-xl text-base border border-white/25 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
