import React, { useRef, useEffect } from 'react';
import './GlassSurface.css';

const GlassSurface = ({
  children,
  borderRadius = 18,
  blur = 14,
  backgroundOpacity = 0.04,
  distortionScale = -100,
  className = '',
  style = {},
  as: Tag = 'div',
  ...rest
}) => {
  const surfaceRef = useRef(null);

  useEffect(() => {
    const el = surfaceRef.current;
    if (!el || distortionScale === 0) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--distort-x', x + '%');
      el.style.setProperty('--distort-y', y + '%');
    };

    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [distortionScale]);

  return (
    <Tag
      ref={surfaceRef}
      className={`glass-surface ${className}`}
      style={{
        borderRadius,
        '--glass-blur': blur + 'px',
        '--glass-opacity': backgroundOpacity,
        ...style,
      }}
      {...rest}
    >
      <div className="glass-surface__distort" />
      <div className="glass-surface__content">
        {children}
      </div>
    </Tag>
  );
};

export default GlassSurface;
