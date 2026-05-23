import { business } from "@/lib/content";
import { getContractById } from "@/lib/storage";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const contract = await getContractById(id);

  if (!contract || contract.status !== "signed") {
    return new Response("Not found", { status: 404 });
  }

  const signedDate = contract.signedAt
    ? new Date(contract.signedAt).toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      })
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Signed Agreement — ${contract.eventName}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; color: #333; line-height: 1.6; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .meta { font-size: 0.85rem; color: #666; margin-bottom: 2rem; }
    .contract-prose h2 { font-size: 1.25rem; }
    .contract-prose h3 { font-size: 1rem; margin-top: 1.25rem; }
  .signature-block { margin-top: 2rem; padding-top: 1rem; border-top: 2px solid #eee; }
    .signature-block img { max-height: 80px; }
    .hash { font-family: monospace; font-size: 0.7rem; word-break: break-all; color: #888; margin-top: 1rem; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <p class="no-print" style="background:#fff8e6;padding:0.75rem;border-radius:8px;font-size:0.9rem;">
    <strong>Tip:</strong> Use your browser&apos;s Print → Save as PDF to keep a PDF copy.
  </p>
  <h1>${business.name}</h1>
  <p class="meta">Signed agreement · ${contract.eventName}</p>
  ${contract.bodyHtml}
  <div class="signature-block">
    <h3>Electronic Signature</h3>
    <p><strong>Signed by:</strong> ${contract.signerName} (${contract.signerEmail})</p>
    <p><strong>Date:</strong> ${signedDate}</p>
    <img src="${contract.signatureDataUrl}" alt="Signature" />
    <p class="hash"><strong>Document ID:</strong> ${contract.id}<br />
    <strong>Integrity hash (SHA-256):</strong> ${contract.documentHash}</p>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="signed-${contract.id.slice(0, 8)}.html"`,
    },
  });
}
