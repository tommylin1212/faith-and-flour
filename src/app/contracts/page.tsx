"use client";

import { useState } from "react";
import { CreateContractForm } from "@/components/contracts/CreateContractForm";
import { ContractList } from "@/components/contracts/ContractList";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

export default function ContractsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold">Contracts</h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-text-muted)]">
          Create order agreements and collect electronic signatures — built in, no
          monthly e-sign subscription.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        <CreateContractForm onCreated={() => setRefreshKey((k) => k + 1)} />

        <div>
          <h2 className="mb-4 font-display text-2xl font-semibold">Your contracts</h2>
          <ContractList refreshKey={refreshKey} />
        </div>

        <details className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4 text-sm">
          <summary className="cursor-pointer font-medium text-[var(--color-text)]">
            How free e-signing works
          </summary>
          <ul className="mt-3 list-inside list-disc space-y-2 text-[var(--color-text-muted)]">
            <li>You create a contract and get a unique signing link for your client.</li>
            <li>They read the agreement, draw a signature on canvas, and consent.</li>
            <li>
              We store a timestamp, signature image, and document hash for your records.
            </li>
            <li>Signed copies can be downloaded as HTML (print to PDF from the browser).</li>
            <li>
              For production, add authentication and consider legal review of your
              templates.
            </li>
          </ul>
        </details>

        <ThemeSwitcher />
      </div>
    </div>
  );
}
