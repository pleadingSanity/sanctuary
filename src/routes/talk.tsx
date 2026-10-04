import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { askArron } from "@/lib/arron";
import {
  ARRON_GREETING,
  readJSON,
  storageKeys,
  writeJSON,
  type ChatTurn,
} from "@/lib/memory";

export const Route = createFileRoute("/talk")({ component: TalkPage });

function TalkPage() {
  const [ready, setReady] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const stored = readJSON<ChatTurn[]>(storageKeys.arron, []);
    const initial: ChatTurn[] =
      stored.length > 0 ? stored : [{ role: "assistant", content: ARRON_GREETING }];
    if (stored.length === 0) writeJSON(storageKeys.arron, initial);
    setMessages(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTop = list.scrollHeight;
  }, [messages, pending, ready]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || pending) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    writeJSON(storageKeys.arron, next);
    setDraft("");
    setError(null);
    setPending(true);
    try {
      const payload = next.slice(-12);
      const result = await askArron({ data: { messages: payload } });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const withReply = [...next, { role: "assistant" as const, content: result.text }];
      setMessages(withReply);
      writeJSON(storageKeys.arron, withReply);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Arron could not reply.");
    } finally {
      setPending(false);
    }
  }

  return (
    <article className="mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col">
      <div className="shrink-0 px-4 pt-4 pb-1 sm:px-5">
        <h1 className="font-display text-3xl leading-none sm:text-5xl">Talk to Arron</h1>
        <p className="mt-2 text-pretty text-sm text-mist">
          On this device. Not a therapist. Grok writes the replies. Forget Me erases the chat.
          It does not call a clinic.
        </p>
      </div>
      <ol
        ref={listRef}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3 sm:px-5"
        aria-live="polite"
      >
        {ready
          ? messages.map((message, index) => (
              <li
                key={`${message.role}-${index}`}
                className={
                  message.role === "user"
                    ? "bubble ml-auto rounded-xl bg-ink p-4"
                    : "bubble mr-auto rounded-xl border border-line bg-navy p-4"
                }
              >
                <p className="text-xs text-cyan">{message.role === "user" ? "You" : "Arron"}</p>
                <p className="mt-1 text-base whitespace-pre-wrap text-pretty">{message.content}</p>
              </li>
            ))
          : null}
        {pending ? (
          <li className="bubble mr-auto rounded-xl border border-line p-4 text-mist">
            Arron is writing.
          </li>
        ) : null}
      </ol>
      {error ? (
        <p className="shrink-0 px-4 pb-2 text-pretty text-sm text-frost sm:px-5" role="alert">
          {error} That is a failed reply, not a judgement of you. The lines at the top of this
          page are real people.
        </p>
      ) : null}
      <form
        className="shrink-0 border-t border-line bg-night px-4 py-3 sm:px-5"
        onSubmit={send}
      >
        <label className="sr-only" htmlFor="arron-draft">
          Message
        </label>
        <div className="flex items-end gap-2">
          <textarea
            id="arron-draft"
            value={draft}
            maxLength={2000}
            rows={2}
            enterKeyHint="send"
            onChange={(event) => setDraft(event.target.value)}
            className="max-h-36 min-h-12 w-full flex-1 resize-none rounded-md border border-line bg-navy px-3 py-3 text-base text-frost"
            placeholder="Say it plain."
          />
          <button
            type="submit"
            disabled={pending || draft.trim().length === 0}
            className="h-12 min-w-20 shrink-0 rounded-md bg-cyan px-4 font-medium text-night active:opacity-80 disabled:opacity-40"
          >
            {pending ? "Sending" : "Send"}
          </button>
        </div>
      </form>
    </article>
  );
}
