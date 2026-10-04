import type { ErrorComponentProps } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-night px-6 text-center text-frost">
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-mist">{errorMessage(error)}</p>
      <p className="text-sm text-frost">
        If you are in danger: Samaritans{" "}
        <a className="text-cyan" href="tel:116123">
          116 123
        </a>
        . Text SHOUT to 85258.
      </p>
    </main>
  );
}
