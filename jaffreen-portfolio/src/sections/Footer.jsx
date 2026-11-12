import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import soundManager from '../utils/soundManager';

const Footer = () => {
  return (
    <footer className="premium-footer">
      <div className="footer-inner">

        <div className="footer-left">
          <span className="copyright">© 2026 Jaffreen Maraivanan</span>
        </div>

        <div className="footer-center">
          <div className="logo-container">
            <span className="gradient-text logo-text">JMV</span>

            <div className="footer-socials-popup">
              <a href="https://github.com/Jaffreenmarinvanan" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="GitHub" onClick={() => soundManager.play('click')}>
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/jaffreen-marainvanan-08a379227/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn" onClick={() => soundManager.play('click')}>
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/jaffreez_mv/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram" onClick={() => soundManager.play('click')}>
                <FaInstagram size={20} />
              </a>
              <a href="https://x.com/jaffreen_m" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="X (Twitter)" onClick={() => soundManager.play('click')}>
                <FaXTwitter size={20} />
              </a>
              <a href="mailto:jaffreenmarinvanan4@gmail.com" className="footer-social-btn" aria-label="Email Jaffreen" title="Email Jaffreen" onClick={() => soundManager.play('click')}>
                <FaEnvelope size={19} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <span className="designed-by">
            Designed & Built with <span className="heart">❤️</span><span className="bubble">🫧</span> by jaffreen
          </span>
        </div>

      </div>

      <style>{`
        .premium-footer {
          border-top: 1px solid var(--border, rgba(255,255,255,0.05));
          padding: 32px 24px;
          background: transparent;
          position: relative;
          z-index: 10;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer-left, .footer-right {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .footer-right {
          justify-content: flex-end;
        }

        .copyright, .designed-by {
          font-size: 14px;
          color: var(--muted, #a1a1aa);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .heart {
          display: inline-block;
          animation: heartbeat 1.5s infinite;
          margin: 0 4px;
        }

        .bubble {
          display: inline-block;
          animation: floatBubble 2.5s ease-in-out infinite;
          margin-left: 2px;
          margin-right: 4px;
        }

        @keyframes floatBubble {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.1); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* Interactive Logo Center */
        .footer-center {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .logo-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          cursor: crosshair;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.04em;
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }

        /* The Animated Socials Popup */
        .footer-socials-popup {
          position: absolute;
          bottom: 120%;
          display: flex;
          gap: 16px;
          padding: 12px 24px;
          background: rgba(20, 20, 20, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          
          /* Animation starting state */
          opacity: 0;
          visibility: hidden;
          transform: translateY(16px) scale(0.95);
          transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms cubic-bezier(0.16, 1, 0.3, 1), visibility 280ms;
          pointer-events: none;
          z-index: 3;
          will-change: transform, opacity;
        }

        /* The Arrow for Popup */
        .footer-socials-popup::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 8px;
          border-style: solid;
          border-color: rgba(20, 20, 20, 0.6) transparent transparent transparent;
        }

        /* Hover interactions */
        .logo-container:hover .logo-text {
          transform: scale(0.96);
          opacity: 0.6;
        }

        .logo-container:hover .footer-socials-popup,
        .footer-socials-popup:hover {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* Social Buttons within Footer */
        .footer-social-btn {
          color: #a1a1aa;
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }

        .footer-social-btn:hover {
          color: #fff;
          transform: translateY(-2px) scale(1.04);
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }

        .footer-social-btn:active {
          transform: translateY(0) scale(0.96);
          transition-duration: 120ms;
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }
          .footer-left, .footer-right, .footer-center {
            flex: none;
            width: 100%;
            justify-content: center;
          }
          
          .footer-socials-popup {
            bottom: auto;
            top: 130%;
          }
          .footer-socials-popup::after {
            top: auto;
            bottom: 100%;
            border-color: transparent transparent rgba(20, 20, 20, 0.6) transparent;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
