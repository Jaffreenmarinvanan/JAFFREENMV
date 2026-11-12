import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin, FaInstagram, FaDownload } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import GlowBorderButton from '../components/GlowBorderButton';
import FloatingBadge from '../components/FloatingBadge';
import RotatingText from '../components/RotatingText';
import TransparentVideo from '../components/TransparentVideo';

const Hero = () => {
  const nameRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Animate name letters staggered
    const chars = nameRef.current?.querySelectorAll('.hero-char');
    if (chars?.length) {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 30, rotateX: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 2.6,
        }
      );
    }
  }, []);

  const name = 'Jaffreen Maraivanan';

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
        {/* Left: Text content (no glass surface background) */}
        <div style={{ flex: 1, maxWidth: 580, width: '100%', textAlign: 'left' }}>

          {/* Status Indicator */}
          <div className="hero-status">
            <span className="status-dot"></span>
            <span className="status-text"> Hey Buddy</span>
          </div>

          {/* Heading */}
          <h1
            ref={nameRef}
            className="hero-name-heading"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 62px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              marginBottom: 16,
              perspective: '600px',
            }}
          >
            Hi, I'm <span className="gradient-text-wide">{name}</span>
          </h1>

          {/* Rotating Tagline */}
          <div className="hero-rotating-wrapper" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <span className="hero-rotating-label">I build</span>
            <RotatingText
              texts={[
                'Full Stack Applications',
                'Modern Web UIs',
                'Mobile Application',
                'Interactive Games'
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

          {/* New personalized description text from user screen */}
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

          {/* Action Buttons */}
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
              onClick={() => scrollTo('projects')}
            >
              Explore Projects
            </GlowBorderButton>
            <GlowBorderButton
              size="lg"
              glowSize={130}
              tag="a"
              href="/resume.pdf"
              download="Jaffreen_Maraivanan_Resume.pdf"
              target="_blank"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaDownload size={14} /> Resume
              </span>
            </GlowBorderButton>
          </div>

          {/* Social Profiles Row */}
          <div className="hero-socials">
            <a href="https://github.com/Jaffreenmarinvanan" target="_blank" rel="noopener noreferrer" className="social-icon-btn github-btn" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/jaffreen-marainvanan-08a379227/" target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin-btn" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.instagram.com/jaffreez_mv/" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram-btn" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://x.com/jaffreen_m" target="_blank" rel="noopener noreferrer" className="social-icon-btn twitter-btn" aria-label="X (Twitter)">
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Right: Rounded Portrait Card with Glass Pills & Signature Below */}
        <div className="hero-badge" style={{ flexShrink: 0 }}>
          <FloatingBadge />
          
          {/* Animated Handwriting Video with 100% transparent background & pure white text */}
          <div className="hero-signature-wrapper">
            <TransparentVideo
              src="/jaffreen-maraivanan-c-handwriting.mp4"
              width={340}
              height={100}
              className="hero-signature-canvas"
            />
          </div>
        </div>
      </div>

      <style>{`
        
        .hero-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .hero-signature-wrapper {
          position: relative;
          width: 100%;
          max-width: 330px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 6px;
          pointer-events: none;
        }

        .hero-signature-canvas {
          width: 100%;
          max-width: 320px;
          height: auto;
          display: block;
          user-select: none;
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

        .status-text {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--muted);
        }

        .hero-name-heading {
          color: var(--fg);
        }

        /* Social Profile Icon Buttons */
        .hero-socials {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--muted);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .light-mode .social-icon-btn {
          background: rgba(15, 23, 42, 0.04);
          border-color: rgba(15, 23, 42, 0.08);
        }

        .social-icon-btn:hover {
          transform: translateY(-3px) scale(1.05);
          color: #fff;
        }

        /* Hover brand customization colors */
        .github-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.15);
        }
        
        .light-mode .github-btn:hover {
          background: #24292e;
          border-color: #24292e;
        }

        .linkedin-btn:hover {
          background: #0077b5;
          border-color: #0077b5;
          box-shadow: 0 0 16px rgba(0, 119, 181, 0.3);
        }

        .instagram-btn:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          border-color: transparent;
          box-shadow: 0 0 16px rgba(220, 39, 67, 0.35);
        }

        .twitter-btn:hover {
          background: #111;
          border-color: #333;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.15);
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
          .hero-socials {
            gap: 8px !important;
          }
        }

        @media (max-width: 640px) {
          .hero-signature-wrapper {
            width: 280px;
          }
        }

        @media (max-width: 480px) {
          .hero-signature-wrapper {
            width: 240px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
