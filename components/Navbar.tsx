"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const serviceItems = [
  { href: "/services#emergency-towing",   label: "Emergency Towing",     desc: "24/7 fast response, any time" },
  { href: "/services#flat-tire",          label: "Flat Tire Help",        desc: "On-site change or tow-in" },
  { href: "/services#battery-boost",      label: "Battery Boost",         desc: "Jump-start in minutes" },
  { href: "/services#accident-recovery",  label: "Accident Recovery",     desc: "Careful collision towing" },
  { href: "/services#lockout",            label: "Lockout Service",       desc: "Keys locked inside? We help" },
  { href: "/services#vehicle-transport",  label: "Vehicle Transport",     desc: "Secure inter-city moves" },
  { href: "/services#fuel-delivery",      label: "Fuel Delivery",         desc: "Emergency fuel drop-off" },
  { href: "/services#winching",           label: "Winching & Extraction", desc: "Stuck in mud, snow, or ditch" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "/";

  return (
    <nav className="fixed w-full z-50 bg-[#0f172a] border-b border-white/8 shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
      <div className="container-custom">
        <div className="flex justify-between items-center h-[70px]">

          {/* Logo */}
          <Link href="/" className="relative z-50 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.02 }}
            >
              <Logo width={180} height={50} className="" />
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">

            {/* Home link */}
            {navLinks.slice(0, 1).map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className="relative group px-4 py-2 rounded-lg">
                  <span className={`relative z-10 text-[14.5px] font-medium transition-colors duration-200 ${isActive ? "text-amber-400" : "text-slate-300 group-hover:text-white"}`}>{label}</span>
                  <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-200" />
                  {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2.5px] rounded-full bg-amber-400" />}
                </Link>
              );
            })}

            {/* Services dropdown */}
            <ServicesDropdown pathname={pathname} />

            {/* Remaining links */}
            {navLinks.slice(1).map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className="relative group px-4 py-2 rounded-lg">
                  <span className={`relative z-10 text-[14.5px] font-medium transition-colors duration-200 ${isActive ? "text-amber-400" : "text-slate-300 group-hover:text-white"}`}>{label}</span>
                  <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-200" />
                  {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2.5px] rounded-full bg-amber-400" />}
                </Link>
              );
            })}

            {/* CTA */}
            <motion.a
              href="tel:+16045551234"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="ml-3 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-gray-900 font-bold text-[13.5px] py-2.5 px-5 rounded-xl transition-colors duration-200 shadow-md shadow-amber-400/20"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 p-2.5 rounded-xl hover:bg-white/8 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white block origin-center rounded-full"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-full h-0.5 bg-white block rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white block origin-center rounded-full"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0f172a] border-l border-white/8 z-50 md:hidden pt-[86px] px-5 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {/* Home */}
                {navLinks.slice(0,1).map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium text-[15px] transition-colors duration-200 ${isActive ? "bg-amber-400/10 text-amber-400" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                      {label}
                    </Link>
                  );
                })}

                {/* Services accordion in mobile */}
                <MobileServicesMenu pathname={pathname} onClose={() => setIsOpen(false)} />

                {/* Remaining links */}
                {navLinks.slice(1).map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium text-[15px] transition-colors duration-200 ${isActive ? "bg-amber-400/10 text-amber-400" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                      {label}
                    </Link>
                  );
                })}

                <div className="mt-5 pt-5 border-t border-white/10">
                  <a
                    href="tel:+16045551234"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 px-5 rounded-xl text-[15px] transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (604) 555-1234
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Desktop Services Dropdown ─────────────────────────────────── */
function ServicesDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = pathname.startsWith("/services");

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        className={`relative group flex items-center gap-1.5 px-4 py-2 rounded-lg cursor-pointer select-none`}
        aria-expanded={open}
      >
        <span className={`text-[14.5px] font-medium transition-colors duration-200 ${
          isActive ? "text-amber-400" : "text-slate-300 group-hover:text-white"
        }`}>
          Services
        </span>
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
          className={`w-3.5 h-3.5 transition-colors duration-200 ${isActive ? "text-amber-400" : "text-slate-400 group-hover:text-white"}`}
        >
          <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </motion.svg>
        <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-200" />
        {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2.5px] rounded-full bg-amber-400" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={show}
            onMouseLeave={hide}
            className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-[480px] bg-[#0f172a] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            style={{ transformOrigin: "top center" }}
          >
            {/* Arrow */}
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#0f172a] border-l border-t border-white/10" />

            <div className="p-3 grid grid-cols-2 gap-1">
              {serviceItems.map((svc, i) => (
                <motion.div
                  key={svc.href}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.035, duration: 0.22 }}
                >
                  <Link
                    href={svc.href}
                    onClick={() => setOpen(false)}
                    className="group/item flex items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-white/[0.07] transition-colors duration-150"
                  >
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-400/60 group-hover/item:bg-amber-400 transition-colors shrink-0 translate-y-[5px]" />
                    <div>
                      <p className="text-[13.5px] font-semibold text-white group-hover/item:text-amber-400 transition-colors leading-snug">{svc.label}</p>
                      <p className="text-[12px] text-slate-400 mt-0.5 leading-snug">{svc.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer row */}
            <div className="border-t border-white/8 px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">All roadside services in Surrey, BC</span>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                View all
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.25a.75.75 0 0 1 0 1.06l-4.5 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Services Accordion ─────────────────────────────────── */
function MobileServicesMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const isActive = pathname.startsWith("/services");

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-3 py-3 px-4 rounded-xl font-medium text-[15px] transition-colors duration-200 ${
          isActive ? "bg-amber-400/10 text-amber-400" : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <span className="flex items-center gap-3">
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
          Services
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0"
        >
          <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-4 pl-3 border-l border-white/10 mt-1 mb-1 flex flex-col gap-0.5">
              {serviceItems.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  onClick={onClose}
                  className="group/m flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/m:bg-amber-400 transition-colors shrink-0" />
                  <span className="text-[13.5px] font-medium">{svc.label}</span>
                </Link>
              ))}
              <Link
                href="/services"
                onClick={onClose}
                className="flex items-center gap-2 py-2 px-3 mt-1 text-[13px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                View all services →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
