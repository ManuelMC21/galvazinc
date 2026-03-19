import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createMessage } from "@/lib/messages";
import { getContactInfo } from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, subject, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son requeridos" },
        { status: 400 }
      );
    }

    // 1 — Save to DB
    await createMessage({
      name,
      company: company || "",
      email,
      subject: subject || "",
      message,
    });

    // 2 — Send email notification via Resend (non-blocking on failure)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const contactInfo = await getContactInfo();
        const toEmail = contactInfo.emails?.[0];
        if (toEmail) {
          const resend = new Resend(resendKey);
          await resend.emails.send({
            from: "GalvaZinc <onboarding@resend.dev>",
            to: toEmail,
            replyTo: email,
            subject: `Nuevo mensaje: ${subject || "(sin asunto)"} — ${name}`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                <div style="background:#1e3a8f;padding:24px 32px;border-radius:8px 8px 0 0;">
                  <h1 style="color:#fff;margin:0;font-size:20px;">Nuevo mensaje de contacto</h1>
                </div>
                <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
                  <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:120px;">Nombre</td><td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${name}</td></tr>
                    ${company ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Empresa</td><td style="padding:8px 0;color:#0f172a;font-size:14px;">${company}</td></tr>` : ""}
                    <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#3b82f6;">${email}</a></td></tr>
                    ${subject ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Asunto</td><td style="padding:8px 0;color:#0f172a;font-size:14px;">${subject}</td></tr>` : ""}
                  </table>
                  <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
                  <p style="color:#64748b;font-size:13px;margin:0 0 8px;">Mensaje</p>
                  <p style="color:#0f172a;font-size:14px;white-space:pre-wrap;background:#fff;padding:16px;border:1px solid #e2e8f0;border-radius:6px;margin:0;">${message}</p>
                  <div style="margin-top:24px;">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "tu consulta")}" style="background:#3b82f6;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Responder</a>
                  </div>
                </div>
                <p style="color:#94a3b8;font-size:12px;text-align:center;margin-top:16px;">GalvaZinc &mdash; Panel de mensajes</p>
              </div>
            `,
          });
        }
      } catch (emailErr) {
        // Email failed but message was saved — log and continue
        console.error("Resend error:", emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error saving message:", err);
    return NextResponse.json(
      { error: "Error al guardar el mensaje" },
      { status: 500 }
    );
  }
}
