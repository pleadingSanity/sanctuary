import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/play/memory")({ component: MemoryPage });

const words = ["Water", "Sun", "Walk", "Breath", "Quiet", "Family"];

function shuffled() {
  const deck = words.flatMap((word) => [
    { id: `${word}-a-${Math.random().toString(36).slice(2, 6)}`, word },
    { id: `${word}-b-${Math.random().toString(36).slice(2, 6)}`, word },
  ]);
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function MemoryPage() {
  const [cards, setCards] = useState(shuffled);
  const [open, setOpen] = useState<number[]>([]);
  const [known, setKnown] = useState<string[]>([]);
  const [lock, setLock] = useState(false);

  function flip(index: number) {
    if (lock) return;
    const card = cards[index];
    if (!card || known.includes(card.word) || open.includes(index)) return;
    const next = [...open, index];
    if (next.length < 2) {
      setOpen(next);
      return;
    }
    setOpen(next);
    const first = cards[next[0]];
    const second = cards[next[1]];
    if (first && second && first.word === second.word) {
      setKnown((current) => [...current, first.word]);
      setOpen([]);
      return;
    }
    setLock(true);
    window.setTimeout(() => {
      setOpen([]);
      setLock(false);
    }, 700);
  }

  const clear = known.length === words.length;

  return (
    <Page
      kicker="No timer"
      title="Memory"
      lede="Find the pairs. Nothing is counting you. If you miss, the cards just turn back."
    >
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card, index) => {
          const show = known.includes(card.word) || open.includes(index);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(index)}
              className={`min-h-16 rounded-md border text-sm ${
                show ? "border-cyan bg-ink text-cyan" : "border-line bg-navy text-transparent"
              }`}
            >
              {show ? card.word : "·"}
            </button>
          );
        })}
      </div>
      {clear ? <p className="text-frost">All six. You can stop.</p> : null}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-12 rounded-md border border-line px-4"
          onClick={() => {
            setCards(shuffled());
            setOpen([]);
            setKnown([]);
            setLock(false);
          }}
        >
          Shuffle again
        </button>
        <Link to="/play" className="flex min-h-12 items-center text-cyan">
          Back to play
        </Link>
      </div>
    </Page>
  );
}
