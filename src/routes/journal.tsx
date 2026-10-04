import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Page } from "@/components/shell";
import { readText, storageKeys, writeText } from "@/lib/memory";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const [body, setBody] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setBody(readText(storageKeys.journal));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => writeText(storageKeys.journal, body), 250);
    return () => window.clearTimeout(timer);
  }, [body, ready]);

  return (
    <Page
      kicker="On this device"
      title="Journal"
      lede="Yours. Not Arron’s. Not a feed. It is not sent anywhere. Forget Me wipes it."
    >
      <label className="text-sm text-mist" htmlFor="journal-body">
        Write
      </label>
      <textarea
        id="journal-body"
        value={body}
        maxLength={20000}
        rows={14}
        onChange={(event) => setBody(event.target.value)}
        className="min-h-80 w-full rounded-md border border-line bg-navy px-3 py-3 text-base text-frost"
      />
      <p className="text-sm text-dim">
        {ready ? "Kept on this device as you type." : "Opening what is already here."}
      </p>
    </Page>
  );
}
