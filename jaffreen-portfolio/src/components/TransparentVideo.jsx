import React, { useRef, useEffect } from 'react';

/**
 * TransparentVideo
 * ─────────────────────────────────────────────────────────────────────────────
 * Real-time chroma-key transparent canvas player for the handwriting signature video.
 * Removes all black/dark compression artifacts to output 100% transparent background
 * with pure crisp white text. Eliminates any rectangular bounding boxes or glow boxes.
 * Supports source frame cropping to remove top/bottom empty padding in square videos.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const DEFAULT_CROP = { sx: 75, sy: 455, sWidth: 825, sHeight: 190 };

const TransparentVideo = ({
  src = '/jaffreen-maraivanan-c-handwriting.mp4',
  width = 330,
  height = 80,
  crop = DEFAULT_CROP,
  className = '',
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId;
    let isPlaying = false;

    const updateCanvasSize = () => {
      if (crop) {
        canvas.width = crop.sWidth;
        canvas.height = crop.sHeight;
      } else if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    };

    video.addEventListener('loadedmetadata', updateCanvasSize);
    updateCanvasSize();

    const render = () => {
      if (video.readyState >= 2 && !video.paused && !video.ended) {
        // Draw cropped region of video to canvas
        if (crop && video.videoWidth && video.videoHeight) {
          ctx.drawImage(
            video,
            crop.sx,
            crop.sy,
            crop.sWidth,
            crop.sHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );
        } else {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        // Read pixels to strip black background and boost white handwriting
        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          const len = data.length;

          // Target RGB: white (255,255,255) for dark theme, dark slate (15,23,42) for light theme
          const isCurrentLight = document.documentElement.classList.contains('light-mode');
          const targetR = isCurrentLight ? 15 : 255;
          const targetG = isCurrentLight ? 23 : 255;
          const targetB = isCurrentLight ? 42 : 255;

          for (let i = 0; i < len; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Perceived luminance
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            // Threshold: anything below 32 is pure background noise -> make 100% transparent
            if (lum < 32) {
              data[i + 3] = 0;
            } else {
              // Smooth anti-aliased alpha
              const alpha = Math.min(255, (lum - 32) * 2.2);
              data[i] = targetR;
              data[i + 1] = targetG;
              data[i + 2] = targetB;
              data[i + 3] = alpha;
            }
          }

          ctx.putImageData(imgData, 0, 0);
        } catch {}
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handlePlay = () => {
      if (!isPlaying) {
        isPlaying = true;
        render();
      }
    };

    video.addEventListener('play', handlePlay);

    // Auto-start video
    video.play().catch(() => {
      // In case autoplay is deferred, retry on user interaction
      const startOnGesture = () => {
        video.play().catch(() => {});
        window.removeEventListener('click', startOnGesture);
        window.removeEventListener('touchstart', startOnGesture);
      };
      window.addEventListener('click', startOnGesture, { once: true });
      window.addEventListener('touchstart', startOnGesture, { once: true });
    });

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('loadedmetadata', updateCanvasSize);
    };
  }, [src, crop, width, height]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0, width: '100%', maxWidth: `${width}px` }}>
      {/* Hidden source video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: 1,
          height: 1,
        }}
      />

      {/* Rendered transparent canvas */}
      <canvas
        ref={canvasRef}
        width={crop ? crop.sWidth : width}
        height={crop ? crop.sHeight : height}
        className={className}
        style={{
          width: '100%',
          maxWidth: `${width}px`,
          height: 'auto',
          display: 'block',
          pointerEvents: 'none',
          userSelect: 'none',
          background: 'transparent',
        }}
      />
    </div>
  );
};

export default TransparentVideo;
