"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Counter from "@/components/Counter";
import CallDialog from "@/components/CallDialog";
import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const services = [
  {
    src: "/image/Emergency_Towin.png",
    alt: "Emergency towing service Surrey — TowingNo.1 tow truck loading a car",
    title: "Emergency Towing",
    desc: "24/7 towing for cars, SUVs, and light trucks across Surrey and the Lower Mainland. Fast response, safe transport.",
    href: "/services/emergency-towing",
  },
  {
    src: "/image/Flat_Tire_Hel.png",
    alt: "Flat tire roadside assistance Surrey — technician changing a tire",
    title: "Flat Tire Help",
    desc: "On-site tire change or tow to the nearest shop — back on the road fast.",
    href: "/services/flat-tire-help",
  },
  {
    src: "/image/Battery_Boost.png",
    alt: "Battery boost jump-start service Surrey — dead car battery",
    title: "Battery Boost",
    desc: "Dead battery? We jump-start your vehicle on the spot, any time of day.",
    href: "/services/battery-boost",
  },
  {
    src: "/image/Accident_Recover.png",
    alt: "Accident recovery towing Surrey — damaged vehicle being loaded",
    title: "Accident Recovery",
    desc: "Careful recovery and transport of damaged vehicles from any collision scene.",
    href: "/services/accident-recovery",
  },
  {
    src: "/image/Lockout_Servic.png",
    alt: "Car lockout service Surrey — keys locked inside vehicle",
    title: "Lockout Service",
    desc: "Locked your keys inside? Our team opens your vehicle safely and quickly.",
    href: "/services/lockout-service",
  },
  {
    src: "/image/Vehicle_Transpor.png",
    alt: "Vehicle transport service Lower Mainland — car on flatbed truck",
    title: "Vehicle Transport",
    desc: "Secure, on-time vehicle moves between locations across the Lower Mainland.",
    href: "/services/vehicle-transport",
  },
  {
    src: "/image/Fuel_Deliver.png",
    alt: "Fuel delivery roadside service Surrey — emergency gas delivery",
    title: "Fuel Delivery",
    desc: "Run out of fuel? We deliver enough to get you to the nearest station.",
    href: "/services/fuel-delivery",
  },
  {
    src: "/image/Winching_Extractio.png",
    alt: "Winching and extraction service BC — vehicle stuck in ditch being pulled out",
    title: "Winching & Extraction",
    desc: "Stuck in mud, snow, or a ditch? We pull your vehicle out safely.",
    href: "/services/winching-extraction",
  },
];

const featuredAreas = [
  { href: "/locations/surrey", title: "Tow Truck Surrey", subtitle: "Fast 24/7 dispatch across all Surrey neighbourhoods" },
  { href: "/locations/langley", title: "Towing Langley", subtitle: "Emergency and scheduled towing support" },
  { href: "/locations/coquitlam", title: "Coquitlam Tow Truck", subtitle: "Roadside help and local recovery" },
  { href: "/locations/burnaby", title: "Burnaby Towing", subtitle: "Battery, lockout, and tow assistance" },
  { href: "/locations/richmond", title: "Richmond Tow Service", subtitle: "Rapid response for breakdowns" },
  { href: "/locations/white-rock", title: "White Rock Towing", subtitle: "24/7 roadside and towing support" },
  { href: "/locations/delta", title: "Delta Tow Truck", subtitle: "Ladner, Tsawwassen & North Delta" },
  { href: "/locations/maple-ridge", title: "Maple Ridge Towing", subtitle: "Fast dispatch across Maple Ridge & Pitt Meadows" },
  { href: "/locations/vancouver", title: "Vancouver Towing", subtitle: "Downtown, Kitsilano & East Van" },
];

const howItWorks = [
  {
    step: "1",
    title: "Call or Request Online",
    desc: "Call (778) 838-0014 or submit a request online. We answer 24/7 — including nights, weekends, and holidays.",
  },
  {
    step: "2",
    title: "Get an Upfront Quote",
    desc: "We give you a firm flat-rate price before dispatch. No hidden fees, no surprises when the driver arrives.",
  },
  {
    step: "3",
    title: "We Arrive in Under 15 Min",
    desc: "The nearest available driver is dispatched immediately. Average arrival time across Surrey is under 15 minutes.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function trackCallClick(location: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "call_dialog_open", {
      event_category: "engagement",
      event_label: location,
    });
  }
}

