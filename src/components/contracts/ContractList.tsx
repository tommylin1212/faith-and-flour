"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ContractSummary = {
  id: string;
  clientName: string;
  clientEmail: string;
  eventName: string;
  eventDate: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  signedAt?: string;
  signToken: string;
};

export function ContractList({ refreshKey }: { refreshKey: number }) {
  const [contracts, setContracts] = useState<ContractSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch("/api/contracts");
      const data = await res.json();
      if (!cancelled) {
        setContracts(data.contracts ?? []);
        setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  if (loading) {
    return <p className="text-sm text-[var(--color-text-muted)]">Loading contracts…</p>;
  }

  if (contracts.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-muted)]">
        No contracts yet. Create one above to get a signing link for your client.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {contracts.map((c) => (
        <li
          key={c.id}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-medium text-[var(--color-text)]">{c.eventName}</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {c.clientName} · {c.totalAmount}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                c.status === "signed"
                  ? "bg-[var(--color-secondary)] text-[var(--color-text)]"
                  : "bg-[var(--color-accent)]/60 text-[var(--color-text)]"
              }`}
            >
              {c.status}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {c.status !== "signed" && (
              <Link
                href={`/contracts/sign/${c.signToken}`}
                className="text-[var(--color-primary)] underline"
              >
                Open signing page
              </Link>
            )}
            {c.status === "signed" && (
              <a
                href={`/api/contracts/${c.id}/document`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] underline"
              >
                Download signed copy
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
