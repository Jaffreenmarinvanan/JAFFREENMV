import React, { useRef, useEffect, useState } from 'react';
import './SpecularButton.css';

const SpecularButton = ({
  children,
  size = 'md',
  radius = 22,
  lineColor = '#7c3aed',
  autoAnimate = false,
  followMouse = false,
  intensity = 1,
  type = 'button',
  disabled = false,
  onClick,
  href,
  className = '',
  style = {},
  ...rest
}) => {
  const btnRef = useRef(null);
  const glowRef = useRef(null);
  const [perimeter, setPerimeter] = useState(300);

  useEffect(() => {
    if (!btnRef.current) return;
    const { offsetWidth: w, offsetHeight: h } = btnRef.current;
    setPerimeter(2 * (w + h));
  }, [children, size]);

  useEffect(() => {
    if (!followMouse || !btnRef.current || !glowRef.current || disabled) return;
    const btn = btnRef.current;
    const glow = glowRef.current;

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = x - 30 + 'px';
      glow.style.top = y - 30 + 'px';
      glow.style.opacity = 0.55 * intensity;
    };
    const onLeave = () => { glow.style.opacity = 0; };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, [followMouse, intensity, disabled]);

  const Tag = href ? 'a' : 'button';
  const tagProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { type, disabled };

  return (
    <Tag
      ref={btnRef}
      className={`specular-btn specular-btn--${size} ${autoAnimate && !disabled ? 'specular-btn--animate' : ''} ${disabled ? 'specular-btn--disabled' : ''} ${className}`}
      style={{ borderRadius: radius, opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
      onClick={disabled ? undefined : onClick}
      {...tagProps}
      {...rest}
    >
      <span className="specular-btn__glass" style={{ borderRadius: radius - 1 }} />
      <span
        ref={glowRef}
        className="specular-btn__glow"
        style={{ background: lineColor }}
      />
      <span className="specular-btn__border" style={{ borderRadius: radius }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx={radius}
            stroke={lineColor}
            strokeDasharray={`${perimeter * 0.3} ${perimeter * 0.7}`}
            strokeDashoffset="0"
            strokeOpacity={0.6 * intensity}
          />
        </svg>
      </span>
      <span className="specular-btn__text">{children}</span>
    </Tag>
  );
};

export default SpecularButton;
