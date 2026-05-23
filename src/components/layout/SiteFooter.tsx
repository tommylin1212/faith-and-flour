import Link from "next/link";
import { business } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-[var(--color-text)]">
            {business.name}
          </p>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {business.tagline}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Quick links
          </p>
          <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-muted)]">
            <li>
              <Link href="/order" className="hover:text-[var(--color-primary)]">
                Start an order
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[var(--color-primary)]">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-[var(--color-primary)]">
                Gallery
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Contact
          </p>
          <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-muted)]">
            <li>{business.email}</li>
            <li>{business.phone}</li>
            <li>{business.location}</li>
            <li>{business.instagram}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-4 text-center text-xs text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} {business.name}. Made with faith & flour.
      </div>
    </footer>
  );
}
