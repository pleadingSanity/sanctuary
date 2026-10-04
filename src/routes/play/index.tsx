import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/play/")({ component: PlayPage });

const here = [
  ["/play/solitaire", "Solitaire", "Night cards. No timer."],
  ["/play/memory", "Memory", "Six pairs. No rush."],
  ["/play/truth", "Truth tags", "Evidence, experience, or philosophy."],
  ["/sanctuary", "Breath and tones", "Already in this house."],
  ["/mood", "The day", "Name it. It stays on this phone."],
  ["/journal", "Write", "The story room."],
] as const;

const onThePublicHouse = [
  ["https://pleadingsanity.co.uk/poker", "Night Table", "Play chips only. No cash."],
  ["https://pleadingsanity.co.uk/cosmic-focus", "Cosmic Focus", "Watch, remember, repeat."],
  ["https://pleadingsanity.co.uk/number-nebula", "Number Nebula", "Patterns, not a test."],
  ["https://pleadingsanity.co.uk/pattern-galaxy", "Pattern Galaxy", "Shapes and cycles."],
  ["https://pleadingsanity.co.uk/rhythm-resonance", "Rhythm", "The same quiet frequencies."],
  ["https://pleadingsanity.co.uk/stardust-dash", "Stardust Dash", "Short, and you can leave."],
  ["https://pleadingsanity.co.uk/cosmic-connect", "Cosmic Connect", "Pairs, at your pace."],
] as const;

function PlayPage() {
  return (
    <Page
      kicker="Two minutes is enough"
      title="Play"
      lede="A rest, not a test. No ads, no leaderboard, no one to beat. Children’s games are not in this room. They stay separate from Arron."
    >
      <section>
        <h2 className="font-display text-3xl">In this backup</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {here.map(([to, label, note]) => (
            <li key={to}>
              <Link
                to={to}
                className="flex min-h-14 flex-col justify-center rounded-md border border-line bg-navy px-4 py-3 active:bg-ink"
              >
                <span className="text-frost">{label}</span>
                <span className="text-sm text-mist">{note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-display text-3xl">Still on the public house</h2>
        <p className="mt-2 text-pretty text-mist">
          These already live at pleadingsanity.co.uk. They are listed here so the
          backup does not pretend they were never built.
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {onThePublicHouse.map(([href, label, note]) => (
            <li key={href}>
              <a
                href={href}
                className="flex min-h-14 flex-col justify-center rounded-md border border-line px-4 py-3 active:bg-ink"
              >
                <span className="text-frost">{label}</span>
                <span className="text-sm text-mist">{note}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
