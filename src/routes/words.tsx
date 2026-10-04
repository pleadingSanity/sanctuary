import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/words")({ component: WordsPage });

const lines = [
  ["Evolution, not erasure. We do not erase the pain. We build with it.", "Shane Cooper"],
  ["Turn pain into power. Turn survival into strength. Turn madness into meaning.", "The house"],
  ["Nothing broke my spirit — only madness made me whole.", "The manifesto"],
  ["It is not about being the best. It is about being better than you were yesterday.", "The house"],
  ["One Source. One Family.", "The house"],
  ["You are not alone.", "The house"],
  [
    "They treated him as less than human. And when he was free, he still chose to be a good man.",
    "On Ivan, as Shane has written it",
  ],
  ["The opposite of addiction is connection.", "Johann Hari"],
  ["Real, raw, kind, never corporate.", "The Arron way"],
  ["Rise from madness.", "The house"],
] as const;

function WordsPage() {
  const [index, setIndex] = useState(0);
  const [line, who] = lines[index] ?? lines[0];

  function step(dir: -1 | 1) {
    setIndex((current) => (current + dir + lines.length) % lines.length);
  }

  return (
    <Page
      kicker="From the family"
      title="Words"
      lede="Lines already said. Nothing new is invented on this page. Swipe with the buttons. Then go."
    >
      <figure className="rounded-xl border border-line bg-navy p-5">
        <blockquote className="font-display text-3xl leading-snug text-pretty text-frost">
          {line}
        </blockquote>
        <figcaption className="mt-4 text-sm text-cyan">{who}</figcaption>
        <p className="mt-2 text-sm tabular-nums text-dim">
          {index + 1} of {lines.length}
        </p>
      </figure>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="min-h-14 rounded-md border border-line active:bg-ink"
          onClick={() => step(-1)}
        >
          Previous
        </button>
        <button
          type="button"
          className="min-h-14 rounded-md bg-cyan font-medium text-night active:opacity-80"
          onClick={() => step(1)}
        >
          Next
        </button>
      </div>
    </Page>
  );
}
