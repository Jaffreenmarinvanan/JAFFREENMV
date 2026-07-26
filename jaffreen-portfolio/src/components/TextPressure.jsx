/* ── TextPressure ─────────────────────────── */
import React, { useRef, useEffect, useCallback, useState } from 'react';

const TextPressure = ({
  text = 'HELLO!',
  fontFamily = "'Roboto Flex', sans-serif",
  fontUrl = '',
  width = true,
  weight = true,
  italic = true,
  textColor = '#ffffff',
  strokeColor = 'transparent',
  strokeWidth = 0,
  minFontSize = 56,
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);

  const setSpanRefs = useCallback((el, i) => {
    spansRef.current[i] = el;
  }, []);

  /* Measure & set font size */
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !titleRef.current) return;
      const cw = containerRef.current.offsetWidth;
      let fs = minFontSize;
      titleRef.current.style.fontSize = fs + 'px';
      while (titleRef.current.scrollWidth <= cw && fs < 600) {
        fs++;
        titleRef.current.style.fontSize = fs + 'px';
      }
      setFontSize(fs - 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [text, minFontSize]);

  /* Cursor tracking */
  useEffect(() => {
    const onMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      cursorRef.current = { x: t.clientX, y: t.clientY };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  /* Animation loop */
  useEffect(() => {
    let raf;
    const loop = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.15;

      spansRef.current.forEach((span) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseRef.current.x - cx;
        const dy = mouseRef.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 400;
        const proximity = Math.max(0, 1 - dist / maxDist);

        const wght = weight ? Math.round(100 + proximity * 800) : 400;
        const wdth = width ? Math.round(100 + proximity * 50) : 100;
        const ital = italic ? proximity : 0;

        span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [weight, width, italic]);

  const letters = text.split('');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
      }}
    >
      <h1
        ref={titleRef}
        style={{
          fontFamily,
          fontSize: fontSize + 'px',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          color: textColor,
          WebkitTextStroke: strokeWidth ? `${strokeWidth}px ${strokeColor}` : undefined,
          display: 'flex',
        }}
      >
        {letters.map((char, i) => (
          <span
            key={i}
            ref={(el) => setSpanRefs(el, i)}
            style={{
              display: 'inline-block',
              fontVariationSettings: "'wght' 100, 'wdth' 100, 'ital' 0",
              transition: 'font-variation-settings 0.3s ease',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
