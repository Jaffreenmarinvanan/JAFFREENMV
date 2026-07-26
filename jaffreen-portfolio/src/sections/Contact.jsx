import React from 'react';
import ContactStepper from './ContactStepper';
import SpecularButton from '../components/SpecularButton';
import './Contact.css';

const Contact = () => {
  return (
    <section
      id="contact"
      className="section-animate"
      style={{
        position: 'relative',
        padding: '120px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main two-column container */}
      <div className="contact-layout-wrapper">

        {/* Left Column: Heading & Social Row */}
        <div className="contact-left-info">
          <p className="section-label">Contact</p>

          <h2 className="contact-title-heading">
            Let's build something
            <br />
            <span className="gradient-text">great together</span>
          </h2>

          <p className="contact-desc-subtitle">
            Open to freelance, contracts & full-time roles.
          </p>

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
    </section>
  );
};

export default Contact;
