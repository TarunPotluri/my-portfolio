// src/components/animations/ScrollSection.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export const ScrollSection = ({ 
  children, 
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      scale: direction === 'scale' ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96],
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      data-scroll
      data-scroll-speed={direction === 'up' ? '1' : '-1'}
    >
      {children}
    </motion.div>
  );
};