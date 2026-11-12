import React from 'react';
import LogoLoop from '../components/LogoLoop';
import Threads from '../components/Threads';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaAws, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb } from 'react-icons/si';

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

const Skills = () => {
  return (
    <section
      id="skills"
      className="section-animate skills-section"
      style={{
        position: 'relative',
        padding: '100px 0',
        background: 'var(--bg-2)',
        overflow: 'hidden',
      }}
    >
      {/* Threads animated background — CSS positions it absolute/inset:0 */}
      <Threads
        color={[0.49, 0.23, 0.93]}
        amplitude={1.2}
        distance={0.3}
        enableMouseInteraction={true}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        <p className="section-label stagger-child">SKILL</p>
        <h2 className="section-heading stagger-child">PROFESSIONAL SKILLS</h2>
      </div>

      <div className="stagger-child" style={{ position: 'relative', zIndex: 1 }}>
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

      <style>{`
        @media (max-width: 768px) {
          .skills-section {
            padding: 60px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
