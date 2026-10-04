import { createFileRoute } from "@tanstack/react-router";
import { Mark } from "@/components/mark";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/mark")({ component: MarkPage });

const sizes = [
  ["header", "Header. Small, still."],
  ["icon", "A tighter still, for tight spaces."],
  ["feed", "Sanity Feed. The moving mark, smaller."],
  ["hero", "Home. The moving mark, large enough to know, not so large it shouts."],
] as const;

function MarkPage() {
  return (
    <Page
      kicker="One mark"
      title="The mark"
      lede="This is the only official logo. Same brain. Same tear. No second drawing. No watermark. The size changes. The mark does not."
    >
      <img
        src="/mark.jpg"
        alt="The only Pleading Sanity mark, full."
        className="mx-auto w-full max-w-sm"
      />
      {sizes.map(([size, note]) => (
        <section key={size} className="flex items-center gap-4 border-t border-line pt-6">
          <Mark size={size} motion={size === "feed" || size === "hero"} />
          <p className="text-sm text-mist">{note}</p>
        </section>
      ))}
      <p className="text-pretty text-mist">
        The tab icon is the same family, drawn as a simple shape so it still reads
        when it is tiny. Share cards use this same brain. Nothing else is official.
      </p>
    </Page>
  );
}
