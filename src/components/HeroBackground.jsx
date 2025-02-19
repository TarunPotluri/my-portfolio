// src/components/HeroBackground.jsx
import React from 'react';
import { motion } from 'framer-motion';

export const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated Gradient Orbs */}
      <motion.div 
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl"
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
             backgroundSize: '40px 40px'
           }}
      />
    </div>
  );
};