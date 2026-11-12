import React, { useEffect, useState } from 'react';
import TextPressure from '../components/TextPressure';
import soundManager from '../utils/soundManager';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      soundManager.transition();
      setFadeOut(true);
      setTimeout(() => onComplete?.(), 500);
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <div style={{ width: '80%', maxWidth: 600 }}>
        <TextPressure
          text="HELLO!"
          weight={true}
          italic={true}
          width={true}
          textColor="var(--glow-3)"
          minFontSize={56}
        />
      </div>

      <p
        style={{
          marginTop: 28,
          fontSize: 13,
          letterSpacing: '0.25em',
          color: 'rgba(200,210,255,0.4)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        JAFFREEN MARAIVANAN
      </p>

      {/* Progress percentage and bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '40%',
          maxWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#06b6d4',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.1em',
          }}
        >
          {Math.round(progress * 100)}%
        </div>
        <div
          style={{
            width: '100%',
            height: 3,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 12px rgba(124,58,237,0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
