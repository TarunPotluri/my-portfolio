// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { HeroBackground } from './HeroBackground';

export const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <HeroBackground />
      
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
          <div className="relative group overflow-hidden rounded-full">
            <motion.div
              animate={{ 
                rotate: 360,
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            />
            <img
              src="Tarun.jpg"
              alt="Tarun Potluri"
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-900 
                       transition-transform duration-500 ease-in-out
                       group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">
            Tarun Potluri
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Data Analyst & ML Engineer
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                       text-white font-medium button-glow"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 glass-effect rounded-full text-white font-medium"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};