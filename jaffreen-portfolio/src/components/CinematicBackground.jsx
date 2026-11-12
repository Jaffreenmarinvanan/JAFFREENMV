import React, { useEffect, useRef } from 'react';

/**
 * CinematicBackground
 * ─────────────────────────────────────────────────────────────────────────────
 * High-performance ambient particle canvas with subtle mouse-reactive physics.
 * Adds cinematic depth and subtle floating luminosity to the viewport.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const CinematicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    };

    // Responsive particle count (fewer on mobile for 60fps)
    const particleCount = width < 768 ? 32 : 65;
    const particles = [];

    const colors = [
      'rgba(124, 58, 237, ',  // Purple
      'rgba(6, 182, 212, ',   // Cyan
      'rgba(168, 85, 247, ',  // Violet
      'rgba(240, 240, 255, ', // Starlight white
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Pulse opacity
          p.pulseVal += p.pulseSpeed;
        }

        // Mouse proximity deflection
        let displayX = p.x;
        let displayY = p.y;

        if (mouse.active && !prefersReducedMotion) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 22;
            displayX -= (dx / dist) * force;
            displayY -= (dy / dist) * force;
          }
        }

        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.12;
        const boundedAlpha = Math.max(0.05, Math.min(0.65, currentAlpha));

        ctx.beginPath();
        ctx.arc(displayX, displayY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${boundedAlpha})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = `${p.colorBase}0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
};

export default CinematicBackground;

