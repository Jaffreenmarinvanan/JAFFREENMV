import React, { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './sections/LoadingScreen';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  /* IntersectionObserver for section fade-in */
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
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.section-animate');
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.6s ease 0.1s',
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
          <Projects />
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

