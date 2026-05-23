import type { Metadata } from "next";
import { galleryItems } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse custom sugar cookie designs from Faith + Flour Creations",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold">Gallery</h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-muted)]">
          A peek at recent styles and themes. Replace these placeholders with your
          own photos anytime — each card is ready for real images.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition hover:shadow-md"
          >
            <div
              className={`flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${item.gradient} text-6xl transition group-hover:scale-[1.02]`}
            >
              <span role="img" aria-hidden>
                {item.emoji}
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                {item.category}
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-[var(--color-bg-alt)] p-8 text-center">
        <p className="font-display text-2xl font-semibold">Love what you see?</p>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          Share your inspiration and we&apos;ll create something uniquely yours.
        </p>
        <ButtonLink href="/order" className="mt-4">
          Request a custom set
        </ButtonLink>
      </div>
    </div>
  );
}
