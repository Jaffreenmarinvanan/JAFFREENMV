import React, { useEffect, useRef, useCallback } from 'react';

/**
 * InteractiveLines — Premium vertical lines with high-response mouse repulsion.
 *
 * Design:
 *  • Evenly-spaced vertical lines fill the canvas
 *  • Lines are drawn as smooth cubic Bézier paths that bow left/right under mouse force
 *  • Mouse repulsion is strong and immediate — lines dramatically bend away
 *  • Spring physics: lines snap back with damping once the cursor moves away
 *  • Subtle purple/cyan color shift at the repulsion zone
 *  • Fully responsive, zero dependencies beyond React
 */
const InteractiveLines = ({
  lineCount = 60,
  baseColor = '130, 130, 160',
  accentColor = '124, 58, 237',
  lineOpacity = 0.18,
  mouseRadius = 200,      // px — influence radius
  mouseStrength = 130,    // px — max lateral bend at cursor center
  springStiffness = 0.08, // how fast lines spring back (0.01 slow … 0.2 fast)
  springDamping = 0.72,   // velocity damping per frame (0–1, lower = more bounce)
  lineWidth = 0.9,
}) => {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(null);

  // Per-line spring state: current offset & velocity
  const springs  = useRef([]);

  // ── parse RGB helper ──────────────────────────────────────────────────────
  const parseRGB = (s) => s.split(',').map(Number);

  // ── resize ────────────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Re-initialise spring array to match line count
    if (springs.current.length !== lineCount) {
      springs.current = Array.from({ length: lineCount }, () => ({
        offset: 0,   // current lateral displacement (px)
        vel:    0,   // velocity
      }));
    }
  }, [lineCount]);

  // ── draw loop ─────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W   = canvas.width;
    const H   = canvas.height;
    const mx  = mouse.current.x;
    const my  = mouse.current.y;

    ctx.clearRect(0, 0, W, H);

    const base   = parseRGB(baseColor);
    const accent = parseRGB(accentColor);

    for (let i = 0; i < lineCount; i++) {
      // Natural x position of this line
      const xNatural = (i / (lineCount - 1)) * W;

      // ── Mouse repulsion target ──────────────────────────────────────────
      // Compute the closest point on the vertical line to the mouse
      const dx          = xNatural - mx;
      const distToLine  = Math.abs(dx);

      let targetOffset = 0;

      if (distToLine < mouseRadius) {
        const t         = 1 - distToLine / mouseRadius;
        const smooth    = t * t * (3 - 2 * t); // smoothstep
        // Push direction: away from cursor (sign of dx)
        const direction = dx >= 0 ? 1 : -1;
        targetOffset    = direction * smooth * mouseStrength;
      }

      // ── Spring physics ──────────────────────────────────────────────────
      const sp   = springs.current[i];
      const err  = targetOffset - sp.offset;
      sp.vel     = sp.vel * springDamping + err * springStiffness;
      sp.offset += sp.vel;

      const xActual = xNatural + sp.offset;

      // ── Color blend based on repulsion amount ───────────────────────────
      const blend   = Math.min(Math.abs(sp.offset) / mouseStrength, 1);
      const r = Math.round(base[0] * (1 - blend) + accent[0] * blend);
      const g = Math.round(base[1] * (1 - blend) + accent[1] * blend);
      const b = Math.round(base[2] * (1 - blend) + accent[2] * blend);
      const a = lineOpacity + blend * 0.5;

      ctx.beginPath();

      // Draw line as vertical cubic Bézier:
      //   control points bow the line horizontally based on displacement,
      //   giving an organic "rubber band" look rather than a rigid shift.
      const topX    = xNatural;                     // anchored at top
      const botX    = xNatural;                     // anchored at bottom
      const cp1x    = xActual;                      // control point near top 1/3
      const cp2x    = xActual;                      // control point near bottom 2/3
      const cp1y    = H * 0.33;
      const cp2y    = H * 0.67;

      ctx.moveTo(topX, 0);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, botX, H);

      ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
      ctx.lineWidth   = lineWidth + blend * 0.8;
      ctx.stroke();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [lineCount, baseColor, accentColor, lineOpacity, mouseRadius, mouseStrength, springStiffness, springDamping, lineWidth]);

  // ── lifecycle ─────────────────────────────────────────────────────────────
  useEffect(() => {
    resize();
    const canvas = canvasRef.current;
    const ro     = new ResizeObserver(resize);
    ro.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [resize, draw]);

  // ── mouse events ──────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouse.current = { x: -9999, y: -9999 };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'all',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
};

export default InteractiveLines;
