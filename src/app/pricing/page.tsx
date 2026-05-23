import type { Metadata } from "next";
import { addOns, pricingTiers } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing for custom decorated sugar cookies",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold">Pricing</h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-muted)]">
          Starting points for common orders. Final quotes depend on design complexity,
          quantity, and timeline.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl border p-6 ${
              tier.highlighted
                ? "border-[var(--color-primary)] bg-[var(--color-surface)] shadow-lg ring-2 ring-[var(--color-primary)]/30"
                : "border-[var(--color-border)] bg-[var(--color-surface)]"
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-3 py-0.5 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h2 className="font-display text-2xl font-semibold">{tier.name}</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {tier.description}
            </p>
            <p className="mt-4">
              {tier.priceNote && (
                <span className="text-xs text-[var(--color-text-muted)]">
                  {tier.priceNote}{" "}
                </span>
              )}
              <span className="font-display text-4xl font-semibold text-[var(--color-primary)]">
                {tier.price}
              </span>
            </p>
            <ul className="mt-6 space-y-2 text-sm text-[var(--color-text-muted)]">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-[var(--color-primary)]">✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6">
        <h2 className="font-display text-xl font-semibold">Add-ons</h2>
        <ul className="mt-4 divide-y divide-[var(--color-border)]">
          {addOns.map((addon) => (
            <li
              key={addon.name}
              className="flex justify-between gap-4 py-3 text-sm first:pt-0 last:pb-0"
            >
              <span>{addon.name}</span>
              <span className="font-medium text-[var(--color-text)]">{addon.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-center text-xs text-[var(--color-text-muted)]">
        Prices are samples for the website — update them in{" "}
        <code className="rounded bg-[var(--color-surface)] px-1">src/lib/content.ts</code>
      </p>

      <div className="mt-10 text-center">
        <ButtonLink href="/order">Get a custom quote</ButtonLink>
      </div>
    </div>
  );
}
