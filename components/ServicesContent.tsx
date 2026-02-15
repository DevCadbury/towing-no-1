"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesContent() {
  const services = [
    {
      id: "towing",
      title: "Emergency Towing",
      desc: "Fast, reliable towing for all vehicle types available 24/7.",
      longDesc: "We tow cars, SUVs, and light trucks safely at any time of day. Our operators secure your vehicle properly and transport it with care. When your vehicle breaks down unexpectedly, our cheap towing Surrey service provides fast response 24/7.",
      features: ["24/7 emergency response", "Cheap towing Surrey", "Towing to repair shop or home", "All vehicle types accepted"],
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200",
      gradient: "from-fire to-fire-dark",
    },
    {
      id: "roadside",
      title: "Roadside Assistance",
      desc: "Quick help for common roadside problems to keep you moving.",
      longDesc: "We offer quick help for common roadside problems like dead batteries, flat tires, or lockouts to keep you moving. Our Surrey wide towing network ensures we are always nearby to assist you.",
      features: ["Dead battery assistance", "Flat tire help", "Lockout services", "Fast arrival times"],
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      id: "flat-tire",
      title: "Flat Tire Help",
      desc: "On-site tire changes and repairs to get you moving again.",
      longDesc: "We replace or fix flat tires on-site so you can continue driving without delay. Whether you're on the highway or in a parking lot, our team arrives quickly with the tools needed to get you moving again safely.",
      features: ["On-site tire changes", "Towing to tire shop if needed", "Professional tire installation", "Quick response time"],
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      id: "battery",
      title: "Battery Boost & Jumpstart",
      desc: "Instant jumpstarts when your battery fails.",
      longDesc: "If your vehicle won't start, we jump-start it immediately and help you get back on the road. Our technicians safely boost your battery and ensure your vehicle is ready to drive.",
      features: ["Quick jumpstart service", "Battery testing available", "Safe boosting procedures", "Available 24/7"],
      image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200",
      gradient: "from-amber-400 to-amber-600",
    },
    {
      id: "recovery",
      title: "Accident Recovery",
      desc: "Professional recovery for damaged vehicles.",
      longDesc: "We handle accident recovery carefully and transport damaged vehicles safely to the right destination. From minor fender benders to serious collisions, our team has the skills and equipment to recover your vehicle.",
      features: ["Professional accident recovery", "Damaged vehicle transport", "Safe securing techniques", "Insurance coordination available"],
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200",
      gradient: "from-fire-dark to-navy-900",
    },
    {
      id: "lockout",
      title: "Lockout Service",
      desc: "Locked your keys inside? We can open it safely.",
      longDesc: "If you lock your keys inside, our team opens your vehicle safely without causing damage. Our experienced technicians use professional tools and techniques to unlock your vehicle quickly, getting you back inside and on your way.",
      features: ["Fast lockout response", "No damage to vehicle", "Professional tools and techniques", "Available day or night"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
      gradient: "from-navy-700 to-navy-900",
    },
    {
      id: "transport",
      title: "Vehicle Transport",
      desc: "Secure long-distance transport for your vehicle.",
      longDesc: "We move vehicles securely between locations with on-time pickup and delivery by professional tow operators. Whether you're relocating, purchasing a vehicle from another area, or need to transport a non-running vehicle.",
      features: ["Secure vehicle transport", "On-time pickup and delivery", "Professional tow operators", "Province-wide coverage"],
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200",
      gradient: "from-navy-800 to-navy-950",
    },
    {
      id: "fuel",
      title: "Fuel Delivery",
      desc: "Gas or diesel delivered directly to you.",
      longDesc: "If you run out of fuel, we deliver what you need so you can reach the nearest station easily. Our fuel delivery service brings gasoline or diesel directly to your location, getting you back on the road quickly.",
      features: ["Emergency fuel delivery", "Gasoline and diesel available", "Quick roadside service", "Available 24/7"],
      image: "https://images.unsplash.com/photo-1545262810-77515befe149?q=80&w=1200",
      gradient: "from-amber-600 to-amber-700",
    },
    {
      id: "winching",
      title: "Winching & Extraction",
      desc: "Stuck in mud or snow? We'll pull you out.",
      longDesc: "If your vehicle gets stuck in mud, snow, or a ditch, we pull it out safely using proper winching techniques. Our Surrey wide towing team uses professional winching equipment to extract your vehicle without causing damage.",
      features: ["Safe winching techniques", "Mud, snow, and ditch recovery", "Professional equipment", "Minimal vehicle damage"],
      image: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?q=80&w=1200",
      gradient: "from-navy-700 to-navy-800",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-navy-950">
          <Image
            src="https://images.unsplash.com/photo-1545262810-77515befe149?q=80&w=2000"
            alt="Our Services"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 to-navy-950" />
          <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] bg-amber-500/8 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4 block">What We Offer</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
              Comprehensive roadside assistance and towing solutions designed for your peace of mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
            >
              <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-[380px] rounded-2xl overflow-hidden shadow-card-hover group"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${service.gradient} opacity-30 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="absolute bottom-5 left-5">
                    <span className="bg-amber-500 text-navy-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
                      24/7 Available
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${service.gradient} text-white text-sm font-bold`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-slate-400 font-medium tracking-widest text-sm uppercase">Service</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-5 text-navy-900">{service.title}</h2>
                <p className="text-lg text-slate-500 mb-5 leading-relaxed font-light">{service.desc}</p>
                <p className="text-slate-600 mb-7 leading-relaxed">{service.longDesc}</p>

                <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="tel:+16045551234" className="btn-primary inline-flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call for {service.title}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950" />
          <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full" />
        </div>
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Need Any of These Services?
            </h2>
            <p className="text-lg mb-10 text-slate-300 max-w-xl mx-auto">
              We&apos;re standing by with a fleet of trucks ready to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+16045551234" className="btn-primary text-lg py-4 px-10 inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (604) 555-1234
              </a>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white/15 hover:bg-amber-500 hover:text-navy-900 hover:border-amber-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-500"
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
