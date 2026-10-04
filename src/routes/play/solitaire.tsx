import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/play/solitaire")({ component: SolitairePage });

type Suit = "s" | "h" | "d" | "c";
type Card = { key: string; suit: Suit; rank: number; up: boolean };
type Pile = "tableau" | "waste" | "foundation";
type Sel = { pile: Pile; col: number; index: number };

type Table = {
  tableau: Card[][];
  stock: Card[];
  waste: Card[];
  foundations: Card[][];
};

const ranks = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits: Record<Suit, string> = { s: "♠", h: "♥", d: "♦", c: "♣" };

function red(suit: Suit) {
  return suit === "h" || suit === "d";
}

function shuffled(): Card[] {
  const deck: Card[] = [];
  for (const suit of ["s", "h", "d", "c"] as Suit[]) {
    for (let rank = 1; rank <= 13; rank += 1) {
      deck.push({ key: `${suit}${rank}-${Math.random().toString(36).slice(2, 7)}`, suit, rank, up: false });
    }
  }
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function deal(): Table {
  const deck = shuffled();
  const tableau: Card[][] = [[], [], [], [], [], [], []];
  for (let col = 0; col < 7; col += 1) {
    for (let row = 0; row <= col; row += 1) {
      const card = deck.pop();
      if (!card) continue;
      card.up = row === col;
      tableau[col].push(card);
    }
  }
  return { tableau, stock: deck, waste: [], foundations: [[], [], [], []] };
}

function top(cards: Card[]) {
  return cards[cards.length - 1];
}

function runOk(cards: Card[], from: number) {
  for (let i = from; i < cards.length - 1; i += 1) {
    const a = cards[i];
    const b = cards[i + 1];
    if (!a.up || !b.up) return false;
    if (red(a.suit) === red(b.suit) || a.rank !== b.rank + 1) return false;
  }
  return cards[from]?.up === true;
}

function fitsTableau(card: Card, pile: Card[]) {
  if (pile.length === 0) return card.rank === 13;
  const onto = top(pile);
  return Boolean(onto?.up && red(card.suit) !== red(onto.suit) && card.rank === onto.rank - 1);
}

function fitsFoundation(card: Card, pile: Card[]) {
  if (pile.length === 0) return card.rank === 1;
  const onto = top(pile);
  return Boolean(onto && onto.suit === card.suit && card.rank === onto.rank + 1);
}

function won(table: Table) {
  return table.foundations.every((pile) => pile.length === 13);
}

function SolitairePage() {
  const [table, setTable] = useState<Table>(deal);
  const [sel, setSel] = useState<Sel | null>(null);

  function draw() {
    setSel(null);
    setTable((current) => {
      if (current.stock.length > 0) {
        const stock = current.stock.slice(0, -1);
        const card = current.stock[current.stock.length - 1];
        card.up = true;
        return { ...current, stock, waste: [...current.waste, card] };
      }
      const stock = [...current.waste].reverse().map((card) => ({ ...card, up: false }));
      return { ...current, stock, waste: [] };
    });
  }

  function take(current: Table, picked: Sel): Card[] | null {
    if (picked.pile === "waste") {
      const card = top(current.waste);
      return card ? [card] : null;
    }
    if (picked.pile === "foundation") {
      const card = top(current.foundations[picked.col] ?? []);
      return card ? [card] : null;
    }
    const pile = current.tableau[picked.col] ?? [];
    if (!runOk(pile, picked.index)) return null;
    return pile.slice(picked.index);
  }

  function drop(current: Table, picked: Sel, cards: Card[], dest: Sel): Table | null {
    const moving = cards[0];
    if (!moving || dest.pile === "waste") return null;

    if (dest.pile === "foundation") {
      if (cards.length !== 1 || !fitsFoundation(moving, current.foundations[dest.col] ?? [])) return null;
    } else {
      let target = current.tableau[dest.col] ?? [];
      if (picked.pile === "tableau" && picked.col === dest.col) target = target.slice(0, picked.index);
      if (!fitsTableau(moving, target)) return null;
    }

    const next: Table = {
      tableau: current.tableau.map((pile) => pile.slice()),
      stock: current.stock.slice(),
      waste: current.waste.slice(),
      foundations: current.foundations.map((pile) => pile.slice()),
    };
    if (picked.pile === "waste") next.waste.pop();
    else if (picked.pile === "foundation") next.foundations[picked.col]?.pop();
    else next.tableau[picked.col] = (next.tableau[picked.col] ?? []).slice(0, picked.index);

    if (picked.pile === "tableau") {
      const uncovered = next.tableau[picked.col]?.at(-1);
      if (uncovered) uncovered.up = true;
    }

    if (dest.pile === "foundation") next.foundations[dest.col]?.push(moving);
    else next.tableau[dest.col]?.push(...cards);
    return next;
  }

  function choose(next: Sel) {
    if (!sel) {
      const cards = take(table, next);
      if (cards) setSel(next);
      return;
    }
    if (sel.pile === next.pile && sel.col === next.col && sel.index === next.index) {
      setSel(null);
      return;
    }
    const cards = take(table, sel);
    if (!cards) {
      setSel(null);
      return;
    }
    const moved = drop(table, sel, cards, next);
    if (moved) {
      setTable(moved);
      setSel(null);
      return;
    }
    const retry = take(table, next);
    setSel(retry ? next : null);
  }

  const done = won(table);

  return (
    <Page
      kicker="A rest, not a test"
      title="Solitaire"
      lede="Night cards. No timer. No score that judges you. Tap a card, then tap where it goes. Draw is one card."
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-12 rounded-md border border-line px-4 active:bg-ink"
          onClick={() => {
            setTable(deal());
            setSel(null);
          }}
        >
          New deal
        </button>
        <Link to="/play" className="flex min-h-12 items-center rounded-md border border-line px-4 text-cyan">
          Leave the table
        </Link>
      </div>
      {done ? (
        <p className="rounded-xl border border-line bg-navy p-4 text-frost">
          That’s the deck. You can leave it there.
        </p>
      ) : null}
      <div className="overflow-x-auto">
        <div className="flex min-w-[22rem] gap-2">
          <PileButton label={table.stock.length ? "Draw" : "Turn"} onClick={draw} />
          <CardFace
            card={top(table.waste)}
            selected={sel?.pile === "waste"}
            onClick={() => top(table.waste) && choose({ pile: "waste", col: 0, index: table.waste.length - 1 })}
          />
          <div className="ml-auto flex gap-2">
            {table.foundations.map((pile, col) => (
              <CardFace
                key={col}
                card={top(pile)}
                selected={sel?.pile === "foundation" && sel.col === col}
                onClick={() => choose({ pile: "foundation", col, index: Math.max(0, pile.length - 1) })}
              />
            ))}
          </div>
        </div>
        <div className="mt-3 flex min-w-[22rem] gap-2">
          {table.tableau.map((pile, col) => (
            <div key={col} className="flex w-11 flex-col">
              {pile.length === 0 ? (
                <CardFace
                  card={undefined}
                  onClick={() => choose({ pile: "tableau", col, index: 0 })}
                />
              ) : (
                pile.map((card, index) => (
                  <div key={card.key} className={index === 0 ? "" : "-mt-7"}>
                    <CardFace
                      card={card.up ? card : undefined}
                      down={!card.up}
                      selected={sel?.pile === "tableau" && sel.col === col && sel.index === index}
                      onClick={() => card.up && choose({ pile: "tableau", col, index })}
                    />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

function PileButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-16 w-11 items-center justify-center rounded-md border border-line bg-navy text-xs text-cyan active:bg-ink"
    >
      {label}
    </button>
  );
}

function CardFace({
  card,
  down,
  selected,
  onClick,
}: {
  card?: Card;
  down?: boolean;
  selected?: boolean;
  onClick: () => void;
}) {
  const label = card ? `${ranks[card.rank]}${suits[card.suit]}` : "";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={card ? label : down ? "Face down" : "Empty"}
      className={`flex h-16 w-11 items-center justify-center rounded-md border text-sm ${
        selected ? "border-cyan" : "border-line"
      } ${down ? "bg-ink text-transparent" : "bg-navy"} ${card && red(card.suit) ? "text-cyan" : "text-frost"}`}
    >
      {down ? "" : label || ""}
    </button>
  );
}
