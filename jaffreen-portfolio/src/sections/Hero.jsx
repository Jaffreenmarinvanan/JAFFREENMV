import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin, FaInstagram, FaDownload } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import GlowBorderButton from '../components/GlowBorderButton';
import FloatingBadge from '../components/FloatingBadge';
import RotatingText from '../components/RotatingText';
import soundManager from '../utils/soundManager';

const Hero = () => {
  const nameRef = useRef(null);
  const sectionRef = useRef(null);
  const [toastMessage, setToastMessage] = useState('');

  const name = 'Jaffreen Maraivanan';

  useEffect(() => {
    // Animate name letters staggered in 3D perspective
    const chars = nameRef.current?.querySelectorAll('.hero-char');
    if (chars?.length) {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 35, rotateX: -60 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.035,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }
  }, []);

  const scrollTo = (id) => {
    soundManager.click();
    soundManager.transition();
    if (window.lenis) {
      window.lenis.scrollTo(`#${id}`, {
        offset: -70,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = (e) => {
    e.preventDefault();
    soundManager.click();
    setToastMessage('📄 Updated Resume PDF will be available shortly! Feel free to reach out via Contact.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 12vw, 100px) 16px 60px',
        overflow: 'hidden',
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="hero-toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main hero content: two-column layout */}
      <div
        className="hero-layout"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          maxWidth: 1100,
          width: '100%',
        }}
      >
        {/* Left: Text content */}
        <div style={{ flex: 1, maxWidth: 580, width: '100%', textAlign: 'left' }}>
          {/* Status Indicator */}
          <div className="hero-status">
            <span className="status-dot"></span>
            <span className="status-text"> Hey Buddy</span>
          </div>

          {/* Heading with 3D Split Character Reveal */}
          <h1
            ref={nameRef}
            className="hero-name-heading"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 62px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: 16,
              perspective: '800px',
            }}
          >
            Hi, I'm{' '}
            <span className="gradient-text-wide" style={{ display: 'inline-block' }}>
              {name.split('').map((char, index) => (
                <span
                  key={index}
                  className="hero-char"
                  style={{
                    display: 'inline-block',
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                    transformOrigin: 'bottom center',
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Rotating Tagline */}
          <div
            className="hero-rotating-wrapper"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 24,
              flexWrap: 'wrap',
            }}
          >
            <span className="hero-rotating-label">I build</span>
            <RotatingText
              texts={[
                'Full Stack Applications',
                'Modern Web UIs',
                'Mobile Application',
                'Interactive Games',
              ]}
              mainClassName="hero-rotating-text"
              rotationInterval={3000}
              splitBy="words"
              staggerDuration={0.03}
              staggerFrom="first"
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
            />
          </div>

          {/* Personalized description */}
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Passionate developer exploring the world of code, one project at a time. Currently in my pre-final year of B.Tech Information Technology.
          </p>

          {/* Action Buttons with Sound & Magnetic Glow */}
          <div
            className="hero-buttons"
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 32,
            }}
          >
            <GlowBorderButton
              size="lg"
              glowSize={130}
              onClick={() => scrollTo('skills')}
              onMouseEnter={() => soundManager.hover()}
            >
              Explore Skills & Tech
            </GlowBorderButton>
            <GlowBorderButton
              size="lg"
              glowSize={130}
              onClick={handleResumeClick}
              onMouseEnter={() => soundManager.hover()}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaDownload size={14} /> Resume
              </span>
            </GlowBorderButton>
          </div>

          {/* Social Profiles Row */}
          <div className="hero-socials">
            <a
              href="https://github.com/Jaffreenmarinvanan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn github-btn"
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
              className="social-icon-btn linkedin-btn"
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
              className="social-icon-btn instagram-btn"
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
              className="social-icon-btn twitter-btn"
              aria-label="X (Twitter)"
              onMouseEnter={() => soundManager.hover()}
              onClick={() => soundManager.click()}
            >
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Right: Rounded Portrait Card with Ambient Aura & Signature Below */}
        <div className="hero-badge" style={{ flexShrink: 0, position: 'relative' }}>
          {/* Ambient Glowing Nebula Aura */}
          <div className="hero-ambient-aura" />

          <FloatingBadge />

          {/* Signature Video directly below photo */}
          <div className="hero-signature-wrapper">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hero-signature-video"
            >
              <source src="/jaffreen-maraivanan-c-handwriting.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <style>{`
        .hero-ambient-aura {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%);
          filter: blur(50px);
          border-radius: 50%;
          z-index: -1;
          pointer-events: none;
          animation: auraBreathe 5s ease-in-out infinite alternate;
        }

        @keyframes auraBreathe {
          0% { transform: translateX(-50%) scale(0.9); opacity: 0.7; }
          100% { transform: translateX(-50%) scale(1.15); opacity: 1; }
        }

        .hero-toast-notification {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000;
          background: rgba(18, 14, 28, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(139, 92, 246, 0.4);
          color: #f1f5f9;
          padding: 12px 24px;
          border-radius: 99px;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(124, 58, 237, 0.3);
          animation: toastPop 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes toastPop {
          0% { opacity: 0; transform: translate(-50%, 20px) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }

        .hero-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .hero-signature-wrapper {
          position: relative;
          width: 320px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 4px;
        }

        .hero-signature-video {
          width: 100%;
          max-width: 320px;
          height: auto;
          display: block;
          mix-blend-mode: screen;
          pointer-events: none;
          filter: drop-shadow(0 0 15px rgba(168, 85, 247, 0.4));
        }

        .light-mode .hero-signature-video {
          mix-blend-mode: multiply;
          filter: invert(1) drop-shadow(0 0 10px rgba(120, 100, 255, 0.3));
        }

        .hero-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(124, 58, 237, 0.08);
          border: 1px solid rgba(124, 58, 237, 0.15);
          padding: 6px 14px;
          border-radius: 99px;
          margin-bottom: 20px;
        }
        
        .light-mode .hero-status {
          background: rgba(120, 100, 255, 0.06);
          border-color: rgba(120, 100, 255, 0.15);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px #10b981;
          animation: dotPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(1.15); }
        }

        .hero-rotating-label {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 600;
          color: var(--fg);
        }

        .hero-rotating-text {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .social-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          color: var(--fg);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .social-icon-btn:hover {
          transform: translateY(-3px) scale(1.08);
          background: rgba(124, 58, 237, 0.15);
          border-color: rgba(168, 85, 247, 0.5);
          color: #c4b5fd;
          box-shadow: 0 4px 16px rgba(124, 58, 237, 0.3);
        }

        .hero-socials {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        @media (max-width: 868px) {
          .hero-layout {
            flex-direction: column-reverse !important;
            text-align: center !important;
            gap: 40px !important;
          }
          .hero-layout > div:first-child {
            text-align: center !important;
          }
          .hero-status {
            margin-left: auto;
            margin-right: auto;
            display: inline-flex;
          }
          .hero-buttons {
            justify-content: center !important;
          }
          .hero-socials {
            justify-content: center !important;
          }
          .hero-badge {
            transform: scale(0.9);
          }
          .hero-rotating-wrapper {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            transform: scale(0.78);
            margin-bottom: -20px;
          }
          .hero-layout {
            gap: 20px !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            align-items: center !important;
            width: 100%;
          }
          .hero-buttons > * {
            width: 100%;
            max-width: 260px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
