export const TONES = [174, 285, 432, 528, 741, 963] as const;

let context: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gain: GainNode | null = null;

export function stopTone() {
  const currentGain = gain;
  const currentContext = context;
  const currentOscillator = oscillator;
  gain = null;
  oscillator = null;
  if (currentGain && currentContext) {
    const now = currentContext.currentTime;
    currentGain.gain.cancelScheduledValues(now);
    currentGain.gain.setValueAtTime(currentGain.gain.value, now);
    currentGain.gain.linearRampToValueAtTime(0, now + 0.25);
  }
  window.setTimeout(() => {
    try {
      currentOscillator?.stop();
    } catch {
      /* already stopped */
    }
    currentOscillator?.disconnect();
    currentGain?.disconnect();
  }, 280);
}

export async function playTone(hz: number) {
  stopTone();
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) throw new Error("This browser has no tone engine.");
  if (!context) context = new AudioCtx();
  if (context.state === "suspended") await context.resume();
  const osc = context.createOscillator();
  const amp = context.createGain();
  osc.type = "sine";
  osc.frequency.value = hz;
  amp.gain.value = 0;
  osc.connect(amp);
  amp.connect(context.destination);
  osc.start();
  amp.gain.linearRampToValueAtTime(0.028, context.currentTime + 0.45);
  oscillator = osc;
  gain = amp;
}
