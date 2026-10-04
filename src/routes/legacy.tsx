import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/legacy")({ component: LegacyPage });

function LegacyPage() {
  return (
    <Page
      kicker="London Gazette · 29 November 1945"
      title="Private A. L. Cooper"
      lede="Royal Army Ordnance Corps. Mentioned in Despatches. This is the record. Nothing has been added to it."
    >
      <section className="rounded-xl border border-line bg-navy p-4">
        <h2 className="font-display text-3xl">The line, as printed</h2>
        <p className="mt-4 text-sm text-mist">
          Supplement to the London Gazette, 29 November 1945. Issue 37368. Page 5825.
          The names on that page, up to the next corps heading, continue the Royal Army
          Ordnance Corps list that begins at the foot of page 5824.
        </p>
        <blockquote className="mt-4 border-l-2 border-cyan pl-4 font-display text-2xl leading-snug text-frost">
          257735 pte. A. L. Cooper.
        </blockquote>
        <p className="mt-4 text-sm text-mist">
          “pte.” is the Gazette’s own shortening of Private. The number is printed as
          257735. If a digit on the scan ever disagrees with this transcription, the scan
          wins.
        </p>
      </section>

      <section>
        <h2 className="font-display text-3xl">The notice that covers his name</h2>
        <p className="mt-3 text-pretty text-frost">
          On page 5790 of the same supplement, dated War Office, 29th November, 1945,
          the King approved that the following be mentioned in recognition of gallant
          and distinguished services in the field.
        </p>
        <p className="mt-3 text-pretty text-mist">
          That sentence is the whole of the honour as the Gazette gives it. It does not
          name a battle. It does not name a country. It does not say what he did on any
          day. This page will not invent those things.
        </p>
      </section>

      <section>
        <h2 className="font-display text-3xl">Read it yourself</h2>
        <ul className="mt-3 flex flex-col gap-2">
          <li>
            <a
              className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
              href="https://www.thegazette.co.uk/London/issue/37368/supplement/5825"
            >
              Page 5825 — his name
            </a>
          </li>
          <li>
            <a
              className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
              href="https://www.thegazette.co.uk/London/issue/37368/supplement/5824"
            >
              Page 5824 — Royal Army Ordnance Corps, where the list begins
            </a>
          </li>
          <li>
            <a
              className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
              href="https://www.thegazette.co.uk/London/issue/37368/supplement/5790"
            >
              Page 5790 — the King’s approval, in the field
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-3xl">What a mention is</h2>
        <p className="mt-3 text-pretty text-frost">
          A Mention in Despatches is not a medal. It is a name published, with the
          Sovereign’s approval, for gallant or distinguished service. People who were
          mentioned could wear a small oak-leaf emblem. This Gazette entry does not
          list any other award. So this page does not list any other award.
        </p>
      </section>

      <section>
        <h2 className="font-display text-3xl">The corps, not his diary</h2>
        <p className="mt-3 text-pretty text-frost">
          The Royal Army Ordnance Corps supplied the Army — weapons, ammunition,
          vehicles, stores. That is what the corps was for. It is not a story of his
          days. Those days are not written here, because they are not in the line.
        </p>
      </section>

      <section className="rounded-xl border border-line p-4">
        <h2 className="font-display text-3xl">What is not here</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-mist">
          <li>No photograph. None was invented.</li>
          <li>No hometown, age, or service beyond the Gazette line.</li>
          <li>No battle, no theatre, no imagined letter.</li>
          <li>
            Family memory is written on the movement page, in Shane’s words. It is
            not copied into this Gazette record.
          </li>
        </ul>
      </section>

      <p className="font-display text-3xl text-pretty text-frost">
        Pleading Sanity stands on this name being written down, and left true.
      </p>
    </Page>
  );
}
