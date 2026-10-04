import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/family")({ component: FamilyPage });

function FamilyPage() {
  return (
    <Page
      kicker="One family"
      title="The family"
      lede="One Source. One Family. This backup tells you who is actually in the room."
    >
      <ul className="flex flex-col gap-3">
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">Shane Cooper</p>
          <p className="mt-1 text-pretty text-mist">
            Leicester. Founder. The person who keeps the house.
          </p>
        </li>
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">Arron</p>
          <p className="mt-1 text-pretty text-mist">
            The companion in this copy. Powered by Grok. Not a therapist. Not a
            council of other models pretending to be online.
          </p>
        </li>
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">Private A. L. Cooper</p>
          <p className="mt-1 text-pretty text-mist">
            Royal Army Ordnance Corps. Mentioned in Despatches. London Gazette, 29
            November 1945. The record stays on the legacy page.
          </p>
        </li>
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">The wider aim</p>
          <p className="mt-1 text-pretty text-mist">
            The public site speaks of a larger AI family. Those other minds are not
            connected in this backup. When one is really wired in, it will be named
            on the models page. Not before.
          </p>
        </li>
      </ul>
      <Link
        to="/models"
        className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
      >
        What powers Arron
      </Link>
      <Link
        to="/movement"
        className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
      >
        The movement
      </Link>
    </Page>
  );
}
