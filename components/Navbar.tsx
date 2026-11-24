"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";

// A-009: no animation library here. Menus stay in the server HTML while closed
// (hidden with CSS visibility) and animate with CSS transitions.
const EASE_OUT = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const serviceItems = [
  { href: "/services/emergency-towing",   label: "Emergency Towing",     desc: "24/7 fast response, any time" },
  { href: "/services/roadside-assistance", label: "Roadside Assistance",  desc: "Battery, flat tire, lockout, fuel" },
  { href: "/services/flat-tire-help",     label: "Flat Tire Help",        desc: "Tire change on site or a tow" },
  { href: "/services/battery-boost",      label: "Battery Boost",         desc: "Jump start in minutes" },
  { href: "/services/accident-recovery",  label: "Accident Recovery",     desc: "Careful collision towing" },
  { href: "/services/lockout-service",    label: "Lockout Service",       desc: "Keys locked inside? We help" },
  { href: "/services/vehicle-transport",  label: "Vehicle Transport",     desc: "Secure moves between cities" },
  { href: "/services/fuel-delivery",      label: "Fuel Delivery",         desc: "Emergency fuel brought to you" },
  { href: "/services/winching-extraction", label: "Winching & Extraction", desc: "Stuck in mud, snow, or ditch" },
  { href: "/services/cross-border-towing", label: "Cross Border Towing",  desc: "Canada and U.S. vehicle moves" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Lifted from MobileServicesMenu: the drawer no longer unmounts on close, so
  // the accordion is reset each time the drawer opens (same as before).
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "/";

  return (
    <nav className="fixed w-full z-50 bg-[#0f172a] border-b border-white/8 shadow-[0_2px_24px_rgba(0,0,0,0.45)]">
      <div className="container-custom">
        <div className="flex justify-between items-center h-[76px]">

          {/* Logo */}
          <Link href="/" className="relative z-50 shrink-0">
            <div className="transition-transform duration-200 hover:scale-[1.02]">
              <Logo height={60} className="" />
            </div>
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
            <a
              href="tel:+17788380014"
              data-call-location="navbar_desktop"
              className="btn-call-highlight ml-3 inline-flex items-center gap-2 text-[13.5px] py-2.5 px-5 rounded-xl hover:translate-y-0 hover:scale-[1.04] active:scale-[0.96]"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => { if (!isOpen) setMobileServicesOpen(false); setIsOpen(!isOpen); }}
            className="md:hidden relative z-50 p-2.5 rounded-xl hover:bg-white/8 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-white block origin-center rounded-full transition-transform duration-300 ${isOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-white block rounded-full transition-[opacity,transform] duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-white block origin-center rounded-full transition-transform duration-300 ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {/* Kept in the DOM while closed so the links are in the server HTML; hidden with visibility. */}
            <div
              className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-[opacity,visibility] duration-[250ms] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <div
              className={`fixed top-0 right-0 h-full w-[280px] bg-[#0f172a] border-l border-white/8 z-50 md:hidden pt-[86px] px-5 overflow-y-auto transition-[transform,visibility] duration-300 ${EASE_OUT} ${isOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
            >
              <div className="flex flex-col gap-1">
                {/* Home */}
                {navLinks.slice(0,1).map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={() => setIsOpen(false)} prefetch={isOpen ? undefined : false}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium text-[15px] transition-colors duration-200 ${isActive ? "bg-amber-400/10 text-amber-400" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                      {label}
                    </Link>
                  );
                })}

                {/* Services accordion in mobile */}
                <MobileServicesMenu pathname={pathname} onClose={() => setIsOpen(false)} open={mobileServicesOpen} setOpen={setMobileServicesOpen} drawerOpen={isOpen} />

                {/* Remaining links */}
                {navLinks.slice(1).map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={() => setIsOpen(false)} prefetch={isOpen ? undefined : false}
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl font-medium text-[15px] transition-colors duration-200 ${isActive ? "bg-amber-400/10 text-amber-400" : "text-slate-300 hover:text-white hover:bg-white/5"}`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                      {label}
                    </Link>
                  );
                })}

                <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                  <a
                    href="tel:+17788380014"
                    data-call-location="navbar_mobile"
                    onClick={() => setIsOpen(false)}
                    className="btn-call-highlight flex justify-center items-center gap-2 w-full py-3 px-5 rounded-xl text-[15px]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
            </div>
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
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`relative group flex items-center gap-1.5 px-4 py-2 rounded-lg cursor-pointer select-none`}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className={`text-[14.5px] font-medium transition-colors duration-200 ${
          isActive ? "text-amber-400" : "text-slate-300 group-hover:text-white"
        }`}>
          Services
        </span>
        {/* Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
          className={`w-3.5 h-3.5 transition-[color,transform] duration-200 ease-in-out ${open ? "rotate-180" : ""} ${isActive ? "text-amber-400" : "text-slate-400 group-hover:text-white"}`}
        >
          <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
        <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.06] transition-colors duration-200" />
        {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2.5px] rounded-full bg-amber-400" />}
      </button>

      {/* Kept in the DOM while closed so the links are in the server HTML; hidden with visibility.
          Links prefetch only while open (as before, when they mounted on open): an IntersectionObserver
          still sees visibility:hidden links, which added 44 RSC prefetches per desktop page load. */}
          <div
            onMouseEnter={show}
            onMouseLeave={hide}
            className={`absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-[480px] bg-[#0f172a] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-[opacity,transform,visibility] duration-200 ${EASE_OUT} ${open ? "opacity-100 visible translate-y-0 scale-100" : "opacity-0 invisible translate-y-2 scale-[0.97]"}`}
            style={{ transformOrigin: "top center" }}
          >
            {/* Arrow */}
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#0f172a] border-l border-t border-white/10" />

            <div className="p-3 grid grid-cols-2 gap-1">
              {serviceItems.map((svc, i) => (
                <div
                  key={svc.href}
                  className={`transition-[opacity,transform] duration-[220ms] ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"}`}
                  style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
                >
                  <Link
                    href={svc.href}
                    onClick={() => setOpen(false)}
                    prefetch={open ? undefined : false}
                    className="group/item flex items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-white/[0.07] transition-colors duration-150"
                  >
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-amber-400/60 group-hover/item:bg-amber-400 transition-colors shrink-0 translate-y-[5px]" />
                    <div>
                      <p className="text-[13.5px] font-semibold text-white group-hover/item:text-amber-400 transition-colors leading-snug">{svc.label}</p>
                      <p className="text-[12px] text-slate-400 mt-0.5 leading-snug">{svc.desc}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Footer row */}
            <div className="border-t border-white/8 px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">All roadside services across the Lower Mainland</span>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                prefetch={open ? undefined : false}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
              >
                View all
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.25a.75.75 0 0 1 0 1.06l-4.5 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
    </div>
  );
}

