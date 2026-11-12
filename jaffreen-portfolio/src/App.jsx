import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import LoadingScreen from './sections/LoadingScreen';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CinematicBackground from './components/CinematicBackground';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Theme synchronization
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Lenis Smooth Momentum Scrolling Engine
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Cinematic IntersectionObserver for section reveals
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    const sections = document.querySelectorAll('.section-animate');
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      {/* Cinematic Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Magnetic Cursor (Desktops with mouse only) */}
      <CustomCursor />

      {/* Ambient Starfield & Nebula Particle Canvas */}
      <CinematicBackground />

      {/* Preloader with dynamic easing */}
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: loading ? 0 : 1,
          transform: loading ? 'scale(0.98)' : 'scale(1)',
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenContact={() => setIsContactOpen(true)}
        />
        <main>
          <Hero />
          <About />
          <Skills />
        </main>
        <Footer />
        <Contact
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          onOpen={() => setIsContactOpen(true)}
        />
      </div>
    </>
  );
};

export default App;