export default function HomeContent() {
  const [callOpen, setCallOpen] = useState(false);

  function openCall(location: string) {
    trackCallClick(location);
    setCallOpen(true);
  }

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative bg-navy-950" aria-label="Hero">
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/background_home.png"
            alt="TowingNo.1 tow truck responding to an emergency call in Surrey BC"
            fill
            className="object-cover object-[center_60%]"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-950/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/40 to-navy-950/10" />
        </div>

        <div className="relative z-10 md:min-h-screen md:flex md:items-center">
          <div className="w-full container-custom px-4 sm:px-6 lg:px-8 pt-28 pb-0 md:pt-[76px] md:pb-0 flex flex-col items-center text-center md:items-start md:text-left">
            <div className="max-w-2xl w-full">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-amber-400 mb-6 border border-amber-400/30 rounded-full px-4 py-1.5"
              >
                BC · Serving the Lower Mainland Since 2010
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.06] tracking-tight mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.75)]"
              >
                24/7 Tow Truck{" "}
                <span className="text-amber-400 [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">Surrey &amp; Lower Mainland</span>
                <br />Emergency Help in Under 15 Min
              </motion.h1>

              <motion.p
                id="hero-summary"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="text-base md:text-xl text-white/90 mb-10 max-w-xl leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]"
              >
                Need a tow truck near you in Surrey or anywhere in the Lower Mainland? Call now for immediate dispatch, upfront flat-rate pricing, and a free quote in under 60 seconds. Licensed &amp; insured since 2010.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.44 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => openCall("hero")}
                  className="btn-call-highlight inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-base"
                  aria-label="Call TowingNo.1 for a free quote"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0" aria-hidden="true">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  Call Now — Free Quote in 60 Sec
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-base border border-white/25 transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
                >
                  Get a Quote Online
                </Link>
              </motion.div>

              <p className="mt-4 text-xs md:text-sm text-amber-100/95 font-semibold tracking-wide">
                Talk to dispatch now. Upfront price. ETA in under 60 seconds.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.62 }}
                className="mt-10 grid grid-cols-2 sm:flex sm:flex-wrap gap-x-8 gap-y-3 text-white text-sm font-semibold [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
                  &lt;15 min response
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
                  Licensed &amp; insured
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/></svg>
                  Flat-rate pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
                  All vehicle types
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.72 }}
                className="relative w-full aspect-[16/9] mt-8 md:hidden rounded-2xl overflow-hidden"
              >
                <Image
                  src="/background_home.png"
                  alt="TowingNo.1 tow truck on the road in Surrey BC"
                  fill
                  className="object-cover object-center"
                  priority
                  quality={90}
                  sizes="100vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="h-8 md:hidden" />
      </section>

      {/* ── How It Works ───────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-100" aria-label="How it works">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Simple process</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">From your call to our arrival — here&apos;s what to expect.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-amber-400 text-gray-900 font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Pricing teaser */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 text-center"
          >
            <p className="text-sm font-semibold text-amber-800 leading-relaxed">
              <svg className="w-4 h-4 text-amber-600 inline-block align-middle mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/></svg>
              <strong>Flat-rate pricing</strong> — no hidden fees, no meter running. Call{" "}
              <a href="tel:+17788380014" className="underline hover:text-amber-900 whitespace-nowrap">(778) 838-0014</a>{" "}
              for an instant quote before we dispatch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────── */}
      <section className="pt-16 pb-24 bg-slate-50" aria-label="Our services">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">What we do</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                Full-Service Towing &amp;<br className="hidden md:block" /> Roadside Assistance
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-amber-500 transition-colors group shrink-0"
              >
                View all services
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-400/60 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                <div className="relative h-52 overflow-hidden shrink-0 bg-slate-100">
                  <Image
                    src={svc.src}
                    alt={svc.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-amber-400 text-gray-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      24/7
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-1.5 leading-snug">{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{svc.desc}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={svc.href}
                      className="text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors inline-flex items-center gap-1 group/link"
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true">
                        <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ──────────────────────────────────────────── */}
      <section className="py-20 bg-white border-y border-slate-100" aria-label="Why choose TowingNo.1">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Why us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Trusted Across the Lower Mainland Since 2010
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {(
              [
              { stat: "24/7", label: "Always Available", sub: "Round-the-clock, every day of the year including holidays", delay: 0.1 },
              { stat: null, label: "Fast Response", sub: "Average response time under 15 minutes across Surrey", delay: 0.2, counter: true, value: 15, suffix: " min" },
              { stat: null, label: "Years Experience", sub: "Serving BC communities since 2010", delay: 0.3, counter: true, value: 15, suffix: "+" },
              { stat: "4.9", label: "Customer Rating", sub: "Flat-rate pricing, licensed & insured, no hidden fees", delay: 0.4, isStar: true },
              ] as Array<{ stat: string | null; label: string; sub: string; delay: number; counter?: boolean; value?: number; suffix?: string; isStar?: boolean }>
            ).map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: item.delay }}
                className="text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-3 tabular-nums">
                  {item.counter ? (
                    <>&lt;<Counter value={item.value!} duration={2} suffix={item.suffix} /></>
                  ) : item.isStar ? (
                    <span className="flex items-center justify-center gap-1">
                      {item.stat}
                      <svg className="w-8 h-8 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd"/></svg>
                    </span>
                  ) : (
                    item.stat
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 flex flex-wrap justify-center gap-4"
          >
            {[
              { label: "Licensed & Insured in BC" },
              { label: "Flatbed & Wheel-Lift Trucks" },
              { label: "EV-Friendly Towing" },
              { label: "Free Quote Before Dispatch" },
              { label: "No Hidden Fees" },
            ].map((badge) => (
              <span key={badge.label} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-4 py-2">
                <svg className="w-3.5 h-3.5 text-amber-500 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd"/>
                </svg>
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Service Areas ───────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50" aria-label="Service areas">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Where we operate</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
              Tow Truck Service Areas Across the Lower Mainland
            </h2>
            <p className="text-slate-600 max-w-3xl leading-relaxed">
              Looking for towing near you? We cover Surrey, Langley, Coquitlam, Burnaby, Richmond, White Rock, Delta, Maple Ridge, Vancouver, and surrounding communities — all with 24/7 dispatch.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredAreas.map((area, i) => (
              <motion.div
                key={area.href}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link
                  href={area.href}
                  className="group block bg-white border border-slate-200 rounded-2xl p-5 hover:border-amber-400/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-amber-600 transition-colors mb-1">
                    {area.title}
                  </h3>
                  <p className="text-sm text-slate-600">{area.subtitle}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              View all service areas
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials carousel ──────────────────────────────────── */}
      <TestimonialsCarousel />
      {/* ── FAQ ───────────────────────────────────────────────── */}
      <FaqSection openCall={() => openCall("faq")} />
      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-900" aria-label="Call to action">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Stranded? We Dispatch in Under 15 Minutes.
            </h2>
            <p className="text-white/60 mb-10 text-base">
              Available 24 hours a day, 7 days a week — including all holidays.
            </p>
            <button
              onClick={() => openCall("bottom-cta")}
              className="btn-call-highlight inline-flex items-center justify-center gap-2 py-4 px-10 rounded-xl text-base"
              aria-label="Call TowingNo.1 for emergency towing"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              Call Now — Free Quote in 60 Sec
            </button>
          </motion.div>
        </div>
      </section>
      <CallDialog open={callOpen} onClose={() => setCallOpen(false)} />
    </>
  );
}

/* ─── Testimonials carousel ──────────────────────────────────── */
const testimonials = [
  { body: "Called TowingNo.1 at 2 AM when my car broke down on the highway. They arrived in 20 minutes and had me home safely. Excellent service!", name: "Sarah M.", title: "Verified Customer — Surrey" },
  { body: "Professional, friendly, and fast. The driver took great care of my vehicle. Will definitely use them again if needed.", name: "Michael T.", title: "Verified Customer — Langley" },
  { body: "Best towing company around! Fair prices and they really care about helping people. Highly recommend.", name: "Jennifer L.", title: "Verified Customer — Burnaby" },
  { body: "Got a flat tire on the highway at rush hour. They were there in under 25 minutes and had me on my way. Unbelievable response time!", name: "David K.", title: "Verified Customer — Surrey" },
  { body: "Locked my keys in the car at the mall. They opened it in minutes without any damage. Friendly and professional — saved my day!", name: "Lisa R.", title: "Verified Customer — Richmond" },
  { body: "Needed a battery boost early in the morning before work. Quick, easy, and priced fairly. Definitely calling them again.", name: "Tom W.", title: "Verified Customer — Coquitlam" },
  { body: "Had my car stuck in a ditch after a snowstorm. The team pulled it out carefully and got me moving again. Truly lifesavers!", name: "Amanda P.", title: "Verified Customer — White Rock" },
];

function TestimonialsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden" aria-label="Customer reviews">
      <div className="container-custom mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Reviews</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-slate-500 text-sm">4.9 ★ average rating · 127+ verified reviews</p>
        </motion.div>
      </div>

      <div
        className="relative flex w-full select-none"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setActiveCard(null); }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => { setIsPaused(false); setActiveCard(null); }, 1800)}
        aria-label="Customer testimonials carousel"
      >
        <div
          className="flex gap-5"
          style={{
            animation: "marquee 38s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
              className={`w-[300px] sm:w-[340px] shrink-0 bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.07)] flex flex-col cursor-pointer transition-all duration-200 ${
                activeCard === i
                  ? "border-2 border-amber-400 shadow-[0_8px_32px_rgba(251,191,36,0.18)] -translate-y-1"
                  : "border-2 border-slate-100 hover:border-amber-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              }`}
              role="article"
              aria-label={`Review by ${t.name}`}
            >
              <div className="flex gap-0.5 mb-4" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">&ldquo;{t.body}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 font-bold text-sm shrink-0" aria-hidden="true">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm leading-none">{t.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ accordion ───────────────────────────────────────── */
const faqs = [
  {
    q: "How quickly can you reach me?",
    a: "Our average response time is under 15 minutes across Surrey and the Lower Mainland. We dispatch the closest available driver the moment you call — day or night, weekends and holidays included.",
  },
  {
    q: "How much does towing cost in Surrey?",
    a: "We use flat-rate pricing with no hidden fees. The cost depends on vehicle type and distance. Call (778) 838-0014 for an instant quote — we give you a firm price before we dispatch.",
  },
  {
    q: "Do you tow all types of vehicles?",
    a: "Yes. We tow cars, SUVs, pickup trucks, motorcycles, electric vehicles, and light commercial vehicles. EVs must be transported on a flatbed — we have flatbed trucks available 24/7.",
  },
  {
    q: "What areas do you cover?",
    a: "We serve all of the Lower Mainland including Surrey, Langley, Burnaby, Richmond, Coquitlam, White Rock, Delta, Maple Ridge, Vancouver, and surrounding communities.",
  },
  {
    q: "Can you help if I'm locked out of my car?",
    a: "Absolutely. Our lockout service gets you back in your vehicle safely without causing damage to the lock or door. We arrive fast and handle all makes and models.",
  },
  {
    q: "Do you offer roadside assistance without towing?",
    a: "Yes — if your issue can be solved on the spot (flat tire, dead battery, out of fuel, locked out) we fix it right there. Towing is only arranged when the vehicle truly can't be driven.",
  },
  {
    q: "Are you available on holidays and weekends?",
    a: "We operate 24 hours a day, 7 days a week, including all statutory holidays. Emergencies don't follow business hours, and neither do we.",
  },
  {
    q: "Is my vehicle insured while being towed?",
    a: "We are fully licensed and insured in BC. Your vehicle is handled with professional care using proper equipment throughout every tow.",
  },
];

interface FaqSectionProps {
  openCall: () => void;
}

function FaqSection({ openCall }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white" id="faq-section" aria-label="Frequently asked questions">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">Got questions?</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
              Everything you need to know about our towing and roadside services in Surrey and the Lower Mainland.
            </p>
          </motion.div>

          <div className="flex flex-col divide-y divide-slate-100">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-16px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-amber-500" : "text-gray-900 group-hover:text-amber-500"
                    }`}>
                      {faq.q}
                    </span>
                    <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? "bg-amber-400 border-amber-400 text-gray-900"
                        : "border-slate-200 text-slate-400 group-hover:border-amber-400 group-hover:text-amber-500"
                    }`} aria-hidden="true">
                      <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"
                      >
                        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                      </motion.svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-[14.5px] text-gray-500 leading-relaxed pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 bg-slate-50 rounded-2xl px-6 py-5 border border-slate-100"
          >
            <p className="text-sm text-gray-600 flex-1">Still have a question? We&apos;re available 24/7 and happy to help.</p>
            <button
              onClick={openCall}
              className="btn-call-highlight shrink-0 inline-flex items-center gap-2 text-sm py-2.5 px-5 rounded-xl"
              aria-label="Call TowingNo.1 for help"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd" />
              </svg>
              Call Now — Free Quote
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
