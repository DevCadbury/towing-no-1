"use client";

import { motion } from "framer-motion";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  variant?: "color" | "white" | "black";
}

export default function Logo({
  width = 220,
  height = 55,
  className = "",
  animated = true,
  variant = "color",
}: LogoProps) {
  const isWhite = variant === "white";

  // Geometric Logo Mark - Abstract T1 / Hook shape
  const LogoMark = () => (
    <div className="relative w-10 h-10 flex items-center justify-center mr-3">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg transform rotate-3 opacity-90" />
      <div className="absolute inset-0 bg-navy-900 rounded-lg transform -rotate-3 border border-white/10 flex items-center justify-center overflow-hidden">
        {/* Abstract Tow Hook Shape */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-amber-500 relative z-10"
        >
          <path d="M16 11V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14l4-4" />
          <path d="M10 21h8a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3" />
        </svg>
        {/* Shine effect */}
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shimmer" />
      </div>
    </div>
  );

  const LogoText = () => (
    <div className={`flex flex-col justify-center leading-none ${isWhite ? "text-white" : "text-navy-900"}`}>
      <span className="font-black text-2xl tracking-tight flex items-center gap-0.5">
        TOWING
        <span className="text-amber-500">NO.1</span>
      </span>
      <span className={`text-[10px] uppercase font-bold tracking-[0.2em] ${isWhite ? "text-slate-400" : "text-slate-500"}`}>
        Roadside Pros
      </span>
    </div>
  );

  if (!animated) {
    return (
      <div className={`flex items-center ${className}`}>
        <LogoMark />
        <LogoText />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`flex items-center cursor-pointer select-none ${className}`}
    >
      <LogoMark />
      <LogoText />
    </motion.div>
  );
}