/* ─── Mobile Services Accordion ─────────────────────────────────── */
function MobileServicesMenu({ pathname, onClose, open, setOpen, drawerOpen }: { pathname: string; onClose: () => void; open: boolean; setOpen: (open: boolean) => void; drawerOpen: boolean }) {
  const isActive = pathname.startsWith("/services");
  const prefetch = open && drawerOpen ? undefined : false;

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
        <svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-[220ms] ${open ? "rotate-180" : ""}`}
        >
          <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Kept in the DOM while closed; grid-rows 0fr/1fr animates the height without JS.
          The open state sets no `visible`, so the panel inherits the drawer's `invisible` when the drawer closes. */}
          <div
            className={`grid transition-[grid-template-rows,opacity,visibility] duration-[280ms] ${EASE_OUT} ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 invisible"}`}
          >
            <div className="overflow-hidden min-h-0">
            <div className="ml-4 pl-3 border-l border-white/10 mt-1 mb-1 flex flex-col gap-0.5">
              {serviceItems.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  onClick={onClose}
                  prefetch={prefetch}
                  className="group/m flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/m:bg-amber-400 transition-colors shrink-0" />
                  <span className="text-[13.5px] font-medium">{svc.label}</span>
                </Link>
              ))}
              <Link
                href="/services"
                onClick={onClose}
                prefetch={prefetch}
                className="flex items-center gap-2 py-2 px-3 mt-1 text-[13px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                View all services
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true"><path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/></svg>
              </Link>
            </div>
            </div>
          </div>
    </div>
  );
}
