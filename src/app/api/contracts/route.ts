import { NextResponse } from "next/server";
import { buildContractBody } from "@/lib/contract-templates";
import { listContracts, saveContract } from "@/lib/storage";

export async function GET() {
  const contracts = await listContracts();
  return NextResponse.json({
    contracts: contracts.map((c) => ({
      id: c.id,
      clientName: c.clientName,
      clientEmail: c.clientEmail,
      eventName: c.eventName,
      eventDate: c.eventDate,
      totalAmount: c.totalAmount,
      status: c.status,
      createdAt: c.createdAt,
      signedAt: c.signedAt,
      signToken: c.signToken,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, clientName, clientEmail, eventName, eventDate, totalAmount } =
      body;

    if (!clientName || !clientEmail || !eventName || !totalAmount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const tid = templateId || "standard-order";
    const bodyHtml = buildContractBody(tid, {
      clientName: String(clientName).trim(),
      clientEmail: String(clientEmail).trim(),
      eventName: String(eventName).trim(),
      eventDate: String(eventDate ?? "").trim(),
      totalAmount: String(totalAmount).trim(),
    });

    const contract = await saveContract({
      clientName: String(clientName).trim(),
      clientEmail: String(clientEmail).trim(),
      eventName: String(eventName).trim(),
      eventDate: String(eventDate ?? "").trim(),
      totalAmount: String(totalAmount).trim(),
      templateId: tid,
      bodyHtml,
    });

    return NextResponse.json({
      id: contract.id,
      signToken: contract.signToken,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create contract" },
      { status: 500 },
    );
  }
}
