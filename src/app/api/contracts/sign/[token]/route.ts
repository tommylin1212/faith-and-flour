import { NextResponse } from "next/server";
import {
  computeDocumentHash,
  getContractByToken,
  updateContract,
} from "@/lib/storage";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;

  try {
    const contract = await getContractByToken(token);
    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 });
    }
    if (contract.status === "signed") {
      return NextResponse.json({ error: "Already signed" }, { status: 400 });
    }

    const body = await request.json();
    const { signerName, signerEmail, signatureDataUrl, consentAccepted } = body;

    if (!signerName || !signerEmail || !signatureDataUrl) {
      return NextResponse.json({ error: "Missing signature data" }, { status: 400 });
    }
    if (!consentAccepted) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 });
    }

    const signedAt = new Date().toISOString();
    const documentHash = computeDocumentHash(
      JSON.stringify({
        contractId: contract.id,
        bodyHtml: contract.bodyHtml,
        signerName,
        signerEmail,
        signatureDataUrl,
        signedAt,
      }),
    );

    await updateContract(contract.id, {
      status: "signed",
      signedAt,
      signerName: String(signerName).trim(),
      signerEmail: String(signerEmail).trim(),
      signatureDataUrl: String(signatureDataUrl),
      documentHash,
      consentAccepted: true,
    });

    return NextResponse.json({
      ok: true,
      documentUrl: `/api/contracts/${contract.id}/document`,
    });
  } catch {
    return NextResponse.json({ error: "Signing failed" }, { status: 500 });
  }
}
