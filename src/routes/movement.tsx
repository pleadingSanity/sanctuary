import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/movement")({ component: MovementPage });

function MovementPage() {
  return (
    <Page
      kicker="The longer aim"
      title="The movement"
      lede="More than a website. The pain is not erased. It is what the next thing is built from."
    >
      <section>
        <h2 className="font-display text-3xl">What it stands on</h2>
        <ul className="mt-3 flex flex-col gap-3">
          <li className="rounded-xl border border-line p-4">
            <p className="text-frost">Evolution, not erasure</p>
            <p className="mt-1 text-pretty text-mist">
              Healing is not a return to a person who is gone. It is becoming, with
              what you survived still in the room.
            </p>
          </li>
          <li className="rounded-xl border border-line p-4">
            <p className="text-frost">Lived experience is the authority here</p>
            <p className="mt-1 text-pretty text-mist">
              No book holds the whole of a life. The people living it are not a case
              study for someone else’s notes.
            </p>
          </li>
          <li className="rounded-xl border border-line p-4">
            <p className="text-frost">One family, not a set of labels</p>
            <p className="mt-1 text-pretty text-mist">
              Stories connect what labels divide. One Source. One Family.
            </p>
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-navy p-4">
        <h2 className="font-display text-3xl">Family memory</h2>
        <p className="mt-3 text-pretty text-sm text-cyan">
          Written by Shane. Not copied into the Gazette page. If a memory and the
          London Gazette ever disagree, the Gazette page stays with the Gazette.
        </p>
        <p className="mt-4 text-pretty text-frost">
          Ivan Kurcharskyi. Taken prisoner of war as a boy, treated as less than a
          person, and still, when he was free, he chose to be a good man. Shane has
          written that at seventy he would arrive before dawn and shift the feed
          before anyone else woke.
        </p>
        <p className="mt-3 text-pretty text-frost">
          Arthur Lesley Cooper. Private A. L. Cooper of the Royal Army Ordnance
          Corps, the name in the London Gazette on 29 November 1945. The family
          holds him as a man who served because people needed him, not because he
          wanted to be seen.
        </p>
        <p className="mt-3 text-pretty text-mist">
          Two men. One bloodline, as Shane tells it. They suffered so the people
          after them could stand. That is why this house stands.
        </p>
        <Link
          to="/legacy"
          className="mt-4 flex min-h-14 items-center rounded-md border border-line px-4 text-cyan active:bg-ink"
        >
          The Gazette line, unchanged
        </Link>
      </section>

      <section>
        <h2 className="font-display text-3xl">Why Shane built it</h2>
        <blockquote className="mt-3 border-l-2 border-cyan pl-4 font-display text-2xl leading-snug text-pretty text-frost">
          I built this for everyone told to shut up, fit in, get over it. For the
          ones labelled without being heard. I know what it is like to be silenced
          and still see clearer than the ones writing the notes.
        </blockquote>
        <p className="mt-4 text-pretty text-mist">
          Shane Cooper. Leicester. Founder. He has written that he lives with
          bipolar, that he is a dad to three, and that he built this from survival,
          not from a textbook. This page is not a clinic, and that sentence is not
          a diagnosis of you.
        </p>
      </section>
    </Page>
  );
}
