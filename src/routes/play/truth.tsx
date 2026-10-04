import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/play/truth")({ component: TruthPage });

const tags = ["Evidence", "Experience", "Philosophy"] as const;

const drills = [
  {
    line: "The London Gazette, 29 November 1945, names A. L. Cooper.",
    tag: "Evidence",
    why: "A public record. You can open it. This house does not add to it.",
  },
  {
    line: "Shane has written that he lives with bipolar, and that he is a dad to three.",
    tag: "Experience",
    why: "One person telling their own life. It is not a diagnosis of you.",
  },
  {
    line: "Evolution, not erasure.",
    tag: "Philosophy",
    why: "A principle the house stands on. Not a lab result, and not a slogan for sale.",
  },
  {
    line: "Arron is not a therapist.",
    tag: "Evidence",
    why: "It is written on every page of this house, and it is how the companion is built.",
  },
  {
    line: "Most people do not lose themselves because they are broken. They lose themselves because they are lonely.",
    tag: "Philosophy",
    why: "A way of seeing. Useful if it fits. Not a fact about every person.",
  },
] as const;

function TruthPage() {
  const [step, setStep] = useState(0);
  const [note, setNote] = useState<string | null>(null);
  const drill = drills[step];

  return (
    <Page
      kicker="Practice"
      title="Truth tags"
      lede="Evidence, experience, or philosophy. Kind corrections. No score."
    >
      {drill ? (
        <>
          <blockquote className="rounded-xl border border-line bg-navy p-4 font-display text-2xl leading-snug text-pretty text-frost">
            {drill.line}
          </blockquote>
          <div className="grid gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="min-h-14 rounded-md border border-line bg-navy active:bg-ink"
                onClick={() =>
                  setNote(
                    tag === drill.tag
                      ? `${tag}. ${drill.why}`
                      : `This house files it as ${drill.tag}. ${drill.why}`,
                  )
                }
              >
                {tag}
              </button>
            ))}
          </div>
          {note ? <p className="text-pretty text-frost">{note}</p> : null}
          <button
            type="button"
            className="min-h-12 rounded-md bg-cyan px-4 font-medium text-night"
            onClick={() => {
              setNote(null);
              setStep((current) => (current + 1) % drills.length);
            }}
          >
            Next line
          </button>
        </>
      ) : null}
      <Link to="/play" className="text-cyan">
        Back to play
      </Link>
    </Page>
  );
}
