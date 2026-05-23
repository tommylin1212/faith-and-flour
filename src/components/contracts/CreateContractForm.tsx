"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { contractTemplates } from "@/lib/contract-templates";

export function CreateContractForm({ onCreated }: { onCreated: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUrl, setSignUrl] = useState("");

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]/30";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSignUrl("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to create contract");
      const url = `${window.location.origin}/contracts/sign/${json.signToken}`;
      setSignUrl(url);
      onCreated();
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <h2 className="font-display text-xl font-semibold text-[var(--color-text)]">
        Create contract
      </h2>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Generate a signing link to send your client — no paid e-sign service
        needed.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Template</span>
          <select name="templateId" required className={inputClass} defaultValue="standard-order">
            {contractTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Client name *</span>
            <input name="clientName" required className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Client email *</span>
            <input name="clientEmail" type="email" required className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Event / order name *</span>
            <input name="eventName" required className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Event date</span>
            <input name="eventDate" type="date" className={inputClass} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium">Agreed amount *</span>
            <input
              name="totalAmount"
              required
              className={inputClass}
              placeholder="e.g. $150.00"
            />
          </label>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
        )}

        {signUrl && (
          <div className="rounded-xl bg-[var(--color-secondary)] p-4 text-sm">
            <p className="font-medium text-[var(--color-text)]">
              Signing link ready — copy and send to your client:
            </p>
            <code className="mt-2 block break-all text-xs">{signUrl}</code>
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Create & get signing link"}
        </Button>
      </form>
    </div>
  );
}
