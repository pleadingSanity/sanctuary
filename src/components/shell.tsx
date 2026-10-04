import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Home, Menu, MessageCircle, Newspaper, type LucideIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Mark } from "@/components/mark";

const footerLinks = [
  ["/play", "Play"],
  ["/shop", "Shop"],
  ["/watch", "Watch"],
  ["/family", "The family"],
  ["/tools", "The tools"],
  ["/words", "Words"],
  ["/mood", "The day"],
  ["/movement", "The movement"],
  ["/sanctuary", "Sanctuary"],
  ["/journal", "Journal"],
  ["/feed", "Sanity Feed"],
  ["/mark", "The mark"],
  ["/who", "Who runs it"],
  ["/privacy", "Privacy"],
  ["/data", "What we keep"],
  ["/models", "What powers Arron"],
  ["/terms", "Terms"],
  ["/forget", "Forget Me"],
] as const;

const morePlaces = [
  ["/play", "Play"],
  ["/shop", "Shop"],
  ["/watch", "Watch"],
  ["/family", "The family"],
  ["/tools", "The tools"],
  ["/words", "Words"],
  ["/mood", "The day"],
  ["/movement", "The movement"],
  ["/sanctuary", "Sanctuary"],
  ["/journal", "Journal"],
  ["/mark", "The mark"],
] as const;

const moreAbout = [
  ["/who", "Who runs it"],
  ["/privacy", "Privacy"],
  ["/data", "What we keep"],
  ["/models", "What powers Arron"],
  ["/terms", "Terms"],
  ["/forget", "Forget Me"],
] as const;

const dock = [
  { to: "/", label: "Home", icon: Home },
  { to: "/talk", label: "Arron", icon: MessageCircle },
  { to: "/legacy", label: "Legacy", icon: BookOpen },
  { to: "/feed", label: "Feed", icon: Newspaper },
] as const;

const phoneRoutes = new Set<string>([
  "/play",
  "/play/solitaire",
  "/play/memory",
  "/play/truth",
  "/shop",
  "/watch",
  "/family",
  "/tools",
  "/words",
  "/mood",
  "/movement",
  "/sanctuary",
  "/journal",
  "/mark",
  "/who",
  "/privacy",
  "/data",
  "/models",
  "/terms",
  "/forget",
]);

