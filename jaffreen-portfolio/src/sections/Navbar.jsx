import React, { useState, useEffect } from 'react';
import GlassSurface from '../components/GlassSurface';
import SpecularButton from '../components/SpecularButton';
import soundManager from '../utils/soundManager';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const Navbar = ({ theme, toggleTheme, onOpenContact }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());

  useEffect(() => {
    return soundManager.subscribe((enabled) => setSoundEnabled(enabled));
  }, []);

  const toggleSound = () => {
    soundManager.toggle();
  };

  const scrollTo = (id) => {
    soundManager.play('nav');
    if (id.toLowerCase() === 'contact') {
      if (onOpenContact) onOpenContact();
      setMobileOpen(false);
      return;
    }
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        height: mobileOpen ? 'auto' : 62,
        borderBottom: '1px solid var(--border)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        transition: 'height 280ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 62,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          className="gradient-text nav-brand-logo"
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            display: 'inline-block',
            transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          JM
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
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link); }}
                style={{
                  fontSize: 13.5,
                  color: 'var(--muted)',
                  letterSpacing: '0.02em',
                  transition: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--fg)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {link}
              </a>
            </li>
          ))}

          {/* Sound Toggle (Accessible Mute/Unmute) */}
          <li>
            <button
              onClick={toggleSound}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--fg)',
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                borderRadius: '8px',
                opacity: soundEnabled ? 1 : 0.55,
                transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              title={soundEnabled ? 'Mute UI sounds' : 'Enable UI sounds'}
              aria-label={soundEnabled ? 'Mute UI sounds' : 'Enable UI sounds'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          </li>

          {/* Theme Toggle */}
          <li>
            <button
              onClick={() => {
                soundManager.play('click');
                toggleTheme();
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--fg)',
                fontSize: 17,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                borderRadius: '8px',
                transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>

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

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => {
            soundManager.play('click');
            setMobileOpen(!mobileOpen);
          }}
          aria-label="Toggle navigation"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--fg)',
            fontSize: 22,
            cursor: 'pointer',
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            animation: 'navMobileIn 280ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link); }}
              style={{
                fontSize: 15,
                color: 'var(--muted)',
                letterSpacing: '0.02em',
                transition: 'color 180ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {link}
            </a>
          ))}
          <SpecularButton
            size="sm"
            radius={22}
            lineColor="#7c3aed"
            autoAnimate={true}
            onClick={() => scrollTo('contact')}
          >
            Hire Me
          </SpecularButton>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button
              onClick={() => {
                toggleSound();
              }}
              style={{
                flex: 1,
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 22,
                padding: '8px',
                color: 'var(--fg)',
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: Muted'}
            </button>
            <button
              onClick={() => {
                soundManager.play('click');
                toggleTheme();
              }}
              style={{
                flex: 1,
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 22,
                padding: '8px',
                color: 'var(--fg)',
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes navMobileIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </GlassSurface>
  );
};

export default Navbar;
