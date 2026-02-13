"use client";

import Image from "next/image";
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
  height = 60, 
  className = "", 
  animated = true,
  variant = "color" 
}: LogoProps) {
  const filterStyles = {
    color: "",
    white: "brightness-0 invert",
    black: "brightness-0"
  };

  if (!animated) {
    return (
      <Image
        src="/logo.png"
        alt="TowingNo.1 - Emergency & Roadside Services"
        width={width}
        height={height}
        className={`${className} ${filterStyles[variant]}`}
        priority
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.05,
        filter: "drop-shadow(0 0 20px rgba(255, 153, 0, 0.6))"
      }}
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3))',
      }}
    >
      <Image
        src="/logo.png"
        alt="TowingNo.1 - Emergency & Roadside Services"
        width={width}
        height={height}
        className={`${className} ${filterStyles[variant]}`}
        priority
      />
    </motion.div>
  );
}
