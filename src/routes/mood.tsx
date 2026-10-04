import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/shell";
import { readJSON, storageKeys, writeJSON, type MoodMark } from "@/lib/memory";

export const Route = createFileRoute("/mood")({ component: MoodPage });

const weathers = ["Low", "Anxious", "Rising", "Fierce"] as const;

function formatWhen(at: number) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(at);
}

function MoodPage() {
  const [ready, setReady] = useState(false);
  const [marks, setMarks] = useState<MoodMark[]>([]);
  const [note, setNote] = useState("");
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setMarks(readJSON<MoodMark[]>(storageKeys.mood, []));
    setReady(true);
  }, []);

  function keep(weather: string) {
    const mark: MoodMark = {
      at: Date.now(),
      weather,
      note: note.trim().slice(0, 280),
    };
    const next = [mark, ...marks].slice(0, 30);
    setMarks(next);
    writeJSON(storageKeys.mood, next);
    setPicked(weather);
    setNote("");
  }

  return (
    <Page
      kicker="On this phone"
      title="The day"
      lede="Name it. One word is enough. It is not a diagnosis, and it is not sent anywhere. Forget Me wipes it."
    >
      <div className="grid grid-cols-2 gap-2">
        {weathers.map((weather) => (
          <button
            key={weather}
            type="button"
            className={`min-h-14 rounded-md border text-base active:bg-ink ${
              picked === weather ? "border-cyan bg-ink text-cyan" : "border-line bg-navy"
            }`}
            onClick={() => keep(weather)}
          >
            {weather}
          </button>
        ))}
      </div>
      <label className="text-sm text-mist" htmlFor="mood-note">
        One line, if you want it
      </label>
      <textarea
        id="mood-note"
        value={note}
        maxLength={280}
        rows={3}
        onChange={(event) => setNote(event.target.value)}
        className="min-h-24 w-full rounded-md border border-line bg-navy px-3 py-3 text-base text-frost"
        placeholder="Plain. Then tap a word above."
      />
      <section>
        <h2 className="font-display text-3xl">What you have named</h2>
        {ready && marks.length === 0 ? (
          <p className="mt-3 text-mist">Nothing yet. A word is enough.</p>
        ) : (
          <ol className="mt-3 flex flex-col gap-2">
            {marks.map((mark) => (
              <li key={mark.at} className="rounded-xl border border-line p-4">
                <p className="text-cyan">{mark.weather}</p>
                {mark.note ? <p className="mt-1 text-pretty text-frost">{mark.note}</p> : null}
                <p className="mt-2 text-xs tabular-nums text-dim">{formatWhen(mark.at)}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </Page>
  );
}
