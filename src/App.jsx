// src/App.jsx
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import  Hero  from './components/Hero';
import  About  from './components/About';
import  Skills  from './components/Skills';
import  Projects  from './components/Projects';
import  Certifications  from './components/Certifications';
import  Contact  from './components/Contact';
import  Navbar  from './components/Navbar';

const App = () => {
  // Initialize theme based on user's system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Update theme in localStorage and document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Loading animation
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Loading screen component
  const LoadingScreen = () => (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-[#0A0A0A] z-50 flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className={`${darkMode ? 'dark' : ''}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-[#0A0A0A] dark:to-gray-900
                      text-gray-900 dark:text-white transition-colors duration-300"
          >
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Certifications />
              <Contact />
            </main>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default App;