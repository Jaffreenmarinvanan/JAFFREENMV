import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import soundManager from '../utils/soundManager';

// Real projects sourced from Jaffreen's portfolio and repositories:
const projectItems = [
 /*
    title: 'Contact API & 100% Inbox Delivery Engine',
    desc: 'Production-grade custom backend platform with multi-provider failover (SMTP & Resend), bot honeypot filter, rate limiting, and zero-data-loss inquiry storage.',
    category: 'Web Application',
    image: '/profile.jpg',
    repoLink: 'https://github.com/Jaffreenmarinvanan/JAFFREENMV',
    demoLink: 'https://github.com/Jaffreenmarinvanan/JAFFREENMV',
  },
  {
    title: 'Marvel Universe Interactive Hub',
    desc: 'Interactive web application exploring Marvel Cinematic Universe characters, multimedia elements, and storyline lore.',
    category: 'Web Application',
    image: '/profile.jpg',
    repoLink: 'https://github.com/Jaffreenmarinvanan/marvel',
    demoLink: 'https://github.com/Jaffreenmarinvanan/marvel',
  },
  {
    title: 'Naan Mudhalvan Skill Initiative Platform',
    desc: 'Educational learning and technical skill-development platform built for students under the Tamil Nadu Naan Mudhalvan initiative.',
    category: 'Web Application',
    image: '/profile.jpg',
    repoLink: 'https://github.com/Jaffreenmarinvanan/Naanmudhalvan',
    demoLink: 'https://github.com/Jaffreenmarinvanan/Naanmudhalvan',
  },*/
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('Web Application');
  
  const filteredProjects = projectItems.filter(p => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="section-animate"
      style={{
        padding: 'clamp(60px, 10vw, 100px) clamp(16px, 4vw, 24px) 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 className="stagger-child" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 'bold', marginBottom: '40px', color: '#fff', textAlign: 'center' }}>
        Featured Projects
      </h2>

      <div className="stagger-child" style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => {
            soundManager.play('click');
            setActiveCategory('Web Application');
          }}
          style={{
            padding: 'clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px)',
            borderRadius: '99px',
            border: activeCategory !== 'Web Application' ? '1px solid rgba(255,255,255,0.2)' : 'none',
            background: activeCategory === 'Web Application' ? 'linear-gradient(90deg, #a855f7, #ec4899)' : 'transparent',
            color: activeCategory === 'Web Application' ? '#fff' : 'var(--muted)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 'clamp(13px, 3vw, 15px)',
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1), background 180ms ease',
            boxShadow: activeCategory === 'Web Application' ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Web Applications
        </button>
      </div>

      <div className="stagger-child" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', 
        gap: '24px', 
        width: '100%', 
        maxWidth: '1200px' 
      }}>
        {filteredProjects.map((item, i) => (
          <ProjectCard
            key={i}
            desc={item.desc}
            image={item.image}
            video={item.video}
            repoLink={item.repoLink}
            demoLink={item.demoLink}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
