import { NextResponse } from "next/server";
import { saveIntakeSubmission } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = ["name", "email", "eventDate", "eventType"] as const;
    for (const field of required) {
      if (!body[field]?.trim?.() && !body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    const submission = await saveIntakeSubmission({
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone ?? "").trim(),
      eventDate: String(body.eventDate).trim(),
      eventType: String(body.eventType).trim(),
      guestCount: String(body.guestCount ?? "").trim(),
      cookieCount: String(body.cookieCount ?? "").trim(),
      designNotes: String(body.designNotes ?? "").trim(),
      flavors: String(body.flavors ?? "").trim(),
      budget: String(body.budget ?? "").trim(),
      referral: String(body.referral ?? "").trim(),
    });

    return NextResponse.json({ ok: true, id: submission.id });
  } catch {
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 },
    );
  }
}
