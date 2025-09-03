// src/components/HeroBackground.jsx
import React from "react";
import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* --- Animated Gradient Orbs --- */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-[450px] h-[450px] bg-gradient-to-r from-purple-500/25 to-blue-500/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -70, 0], y: [0, -50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-[550px] h-[550px] bg-gradient-to-r from-indigo-500/25 to-pink-500/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-2xl"
      />

      {/* --- Rotating Halo --- */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1), rgba(14,165,233,0.1), rgba(99,102,241,0.1))",
          mask: "radial-gradient(circle, transparent 65%, black 100%)",
          WebkitMask: "radial-gradient(circle, transparent 65%, black 100%)",
        }}
      />

      {/* --- Grid Pattern with Pulse --- */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};
