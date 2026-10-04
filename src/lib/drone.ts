/**
 * "Glacial drone" — a generative ambient pad built entirely with the Web Audio
 * API (no audio files). Low detuned oscillators through a slowly breathing
 * low-pass filter, plus a band of filtered noise that sounds like distant wind.
 */
export type Drone = {
  fadeIn: () => void;
  fadeOut: () => void;
  dispose: () => void;
};

export function createDrone(): Drone | null {
  const AudioCtx =
    typeof window !== "undefined"
      ? window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      : undefined;
  if (!AudioCtx) return null;

  const ctx = new AudioCtx();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Tonal bed: A1 / E2 / A2 / E3 with a little detune for width.
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 380;
  tone.Q.value = 0.8;
  tone.connect(master);

  const voices: Array<[number, OscillatorType, number, number]> = [
    [55, "sine", 0.55, -4],
    [82.41, "triangle", 0.22, 5],
    [110, "sine", 0.18, -7],
    [164.81, "triangle", 0.07, 8],
  ];

  const sources: AudioScheduledSourceNode[] = [];

  for (const [frequency, type, level, detune] of voices) {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = frequency;
    osc.detune.value = detune;
    const gain = ctx.createGain();
    gain.gain.value = level;
    osc.connect(gain).connect(tone);
    osc.start();
    sources.push(osc);
  }

  // The filter "breathes" very slowly.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 160;
  lfo.connect(lfoDepth).connect(tone.frequency);
  lfo.start();
  sources.push(lfo);

  // Wind: looped pink-ish noise through a wandering band-pass.
  const length = ctx.sampleRate * 3;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const wind = ctx.createBiquadFilter();
  wind.type = "bandpass";
  wind.frequency.value = 700;
  wind.Q.value = 0.5;

  const windGain = ctx.createGain();
  windGain.gain.value = 0.35;

  const windLfo = ctx.createOscillator();
  windLfo.frequency.value = 0.03;
  const windLfoDepth = ctx.createGain();
  windLfoDepth.gain.value = 400;
  windLfo.connect(windLfoDepth).connect(wind.frequency);

  noise.connect(wind).connect(windGain).connect(master);
  noise.start();
  windLfo.start();
  sources.push(noise, windLfo);

  return {
    fadeIn() {
      void ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.085, ctx.currentTime, 1.4);
    },
    fadeOut() {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.35);
    },
    dispose() {
      sources.forEach((source) => {
        try {
          source.stop();
        } catch {}
      });
      void ctx.close();
    },
  };
}
