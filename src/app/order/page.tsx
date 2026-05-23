import type { Metadata } from "next";
import { IntakeForm } from "@/components/forms/IntakeForm";

export const metadata: Metadata = {
  title: "Order Inquiry",
  description: "Submit a custom sugar cookie order request",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold">Order inquiry</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Tell us about your event and we&apos;ll follow up with availability, a quote,
          and next steps. No payment required on this form.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8">
        <IntakeForm />
      </div>
    </div>
  );
}
