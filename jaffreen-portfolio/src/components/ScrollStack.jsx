import React, { useRef, useEffect, useState } from 'react';
import './ScrollStack.css';
import GlassSurface from './GlassSurface';
import SpecularButton from './SpecularButton';

const ScrollStack = ({
  items = [],
  itemDistance = 130,
  itemScale = 0.038,
  baseScale = 0.87,
  rotationAmount = 0,
  blurAmount = 2.5,
}) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      const idx = Math.min(
        items.length - 1,
        Math.max(0, Math.floor(scrollProgress * items.length))
      );
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items.length]);

  return (
    <div
      ref={containerRef}
      className="scroll-stack-container"
      style={{ height: items.length * 60 + 'vh' }}
    >
      <div className="scroll-stack-sticky">
        {items.map((item, i) => {
          const offset = i - activeIndex;
          const yShift = offset * itemDistance;
          const scale = baseScale + (items.length - Math.abs(offset)) * itemScale;
          const blur = Math.abs(offset) * blurAmount;
          const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2;

          return (
            <div
              key={i}
              className="scroll-stack-card"
              style={{
                transform: `translateY(${yShift}px) scale(${Math.min(1, scale)})`,
                filter: `blur(${blur}px)`,
                opacity,
                zIndex: items.length - Math.abs(offset),
              }}
            >
              <GlassSurface borderRadius={24}>
                <div className="scroll-stack-card__inner">
                  <div
                    className="scroll-stack-card__accent"
                    style={{
                      background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                    }}
                  />
                  <div
                    className="scroll-stack-card__number"
                    style={{ color: item.accent }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="scroll-stack-card__title">{item.title}</h3>
                  <p className="scroll-stack-card__desc">{item.desc}</p>
                  <div className="scroll-stack-card__tags">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="scroll-stack-card__tag">{tag}</span>
                    ))}
                  </div>
                  <SpecularButton
                    size="sm"
                    radius={14}
                    lineColor={item.accent}
                  >
                    View Project →
                  </SpecularButton>
                </div>
              </GlassSurface>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollStack;
