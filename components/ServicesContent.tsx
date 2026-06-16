"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const allServices = [
  {
    id: "emergency-towing",
    img: "/image/Emergency_Towin.png",
    title: "Emergency Towing (24/7 Service)",
    badge: "24/7",
    paras: [
      "When a breakdown or collision leaves you stranded, our emergency tow trucks are dispatched the moment you call. We move cars, SUVs, crossovers, and light trucks on both wheel-lift and flatbed equipment, choosing the right setup for your vehicle so nothing is dragged on its drive wheels or scraped on a low front bumper.",
      "Every emergency call starts with a flat-rate quote before a truck rolls, and our dispatcher stays on the line to confirm your exact location — a highway kilometre marker, the nearest off-ramp, or a mall parkade level. That detail lets the closest driver reach you in well under fifteen minutes across most of the Lower Mainland.",
      "Once we arrive, the driver positions the truck to shield you from passing traffic, secures the vehicle with soft straps or wheel nets, and transports it to the repair shop, dealership, or address of your choice. All-wheel-drive vehicles and EVs ride on the flatbed to protect their drivetrains during transport.",
    ],
    bullets: ["24/7 emergency response", "Safe vehicle transport", "Towing to repair shop or home", "All vehicle types accepted"],
  },
  {
    id: "flat-tire",
    img: "/image/Flat_Tire_Hel.png",
    title: "Flat Tire Help",
    badge: "Fast",
    paras: [
      "A blowout or slow leak does not have to wreck your day. Our roadside technicians come to you with the jack, impact tools, and torque equipment needed to swap your flat for the spare quickly and safely, whether you are on a highway shoulder, in a parkade, or stuck in a driveway with a tire that went down overnight.",
      "If your vehicle has a proper spare, most calls are solved on the spot in minutes. When there is no usable spare — increasingly common on newer cars that ship with a sealant kit instead — we tow you to the nearest open tire shop rather than leaving you parked until morning.",
      "We also check the other three tires and your wheel torque before sending you off, because a flat is often a sign of a pinch, a bent rim, or low pressure across the set. A two-minute inspection can save you from a second call later the same week.",
    ],
    bullets: ["On-site tire changes", "Towing to tire shop if needed", "Professional tire installation", "Quick response time"],
  },
  {
    id: "battery-boost",
    img: "/image/Battery_Boost.png",
    title: "Battery Boost and Jumpstart",
    badge: "Quick",
    paras: [
      "A dead battery is the single most common reason drivers call us, especially after a cold Lower Mainland night or when a car has sat unused in a parkade for a week. We arrive with a professional boost pack, connect it safely to your battery terminals, and have most vehicles started within minutes — no waiting for a passing stranger with cables.",
      "Modern vehicles are sensitive to incorrect jump-starting, and a careless boost can damage delicate electronics or control modules. Our technicians follow the manufacturer-safe procedure for each car, protecting the alternator, ECU, and onboard computers while getting you running again.",
      "After the boost we test the battery and charging system and tell you honestly whether you are good to go or due for a replacement. Knowing your battery is on its way out lets you replace it on your own schedule instead of being stranded again at the worst possible moment.",
    ],
    bullets: ["Quick jumpstart service", "Battery testing available", "Safe boosting procedures", "Available 24/7"],
  },
  {
    id: "accident-recovery",
    img: "/image/Accident_Recover.png",
    title: "Accident Recovery",
    badge: "Expert",
    paras: [
      "A collision is stressful enough without worrying about how your vehicle gets off the road. Our accident recovery crews are trained to work safely around active scenes, clear debris, and load damaged vehicles without causing the secondary damage that careless towing so often adds to an already bad day.",
      "We handle everything from minor fender benders to vehicles with crumpled bodywork, locked wheels, or leaking fluids. Using flatbeds, winches, and proper rigging points, we lift and secure the vehicle so it can be transported to your body shop, ICBC facility, or storage yard intact.",
      "Because insurance paperwork matters after a crash, we document the pickup and destination clearly and can coordinate with your shop or adjuster so the handoff is smooth. Your only job at the scene is to stay safe — we take care of the rest.",
    ],
    bullets: ["Professional accident recovery", "Damaged vehicle transport", "Safe securing techniques", "Insurance coordination available"],
  },
  {
    id: "lockout",
    img: "/image/Lockout_Servic.png",
    title: "Lockout Service",
    badge: "No damage",
    paras: [
      "Locking your keys inside — or having a key fob die while the doors are shut — is frustrating, but it rarely needs a locksmith or a broken window. Our technicians carry professional lockout tools and use no-damage techniques to open most vehicles in minutes without marking the paint, bending the door frame, or cracking the weatherstripping.",
      "We handle traditional keyed locks as well as the transponder fobs and proximity systems on newer cars, and we know the access points that work on common makes sold across BC. If keys are genuinely lost rather than locked inside, we can get you into the vehicle and advise on next steps for a replacement.",
      "Lockouts happen everywhere from grocery lots to underground parkades, so we come equipped for tight clearances and low light. Day or night, we get you back behind the wheel quickly and safely.",
    ],
    bullets: ["Fast lockout response", "No damage to vehicle", "Professional tools and techniques", "Available day or night"],
  },
  {
    id: "vehicle-transport",
    img: "/image/Vehicle_Transpor.png",
    title: "Vehicle Transport",
    badge: "Secure",
    paras: [
      "Not every tow is an emergency. When you need a vehicle moved between locations — a private sale, a move across town, a project car heading to a shop, or a non-runner that needs relocating — we provide scheduled transport with confirmed pickup and delivery windows so you are not left guessing.",
      "Our flatbed transport keeps the vehicle completely off the road during transit, which is the safest option for low-clearance cars, classics, EVs, and anything that cannot be driven onto a trailer under its own power. Soft straps and proper tie-down points protect the bodywork and suspension along the way.",
      "Whether the trip is a few blocks or a longer haul across the province, you get the same upfront flat-rate quote and a professional operator who treats your vehicle as carefully as you would. We confirm the destination details in advance so the drop-off is simple at both ends.",
    ],
    bullets: ["Secure vehicle transport", "On-time pickup and delivery", "Professional tow operators", "Province-wide coverage"],
  },
  {
    id: "fuel-delivery",
    img: "/image/Fuel_Deliver.png",
    title: "Fuel Delivery",
    badge: "Emergency",
    paras: [
      "Running out of fuel on a busy road or far from a station is more common than people admit, and walking to a gas station with a jerry can is neither safe nor convenient on a highway shoulder. We bring enough gasoline or diesel directly to your vehicle to get you moving and on your way to the nearest pump.",
      "Our fuel delivery is a true roadside fix — no tow required in most cases. The technician adds the fuel, helps prime the system if your vehicle stalled completely dry, and confirms it starts and runs before leaving so you are not left stranded a second time a kilometre down the road.",
      "Diesel drivers in particular benefit from a proper delivery, since a fully dry diesel system can need bleeding before it will restart. We carry the right fuel and know how to get both gas and diesel vehicles running again quickly.",
    ],
    bullets: ["Emergency fuel delivery", "Gasoline and diesel available", "Quick roadside service", "Available 24/7"],
  },
  {
    id: "winching",
    img: "/image/Winching_Extractio.png",
    title: "Winching and Extraction",
    badge: "Heavy-duty",
    paras: [
      "When a vehicle slides off the road into a ditch, sinks into mud, or buries its wheels in snow, pulling it out the wrong way can do more damage than the original mishap. Our winch-equipped trucks use proper recovery technique — correct anchor points, controlled tension, and the right angle of pull — to bring your vehicle back onto firm pavement without tearing up the bumper or undercarriage.",
      "Soft shoulders on rural roads, flooded underpasses, and icy switchbacks on the North Shore and Tri-Cities hills are exactly where these calls happen, often in poor weather and fading light. We assess the situation first, set up the recovery safely so the vehicle does not roll or shift, and keep you clear of the work zone while we winch it out.",
      "From a car nosed into a ditch on a Langley farm road to a truck stuck in a snow bank above Coquitlam, our extraction crews carry the equipment and experience to handle it. Once the vehicle is back on solid ground we check that it is driveable, or tow it onward if recovery revealed further damage.",
    ],
    bullets: ["Safe winching techniques", "Mud, snow, and ditch recovery", "Professional equipment", "Minimal vehicle damage"],
  },
];

