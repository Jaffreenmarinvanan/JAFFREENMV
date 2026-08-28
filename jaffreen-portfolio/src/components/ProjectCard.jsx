import React from 'react';
import { FaGithub, FaPlayCircle } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ desc, image, demoLink, repoLink }) => {
  return (
    <div className="project-card-new">
      <div className="project-card-new__img-wrapper">
        <img src={image} alt="Project demo" loading="lazy" />
      </div>
      <div className="project-card-new__content">
        <p className="project-card-new__desc">{desc}</p>
        
        <div className="project-card-new__actions">
          <a
            href={repoLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-btn repo-btn"
          >
            Repository <FaGithub />
          </a>
          <a
            href={demoLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-btn demo-btn"
          >
            Demo <FaPlayCircle />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
