import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const projectItems = [
  {
    title: 'Portfolio Dashboard',
    desc: 'A clean, focused checkout UI for an e-commerce platform. Designed to reduce friction and maximize conversions through clear layout, validation, and trust-building elements.',
    category: 'Web Application',
    image: '/demo_ecommerce.png',
    repoLink: 'https://github.com',
    demoLink: 'https://demo.com',
  },
  {
    title: 'AI Content Generator',
    desc: 'Clinic management dashboard built for clarity and efficiency. Prioritizes quick access to patient data, appointment stats, and admin tools via clear layout and visual hierarchy.',
    category: 'Web Application',
    image: '/demo_dashboard.png',
    repoLink: 'https://github.com',
    demoLink: 'https://demo.com',
  },
  {
    title: 'Corporate Website',
    desc: 'Corporate website for an Algerian agri-food distributor, focused on trust-building through clear structure, strong visuals, and intuitive navigation.',
    category: 'Web Application',
    image: '/demo_ai_app.png',
    repoLink: 'https://github.com',
    demoLink: 'https://demo.com',
  },
  {
    title: 'Mobile App 1',
    desc: 'A beautiful mobile application interface with fluid animations and responsive design elements.',
    category: 'Mobile application',
    image: '/demo_dashboard.png',
    repoLink: 'https://github.com',
    demoLink: 'https://demo.com',
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('Web Application');
  
  const filteredProjects = projectItems.filter(p => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="section-animate"
      style={{
        padding: '100px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '40px', color: '#fff' }}>
        My Projects
      </h2>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
        <button
          onClick={() => setActiveCategory('Web Application')}
          style={{
            padding: '12px 24px',
            borderRadius: '99px',
            border: activeCategory !== 'Web Application' ? '1px solid rgba(255,255,255,0.2)' : 'none',
            background: activeCategory === 'Web Application' ? 'linear-gradient(90deg, #a855f7, #ec4899)' : 'transparent',
            color: activeCategory === 'Web Application' ? '#fff' : 'var(--muted)',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            boxShadow: activeCategory === 'Web Application' ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
          }}
        >
          Web Application
        </button>
        <button
          onClick={() => setActiveCategory('Mobile application')}
          style={{
            padding: '12px 24px',
            borderRadius: '99px',
            border: activeCategory !== 'Mobile application' ? '1px solid rgba(255,255,255,0.2)' : 'none',
            background: activeCategory === 'Mobile application' ? 'linear-gradient(90deg, #a855f7, #ec4899)' : 'transparent',
            color: activeCategory === 'Mobile application' ? '#fff' : 'var(--muted)',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            boxShadow: activeCategory === 'Mobile application' ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
          }}
        >
          Mobile application
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px', 
        width: '100%', 
        maxWidth: '1200px' 
      }}>
        {filteredProjects.map((item, i) => (
          <ProjectCard
            key={i}
            desc={item.desc}
            image={item.image}
            repoLink={item.repoLink}
            demoLink={item.demoLink}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
