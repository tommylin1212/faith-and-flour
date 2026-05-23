import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SignContractForm } from "@/components/contracts/SignContractForm";
import { getContractByToken } from "@/lib/storage";

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const contract = await getContractByToken(token);
  return {
    title: contract ? `Sign: ${contract.eventName}` : "Contract not found",
  };
}

export default async function SignContractPage({ params }: PageProps) {
  const { token } = await params;
  const contract = await getContractByToken(token);

  if (!contract) {
    notFound();
  }

  if (contract.status === "signed") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-4xl">✓</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">Already signed</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          This agreement was signed on{" "}
          {contract.signedAt
            ? new Date(contract.signedAt).toLocaleString()
            : "record"}
          .
        </p>
        <a
          href={`/api/contracts/${contract.id}/document`}
          className="mt-6 inline-block text-[var(--color-primary)] underline"
        >
          Download signed copy
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold">Sign your agreement</h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {contract.eventName}
        </p>
      </div>

      <div
        className="contract-prose mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8"
        dangerouslySetInnerHTML={{ __html: contract.bodyHtml }}
      />

      <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">Your signature</h2>
        <div className="mt-6">
          <SignContractForm
            signToken={token}
            clientName={contract.clientName}
            clientEmail={contract.clientEmail}
          />
        </div>
      </div>
    </div>
  );
}
