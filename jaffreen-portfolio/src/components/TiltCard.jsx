import React, { useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import SpecularButton from './SpecularButton';
import './TiltCard.css';

const TiltCard = ({ index, title, desc, tags, accent }) => {
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.left = x - 60 + 'px';
    glowRef.current.style.top = y - 60 + 'px';
  };

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor={accent}
      glarePosition="all"
      glareBorderRadius="24px"
      scale={1.02}
      transitionSpeed={400}
    >
      <div className="tilt-card" onMouseMove={handleMouseMove}>
        <div
          className="tilt-card__accent"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
        />
        <div
          ref={glowRef}
          className="tilt-card__glow"
          style={{ background: accent }}
        />
        <div className="tilt-card__inner">
          <div className="tilt-card__number" style={{ color: accent }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="tilt-card__title">{title}</h3>
          <p className="tilt-card__desc">{desc}</p>
          <div className="tilt-card__tags">
            {tags.map((tag, j) => (
              <span key={j} className="tilt-card__tag">{tag}</span>
            ))}
          </div>
          <SpecularButton size="sm" radius={14} lineColor={accent}>
            View Project →
          </SpecularButton>
        </div>
      </div>
    </Tilt>
  );
};

export default TiltCard;
