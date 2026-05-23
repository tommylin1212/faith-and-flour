"use client";

import { useState } from "react";
import { SignaturePad } from "./SignaturePad";
import { Button } from "@/components/ui/Button";

type SignContractFormProps = {
  signToken: string;
  clientName: string;
  clientEmail: string;
};

export function SignContractForm({
  signToken,
  clientName,
  clientEmail,
}: SignContractFormProps) {
  const [signature, setSignature] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [signerName, setSignerName] = useState(clientName);
  const [signerEmail, setSignerEmail] = useState(clientEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signature) {
      setError("Please draw your signature above.");
      return;
    }
    if (!consent) {
      setError("Please accept the agreement to continue.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`/api/contracts/sign/${signToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signerName,
          signerEmail,
          signatureDataUrl: signature,
          consentAccepted: true,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Signing failed");
      setStatus("done");
      setDocumentUrl(json.documentUrl);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-[var(--color-secondary)] p-6 text-center">
        <p className="text-4xl">✓</p>
        <h2 className="mt-2 font-display text-xl font-semibold">You&apos;re all signed!</h2>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          A record of your signature has been saved. You can download a copy below.
        </p>
        {documentUrl && (
          <a
            href={documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Download signed agreement
          </a>
        )}
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Full legal name *</span>
          <input
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
            required
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email *</span>
          <input
            type="email"
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.target.value)}
            required
            className={inputClass}
          />
        </label>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Draw your signature *</p>
        <SignaturePad onChange={setSignature} />
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          I agree that my electronic signature is the legal equivalent of my manual
          signature on this agreement, and I intend to be bound by its terms.
        </span>
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Signing…" : "Sign agreement"}
      </Button>
    </form>
  );
}
