/**
 * Cinematic UI Sound Effects Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure Web Audio API synthesizer. Zero external asset dependencies.
 * Generates warm, subtle, harmonic micro-tones for premium tactile feedback.
 *
 * Features:
 *  - Volume capped at subtle levels (-18dB to -24dB) so it never startles.
 *  - Exponential gain ramps to prevent audio popping/clicking.
 *  - Persisted user preference via localStorage ('jmv_sound_enabled').
 *  - Respects 'prefers-reduced-motion' (mutes when reduced motion is requested).
 *  - Lazy AudioContext initialization on first user interaction.
 * ─────────────────────────────────────────────────────────────────────────────
 */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.listeners = new Set();
    this.hasUserInteracted = false;

    // Check localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('jmv_sound_enabled');
        // Default to false (opt-in) or true if previously toggled ON
        this.enabled = stored === 'true';

        // Listen for prefers-reduced-motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
          this.enabled = false;
        }
      } catch {
        this.enabled = false;
      }
    }
  }

  /**
   * Initializes or resumes the AudioContext upon user gesture
   */
  initContext() {
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

  /**
   * Toggle sound ON/OFF
   */
  toggle() {
    this.initContext();
    this.enabled = !this.enabled;
    try {
      localStorage.setItem('jmv_sound_enabled', String(this.enabled));
    } catch {}

    this.notify();

    // Play a friendly confirmation chirp when enabled
    if (this.enabled) {
      this.playChirp(784, 0.08, 'sine', 0.05); // G5 note
    }

    return this.enabled;
  }

  /**
   * Check if sound is active
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Subscribe to sound toggle state changes
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => {
      try {
        cb(this.enabled);
      } catch {}
    });
  }

  /**
   * Internal generator for soft sinusoidal chirps
   */
  playChirp(freq = 600, duration = 0.04, type = 'sine', peakGain = 0.03) {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(10, freq * 0.85), now + duration);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(peakGain, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {}
  }

  /**
   * 1. Soft Micro-Click (buttons, toggles, links)
   */
  click() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.025);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  /**
   * 2. Subtle Micro-Hover (interactive items, tabs, cards)
   */
  hover() {
    if (!this.enabled) return;
    this.playChirp(520, 0.03, 'sine', 0.012);
  }

  /**
   * 3. Section Navigation Transition Whoosh/Chime
   */
  transition() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.15);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {}
  }

  /**
   * 4. Modal Open (Warm ascending interval)
   */
  modalOpen() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [
        { f: 440, d: 0, dur: 0.12, gain: 0.025 },
        { f: 659.25, d: 0.04, dur: 0.15, gain: 0.028 },
      ].forEach((note) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, now + note.d);

        gain.gain.setValueAtTime(0.0001, now + note.d);
        gain.gain.linearRampToValueAtTime(note.gain, now + note.d + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.d + note.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + note.d);
        osc.stop(now + note.d + note.dur + 0.01);
      });
    } catch {}
  }

  /**
   * 5. Modal Close (Gentle descending interval)
   */
  modalClose() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [
        { f: 659.25, d: 0, dur: 0.1, gain: 0.02 },
        { f: 440, d: 0.035, dur: 0.12, gain: 0.018 },
      ].forEach((note) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, now + note.d);

        gain.gain.setValueAtTime(0.0001, now + note.d);
        gain.gain.linearRampToValueAtTime(note.gain, now + note.d + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.d + note.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + note.d);
        osc.stop(now + note.d + note.dur + 0.01);
      });
    } catch {}
  }

  /**
   * 6. Form Submission Success Chime (C5 - E5 - G5 major harmonic chord)
   */
  success() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, delay: 0.0, dur: 0.28 }, // C5
        { f: 659.25, delay: 0.08, dur: 0.32 }, // E5
        { f: 783.99, delay: 0.16, dur: 0.45 }, // G5
        { f: 1046.5, delay: 0.24, dur: 0.6 },  // C6
      ];

      notes.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(n.f, now + n.delay);

        gain.gain.setValueAtTime(0.0001, now + n.delay);
        gain.gain.linearRampToValueAtTime(0.035, now + n.delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.delay + n.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.delay);
        osc.stop(now + n.delay + n.dur + 0.02);
      });
    } catch {}
  }
}

export const soundManager = new SoundManager();
export default soundManager;

