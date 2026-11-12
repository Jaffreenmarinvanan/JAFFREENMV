/**
 * SoundManager
 * ─────────────────────────────────────────────────────────────────────────────
 * Minimal, zero-dependency Web Audio API synthesizer for subtle UI feedback.
 * - Button click: 50ms soft tactile click
 * - Navigation: 65ms crisp chime
 * - Modal Open/Close: Subtle harmonic tones
 * Safe against autoplay restrictions, respects muted toggle, stored in localStorage.
 * ─────────────────────────────────────────────────────────────────────────────
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled =
      typeof window !== 'undefined'
        ? localStorage.getItem('ui_sound_enabled') === 'true'
        : false;
    this.listeners = new Set();
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  isEnabled() {
    return this.enabled;
  }

  setEnabled(val) {
    this.enabled = !!val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ui_sound_enabled', this.enabled ? 'true' : 'false');
    }
    this.listeners.forEach((fn) => {
      try {
        fn(this.enabled);
      } catch {}
    });
    if (this.enabled) {
      this.init();
      this.play('click');
    }
  }

  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  play(type = 'click') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click') {
        // Subtle soft tactile click (420Hz -> 180Hz in 50ms)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'nav') {
        // High crisp subtle navigation chime (840Hz -> 960Hz in 65ms)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(840, now);
        osc.frequency.exponentialRampToValueAtTime(960, now + 0.065);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

        osc.start(now);
        osc.stop(now + 0.065);
      } else if (type === 'modalOpen') {
        // Warm harmonic ascending chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.12);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'modalClose') {
        // Subtle descending dismiss tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(560, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.09);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch {}
  }
}

const soundManager = new SoundManager();
export default soundManager;
