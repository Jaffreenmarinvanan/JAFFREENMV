import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress
 * ─────────────────────────────────────────────────────────────────────────────
 * Sleek, top-mounted gradient scroll progress indicator with ambient glow.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '3px',
        background: 'linear-gradient(90deg, #7c3aed 0%, #06b6d4 50%, #ec4899 100%)',
        boxShadow: '0 0 12px rgba(124, 58, 237, 0.8), 0 0 4px rgba(6, 182, 212, 0.6)',
        zIndex: 10001,
        pointerEvents: 'none',
        transition: 'width 0.1s linear',
        opacity: progress > 0.5 ? 1 : 0,
      }}
    />
  );
};

export default ScrollProgress;

