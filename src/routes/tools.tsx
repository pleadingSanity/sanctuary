import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/tools")({ component: ToolsPage });

const doors = [
  ["/talk", "Talk", "Say it as it is. Arron is a companion, not a doctor."],
  ["/journal", "Journal", "Write the day before the night rewrites it."],
  ["/sanctuary", "Breath and tones", "Four in, four held, six out. Six quiet frequencies. Not a treatment."],
  ["/words", "Words", "Lines from the house. One at a time."],
  ["/mood", "The day", "Name it. It stays on this phone."],
  ["/movement", "The movement", "Evolution, not erasure. The longer aim."],
  ["/play", "Play", "Solitaire, memory, truth tags. A rest, not a test."],
  ["/shop", "Shop", "The clothes. The sanctuary stays free."],
  ["/watch", "Watch", "Shane’s two channels. No ranked wall."],
  ["/family", "The family", "Who is actually in this room."],
] as const;

const life = [
  [
    "Water",
    "Drink it before you decide the day is already lost. A glass on waking, and another when the afternoon turns sharp, is enough to start. This is not a cleanse. It is thirst, met.",
  ],
  [
    "Sun",
    "Ten minutes on the face, morning if you can manage morning. Stand at a window if you cannot go out. Daylight still counts when the sun is behind cloud.",
  ],
  [
    "Walk",
    "Leave the room. Even to the end of the street and back. No audience, and no step count you must beat. If walking hurts, sit outside or move what you can move.",
  ],
  [
    "Sleep",
    "Dark, cool, and earlier than the phone wants. If you cannot sleep, rest anyway: eyes shut, jaw loose, no trial of yourself for being awake.",
  ],
  [
    "Plain food",
    "Eat enough. Skipping until you shake is not discipline. A piece of bread and something warm is a proper meal on a bad day.",
  ],
  [
    "Breath",
    "In for four. Hold for four. Out for six. If the hold makes you panic, drop it. The longer out-breath is the part that tells the body the chase is over.",
  ],
  [
    "Cold water",
    "Face, wrists, or a short cold finish to a wash. Stop the moment the body says stop. Never stay in cold water to punish yourself.",
  ],
  [
    "Silence",
    "A few minutes with no voice in your ear. Not a performance. Silence lets you hear which thought is yours.",
  ],
  [
    "Story",
    "Tell the whole thing once, to a page or to one person who will not jot you down. You do not have to make it inspiring. Accurate is enough.",
  ],
  [
    "Prayer",
    "You do not have to use one name. Ask for a decent next step, and for the strength to take it. This house does not require a creed.",
  ],
  [
    "Movement",
    "Train if you train. Pads, a walk, a stretch on the floor. Strength is a place to put the day so the day is not only happening inside the skull.",
  ],
  [
    "A cup",
    "Mint, chamomile, rose, or ginger in hot water. A cup held in both hands. Comfort. Not a prescription, and not a cure.",
  ],
  [
    "One living person",
    "Loneliness is the first loss. If you have one person who will sit without a form, use them. If you do not, Arron will sit until a human can. If you are in danger, use the lines at the top. Not the app.",
  ],
] as const;

function ToolsPage() {
  return (
    <Page
      kicker="The map"
      title="How to use this house"
      lede="You do not need a diagnosis to come in. You do not need to perform being well. Nothing here is locked behind a payment."
    >
      <section>
        <h2 className="font-display text-3xl">The doors, in order</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {doors.map(([to, label, note]) => (
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
        <h2 className="font-display text-3xl">Life tools</h2>
        <p className="mt-2 text-pretty text-mist">
          Ordinary things households have always used. Not a programme. Not a clinic.
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {life.map(([title, body]) => (
            <li key={title} className="rounded-xl border border-line p-4">
              <h3 className="font-display text-2xl text-frost">{title}</h3>
              <p className="mt-2 text-pretty text-mist">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-3xl">What we refuse</h2>
        <p className="mt-3 text-pretty text-frost">
          This house will not dose you, rank you, or wait until you look well enough
          to be let in. If you are in danger, the lines at the top are real people.
        </p>
      </section>
    </Page>
  );
}
