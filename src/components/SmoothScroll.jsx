// components/SmoothScroll.jsx
import React, { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 0.8,
      lerp: 0.1,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });

    // Update scroll on route change
    setTimeout(() => {
      scroll.update();
    }, 500);

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <main data-scroll-container>
      {children}
    </main>
  );
};