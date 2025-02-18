// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

export const Hero = () => {
  const handleExploreClick = () => {
    document.getElementById('projects').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section id="about" className="h-screen relative overflow-hidden bg-white dark:bg-gray-900">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#6366f1" />
            </mesh>
          </Float>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Profile Image with Effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-50 animate-pulse"></div>
          
          {/* Inner container with border */}
          <div className="relative group overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow"></div>
            <img
              src="/Tarun.jpg"
              alt="Tarun Potluri"
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-900 
                       transition-transform duration-500 ease-in-out
                       group-hover:scale-125 group-hover:rotate-3
                       hover:border-indigo-500"
              style={{
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
              }}
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Tarun Potluri
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Data Scientist & ML Engineer
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreClick}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold 
                     hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Explore My Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};