/**
 * Web Audio API Space Sound Synthesizer
 * Generates futuristic, cosmic, and deep-space audio micro-interactions.
 * Pure procedural synthesis - 0 external audio files, 0 latency.
 */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_audio_muted');
      this.isMuted = saved === 'true';
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_audio_muted', String(this.isMuted));
    }
    if (!this.isMuted) {
      this.playChirp();
    }
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }

  // 1. Space Hover: Ethereal Cosmic Telemetry Ping
  playHover() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Primary crystal resonant tone
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1180, now);
      osc.frequency.exponentialRampToValueAtTime(1620, now + 0.05);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (_e) {}
  }

  // 2. Space Click: Sci-Fi Plasma Impulse / Hyperdrive Engage
  playClick() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Laser / Warp transient
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(840, now);
      osc1.frequency.exponentialRampToValueAtTime(110, now + 0.08);

      gain1.gain.setValueAtTime(0.04, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);

      // Deep space sub-thump
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(95, now);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 0.09);

      gain2.gain.setValueAtTime(0.05, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.08);
      osc2.start(now);
      osc2.stop(now + 0.09);
    } catch (_e) {}
  }

  // 3. Space Chirp: Deep-Space Satellite Telemetry Beacon
  playChirp() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Dual harmonic telemetry burst (G5 + D6)
      const freqs = [784, 1175];
      freqs.forEach((freq, idx) => {
        const start = now + idx * 0.035;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.05, start + 0.06);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq, start);
        filter.Q.setValueAtTime(3.5, start);

        gain.gain.setValueAtTime(0.025, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.06);
      });
    } catch (_e) {}
  }

  // 4. Space Modal Open: Airlock / Hyperdrive Space Swell
  playModalOpen() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const duration = 0.22;

      // Atmospheric cosmic energy swell
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.exponentialRampToValueAtTime(480, now + duration);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(124, now); // Detuned for cosmic chorus
      osc2.frequency.exponentialRampToValueAtTime(484, now + duration);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);
      filter.frequency.exponentialRampToValueAtTime(1600, now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (_e) {}
  }

  // 5. Space Success: Celestial Orbit Harmony / Docking Fanfare
  playSuccess() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Interstellar chord (A4, C#5, E5, A5)
      const celestialChord = [440, 554.37, 659.25, 880];
      celestialChord.forEach((freq, idx) => {
        const start = now + idx * 0.055;
        const noteDuration = 0.28;

        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.linearRampToValueAtTime(freq * 1.01, start + noteDuration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, start);

        gain.gain.setValueAtTime(0.03, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + noteDuration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + noteDuration);
      });
    } catch (_e) {}
  }
}

export const soundFX = new SoundFX();
