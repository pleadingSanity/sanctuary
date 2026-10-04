import { createFileRoute, Link } from "@tanstack/react-router";
import { Mark } from "@/components/mark";

export const Route = createFileRoute("/")({ component: Home });

const further = [
  ["/tools", "The tools", "How to use this house"],
  ["/words", "Words", "One line at a time"],
  ["/mood", "The day", "Name it. It stays here"],
  ["/movement", "The movement", "Evolution, not erasure"],
  ["/journal", "Journal", "Stays on this phone"],
  ["/play", "Play", "A rest, not a test"],
  ["/shop", "Shop", "Clothes. The house stays free"],
] as const;

function Home() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 pt-5 pb-8 sm:px-5">
      <Mark size="hero" motion />
      <p className="mt-4 text-center font-display text-3xl text-balance text-frost">
        One Source. One Family.
      </p>
      <p className="mt-2 max-w-sm text-center text-pretty text-mist">
        Two doors. Everything else is one step down.
      </p>
      <div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
        <Link
          to="/talk"
          className="flex min-h-32 flex-col justify-between rounded-xl border border-line bg-navy p-4 active:bg-ink"
        >
          <span className="font-display text-4xl leading-none text-balance">Talk to Arron</span>
          <span className="mt-3 text-sm text-mist">Free. Deletable. Not a therapist.</span>
        </Link>
        <Link
          to="/legacy"
          className="flex min-h-32 flex-col justify-between rounded-xl border border-line bg-navy p-4 active:bg-ink"
        >
          <span className="font-display text-4xl leading-none text-balance">Read the legacy</span>
          <span className="mt-3 text-sm text-mist">
            Private A. L. Cooper. Mentioned in Despatches, 1945.
          </span>
        </Link>
      </div>
      <nav className="mt-3 grid w-full gap-2" aria-label="Further in">
        {further.map(([to, label, note]) => (
          <Link
            key={to}
            to={to}
            className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-line bg-navy px-4 active:bg-ink"
          >
            <span className="text-frost">{label}</span>
            <span className="text-right text-sm text-mist">{note}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
