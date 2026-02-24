import { NextResponse } from "next/server";
import { Resend } from "resend";

import { COMPANY_NAME, LOCATION, PHONE_CALL, PHONE_WHATSAPP } from "@/lib/site";

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const data = json as Partial<ContactPayload>;
  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !phone || !message) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please provide your name, phone number and a short message.",
      },
      { status: 400 },
    );
  }

  // Save to database
  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.inquiry.create({
      data: {
        name,
        phone,
        email,
        message,
      },
    });
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    // We continue execution to attempt email sending even if DB save fails
    // or you could return error here if strict consistency is needed.
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "BKS Website <onboarding@resend.dev>";

  if (resendKey && toEmail) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: `New quote request — ${COMPANY_NAME}`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email || "(not provided)"}`,
          `Location: ${LOCATION}`,
          "",
          "Message:",
          message,
          "",
          "---",
          `Calls: ${PHONE_CALL}`,
          `WhatsApp: ${PHONE_WHATSAPP}`,
        ].join("\n"),
      });

      return NextResponse.json({ ok: true, delivered: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Email delivery failed. Please try again." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true, delivered: false });
}
