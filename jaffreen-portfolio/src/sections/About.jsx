import React from 'react';
import HexagonWireframe from '../components/HexagonWireframe';

const About = () => {
  return (
    <section
      id="about"
      className="section-animate"
      style={{
        padding: '120px 24px',
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <p className="section-label stagger-child">About Me</p>
      <h2 className="section-heading stagger-child">Turning ideas into real digital products</h2>

      <div
        className="about-grid stagger-child"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'start',
        }}
      >
        {/* Text */}
        <div>
          <p
            style={{
              color: 'var(--fg)',
              fontSize: 18,
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            I'm a full-stack developer with a deep passion for building complete
            digital products — from the ground up. I care about clean code,
            thoughtful architecture, and creating user experiences that feel
            effortless. Every project is an opportunity to craft something that
            truly works.
          </p>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 18,
              lineHeight: 1.75,
            }}
          >
            I'm currently open to freelance projects, contract work, and
            full-time opportunities. Based in Ambur, I love collaborating
            with teams across the globe to ship products that make a real impact.
          </p>
        </div>

        {/* 3D Hexagon Wireframe */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <HexagonWireframe />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          #about {
            padding: 80px 20px !important;
          }
          #about .section-heading {
            font-size: clamp(22px, 6vw, 32px) !important;
          }
          #about p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
