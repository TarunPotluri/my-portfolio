// src/components/Hero.jsx
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const DigitalWaveform = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const waves = [];

    // Create waves with different properties
    for (let i = 0; i < 3; i++) {
      waves.push({
        frequency: 0.02 + (i * 0.005),
        amplitude: 30 + (i * 10),
        speed: 0.02 + (i * 0.01),
        offset: 0,
        color: `rgba(99, 102, 241, ${0.1 - (i * 0.02)})`
      });
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
          ctx.lineTo(x, canvas.height / 2 + y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        wave.offset += wave.speed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
    />
  );
};

// Binary Rain Effect
const BinaryRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{ 
            y: window.innerHeight + 100,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute text-xs font-mono text-green-500"
        >
          {Math.random().toString(2).substr(2, 8)}
        </motion.div>
      ))}
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
      <DigitalWaveform />
      <BinaryRain />

      <div className="relative z-20 h-screen flex flex-col items-center justify-center px-4">
        {/* Profile Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mb-16"
        >
          {/* Audio Visualizer Effect */}
          <div className="absolute -inset-8 flex justify-around items-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [20, 40 + Math.random() * 30, 20],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
              />
            ))}
          </div>

          {/* Profile Image */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[2px] 
                         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <img
              src="Tarun.jpg"
              alt="Tarun Potluri"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center space-y-6"
        >
          <h1 className="text-6xl md:text-7xl font-bold">
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              Tarun Potluri
            </motion.span>
          </h1>
          
          <div className="flex items-center justify-center space-x-2 text-xl md:text-2xl text-gray-300">
            <span>Data Analyst</span>
            <span className="text-purple-500">|</span>
            <span>ML Engineer</span>
            <span className="text-purple-500">|</span>
            <span>DJ</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                     rounded-full text-white font-medium shadow-lg hover:shadow-purple-500/25
                     transition-all duration-300"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Work
          </motion.button>
        </motion.div>

        {/* Equalizer Bars at Bottom */}
        <div className="absolute bottom-8 flex justify-center space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: [15, 30, 15],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;