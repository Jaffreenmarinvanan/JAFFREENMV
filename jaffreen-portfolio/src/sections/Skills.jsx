import React from 'react';
import LogoLoop from '../components/LogoLoop';
import Threads from '../components/Threads';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws, FaFigma, FaCode, FaServer, FaCloud } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb } from 'react-icons/si';
import soundManager from '../utils/soundManager';

const skillItems = [
  { name: 'React',       icon: <FaReact size={28} />,       color: '#61DAFB' },
  { name: 'Next.js',     icon: <SiNextdotjs size={28} />,   color: 'var(--fg)' },
  { name: 'TypeScript',  icon: <SiTypescript size={28} />,   color: '#3178C6' },
  { name: 'Node.js',     icon: <FaNodeJs size={28} />,      color: '#339933' },
  { name: 'Python',      icon: <FaPython size={28} />,      color: '#FFD43B' },
  { name: 'TailwindCSS', icon: <SiTailwindcss size={28} />, color: '#06B6D4' },
  { name: 'Docker',      icon: <FaDocker size={28} />,      color: '#2496ED' },
  { name: 'PostgreSQL',  icon: <SiPostgresql size={28} />,  color: '#4169E1' },
  { name: 'Git',         icon: <FaGitAlt size={28} />,      color: '#F05032' },
  { name: 'MongoDB',     icon: <SiMongodb size={28} />,     color: '#47A248' },
  { name: 'AWS',         icon: <FaAws size={28} />,         color: '#FF9900' },
  { name: 'Figma',       icon: <FaFigma size={28} />,       color: '#F24E1E' },
];

const pillars = [
  {
    icon: <FaCode size={22} color="#06b6d4" />,
    title: 'Frontend & Creative UI',
    subtitle: 'Pixel-perfect, 60fps interactive interfaces',
    tags: ['React 19', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP & Motion', 'Three.js'],
  },
  {
    icon: <FaServer size={22} color="#a855f7" />,
    title: 'Backend & Custom APIs',
    subtitle: 'Secure, high-availability data pipelines',
    tags: ['Node.js', 'Express', 'Python', 'Email Automation', 'Rate Limiting', 'REST APIs'],
  },
  {
    icon: <FaCloud size={22} color="#3b82f6" />,
    title: 'Database & DevOps',
    subtitle: 'Scalable deployment & containerization',
    tags: ['PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git / GitHub', 'Vercel'],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="section-animate skills-section"
      style={{
        position: 'relative',
        padding: '110px 0 100px',
        background: 'var(--bg-2)',
        overflow: 'hidden',
      }}
    >
      {/* Threads animated background canvas */}
      <Threads
        color={[0.49, 0.23, 0.93]}
        amplitude={1.2}
        distance={0.3}
        enableMouseInteraction={true}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <p className="section-label">SKILL</p>
        <h2 className="section-heading">PROFESSIONAL SKILLS & EXPERTISE</h2>
      </div>

      {/* Dynamic Animated Logo Loop */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 54 }}>
        <LogoLoop
          items={skillItems}
          speed={85}
          direction="right"
          logoHeight={54}
          gap={52}
          fadeOut={true}
          fadeOutColor="var(--bg-2)"
          scaleOnHover={true}
          hoverSpeed={0}
        />
      </div>

      {/* Interactive Pillars of Engineering */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
        <div className="skills-pillars-grid">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="skills-pillar-card"
              onMouseEnter={() => soundManager.hover()}
            >
              <div className="pillar-header">
                <div className="pillar-icon-box">{pillar.icon}</div>
                <div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-subtitle">{pillar.subtitle}</p>
                </div>
              </div>
              <div className="pillar-tags">
                {pillar.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="pillar-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .skills-pillar-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px 22px;
          backdrop-filter: blur(12px);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .skills-pillar-card:hover {
          transform: translateY(-5px);
          background: rgba(124, 58, 237, 0.08);
          border-color: rgba(168, 85, 247, 0.45);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35), 0 0 24px rgba(124, 58, 237, 0.2);
        }

        .pillar-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 20px;
        }

        .pillar-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--fg);
          margin-bottom: 4px;
        }

        .pillar-subtitle {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.4;
        }

        .pillar-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pillar-tag {
          font-size: 11.5px;
          font-weight: 500;
          color: #c4b5fd;
          background: rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          padding: 4px 10px;
          border-radius: 99px;
          transition: all 0.2s ease;
        }

        .skills-pillar-card:hover .pillar-tag {
          background: rgba(124, 58, 237, 0.2);
          border-color: rgba(168, 85, 247, 0.4);
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .skills-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .skills-section {
            padding: 70px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
