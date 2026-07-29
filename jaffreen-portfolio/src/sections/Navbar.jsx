import React, { useState } from 'react';
import GlassSurface from '../components/GlassSurface';
import SpecularButton from '../components/SpecularButton';

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const Navbar = ({ theme, toggleTheme, onOpenContact }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
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
          className="gradient-text"
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          JM
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: 32,
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
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--fg)',
                fontSize: 18,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Toggle Theme"
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
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--fg)',
            fontSize: 22,
            cursor: 'pointer',
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
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 22,
              padding: '8px',
              color: 'var(--fg)',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '8px',
            }}
          >
            {theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </GlassSurface>
  );
};

export default Navbar;
