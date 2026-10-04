import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/shell";
import { forgetAll, whatIsKept, type KeptPiece } from "@/lib/memory";

export const Route = createFileRoute("/forget")({ component: ForgetPage });

function ForgetPage() {
  const [kept, setKept] = useState<KeptPiece[]>([]);
  const [armed, setArmed] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    setKept(whatIsKept());
  }, [gone]);

  return (
    <Page
      kicker="No shortcut"
      title="Forget Me"
      lede="This erases everything Pleading Sanity kept on this device. It cannot be undone. It does not call anyone."
    >
      {gone ? (
        <p className="rounded-xl border border-line bg-navy p-4 text-frost">
          Gone. The journal, the feed, Arron’s chat, the day names, and the name you
          used are no longer in this browser.
        </p>
      ) : null}

      <section>
        <h2 className="font-display text-3xl">What is here now</h2>
        {kept.length === 0 ? (
          <p className="mt-3 text-mist">Nothing of yours is stored on this device.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {kept.map((piece) => (
              <li key={piece.label} className="rounded-xl border border-line p-4">
                <p className="text-frost">{piece.label}</p>
                <p className="text-sm text-mist">{piece.detail}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="text-pretty text-mist">
        <p>
          Messages already sent so Arron could reply were used to write that reply
          and are not kept by this sanctuary on a server. A provider may hold a
          short technical log we cannot reach in and delete. We do not keep a copy
          of our own.
        </p>
      </section>

      {!armed ? (
        <button
          type="button"
          className="min-h-14 w-full rounded-md border border-line px-4 text-base text-frost active:bg-ink sm:w-auto"
          onClick={() => setArmed(true)}
        >
          I want to erase it
        </button>
      ) : (
        <div className="flex flex-col gap-3 rounded-xl border border-line bg-navy p-4">
          <p>This cannot be undone. Say it again if you mean it.</p>
          <button
            type="button"
            className="min-h-14 rounded-md bg-cyan px-4 text-base font-medium text-night active:opacity-80"
            onClick={() => {
              forgetAll();
              setArmed(false);
              setGone(true);
            }}
          >
            Erase everything on this device
          </button>
          <button
            type="button"
            className="min-h-14 rounded-md text-base text-mist active:bg-ink"
            onClick={() => setArmed(false)}
          >
            Keep it
          </button>
        </div>
      )}
    </Page>
  );
}
