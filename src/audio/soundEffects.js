// Web Audio API Synthesizer & Sound Effects for Pip's Nursery

class NurseryAudio {
  constructor() {
    this.ctx = null;
    this.isPlayingMusicBox = false;
    this.ambientPlaying = false;
    this.rainPlaying = false;
    this.cricketsPlaying = false;
    this.musicBoxTimer = null;
    this.ambientGain = null;
    this.ambientSource = null;
    this.rainGain = null;
    this.rainSource = null;
    this.cricketsGain = null;
    this.cricketsTimer = null;
    this.isMuted = false;

    // Pitch dictionary (Hz)
    this.NOTES = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      F4: 349.23,
      G4: 392.00,
      A4: 440.00,
      B4: 493.88,
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
      F5: 698.46,
      G5: 783.99,
      A5: 880.00,
      B5: 987.77,
      C6: 1046.50,
      E6: 1318.51,
      G6: 1567.98,
    };

    // Pip's signature lullaby score: [Note, duration in beats]
    this.lullaby = [
      ['E4', 1], ['E4', 1], ['G4', 2],
      ['E4', 1], ['E4', 1], ['G4', 2],
      ['E4', 1], ['G4', 1], ['C5', 2], ['B4', 2],
      ['A4', 1], ['A4', 1], ['G4', 2],
      ['D4', 1], ['E4', 1], ['F4', 2],
      ['D4', 1], ['E4', 1], ['F4', 2],
      ['D4', 1], ['F4', 1], ['B4', 2], ['A4', 2],
      ['G4', 1], ['A4', 1], ['C5', 3],
    ];
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Pure music box bell generator
  playBell(frequency, time, velocity = 1.0) {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    const t = time || ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.24 * velocity, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 1.5);

    // Overtone for authentic metallic tinkling
    const overtone = ctx.createOscillator();
    const overGain = ctx.createGain();
    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(frequency * 3.01, t);

    overGain.gain.setValueAtTime(0.06 * velocity, t);
    overGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

