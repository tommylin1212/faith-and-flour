import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { business } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="cookie-pattern absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)]/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text)]">
                ✦ Handcrafted with love
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
                {business.name}
              </h1>
              <p className="mt-4 max-w-lg text-lg text-[var(--color-text-muted)]">
                {business.tagline}. From weddings to baby showers, every cookie is
                rolled, baked, and decorated just for your celebration.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/order">Start your order</ButtonLink>
                <ButtonLink href="/gallery" variant="secondary">
                  View gallery
                </ButtonLink>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-[var(--color-hero-from)] to-[var(--color-hero-to)] p-8 shadow-lg">
                <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)]/80 text-center backdrop-blur-sm">
                  <span className="text-7xl" role="img" aria-label="cookie">
                    🍪
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold">
                    Custom designs
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Your colors · Your theme · Your story
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white shadow-md">
                Made to order
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-display text-3xl font-semibold">
          How it works
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Share your vision",
              text: "Fill out the order form with your event date, theme, and design ideas.",
            },
            {
              step: "2",
              title: "Approve & confirm",
              text: "We'll send a quote and contract. Sign electronically — no extra fees.",
            },
            {
              step: "3",
              title: "Pick up & enjoy",
              text: "Fresh, beautiful cookies ready for your special day.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-bg-alt)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold">
                Perfect for every occasion
              </h2>
              <p className="mt-3 text-[var(--color-text-muted)]">
                Weddings, baby showers, corporate gifts, holidays, and classroom
                treats — if you can dream it, we can pipe it in icing.
              </p>
              <Link
                href="/pricing"
                className="mt-4 inline-block text-sm font-semibold text-[var(--color-primary)] underline"
              >
                See pricing →
              </Link>
            </div>
            <div className="hidden lg:block">
              <ThemeSwitcher />
              <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                Try different color themes — easy to customize in{" "}
                <code className="rounded bg-[var(--color-surface)] px-1">themes.ts</code>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Ready to sweeten your event?</h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--color-text-muted)]">
          Tell us about your celebration and we&apos;ll get back to you with next steps.
        </p>
        <ButtonLink href="/order" className="mt-6">
          Get started
        </ButtonLink>
      </section>
    </>
  );
}
