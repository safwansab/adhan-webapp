/**
 * Audio Player & Melodic Chime Synthesizer Engine
 */

class AdhanAudioPlayer {
  constructor() {
    this.audioContext = null;
    this.audioElem = new Audio();
    this.volume = 0.8;
    this.reciter = "makkah";

    // Sample Reciter Audio URLs (Public domain / Archive.org standard Adhan recitations)
    this.reciterUrls = {
      makkah: "https://ia800204.us.archive.org/21/items/AdhanMakkah/Adhan_Makkah.mp3",
      madinah: "https://ia800508.us.archive.org/29/items/AdhanMadinah/Adhan_Madinah.mp3",
      alaqsa: "https://ia800305.us.archive.org/8/items/AdhanAlaqsa/Adhan_Alaqsa.mp3",
      afasy: "https://ia800204.us.archive.org/21/items/AdhanMishary/Adhan_Mishary.mp3"
    };
  }

  initContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.audioElem.volume = this.volume;
  }

  setReciter(key) {
    this.reciter = key;
  }

  playAdhanSound(onEndCallback = null) {
    this.initContext();
    this.onEnd = onEndCallback;
    const url = this.reciterUrls[this.reciter];
    if (url && navigator.onLine) {
      this.audioElem.src = url;
      this.audioElem.volume = this.volume;
      this.audioElem.onended = () => {
        if (typeof this.onEnd === 'function') this.onEnd();
      };
      this.audioElem.play().catch(() => {
        this.playSynthesizedChime();
        if (typeof this.onEnd === 'function') setTimeout(this.onEnd, 3000);
      });
    } else {
      this.playSynthesizedChime();
      if (typeof this.onEnd === 'function') setTimeout(this.onEnd, 3000);
    }
  }

  playSynthesizedChime() {
    this.initContext();
    if (!this.audioContext) return;

    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.3);

      gain.gain.setValueAtTime(0, this.audioContext.currentTime + index * 0.3);
      gain.gain.linearRampToValueAtTime(0.3 * this.volume, this.audioContext.currentTime + index * 0.3 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + index * 0.3 + 1.2);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(this.audioContext.currentTime + index * 0.3);
      osc.stop(this.audioContext.currentTime + index * 0.3 + 1.2);
    });
  }

  stop() {
    if (this.audioElem) {
      this.audioElem.pause();
      this.audioElem.currentTime = 0;
    }
    if (typeof this.onEnd === 'function') {
      this.onEnd();
    }
  }
}

window.AdhanAudioPlayer = AdhanAudioPlayer;
