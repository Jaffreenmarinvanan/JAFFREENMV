import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

// Real projects can be added here whenever you are ready:
const projectItems = [
  /* Example format for your real projects:
  {
    title: 'Your Project Name',
    desc: 'Description of the problem solved, stack used, and outcomes achieved.',
    category: 'Web Application', // 'Web Application' | 'Mobile application'
    image: '/project_preview.png',
    repoLink: 'https://github.com/Jaffreenmarinvanan/repo',
    demoLink: 'https://your-live-demo.com',
  }
  */
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
      <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 'bold', marginBottom: '40px', color: '#fff', textAlign: 'center' }}>
        My Projects
      </h2>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => setActiveCategory('Web Application')}
          style={{
            padding: 'clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px)',
            borderRadius: '99px',
            border: activeCategory !== 'Web Application' ? '1px solid rgba(255,255,255,0.2)' : 'none',
            background: activeCategory === 'Web Application' ? 'linear-gradient(90deg, #a855f7, #ec4899)' : 'transparent',
            color: activeCategory === 'Web Application' ? '#fff' : 'var(--muted)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 'clamp(13px, 3vw, 15px)',
            transition: 'all 0.3s ease',
            boxShadow: activeCategory === 'Web Application' ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
          }}
        >
          Web Application
        </button>
        <button
          onClick={() => setActiveCategory('Mobile application')}
          style={{
            padding: 'clamp(8px, 2vw, 12px) clamp(16px, 3vw, 24px)',
            borderRadius: '99px',
            border: activeCategory !== 'Mobile application' ? '1px solid rgba(255,255,255,0.2)' : 'none',
            background: activeCategory === 'Mobile application' ? 'linear-gradient(90deg, #a855f7, #ec4899)' : 'transparent',
            color: activeCategory === 'Mobile application' ? '#fff' : 'var(--muted)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 'clamp(13px, 3vw, 15px)',
            transition: 'all 0.3s ease',
            boxShadow: activeCategory === 'Mobile application' ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
          }}
        >
          Mobile application
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', 
        gap: '20px', 
        width: '100%', 
        maxWidth: '1200px' 
      }}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((item, i) => (
            <ProjectCard
              key={i}
              desc={item.desc}
              image={item.image}
              video={item.video}
              repoLink={item.repoLink}
              demoLink={item.demoLink}
            />
          ))
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '60px 24px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            color: 'var(--muted)',
          }}>
            <p style={{ fontSize: '18px', color: '#fff', marginBottom: '8px', fontWeight: 600 }}>
              🚀 Featured Projects Coming Soon
            </p>
            <p style={{ fontSize: '14px', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
              Currently updating showcase projects. Reach out via the contact form to discuss custom solutions!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
