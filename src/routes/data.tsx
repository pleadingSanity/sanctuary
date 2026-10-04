import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/data")({ component: DataPage });

function DataPage() {
  return (
    <Page
      kicker="The list"
      title="What we keep"
      lede="Only what this page names. If it is not on the list, it is not kept."
    >
      <ul className="flex flex-col gap-3">
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">Journal</p>
          <p className="text-sm text-mist">The words you type. This browser only.</p>
        </li>
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">Sanity Feed</p>
          <p className="text-sm text-mist">
            Posts and the optional name, in time order. This browser only. Not a
            public feed.
          </p>
        </li>
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">Arron</p>
          <p className="text-sm text-mist">
            The chat transcript. This browser only. The text of a send is also
            passed to Grok to write the next reply, then not stored by us.
          </p>
        </li>
        <li className="rounded-xl border border-line p-4">
          <p className="text-frost">The day</p>
          <p className="text-sm text-mist">
            The word you give a day, and an optional line. This browser only.
          </p>
        </li>
      </ul>
      <p>
        Not kept: an account, a password, an email address, a location, a payment,
        a medical record, a copy of your journal on a server.
      </p>
      <Link
        to="/forget"
        className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
      >
        Forget Me
      </Link>
      <p>
        That deletes what this page lists from this device. It does not reach into a
        model provider’s own short logs. We do not hold a second copy to delete.
      </p>
    </Page>
  );
}
