import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/watch")({ component: WatchPage });

const channels = [
  {
    name: "Shane Cooper",
    note: "The founder’s channel.",
    href: "https://www.youtube.com/@shanecooper1872",
  },
  {
    name: "The Creator MMA",
    note: "Training and the longer talks.",
    href: "https://www.youtube.com/@thecreatormma5440",
  },
] as const;

function WatchPage() {
  return (
    <Page
      kicker="Shane’s own pictures"
      title="Watch"
      lede="Two channels. No ranked feed inside this house, and no video invented to fill a wall."
    >
      <ul className="flex flex-col gap-2">
        {channels.map((channel) => (
          <li key={channel.href}>
            <a
              href={channel.href}
              className="flex min-h-16 flex-col justify-center rounded-md border border-line bg-navy px-4 py-3 active:bg-ink"
            >
              <span className="text-frost">{channel.name}</span>
              <span className="text-sm text-mist">{channel.note}</span>
            </a>
          </li>
        ))}
      </ul>
    </Page>
  );
}
