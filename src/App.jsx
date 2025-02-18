import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Navbar } from './components/Navbar';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { motion } from 'framer-motion';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 1,
            repeat: Infinity
          }}
          className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
};

export default App;