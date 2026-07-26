import React from 'react';
import TiltCard from '../components/TiltCard';

const projectItems = [
  {
    title: 'Portfolio Dashboard',
    desc: 'A real-time analytics dashboard with live charts, WebSocket data feeds, and role-based access control.',
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    accent: '#7c3aed',
  },
  {
    title: 'AI Content Generator',
    desc: 'Full-stack SaaS app that uses LLMs to generate SEO-optimised blog content with one click.',
    tags: ['Next.js', 'Python', 'FastAPI', 'OpenAI'],
    accent: '#06b6d4',
  },
  {
    title: 'E-Commerce API',
    desc: 'REST API with auth, inventory management, Stripe payments, and an admin dashboard.',
    tags: ['Node.js', 'Express', 'MySQL', 'Stripe'],
    accent: '#a855f7',
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="section-animate"
      style={{
        padding: '100px 24px 80px',
      }}
    >
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <p className="section-label">Projects</p>
        <h2 className="section-heading">Selected Work</h2>
      </div>

      <div className="bento-grid">
        {projectItems.map((item, i) => (
          <TiltCard
            key={i}
            index={i}
            title={item.title}
            desc={item.desc}
            tags={item.tags}
            accent={item.accent}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