export function CrisisBar() {
  return (
    <section
      className="shrink-0 border-b border-line bg-navy pt-[env(safe-area-inset-top,0px)]"
      aria-label="Crisis help"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-3 sm:px-5">
        <div>
          <p className="text-base font-medium text-pretty text-frost">
            If you are in danger, get a person. Not an app.
          </p>
          <p className="mt-1 text-sm text-pretty text-mist">
            Arron is not a therapist, a doctor, or a crisis service.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <a
            className="flex min-h-12 flex-col items-center justify-center rounded-md border border-line bg-ink px-1 text-center leading-tight active:bg-night"
            href="tel:116123"
          >
            <span className="text-xs text-mist">Samaritans</span>
            <span className="text-sm font-semibold text-cyan">116 123</span>
          </a>
          <a
            className="flex min-h-12 flex-col items-center justify-center rounded-md border border-line bg-ink px-1 text-center leading-tight active:bg-night"
            href="sms:85258?body=SHOUT"
          >
            <span className="text-xs text-mist">Text SHOUT</span>
            <span className="text-sm font-semibold text-cyan">85258</span>
          </a>
          <a
            className="flex min-h-12 flex-col items-center justify-center rounded-md border border-line bg-ink px-1 text-center leading-tight active:bg-night"
            href="tel:999"
          >
            <span className="text-xs text-mist">Right now</span>
            <span className="text-sm font-semibold text-cyan">Call 999</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function DockLink({
  to,
  label,
  icon: Icon,
}: {
  to: "/" | "/talk" | "/legacy" | "/feed";
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="flex min-h-14 items-center justify-center text-mist"
    >
      {({ isActive }) => (
        <span
          className={`flex w-full flex-col items-center justify-center gap-1 text-xs font-medium ${
            isActive ? "text-cyan" : "text-mist"
          }`}
        >
          <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
          {label}
        </span>
      )}
    </Link>
  );
}

function MoreLink({ to, label }: { to: (typeof footerLinks)[number][0]; label: string }) {
  return (
    <Link
      to={to}
      className="flex min-h-12 items-center rounded-md px-3 text-base text-frost active:bg-ink"
    >
      {label}
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const chatting = pathname === "/talk";
  const [more, setMore] = useState(false);
  const moreHere = phoneRoutes.has(pathname);

  useEffect(() => {
    setMore(false);
  }, [pathname]);

  useEffect(() => {
    if (!more) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMore(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [more]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-night pr-[env(safe-area-inset-right,0px)] pl-[env(safe-area-inset-left,0px)] text-frost">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-navy focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <CrisisBar />
      <header className="shrink-0 border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-2 sm:px-5">
          <Link to="/" className="flex min-h-12 min-w-0 items-center gap-2.5 rounded-md">
            <Mark size="header" />
            <span className="truncate font-display text-xl leading-none sm:text-2xl">
              Pleading Sanity
            </span>
          </Link>
          <nav className="desktop-nav items-center gap-1" aria-label="Primary">
            <Link to="/talk" className="flex min-h-12 items-center rounded-md px-3 text-mist">
              Arron
            </Link>
            <Link to="/legacy" className="flex min-h-12 items-center rounded-md px-3 text-mist">
              Legacy
            </Link>
            <Link to="/feed" className="flex min-h-12 items-center rounded-md px-3 text-mist">
              Feed
            </Link>
          </nav>
        </div>
      </header>
      <main
        id="main"
        className={
          chatting
            ? "flex min-h-0 flex-1 flex-col overflow-hidden"
            : "min-h-0 flex-1 overflow-y-auto"
        }
      >
        {children}
        {chatting ? null : <Footer />}
      </main>
      {more ? (
        <button
          type="button"
          className="phone-chrome fixed inset-0 z-30 bg-night/70"
          aria-label="Close the menu"
          onClick={() => setMore(false)}
        />
      ) : null}
      {more ? (
        <div
          id="more-places"
          className="phone-chrome sheet fixed inset-x-0 z-40 overflow-y-auto rounded-t-xl border border-line bg-navy px-3 pt-3 pb-2"
          role="dialog"
          aria-label="More places"
        >
          <p className="px-3 pb-1 text-xs text-dim">Places</p>
          {morePlaces.map(([to, label]) => (
            <MoreLink key={to} to={to} label={label} />
          ))}
          <p className="mt-3 px-3 pb-1 text-xs text-dim">About this place</p>
          {moreAbout.map(([to, label]) => (
            <MoreLink key={to} to={to} label={label} />
          ))}
        </div>
      ) : null}
      <nav
        className="phone-chrome relative z-50 shrink-0 border-t border-line bg-night pb-[env(safe-area-inset-bottom,0px)]"
        aria-label="On this phone"
      >
        <div className="grid grid-cols-5">
          {dock.map((item) => (
            <DockLink key={item.to} to={item.to} label={item.label} icon={item.icon} />
          ))}
          <button
            type="button"
            className={`flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-medium ${
              more || moreHere ? "text-cyan" : "text-mist"
            }`}
            aria-expanded={more}
            aria-controls="more-places"
            onClick={() => setMore((open) => !open)}
          >
            <Menu className="size-5" strokeWidth={1.75} aria-hidden="true" />
            More
          </button>
        </div>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-8 text-sm text-mist sm:px-5">
        <p className="font-display text-2xl text-frost">One Source. One Family.</p>
        <p>Evolution Not Erasure.</p>
        <nav className="grid grid-cols-1 gap-1 sm:grid-cols-2" aria-label="More">
          {footerLinks.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="flex min-h-12 items-center rounded-md px-2 text-base text-frost active:bg-ink"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p>Run by Shane Cooper, Leicester. Not a clinic.</p>
      </div>
    </footer>
  );
}

export function Page({
  kicker,
  title,
  lede,
  children,
}: {
  kicker?: string;
  lede?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-5 sm:py-8">
      {kicker ? <p className="text-sm text-cyan">{kicker}</p> : null}
      <h1 className="mt-2 font-display text-4xl leading-none text-balance text-frost sm:text-5xl">
        {title}
      </h1>
      {lede ? <p className="mt-4 max-w-prose text-lg text-pretty text-mist">{lede}</p> : null}
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </article>
  );
}