    overtone.connect(overGain);
    overGain.connect(ctx.destination);
    overtone.start(t);
    overtone.stop(t + 0.65);
  }

  // Play full lullaby sequence
  playMusicBoxLoop(onNotePlay) {
    const ctx = this.ensureContext();
    this.isPlayingMusicBox = true;

    const playCycle = () => {
      if (!this.isPlayingMusicBox) return;

      const t0 = ctx.currentTime + 0.08;
      let curTime = t0;

      this.lullaby.forEach(([noteName, beats], idx) => {
        const freq = this.NOTES[noteName] || 440;
        this.playBell(freq, curTime, 0.95);
        if (onNotePlay) {
          setTimeout(() => {
            if (this.isPlayingMusicBox) onNotePlay(noteName, idx);
          }, (curTime - ctx.currentTime) * 1000);
        }
        curTime += beats * 0.44;
      });

      const totalDurationMs = (curTime - t0) * 1000 + 1200;
      this.musicBoxTimer = setTimeout(playCycle, totalDurationMs);
    };

    playCycle();
  }

  stopMusicBox() {
    this.isPlayingMusicBox = false;
    if (this.musicBoxTimer) {
      clearTimeout(this.musicBoxTimer);
      this.musicBoxTimer = null;
    }
  }

  toggleMusicBox(onNotePlay) {
    if (this.isPlayingMusicBox) {
      this.stopMusicBox();
      return false;
    } else {
      if (this.trackAudio && !this.trackAudio.paused) {
        this.trackAudio.pause();
      }
      this.playMusicBoxLoop(onNotePlay);
      return true;
    }
  }

  // Play full audio track (MP3 song/rhyme)
  playTrack(src, onEnded) {
    this.stopMusicBox();
    if (!this.trackAudio) {
      this.trackAudio = new Audio();
    }
    if (this.currentTrackSrc !== src) {
      this.trackAudio.src = src;
      this.currentTrackSrc = src;
      this.trackAudio.currentTime = 0;
    }
    this.trackAudio.loop = true;
    this.trackAudio.volume = 0.88;
    this.trackAudio.onended = () => {
      if (onEnded) onEnded();
    };
    return this.trackAudio.play().then(() => true).catch(() => false);
  }

  pauseTrack() {
    if (this.trackAudio) {
      this.trackAudio.pause();
    }
    this.stopMusicBox();
  }

  stopTrack() {
    if (this.trackAudio) {
      this.trackAudio.pause();
      this.trackAudio.currentTime = 0;
    }
    this.stopMusicBox();
  }

  isCurrentTrackPlaying() {
    return this.trackAudio ? !this.trackAudio.paused : false;
  }

  playChime(pitch = 'E5') {
    if (this.isMuted) return;
    const freq = this.NOTES[pitch] || 523.25;
    this.playBell(freq, null, 0.6);
  }

  // Pip cute slumber giggle
  playPipGiggle() {
    const notes = ['G5', 'B5', 'E6', 'G6'];
    notes.forEach((n, i) => {
      setTimeout(() => {
        this.playBell(this.NOTES[n], null, 0.7);
      }, i * 90);
    });
  }

  playBlockDrop(pitchIndex = 0) {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const baseFreq = 220 + (pitchIndex % 7) * 45;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, t + 0.12);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);

    this.playBell(baseFreq * 2, t + 0.02, 0.4);
  }

  playBlockPop() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.08);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Soothing nursery ambient white noise generator
  toggleAmbient(enable) {
    const ctx = this.ensureContext();

    if (enable && !this.ambientPlaying) {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.035;
      }

      this.ambientSource = ctx.createBufferSource();
      this.ambientSource.buffer = buffer;
      this.ambientSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, ctx.currentTime);

      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5);

      this.ambientSource.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(ctx.destination);

      this.ambientSource.start();
      this.ambientPlaying = true;
      return true;
    } else if (!enable && this.ambientPlaying) {
      if (this.ambientGain) {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        setTimeout(() => {
          if (this.ambientSource) {
            this.ambientSource.stop();
            this.ambientSource.disconnect();
          }
          this.ambientPlaying = false;
        }, 850);
      }
      return false;
    }
    return this.ambientPlaying;
  }

  // Synthesize gentle rain on the skylight
  toggleRain(enable) {
    const ctx = this.ensureContext();

    if (enable && !this.rainPlaying) {
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.18;
      }

      this.rainSource = ctx.createBufferSource();
      this.rainSource.buffer = buffer;
      this.rainSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.Q.setValueAtTime(0.8, ctx.currentTime);

      this.rainGain = ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.001, ctx.currentTime);
      this.rainGain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.2);

      this.rainSource.connect(filter);
      filter.connect(this.rainGain);
      this.rainGain.connect(ctx.destination);

      this.rainSource.start();
      this.rainPlaying = true;
      return true;
    } else if (!enable && this.rainPlaying) {
      if (this.rainGain) {
        this.rainGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.rainSource) {
            this.rainSource.stop();
            this.rainSource.disconnect();
          }
          this.rainPlaying = false;
        }, 600);
      }
      return false;
    }
    return this.rainPlaying;
  }

  // Synthesize gentle night crickets
  toggleCrickets(enable) {
    const ctx = this.ensureContext();

    if (enable && !this.cricketsPlaying) {
      this.cricketsPlaying = true;

      const chirp = () => {
        if (!this.cricketsPlaying) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(4600, now);
        osc.frequency.setValueAtTime(4750, now + 0.03);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 0.02);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);

        const nextDelay = 180 + Math.random() * 240;
        this.cricketsTimer = setTimeout(chirp, nextDelay);
      };

      chirp();
      return true;
    } else if (!enable && this.cricketsPlaying) {
      this.cricketsPlaying = false;
      if (this.cricketsTimer) {
        clearTimeout(this.cricketsTimer);
        this.cricketsTimer = null;
      }
      return false;
    }
    return this.cricketsPlaying;
  }

  // Landmark sound effects
  playTrainWhistle() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    const t = ctx.currentTime;
    
    // Two-tone chord (F4 & A4) simulating warm steam whistle
    [349.23, 440.0].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * 1.02, t + 0.35);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.65);
    });
  }

  playWaterDrop() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.12);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  playPastryDing() {
    if (this.isMuted) return;
    this.playBell(1318.51, null, 0.85); // E6 crystal bell ding
  }

  playWishSparkle() {
    if (this.isMuted) return;
    const notes = ['C5', 'E5', 'G5', 'B5', 'C6', 'E6'];
    notes.forEach((n, idx) => {
      setTimeout(() => {
        this.playBell(this.NOTES[n], null, 0.6);
      }, idx * 75);
    });
  }

  playTelescopeClick() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);

    setTimeout(() => this.playBell(987.77, null, 0.4), 60);
  }

  playKnock() {
    if (this.isMuted) return;
    const ctx = this.ensureContext();
    [0, 160].forEach((delayMs) => {
      setTimeout(() => {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.07);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      }, delayMs);
    });
  }
}

export const nurseryAudio = new NurseryAudio();
