import type { Reel } from "../data/reels";

type Voice = {
  stop: () => void;
};

let ctx: AudioContext | null = null;
let current: Voice | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export async function ensureAudio(): Promise<void> {
  const c = getCtx();
  if (c.state === "suspended") await c.resume();
}

function scheduleTone(
  c: AudioContext,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  gain: number,
  filterFreq = 4000,
) {
  const osc = c.createOscillator();
  const g = c.createGain();
  const f = c.createBiquadFilter();
  osc.type = type;
  osc.frequency.value = freq;
  f.type = "lowpass";
  f.frequency.value = filterFreq;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(f);
  f.connect(g);
  g.connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function kick(c: AudioContext, t: number, gain = 0.35) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, t);
  osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.3);
}

function hat(c: AudioContext, t: number, gain = 0.08) {
  const bufferSize = 2 * c.sampleRate * 0.05;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.value = 7000;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  noise.connect(f);
  f.connect(g);
  g.connect(c.destination);
  noise.start(t);
  noise.stop(t + 0.06);
}

const SCALES: Record<Reel["waveform"], number[]> = {
  prog: [0, 2, 3, 5, 7, 9, 10, 12, 14, 15],
  metal: [0, 1, 3, 5, 6, 8, 10, 12],
  chill: [0, 2, 4, 7, 9, 11, 12],
  pop: [0, 2, 4, 5, 7, 9, 11, 12],
  punk: [0, 3, 5, 7, 10, 12],
  electronic: [0, 2, 3, 7, 8, 10, 12],
};

export function playReelAudio(reel: Reel): void {
  stopReelAudio();
  const c = getCtx();
  const bpm = reel.bpm;
  const beat = 60 / bpm;
  const scale = SCALES[reel.waveform];
  const root = reel.waveform === "metal" ? 55 : reel.waveform === "chill" ? 110 : 82;
  let alive = true;
  let nextBar = c.currentTime + 0.05;

  const tick = () => {
    if (!alive) return;
    const now = c.currentTime;
    while (nextBar < now + 0.8) {
      const barStart = nextBar;
      for (let b = 0; b < 4; b++) {
        const t = barStart + b * beat;
        kick(c, t, reel.waveform === "chill" ? 0.2 : 0.32);
        if (reel.waveform !== "chill") hat(c, t + beat * 0.5, 0.06);
        if (reel.waveform === "electronic" || reel.waveform === "pop") {
          hat(c, t + beat * 0.25, 0.04);
          hat(c, t + beat * 0.75, 0.04);
        }
      }
      for (let s = 0; s < 8; s++) {
        const deg = scale[s % scale.length];
        const octave = reel.waveform === "metal" && s % 2 === 0 ? 1 : 2;
        const freq = root * 2 ** (octave + deg / 12);
        const t = barStart + s * (beat / 2);
        const type: OscillatorType =
          reel.waveform === "metal" || reel.waveform === "punk"
            ? "sawtooth"
            : reel.waveform === "electronic"
              ? "square"
              : reel.waveform === "chill"
                ? "triangle"
                : "sine";
        scheduleTone(
          c,
          freq,
          t,
          beat * (reel.waveform === "prog" ? 0.45 : 0.35),
          type,
          reel.waveform === "metal" ? 0.07 : 0.09,
          reel.waveform === "chill" ? 1800 : 4500,
        );
      }
      if (reel.waveform === "prog") {
        scheduleTone(c, root * 2, barStart + beat * 3, beat * 0.9, "triangle", 0.08, 2200);
      }
      nextBar += beat * 4;
    }
    requestAnimationFrame(tick);
  };

  tick();
  current = {
    stop: () => {
      alive = false;
    },
  };
}

export function stopReelAudio(): void {
  current?.stop();
  current = null;
}
