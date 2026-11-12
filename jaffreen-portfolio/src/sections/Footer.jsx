import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import soundManager from '../utils/soundManager';

const Footer = () => {
  const scrollToTop = () => {
    soundManager.click();
    soundManager.transition();
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
              <a
                href="https://github.com/Jaffreenmarinvanan"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub"
                onMouseEnter={() => soundManager.hover()}
                onClick={() => soundManager.click()}
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/jaffreen-marainvanan-08a379227/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
                onMouseEnter={() => soundManager.hover()}
                onClick={() => soundManager.click()}
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/jaffreez_mv/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
                onMouseEnter={() => soundManager.hover()}
                onClick={() => soundManager.click()}
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://x.com/jaffreen_m"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="X (Twitter)"
                onMouseEnter={() => soundManager.hover()}
                onClick={() => soundManager.click()}
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="mailto:jaffreenmarinvanan4@gmail.com"
                className="footer-social-btn"
                aria-label="Email Jaffreen"
                title="Email Jaffreen"
                onMouseEnter={() => soundManager.hover()}
                onClick={() => soundManager.click()}
              >
                <FaEnvelope size={19} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <span className="designed-by">
            Designed & Built with <span className="heart">❤️</span><span className="bubble">🫧</span> by jaffreen
          </span>
          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            title="Back to Top"
            aria-label="Back to Top"
            onMouseEnter={() => soundManager.hover()}
          >
            ↑
          </button>
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

        .back-to-top-btn {
          margin-left: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          color: var(--fg);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .back-to-top-btn:hover {
          background: rgba(124, 58, 237, 0.2);
          border-color: rgba(168, 85, 247, 0.5);
          transform: translateY(-3px);
          color: #c4b5fd;
          box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
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
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
          transform: translateY(20px) scale(0.8);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
          z-index: 3;
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
          transform: scale(0.9);
          opacity: 0.5;
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
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-social-btn:hover {
          color: #fff;
          transform: translateY(-3px) scale(1.15);
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
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
