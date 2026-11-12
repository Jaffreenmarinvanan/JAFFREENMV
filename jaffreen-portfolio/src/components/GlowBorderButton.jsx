/**
 * GlowBorderButton
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium pill-shaped button with a cursor-tracking border glow.
 * Inspired by Linear, Vercel, Stripe, and ReactBits.
 *
 * Key techniques:
 *  • requestAnimationFrame loop for sub-frame-smooth lerping (60fps).
 *  • CSS custom properties (--gbb-x, --gbb-y, --gbb-opacity) updated in the
 *    RAF loop — lets the CSS gradients react with zero React re-renders.
 *  • Border-ring masking via mask-composite: exclude so the glow ONLY
 *    illuminates the border ring, never the interior content.
 *  • Outer neon halo via a blurred ::after-equivalent layer with
 *    mix-blend-mode: plus-lighter for the premium glow bleed.
 *  • GPU-only properties (opacity, transform) — no layout thrashing.
 *  • prefers-reduced-motion respected via CSS @media query.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect, useCallback } from 'react';
import './GlowBorderButton.css';

/**
 * Linear interpolation helper.
 * @param {number} a  start value
 * @param {number} b  target value
 * @param {number} t  interpolation factor [0, 1]
 */
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * GlowBorderButton / GlowBorder
 *
 * @param {object}           props
 * @param {React.ReactNode}  props.children       — button label / content
 * @param {'sm'|'md'|'lg'}   props.size           — padding preset (ignored when tag='div')
 * @param {string}           props.className      — extra CSS classes
 * @param {boolean}          props.disabled       — disables pointer events & dims
 * @param {string|null}      props.href           — overrides tag to 'a'
 * @param {Function}         props.onClick        — click handler
 * @param {number}           props.glowSize       — radial-gradient radius in px (default 110)
 * @param {string}           props.bg             — inner surface bg color (CSS value)
 * @param {'button'|'a'|'div'} props.tag          — rendered HTML element (default 'button')
 * @param {number|string}    props.borderRadius   — border radius; default 9999px (pill)
 */
const GlowBorderButton = ({
  children,
  size = 'md',
  className = '',
  disabled = false,
  href,
  onClick,
  glowSize = 110,
  bg,
  tag,             // explicit tag override ('div', 'button', 'a')
  borderRadius,    // custom corner radius — omit for default (9999px pill)
  ...rest
}) => {
  const btnRef = useRef(null);
  const rafRef = useRef(null);

  /**
   * Raw (target) state — updated synchronously on mouse events.
   * No React state; avoids re-render on every pointer move.
   */
  const targetRef = useRef({ x: 0.5, y: 0.5, inside: false });

  /**
   * Current (animated) state — converges toward target each RAF tick.
   */
  const currentRef = useRef({ x: 0.5, y: 0.5, opacity: 0 });

  /** Main RAF animation loop — runs for the button's lifetime. */
  const tick = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const target  = targetRef.current;
    const current = currentRef.current;

    // Speed: faster when cursor is inside, slower when fading out.
    const posSpeed = target.inside ? 0.14 : 0.07;
    const opSpeed  = target.inside ? 0.10 : 0.055;

    current.x = lerp(current.x, target.x, posSpeed);
    current.y = lerp(current.y, target.y, posSpeed);
    current.opacity = lerp(current.opacity, target.inside ? 1 : 0, opSpeed);

    // Write CSS variables — gradient positions and visibility.
    btn.style.setProperty('--gbb-x',       `${(current.x * 100).toFixed(2)}%`);
    btn.style.setProperty('--gbb-y',       `${(current.y * 100).toFixed(2)}%`);
    btn.style.setProperty('--gbb-opacity', current.opacity.toFixed(4));

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    // Honour prefers-reduced-motion — CSS hides the layers; skip RAF too.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  /**
   * Update target position as a normalised [0,1] fraction of the button rect.
   * Runs on every pointermove — lightweight, no state write.
   */
  const handlePointerMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetRef.current.x      = (e.clientX - rect.left) / rect.width;
    targetRef.current.y      = (e.clientY - rect.top)  / rect.height;
    targetRef.current.inside = true;
  }, []);

  /** Let the glow fade to zero when the cursor leaves. */
  const handlePointerLeave = useCallback(() => {
    targetRef.current.inside = false;
  }, []);

  // Determine the rendered element:
  //  • 'a'      when href is provided (or tag='a')
  //  • 'div'    when tag='div' — for wrapping card-sized content
  //  • 'button' (default)
  const Tag = tag === 'div' ? 'div' : href ? 'a' : (tag || 'button');
  const tagProps = Tag === 'a'
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : Tag === 'button'
    ? { type: 'button', disabled }
    : {};

  // Cards use natural sizing; buttons use size classes.
  const sizeClass = Tag === 'div' ? 'gbb--wrap' : `gbb--${size}`;
  const radiusStyle = borderRadius != null
    ? { '--gbb-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }
    : {};

  return (
    <Tag
      ref={btnRef}
      {...tagProps}
      {...rest}
      onClick={disabled ? undefined : onClick}
      onPointerMove={disabled ? undefined : handlePointerMove}
      onPointerLeave={disabled ? undefined : handlePointerLeave}
      className={`gbb ${sizeClass} ${disabled ? 'gbb--disabled' : ''} ${className}`}
      style={{
        '--gbb-size': `${glowSize}px`,
        ...radiusStyle,
        ...(bg ? { '--gbb-bg': bg } : {}),
      }}
    >
      {/* Dark glass inner surface — keeps content readable over any bg */}
      <span className="gbb__surface" aria-hidden="true" />

      {/*
       * Static idle border — always visible at very low opacity.
       * Gives the button shape even before interaction.
       */}
      <span className="gbb__idle-border" aria-hidden="true" />

      {/*
       * Glowing border ring — radial gradient masked to the 1px ring only.
       * The CSS mask-composite: exclude trick removes the interior so the
       * glow never bleeds onto button content.
       */}
      <span className="gbb__glow-border" aria-hidden="true" />

      {/*
       * Outer neon halo — blurred gradient behind the button.
       * mix-blend-mode: plus-lighter creates the additive glow seen on
       * Linear, Vercel & Stripe CTAs.
       */}
      <span className="gbb__neon-halo" aria-hidden="true" />

      {/* Label / children — above all decorative layers */}
      {Tag === 'div'
        ? children                           /* card mode: render children directly */
        : <span className="gbb__content">{children}</span>  /* button mode: flex wrapper */
      }
    </Tag>
  );
};

export default GlowBorderButton;
