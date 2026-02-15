"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50"
          : "bg-transparent"
        }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative group z-50">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
            >
              <Logo width={200} height={55} className="" />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" scrolled={scrolled}>Home</NavLink>
            <NavLink href="/services" scrolled={scrolled}>Services</NavLink>
            <NavLink href="/about" scrolled={scrolled}>About</NavLink>
            <NavLink href="/blog" scrolled={scrolled}>Blog</NavLink>
            <NavLink href="/contact" scrolled={scrolled}>Contact</NavLink>
            <motion.a
              href="tel:+16045551234"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 btn-primary flex items-center gap-2 !py-2.5 !px-6 !text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative z-50 p-2.5 rounded-xl transition-colors ${isOpen ? "bg-white/10" : scrolled ? "hover:bg-slate-100" : "hover:bg-white/10"
              }`}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: scrolled ? "#0f172a" : "#fff" }}
                className="w-full h-0.5 block origin-center rounded-full"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-full h-0.5 block rounded-full"
                style={{ backgroundColor: isOpen ? "#fff" : scrolled ? "#0f172a" : "#fff" }}
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#fff" } : { rotate: 0, y: 0, backgroundColor: scrolled ? "#0f172a" : "#fff" }}
                className="w-full h-0.5 block origin-center rounded-full"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-navy-900 z-40 md:hidden pt-24 px-6 overflow-y-auto"
            >
              <div className="flex flex-col space-y-2">
                <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                <MobileNavLink href="/services" onClick={() => setIsOpen(false)}>Services</MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
                <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>
                <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>

                <div className="pt-6 mt-4 border-t border-white/10">
                  <a
                    href="tel:+16045551234"
                    className="btn-primary w-full flex justify-center items-center gap-2"
                    onClick={() => setIsOpen(false)}
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

function NavLink({ href, children, scrolled }: { href: string; children: React.ReactNode; scrolled: boolean }) {
  return (
    <Link href={href}>
      <motion.span
        className={`relative px-4 py-2 rounded-lg font-medium text-[15px] cursor-pointer transition-colors duration-300 ${scrolled ? "text-navy-900 hover:text-amber-600 hover:bg-amber-50" : "text-white/90 hover:text-white hover:bg-white/10"
          }`}
        whileHover={{ y: -1 }}
        style={{ display: "inline-block" }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        className="text-white/80 hover:text-amber-400 hover:bg-white/5 font-medium text-lg py-3 px-4 rounded-xl transition-colors"
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {children}
      </motion.div>
    </Link>
  );
}
