import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/shop")({ component: ShopPage });

const pieces = [
  {
    name: "Crying Brain hoodie",
    note: "Reflective mark. Blackout fit.",
    href: "https://shop.pleadingsanity.co.uk/products/crying-brain-hoodie",
  },
  {
    name: "P.S tracksuit",
    note: "The mark on the back. P.S on the front.",
    href: "https://shop.pleadingsanity.co.uk/products/ps-tracksuit",
  },
  {
    name: "P.S five-panel cap",
    note: "First edition. Cosmic blue under the brim.",
    href: "https://shop.pleadingsanity.co.uk/products/p-s-five-panel-cap-1st-edition",
  },
] as const;

function ShopPage() {
  return (
    <Page
      kicker="The clothes"
      title="Shop"
      lede="The sanctuary stays free. These pieces fund the work. This page does not take a payment. It opens the real shop."
    >
      <ul className="flex flex-col gap-2">
        {pieces.map((piece) => (
          <li key={piece.href}>
            <a
              href={piece.href}
              className="flex min-h-16 flex-col justify-center rounded-md border border-line bg-navy px-4 py-3 active:bg-ink"
            >
              <span className="text-frost">{piece.name}</span>
              <span className="text-sm text-mist">{piece.note}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="text-pretty text-mist">
        One mark only. The crying brain. If a product does not carry that mark, it
        is not this house.
      </p>
    </Page>
  );
}
