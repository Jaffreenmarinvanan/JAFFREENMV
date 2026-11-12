import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ContactStepper from './ContactStepper';
import SpecularButton from '../components/SpecularButton';
import InteractiveLines from '../components/InteractiveLines';
import soundManager from '../utils/soundManager';
import './Contact.css';

const Contact = ({ isOpen, onClose, onOpen }) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const activeOpen = isOpen !== undefined ? isOpen : internalOpen;

  const handleOpen = () => {
    soundManager.modalOpen();
    if (onOpen) {
      onOpen();
    } else {
      setInternalOpen(true);
    }
  };

  const handleClose = useCallback(() => {
    soundManager.modalClose();
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
    }
  }, [onClose]);

  // Close modal on Escape key press & prevent background scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeOpen) {
        handleClose();
      }
    };

    if (activeOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeOpen, handleClose]);

  return (
    <>
      {/* Floating Glassmorphism Message Icon Button in Bottom-Left Corner */}
      <button
        className="floating-contact-btn"
        onClick={handleOpen}
        aria-label="Open contact form"
        title="Get in Touch"
      >
        <div className="contact-btn-icon-wrapper">
          {/* Status pulsing dot */}
          <span className="contact-btn-status-dot" />
          
          {/* Message / Chat Bubble SVG Icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <span className="contact-btn-text">Message</span>
      </button>

      {/* Glassmorphic Contact Modal Overlay */}
      <AnimatePresence>
        {activeOpen && (
          <motion.div
            className="contact-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          >
            <motion.div
              className="contact-modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Interactive vertical lines canvas background ── */}
              <InteractiveLines
                lineCount={55}
                baseColor="100, 100, 130"
                accentColor="124, 58, 237"
                lineOpacity={0.12}
                mouseRadius={200}
                mouseStrength={130}
                springStiffness={0.1}
                springDamping={0.68}
                lineWidth={0.8}
              />

              {/* ── Scrollable content layer (sits above canvas at z-index:1) ── */}
              <div className="contact-modal-scroll-inner">
                {/* Close Button */}
                <button
                  className="contact-modal-close"
                  onClick={handleClose}
                  aria-label="Close contact form"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Ambient Radial Glow */}
                <div className="contact-modal-glow" />

                {/* Two-column layout container */}
                <div className="contact-layout-wrapper">
                  {/* Left Column: Heading & Social Row */}
                  <div className="contact-left-info">
                    <p className="section-label">CONTACT</p>

                    <h2 className="contact-title-heading">
                      Let's build something
                      <br />
                      <span className="gradient-text">great together</span>
                    </h2>

                    <p className="contact-desc-subtitle">
                      Open to freelance, contracts & full-time roles.
                    </p>

                    {/* Direct Email Pill */}
                    <div className="contact-direct-email">
                      <a href="mailto:jaffreenmarinvanan4@gmail.com" className="contact-email-link" title="Send direct email to Jaffreen">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2"/>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        <span>jaffreenmarinvanan4@gmail.com</span>
                      </a>
                    </div>

                    {/* Social Row aligned on the left */}
                    <div className="contact-socials-row">
                      <SpecularButton
                        size="sm"
                        radius={18}
                        lineColor="#7c3aed"
                        href="https://github.com/Jaffreenmarinvanan"
                      >
                        GitHub
                      </SpecularButton>
                      <SpecularButton
                        size="sm"
                        radius={18}
                        lineColor="#06b6d4"
                        href="https://www.linkedin.com/in/jaffreen-marainvanan-08a379227/"
                      >
                        LinkedIn
                      </SpecularButton>
                      <SpecularButton
                        size="sm"
                        radius={18}
                        lineColor="#a855f7"
                        href="https://x.com/jaffreen_m"
                      >
                        X
                      </SpecularButton>
                    </div>
                  </div>

                  {/* Right Column: Stepper Form */}
                  <div className="contact-right-stepper">
                    <ContactStepper />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;

