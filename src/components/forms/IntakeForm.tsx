"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function IntakeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setStatus("success");
      setMessage(
        "Thank you! Your request was received. We'll be in touch within 1–2 business days.",
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Please try again.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Your name *
          </span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Email *
          </span>
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Phone
          </span>
          <input name="phone" type="tel" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Event date *
          </span>
          <input name="eventDate" type="date" required className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Event type *
          </span>
          <select name="eventType" required className={inputClass}>
            <option value="">Select…</option>
            <option value="wedding">Wedding</option>
            <option value="baby-shower">Baby shower</option>
            <option value="birthday">Birthday</option>
            <option value="corporate">Corporate</option>
            <option value="holiday">Holiday</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Estimated guests
          </span>
          <input name="guestCount" className={inputClass} placeholder="e.g. 40" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Cookies needed (approx.)
          </span>
          <input
            name="cookieCount"
            className={inputClass}
            placeholder="e.g. 48"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            Budget range
          </span>
          <select name="budget" className={inputClass}>
            <option value="">Select…</option>
            <option value="under-75">Under $75</option>
            <option value="75-150">$75 – $150</option>
            <option value="150-300">$150 – $300</option>
            <option value="300-plus">$300+</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
          Design ideas & colors
        </span>
        <textarea
          name="designNotes"
          rows={4}
          className={inputClass}
          placeholder="Themes, names, colors, inspiration links…"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
          Flavor preferences
        </span>
        <input
          name="flavors"
          className={inputClass}
          placeholder="Vanilla almond, lemon, etc."
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-[var(--color-text)]">
          How did you hear about us?
        </span>
        <input name="referral" className={inputClass} />
      </label>

      {message && (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            status === "success"
              ? "bg-[var(--color-secondary)] text-[var(--color-text)]"
              : "bg-red-50 text-red-800"
          }`}
          role="alert"
        >
          {message}
        </p>
      )}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Submit order inquiry"}
      </Button>
    </form>
  );
}
