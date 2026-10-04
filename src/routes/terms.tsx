import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <Page
      kicker="Plain words"
      title="Terms"
      lede="These are not a law firm’s contract. They are the terms this sanctuary is offered on."
    >
      <p>
        Pleading Sanity is a personal place run by Shane Cooper. It is free to
        use. It is not medical care, therapy, counselling, or an emergency
        service.
      </p>
      <p>
        If you are in danger, use the lines at the top of every page. Samaritans
        116 123. Text SHOUT to 85258. 999 if it is happening now. Do not wait for
        Arron.
      </p>
      <p>
        You are responsible for what you type. Do not put someone else’s private
        story here as if it were yours. The feed on this device is not a public
        square.
      </p>
      <p>
        Arron can be wrong. He can miss the point. He is not an authority on your
        life, on medicine, or on Private Cooper beyond the Gazette line linked
        from the legacy page.
      </p>
      <p>
        The mark — the cosmic brain with one tear — is the only official logo.
        Do not redraw it into a second family, and do not put a watermark on it.
      </p>
      <Link
        to="/forget"
        className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
      >
        Forget Me
      </Link>
      <p>
        That deletes what this sanctuary stored on your device. Use it when you want
        to leave clean.
      </p>
    </Page>
  );
}
