import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '24px',
      }}
    >
      <div
        className="footer-inner"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 12.5,
            color: 'var(--muted)',
          }}
        >
          © 2025 Jaffreen Maraivanan
        </span>

        <span
          className="gradient-text"
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          JM
        </span>

        <span
          style={{
            fontSize: 12.5,
            color: 'var(--muted)',
          }}
        >
          Designed & Built with ❤️ by jaffreen
        </span>
      </div>

      <style>{`
        @media (max-width: 520px) {
          .footer-inner {
            justify-content: center !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