export default function ServicesContent() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[420px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/service.jpg"
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
              Comprehensive roadside assistance and towing solutions — available 24/7 across the Lower Mainland.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ── Overview / Intro ──────────────────────────────────────── */}
      <section className="pt-20 pb-4 bg-slate-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 mb-3">One call, every roadside problem</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
              Complete Towing &amp; Roadside Assistance for the Lower Mainland
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                TowingNo.1 is a full-service towing and roadside company serving Surrey, Langley, Coquitlam, Burnaby, Richmond, White Rock, Delta, Maple Ridge, Vancouver, and the communities around them. Whatever has gone wrong — a breakdown on Highway 1, a dead battery in a parkade, a flat tire on a quiet side street, or a vehicle nosed into a snowy ditch — there is a single number to call and one team that handles it from start to finish.
              </p>
              <p>
                Every service below is available 24 hours a day, 7 days a week, including statutory holidays and the small hours when most shops are closed. We dispatch the nearest available driver the moment you call, quote a firm flat rate before any truck rolls, and keep our dispatcher on the line so help is already moving while we confirm exactly where you are.
              </p>
              <p>
                Our trucks carry both wheel-lift and flatbed equipment, so we can match the right method to your vehicle — flatbeds for all-wheel-drive cars, electric vehicles, and low-clearance models that should never be dragged on their wheels, and wheel-lift for quick, economical short hops. Every operator is licensed and insured in BC and trained to work safely on live highway shoulders, in tight underground parkades, and on the steep, icy grades that catch drivers off guard each winter.
              </p>
              <p>
                Below you will find the full range of what we do. Each service is designed to get you moving again as quickly and safely as possible — ideally with a roadside fix that avoids a tow altogether, and a careful transport when your vehicle genuinely cannot be driven.
              </p>
            </div>
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
                href="tel:+17788380014"
                className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-4 px-10 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                (778) 838-0014
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
