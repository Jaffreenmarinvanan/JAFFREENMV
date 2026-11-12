import React, { useState, useEffect } from 'react';
import GlassSurface from '../components/GlassSurface';
import SpecularButton from '../components/SpecularButton';
import soundManager from '../utils/soundManager';

const navLinks = ['Home', 'About', 'Skills', 'Contact'];

const Navbar = ({ theme, toggleTheme, onOpenContact }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  // Subscribe to sound state
  useEffect(() => {
    const unsubscribe = soundManager.subscribe((val) => setSoundEnabled(val));
    return unsubscribe;
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  };

  const handleToggleTheme = () => {
    soundManager.click();
    toggleTheme();
  };

  const scrollTo = (id) => {
    soundManager.click();
    if (id.toLowerCase() === 'contact') {
      soundManager.modalOpen();
      if (onOpenContact) onOpenContact();
      setMobileOpen(false);
      return;
    }

    soundManager.transition();
    if (window.lenis) {
      window.lenis.scrollTo(`#${id.toLowerCase()}`, {
        offset: -70,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.getElementById(id.toLowerCase());
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <GlassSurface
      as="nav"
      borderRadius={0}
      blur={18}
      backgroundOpacity={0.08}
      distortionScale={-180}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: mobileOpen ? 'auto' : 64,
        borderBottom: '1px solid var(--border)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        transition: 'background 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo with magnetic hover feel */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          className="gradient-text nav-logo"
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
          onMouseEnter={() => soundManager.hover()}
        >
          <span>JM</span>
          <span style={{ fontSize: 10, color: '#06b6d4', padding: '2px 6px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: 99, border: '1px solid rgba(6, 182, 212, 0.25)' }}>
            v2.0
          </span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: 28,
            alignItems: 'center',
          }}
          className="nav-desktop-links"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <li key={link} style={{ position: 'relative' }}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(link); }}
                  onMouseEnter={() => soundManager.hover()}
                  style={{
                    fontSize: 13.5,
                    color: isActive ? 'var(--fg)' : 'var(--muted)',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.02em',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer',
                    padding: '8px 4px',
                    display: 'inline-block',
                    position: 'relative',
                  }}
                >
                  {link}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                        boxShadow: '0 0 8px rgba(124, 58, 237, 0.8)',
                      }}
                    />
                  )}
                </a>
              </li>
            );
          })}

          {/* Sound Toggle Button with Animated Waves */}
          <li>
            <button
              onClick={handleToggleSound}
              className="nav-control-btn sound-toggle-btn"
              title={soundEnabled ? 'Mute UI Sound Effects' : 'Enable UI Sound Effects'}
              aria-label="Toggle UI Sound Effects"
              style={{
                background: soundEnabled ? 'rgba(124, 58, 237, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                border: soundEnabled ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid var(--border)',
                borderRadius: '99px',
                padding: '6px 12px',
                color: soundEnabled ? '#c4b5fd' : 'var(--muted)',
                fontSize: 13,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={() => soundManager.hover()}
            >
              {soundEnabled ? (
                <>
                  <span style={{ fontSize: 13 }}>🔊</span>
                  <span className="sound-wave-bars">
                    <span className="wave-bar bar-1" />
                    <span className="wave-bar bar-2" />
                    <span className="wave-bar bar-3" />
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600 }}>FX ON</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 13 }}>🔇</span>
                  <span style={{ fontSize: 11, fontWeight: 500 }}>FX OFF</span>
                </>
              )}
            </button>
          </li>

          {/* Theme Toggle Button */}
          <li>
            <button
              onClick={handleToggleTheme}
              className="nav-control-btn theme-toggle-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: 34,
                height: 34,
                color: 'var(--fg)',
                fontSize: 15,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
              onMouseEnter={() => soundManager.hover()}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>

          {/* Contact Action */}
          <li>
            <SpecularButton
              size="sm"
              radius={22}
              lineColor="#7c3aed"
              autoAnimate={true}
              onClick={() => scrollTo('contact')}
            >
              Hire Me
            </SpecularButton>
          </li>
        </ul>

        {/* Mobile controls & hamburger */}
        <div style={{ display: 'none', alignItems: 'center', gap: 10 }} className="nav-mobile-right">
          <button
            onClick={handleToggleSound}
            aria-label="Toggle sound"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 18,
              cursor: 'pointer',
              color: 'var(--fg)',
            }}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 18,
              cursor: 'pointer',
              color: 'var(--fg)',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            className="nav-mobile-toggle"
            onClick={() => {
              soundManager.click();
              setMobileOpen(!mobileOpen);
            }}
            aria-label="Toggle navigation"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--fg)',
              fontSize: 22,
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            padding: '16px 24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            borderTop: '1px solid var(--border)',
            background: 'var(--bg)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link); }}
              style={{
                fontSize: 16,
                fontWeight: activeSection === link.toLowerCase() ? 600 : 500,
                color: activeSection === link.toLowerCase() ? '#06b6d4' : 'var(--fg)',
                letterSpacing: '0.02em',
                padding: '6px 0',
              }}
            >
              {link}
            </a>
          ))}
          <div style={{ paddingTop: 8, display: 'flex', gap: 12 }}>
            <SpecularButton
              size="sm"
              radius={22}
              lineColor="#7c3aed"
              autoAnimate={true}
              onClick={() => scrollTo('contact')}
            >
              Hire Me
            </SpecularButton>
          </div>
        </div>
      )}

      <style>{`
        .sound-wave-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }
        .wave-bar {
          width: 2px;
          background-color: #06b6d4;
          border-radius: 1px;
          animation: wavePulse 0.8s ease-in-out infinite alternate;
        }
        .bar-1 { height: 6px; animation-delay: 0.1s; }
        .bar-2 { height: 12px; animation-delay: 0.3s; }
        .bar-3 { height: 8px; animation-delay: 0.2s; }

        @keyframes wavePulse {
          0% { height: 3px; }
          100% { height: 12px; }
        }

        .nav-control-btn:hover {
          transform: translateY(-1px) scale(1.05);
          border-color: rgba(168, 85, 247, 0.5) !important;
        }

        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-right { display: flex !important; }
        }
      `}</style>
    </GlassSurface>
  );
};

export default Navbar;
