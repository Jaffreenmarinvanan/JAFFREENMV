import React from 'react';
import Tilt from 'react-parallax-tilt';
import { FaNodeJs, FaReact, FaPython, FaFigma } from 'react-icons/fa';
import './FloatingBadge.css';

const iconMap = {
  'node.js': <FaNodeJs className="pill-badge__icon pill-badge__icon--node" />,
  'react': <FaReact className="pill-badge__icon pill-badge__icon--react" />,
  'python': <FaPython className="pill-badge__icon pill-badge__icon--python" />,
  'figma': <FaFigma className="pill-badge__icon pill-badge__icon--figma" />,
};

const FloatingBadge = ({
  avatarSrc = '/profile.jpg',
  tags = [
    { label: 'node.js', position: 'top-left' },
    { label: 'react', position: 'top-right' },
    { label: 'python', position: 'bottom-left' },
    { label: 'figma', position: 'bottom-right' },
  ],
}) => {
  return (
    <div className="badge-container">
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="32px"
        scale={1.02}
        transitionSpeed={400}
      >
        <div className="badge-card">
          <img
            className="badge-card__image"
            src={avatarSrc}
            alt="Jaffreen Maraivanan"
            loading="eager"
          />

          {tags.map((tag) => (
            <div
              key={tag.label}
              className={`pill-badge pill-badge--${tag.position}`}
            >
              {iconMap[tag.label]}
              <span className="pill-badge__text">{tag.label}</span>
            </div>
          ))}
        </div>
      </Tilt>
    </div>
  );
};

export default FloatingBadge;
