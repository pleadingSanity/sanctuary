export const storageKeys = {
  arron: "ps.arron",
  feed: "ps.feed",
  journal: "ps.journal",
  name: "ps.name",
  mood: "ps.mood",
} as const;

const PREFIX = "ps.";

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type FeedPost = {
  id: string;
  name: string;
  body: string;
  at: number;
};

export type MoodMark = {
  at: number;
  weather: string;
  note: string;
};

export const ARRON_GREETING =
  "I'm Arron. I'm not a therapist, and I'm not a crisis line. If you are in danger, call Samaritans on 116 123, or text SHOUT to 85258. If you want to talk, I'm here.";

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readText(key: string): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(key) ?? "";
}

export function writeText(key: string, value: string) {
  localStorage.setItem(key, value);
}

export type KeptPiece = {
  label: string;
  detail: string;
};

export function whatIsKept(): KeptPiece[] {
  if (typeof window === "undefined") return [];
  const pieces: KeptPiece[] = [];
  const chat = readJSON<ChatTurn[]>(storageKeys.arron, []);
  const userTurns = chat.filter((turn) => turn.role === "user").length;
  if (chat.length > 0) {
    pieces.push({
      label: "Arron",
      detail: `${userTurns} message${userTurns === 1 ? "" : "s"} from you, kept in this browser.`,
    });
  }
  const posts = readJSON<FeedPost[]>(storageKeys.feed, []);
  if (posts.length > 0) {
    pieces.push({
      label: "Sanity Feed",
      detail: `${posts.length} post${posts.length === 1 ? "" : "s"} on this device.`,
    });
  }
  const journal = readText(storageKeys.journal);
  if (journal.trim()) {
    pieces.push({
      label: "Journal",
      detail: `${journal.trim().length} characters on this device.`,
    });
  }
  const name = readText(storageKeys.name).trim();
  if (name) {
    pieces.push({
      label: "Name on the feed",
      detail: name,
    });
  }
  const moods = readJSON<MoodMark[]>(storageKeys.mood, []);
  if (moods.length > 0) {
    pieces.push({
      label: "The day",
      detail: `${moods.length} name${moods.length === 1 ? "" : "s"} for how the day felt.`,
    });
  }
  return pieces;
}

export function forgetAll(): number {
  const drop: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && key.startsWith(PREFIX)) drop.push(key);
  }
  for (const key of drop) localStorage.removeItem(key);
  return drop.length;
}
