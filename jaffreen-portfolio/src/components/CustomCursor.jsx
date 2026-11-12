import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * ─────────────────────────────────────────────────────────────────────────────
 * Fluid, magnetic cursor follower with interactive hover states.
 * Automatically disabled on touch screens and prefers-reduced-motion devices.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only enable on precise pointer devices (desktops/laptops with a mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isReduced) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering interactive target
      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive-target') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      );
      setHovered(!!isInteractive);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth lerp loop for the outer ring
    const render = () => {
      const lerp = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#06b6d4',
          pointerEvents: 'none',
          zIndex: 10000,
          marginTop: '-3px',
          marginLeft: '-3px',
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
          boxShadow: '0 0 8px rgba(6, 182, 212, 0.8)',
        }}
      />

      {/* Smooth Ambient Follower Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovered ? '44px' : '28px',
          height: hovered ? '44px' : '28px',
          borderRadius: '50%',
          border: hovered ? '1.5px solid rgba(168, 85, 247, 0.8)' : '1px solid rgba(124, 58, 237, 0.4)',
          backgroundColor: hovered ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          marginTop: hovered ? '-22px' : '-14px',
          marginLeft: hovered ? '-22px' : '-14px',
          willChange: 'transform, width, height',
          transform: clicked ? 'scale(0.85)' : 'scale(1)',
          transition: 'width 0.2s cubic-bezier(0.2, 0, 0, 1), height 0.2s cubic-bezier(0.2, 0, 0, 1), border 0.2s ease, background-color 0.2s ease, transform 0.15s ease',
          boxShadow: hovered ? '0 0 16px rgba(124, 58, 237, 0.4)' : 'none',
          backdropFilter: hovered ? 'blur(1px)' : 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;

