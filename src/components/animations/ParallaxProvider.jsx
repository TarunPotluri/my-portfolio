// src/components/animations/ParallaxProvider.jsx
import React, { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export const ParallaxProvider = ({ children }) => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 0.8,
      lerp: 0.1
    });

    return () => scroll.destroy();
  }, []);

  return <div data-scroll-container>{children}</div>;
};