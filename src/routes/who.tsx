import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/who")({ component: WhoPage });

function WhoPage() {
  return (
    <Page
      kicker="A person, not a department"
      title="Who runs it"
      lede="Shane Cooper. Leicester, England. Founder of Pleading Sanity. One person keeps this place."
    >
      <p>
        There is no clinic behind the name, no board you cannot see, and no
        charity number invented to look official. If that changes, it will be
        written here as a fact, not a costume.
      </p>
      <p>
        Shane has written that he lives with bipolar, that he is a dad to three,
        and that he built this from survival, not from a textbook. That is his
        account. It is not a diagnosis of anyone who walks in.
      </p>
      <p>
        Shane’s grandfather is Private A. L. Cooper, Royal Army Ordnance Corps,
        Mentioned in Despatches in the London Gazette on 29 November 1945. The
        sanctuary is built on that record being told true. The wider family memory
        sits on the movement page, and stays off the Gazette line.
      </p>
      <Link
        to="/legacy"
        className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
      >
        Read the legacy
      </Link>
      <Link
        to="/movement"
        className="flex min-h-14 items-center rounded-md border border-line bg-navy px-4 text-cyan active:bg-ink"
      >
        Read the movement
      </Link>
      <p>
        The public home of the work is pleadingsanity.co.uk. This place keeps the
        same house: the two doors, the legacy, the tools, and the words.
      </p>
      <p>The line Shane stands on: Evolution Not Erasure. One Source. One Family.</p>
    </Page>
  );
}
