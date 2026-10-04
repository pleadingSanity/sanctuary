import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mark } from "@/components/mark";
import {
  readJSON,
  readText,
  storageKeys,
  writeJSON,
  writeText,
  type FeedPost,
} from "@/lib/memory";

export const Route = createFileRoute("/feed")({ component: FeedPage });

function formatWhen(at: number) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(at);
}

function FeedPage() {
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setPosts(readJSON<FeedPost[]>(storageKeys.feed, []));
    setName(readText(storageKeys.name));
    setReady(true);
  }, []);

  function publish(event: React.FormEvent) {
    event.preventDefault();
    const text = body.trim();
    if (!text) return;
    const usedName = name.trim().slice(0, 40);
    writeText(storageKeys.name, usedName);
    const post: FeedPost = {
      id: crypto.randomUUID(),
      name: usedName || "Anonymous",
      body: text.slice(0, 1000),
      at: Date.now(),
    };
    const next = [post, ...posts].slice(0, 100);
    setPosts(next);
    writeJSON(storageKeys.feed, next);
    setBody("");
  }

  const ordered = [...posts].sort((a, b) => b.at - a.at);

  return (
    <article className="mx-auto flex w-full max-w-xl flex-col px-4 py-6 sm:px-5">
      <div className="flex items-center gap-3">
        <Mark size="feed" motion />
        <div className="min-w-0">
          <h1 className="font-display text-4xl leading-none text-balance">Sanity Feed</h1>
          <p className="mt-2 text-pretty text-sm text-mist">
            Time order only. Newest first. Nothing is boosted.
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-mist">
        These posts stay on this device. Not a public timeline yet.
      </p>
      <form className="mt-6 flex w-full flex-col gap-3" onSubmit={publish}>
        <label className="text-sm text-mist" htmlFor="feed-name">
          Name, if you want one
        </label>
        <input
          id="feed-name"
          value={name}
          maxLength={40}
          autoComplete="nickname"
          enterKeyHint="next"
          onChange={(event) => setName(event.target.value)}
          className="min-h-12 rounded-md border border-line bg-navy px-3 text-base text-frost"
        />
        <label className="text-sm text-mist" htmlFor="feed-body">
          What is true for you
        </label>
        <textarea
          id="feed-body"
          value={body}
          maxLength={1000}
          rows={4}
          onChange={(event) => setBody(event.target.value)}
          className="min-h-28 rounded-md border border-line bg-navy px-3 py-3 text-base text-frost"
        />
        <button
          type="submit"
          disabled={body.trim().length === 0}
          className="min-h-14 rounded-md bg-cyan px-4 text-base font-medium text-night active:opacity-80 disabled:opacity-40"
        >
          Place it in time
        </button>
      </form>
      <ol className="mt-8 flex w-full flex-col gap-3">
        {ready && ordered.length === 0 ? (
          <li className="rounded-xl border border-line p-4 text-mist">
            Nothing here yet. When you write, it stays in the order you wrote it.
          </li>
        ) : null}
        {ready
          ? ordered.map((post) => (
              <li key={post.id} className="rounded-xl border border-line bg-navy p-4">
                <p className="text-sm text-cyan">{post.name}</p>
                <p className="mt-1 whitespace-pre-wrap text-pretty">{post.body}</p>
                <p className="mt-3 text-xs tabular-nums text-dim">{formatWhen(post.at)}</p>
              </li>
            ))
          : null}
      </ol>
    </article>
  );
}
