import { NextRequest, NextResponse } from "next/server";

/* ─── Email configuration (all from env, never hardcoded) ──────── */
const SENDER_MAILBOX = process.env.GRAPH_SENDER_MAILBOX || process.env.EMAIL_FROM || "";
const EMAIL_FROM = process.env.EMAIL_FROM || SENDER_MAILBOX;
const EMAIL_DISPATCH = process.env.EMAIL_DISPATCH || EMAIL_FROM;
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || EMAIL_FROM;
const ADMIN_RECIPIENTS = (process.env.EMAIL_ADMIN || EMAIL_FROM)
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);

/* ─── Input sanitisation ───────────────────────────────────────── */
function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]/g, " ").trim().slice(0, 2000);
}

/* Escape HTML so user input can't inject markup into the email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ─── OAuth2 token via client credentials ──────────────────────── */
async function getAccessToken(): Promise<string> {
  const tenantId = process.env.AZURE_TENANT_ID!;
  const clientId = process.env.AZURE_CLIENT_ID!;
  const clientSecret = process.env.AZURE_CLIENT_SECRET!;

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token request failed: ${err}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

/* ─── Send via Microsoft Graph API ─────────────────────────────── */
// The message is submitted through `mailbox` (the /users/{mailbox}/sendMail
// endpoint). The Azure app must have application Mail.Send rights for it.
async function sendMail(accessToken: string, mailbox: string, payload: object): Promise<void> {
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailbox)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Graph sendMail failed (${res.status}): ${err}`);
  }
}

/* ─── Customer confirmation with dispatch-alias fallback ───────── */
// Preferred: send truly as the dispatch mailbox/alias so the customer sees a
// "dispatch" sender. If the tenant denies that (ErrorSendAsDenied, or the app
// lacks access to that mailbox), fall back to sending through the main mailbox
// as the business address with a "TowingNo.1 Dispatch" display name. This keeps
// the contact form working without requiring Microsoft 365 admin changes.
async function sendConfirmation(accessToken: string, content: string, customerEmail: string): Promise<void> {
  const subject = "We have received your request — TowingNo.1";

  // Attempt 1 — send through the dispatch mailbox, from the dispatch address.
  if (EMAIL_DISPATCH && EMAIL_DISPATCH !== SENDER_MAILBOX) {
    try {
      await sendMail(accessToken, EMAIL_DISPATCH, {
        message: {
          subject,
          body: { contentType: "HTML", content },
          from: { emailAddress: { address: EMAIL_DISPATCH, name: "TowingNo.1 Dispatch" } },
          toRecipients: [{ emailAddress: { address: customerEmail } }],
          replyTo: [{ emailAddress: { address: EMAIL_REPLY_TO } }],
        },
        saveToSentItems: true,
      });
      return;
    } catch (err) {
      console.warn("[send-email] dispatch-alias send failed, falling back to main mailbox:", err);
    }
  }

  // Attempt 2 (fallback) — send through the main mailbox as the business
  // address, keeping a recognizable "Dispatch" display name.
  await sendMail(accessToken, SENDER_MAILBOX, {
    message: {
      subject,
      body: { contentType: "HTML", content },
      from: { emailAddress: { address: EMAIL_FROM, name: "TowingNo.1 Dispatch" } },
      toRecipients: [{ emailAddress: { address: customerEmail } }],
      replyTo: [{ emailAddress: { address: EMAIL_REPLY_TO } }],
    },
    saveToSentItems: true,
  });
}

/* ─── Business notification email ──────────────────────────────── */
function buildBusinessEmail(name: string, email: string, phone: string, message: string): string {
  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #e0e0e0;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a;padding:24px 32px;">
              <p style="margin:0;color:#f59e0b;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">TowingNo.1</p>
              <p style="margin:4px 0 0;color:#ffffff;font-size:20px;font-weight:700;">New Contact Form Submission</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">
                A new inquiry has been submitted through the website contact form. Details are listed below.
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
                <tr style="background-color:#f9fafb;">
                  <td style="padding:12px 16px;width:130px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Name</td>
                  <td style="padding:12px 16px;font-size:14px;color:#111827;border-bottom:1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Email</td>
                  <td style="padding:12px 16px;font-size:14px;border-bottom:1px solid #e5e7eb;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a></td>
                </tr>
                <tr style="background-color:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Phone</td>
                  <td style="padding:12px 16px;font-size:14px;color:#111827;border-bottom:1px solid #e5e7eb;"><a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Submitted</td>
                  <td style="padding:12px 16px;font-size:14px;color:#111827;border-bottom:1px solid #e5e7eb;">${timestamp} (Pacific)</td>
                </tr>
                <tr style="background-color:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">Message</td>
                  <td style="padding:12px 16px;font-size:14px;color:#111827;line-height:1.7;">${message.replace(/\n/g, "<br>")}</td>
                </tr>
              </table>

              <p style="margin:28px 0 0;color:#374151;font-size:13px;line-height:1.6;">
                Reply directly to this email to respond to the customer, or call them at the number above.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">TowingNo.1 &mdash; 24/7 Emergency Towing &amp; Roadside Assistance, British Columbia</p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">This message was sent automatically from the website contact form.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── User confirmation email ───────────────────────────────────── */
function buildConfirmationEmail(name: string, email: string, phone: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #e0e0e0;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0f172a;padding:28px 32px;">
              <p style="margin:0;color:#f59e0b;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">TowingNo.1</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">We have received your request</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:32px 32px 0;">
              <p style="margin:0;color:#111827;font-size:15px;line-height:1.7;">Dear ${name},</p>
              <p style="margin:16px 0 0;color:#374151;font-size:14px;line-height:1.8;">
                Thank you for reaching out to TowingNo.1. We have received your inquiry and a member of our dispatch team will be in contact with you shortly.
              </p>
              <p style="margin:12px 0 0;color:#374151;font-size:14px;line-height:1.8;">
                If your situation requires immediate assistance, please call us directly at
                <a href="tel:+17788380014" style="color:#d97706;text-decoration:none;font-weight:600;">(778) 838-0014</a>.
                We are available 24 hours a day, 7 days a week.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:28px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #e5e7eb;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Submission summary -->
          <tr>
            <td style="padding:24px 32px 0;">
              <p style="margin:0 0 16px;color:#111827;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Your Submission Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
                <tr style="background-color:#f9fafb;">
                  <td style="padding:11px 16px;width:120px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Name</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Email</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${email}</td>
                </tr>
                <tr style="background-color:#f9fafb;">
                  <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Phone</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">Message</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;line-height:1.7;">${message.replace(/\n/g, "<br>")}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:28px 32px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #e5e7eb;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Contact info -->
          <tr>
            <td style="padding:24px 32px 0;">
              <p style="margin:0 0 14px;color:#111827;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Contact Us Directly</p>
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#374151;">Phone:</td>
                  <td style="padding:4px 0 4px 10px;font-size:13px;">
                    <a href="tel:+17788380014" style="color:#d97706;text-decoration:none;font-weight:600;">(778) 838-0014</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#374151;">Email:</td>
                  <td style="padding:4px 0 4px 10px;font-size:13px;">
                    <a href="mailto:${EMAIL_REPLY_TO}" style="color:#2563eb;text-decoration:none;">${EMAIL_REPLY_TO}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#374151;">Hours:</td>
                  <td style="padding:4px 0 4px 10px;font-size:13px;color:#374151;">24 hours a day, 7 days a week</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0;color:#374151;font-size:14px;line-height:1.8;">
                We appreciate you choosing TowingNo.1. If you need to follow up, simply reply to this email and your message will reach our team directly.
              </p>
              <p style="margin:16px 0 0;color:#374151;font-size:14px;">Regards,</p>
              <p style="margin:4px 0 0;color:#111827;font-size:14px;font-weight:600;">The TowingNo.1 Dispatch Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">TowingNo.1 &mdash; 24/7 Emergency Towing &amp; Roadside Assistance</p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">Serving Delta, White Rock, Langley, Burnaby and surrounding areas in British Columbia</p>
              <p style="margin:8px 0 0;color:#d1d5db;font-size:11px;">
                You are receiving this email because you submitted a contact form at towingno1.com.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── Route handler ─────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const message = sanitize(body.message);

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "All required fields must be provided." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!SENDER_MAILBOX) {
      throw new Error("Email sender mailbox is not configured (GRAPH_SENDER_MAILBOX/EMAIL_FROM).");
    }

    // Escape the user-supplied values before embedding them in HTML.
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const accessToken = await getAccessToken();

    // Email 1 — Business/admin notification (to all admin recipients). This is
    // the critical lead delivery, so it is sent first and must succeed. From the
    // business mailbox (sends as itself — no send-as issue); reply-to is the
    // customer so a reply goes straight back to them.
    await sendMail(accessToken, SENDER_MAILBOX, {
      message: {
        subject: `New Contact Form Submission — ${name}`,
        body: { contentType: "HTML", content: buildBusinessEmail(safeName, safeEmail, safePhone, safeMessage) },
        from: { emailAddress: { address: EMAIL_FROM, name: "TowingNo.1 Website" } },
        toRecipients: ADMIN_RECIPIENTS.map((address) => ({ emailAddress: { address } })),
        replyTo: [{ emailAddress: { address: email } }],
      },
      saveToSentItems: true,
    });

    // Email 2 — Customer confirmation. Best-effort: prefers the dispatch alias
    // and falls back to the main mailbox. A confirmation failure must NOT fail
    // the request, because the lead has already been captured above.
    try {
      await sendConfirmation(
        accessToken,
        buildConfirmationEmail(safeName, safeEmail, safePhone, safeMessage),
        email
      );
    } catch (confErr) {
      console.error("[send-email] confirmation email failed (lead still captured):", confErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-email]", err);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again or call us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
