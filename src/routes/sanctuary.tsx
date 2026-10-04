import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/shell";
import { playTone, stopTone, TONES } from "@/lib/tones";

export const Route = createFileRoute("/sanctuary")({ component: SanctuaryPage });

function phaseAt(second: number) {
  const pos = second % 14;
  if (pos < 4) return { name: "Breathe in", left: 4 - pos, out: false };
  if (pos < 8) return { name: "Hold", left: 8 - pos, out: false };
  return { name: "Breathe out", left: 14 - pos, out: true };
}

function SanctuaryPage() {
  const [running, setRunning] = useState(false);
  const [second, setSecond] = useState(0);
  const [tone, setTone] = useState<number | null>(null);
  const [toneError, setToneError] = useState<string | null>(null);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setSecond((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => () => stopTone(), []);

  async function chooseTone(hz: number) {
    setToneError(null);
    try {
      if (tone === hz) {
        stopTone();
        setTone(null);
        return;
      }
      await playTone(hz);
      setTone(hz);
    } catch (caught) {
      setTone(null);
      setToneError(caught instanceof Error ? caught.message : "The tone could not start.");
    }
  }

  const breath = phaseAt(second);
  const scale = !running ? "scale-90" : breath.out ? "scale-75" : "scale-100";

  return (
    <Page
      kicker="One step down from the doors"
      title="Sanctuary"
      lede="Quiet tools. Not treatment. Not a game inside the companion. Stop whenever you want."
    >
      <section className="rounded-xl border border-line bg-navy p-4">
        <h2 className="font-display text-3xl">Breath</h2>
        <p className="mt-2 text-mist">Four in. Four held. Six out. Nothing else.</p>
        <div className="mt-6 flex flex-col items-center gap-4">
          <div
            className={`size-36 rounded-full border border-cyan transition-transform duration-700 ${scale}`}
            aria-hidden="true"
          />
          <p className="text-lg tabular-nums text-frost" aria-live="polite">
            {running ? `${breath.name} · ${breath.left}` : "Still"}
          </p>
          <button
            type="button"
            className="min-h-14 w-full rounded-md border border-line px-6 text-base active:bg-ink sm:w-auto"
            onClick={() => {
              setRunning((value) => !value);
              setSecond(0);
            }}
          >
            {running ? "Stop" : "Begin"}
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl">Soft tones</h2>
        <p className="mt-2 text-pretty text-mist">
          174, 285, 432, 528, 741, 963 Hz. One at a time. Quiet sine. Not a cure.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TONES.map((hz) => (
            <button
              key={hz}
              type="button"
              className={`min-h-14 rounded-md border px-3 text-base tabular-nums active:bg-ink ${
                tone === hz ? "border-cyan bg-ink text-cyan" : "border-line bg-navy"
              }`}
              onClick={() => void chooseTone(hz)}
            >
              {tone === hz ? `Stop ${hz}` : `${hz} Hz`}
            </button>
          ))}
        </div>
        {toneError ? <p className="mt-3 text-frost">{toneError}</p> : null}
      </section>
    </Page>
  );
}
