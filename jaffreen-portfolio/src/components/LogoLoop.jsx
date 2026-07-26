import React, { useRef, useEffect, useState } from 'react';
import './LogoLoop.css';

const LogoLoop = ({
  items = [],
  speed = 85,
  direction = 'left',
  logoHeight = 54,
  gap = 52,
  fadeOut = true,
  fadeOutColor = '#05050f',
  scaleOnHover = true,
  hoverSpeed = 0,
}) => {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  /* The duration scales inversely with speed */
  const duration = items.length > 0 ? (items.length * (logoHeight + gap)) / speed * 2 : 20;
  const dir = direction === 'right' ? 'reverse' : 'normal';

  return (
    <div
      className={`logo-loop-wrapper ${fadeOut ? 'logo-loop-wrapper--fade' : ''}`}
      style={{ '--fade-color': fadeOutColor }}
      onMouseEnter={() => scaleOnHover && hoverSpeed === 0 && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="logo-loop-track"
        style={{
          gap: gap + 'px',
          animation: `logo-scroll ${duration}s linear infinite ${dir}`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="logo-loop-item"
            style={{
              height: logoHeight + 20,
              borderColor: `${item.color}33`,
            }}
          >
            {item.icon ? (
              <span
                className="logo-loop-item__monogram"
                style={{ color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {item.icon}
              </span>
            ) : (
              <span
                className="logo-loop-item__monogram"
                style={{ color: item.color }}
              >
                {item.monogram}
              </span>
            )}
            <span className="logo-loop-item__label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
