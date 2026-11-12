import React from 'react';
import HexagonWireframe from '../components/HexagonWireframe';
import soundManager from '../utils/soundManager';

const stats = [
  { value: '100%', label: 'Delivery Rate', desc: 'Custom API inbox reliability' },
  { value: '15+', label: 'Tech Stack', desc: 'React, Next, Node, Python, Docker' },
  { value: '60 FPS', label: 'Cinematic Motion', desc: 'GPU accelerated web animations' },
  { value: 'Open', label: 'Availability', desc: 'Freelance & Full-time contracts' },
];

const About = () => {
  return (
    <section
      id="about"
      className="section-animate"
      style={{
        padding: '120px 24px',
        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      <p className="section-label">About Me</p>
      <h2 className="section-heading">Turning ideas into real digital products</h2>

      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 48,
          alignItems: 'center',
          marginBottom: 48,
        }}
      >
        {/* Text column */}
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

        {/* 3D Hexagon Wireframe with ambient backdrop */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div className="about-wireframe-glow" />
          <HexagonWireframe />
        </div>
      </div>

      {/* Interactive Highlights / Metric Tiles */}
      <div className="about-stats-grid">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="about-stat-card"
            onMouseEnter={() => soundManager.hover()}
          >
            <div className="about-stat-value gradient-text-wide">{stat.value}</div>
            <div className="about-stat-label">{stat.label}</div>
            <div className="about-stat-desc">{stat.desc}</div>
          </div>
        ))}
      </div>

      <style>{`
        .about-wireframe-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 20px;
        }

        .about-stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 18px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(8px);
        }

        .about-stat-card:hover {
          transform: translateY(-4px);
          background: rgba(124, 58, 237, 0.08);
          border-color: rgba(168, 85, 247, 0.4);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(124, 58, 237, 0.2);
        }

        .about-stat-value {
          font-size: clamp(24px, 2.5vw, 32px);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }

        .about-stat-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--fg);
          margin-bottom: 4px;
        }

        .about-stat-desc {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.4;
        }

        @media (max-width: 868px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
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

        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
