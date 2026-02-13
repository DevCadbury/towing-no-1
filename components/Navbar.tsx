"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-b from-white to-gray-50 shadow-lg sticky top-0 z-50 border-b-2 border-primary/20">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
              className="relative"
              style={{
                filter: 'drop-shadow(0 6px 12px rgba(220, 38, 38, 0.25))'
              }}
            >
              {/* Larger logo for stronger branding */}
              <Logo width={280} height={65} className="logo-3d" />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <motion.a
              href="tel:+16045551234"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary-dark hover:to-orange-700 text-white font-bold py-3 px-6 shadow-lg transition-all duration-300"
              style={{
                transform: 'perspective(500px) rotateX(0deg)',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)'
              }}
            >
              Get Help Now
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none relative z-50"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-[320px] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 md:hidden overflow-y-auto"
        >
          {/* Overlay header with larger logo and close button */}
          <div className="absolute top-4 left-4">
            <Logo width={220} height={66} className="logo-3d" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col p-6 pt-32 space-y-6">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/services" onClick={() => setIsOpen(false)}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </MobileNavLink>
            
            <div className="pt-4">
              <motion.a
                href="tel:+16045551234"
                whileTap={{ scale: 0.95 }}
                className="block bg-gradient-to-r from-primary to-orange-600 text-white font-bold py-3 px-6 text-center shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Get Help Now
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// NavLink component with 3D hover effects
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        className="relative text-gray-700 font-semibold text-lg cursor-pointer"
        whileHover={{ y: -2 }}
        style={{
          display: 'inline-block',
          position: 'relative'
        }}
      >
        {children}
        <motion.span
          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-orange-600"
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.5)'
          }}
        />
      </motion.span>
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        className="text-gray-700 hover:text-primary font-semibold text-xl py-2 border-b border-gray-200"
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {children}
      </motion.div>
    </Link>
  );
}
