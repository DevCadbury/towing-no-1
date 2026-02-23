import { NextRequest, NextResponse } from "next/server";

/* ─── Input sanitisation ───────────────────────────────────────── */
function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\t]/g, " ").trim().slice(0, 2000);
}

/* ─── OAuth2 token via client credentials ──────────────────────── */
async function getAccessToken(): Promise<string> {
  const tenantId  = process.env.AZURE_TENANT_ID!;
  const clientId  = process.env.AZURE_CLIENT_ID!;
  const clientSecret = process.env.AZURE_CLIENT_SECRET!;

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type:    "client_credentials",
        client_id:     clientId,
        client_secret: clientSecret,
        scope:         "https://graph.microsoft.com/.default",
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
async function sendMail(accessToken: string, payload: object): Promise<void> {
  const sender = process.env.EMAIL_FROM!;   // info@towing-no-1.com

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
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
                Thank you for reaching out to TowingNo.1. We have received your inquiry and a member of our team will be in contact with you shortly.
              </p>
              <p style="margin:12px 0 0;color:#374151;font-size:14px;line-height:1.8;">
                If your situation requires immediate assistance, please call us directly at
                <a href="tel:+17788591457" style="color:#d97706;text-decoration:none;font-weight:600;">(778) 859-1457</a>.
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
                    <a href="tel:+17788591457" style="color:#d97706;text-decoration:none;font-weight:600;">(778) 859-1457</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#374151;">Email:</td>
                  <td style="padding:4px 0 4px 10px;font-size:13px;">
                    <a href="mailto:info@towing-no-1.com" style="color:#2563eb;text-decoration:none;">info@towing-no-1.com</a>
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
              <p style="margin:4px 0 0;color:#111827;font-size:14px;font-weight:600;">The TowingNo.1 Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">TowingNo.1 &mdash; 24/7 Emergency Towing &amp; Roadside Assistance</p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">Serving Delta, White Rock, Langley, Burnaby and surrounding areas in British Columbia</p>
              <p style="margin:8px 0 0;color:#d1d5db;font-size:11px;">
                You are receiving this email because you submitted a contact form at towing-no-1.com.
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

    const name    = sanitize(body.name);
    const email   = sanitize(body.email);
    const phone   = sanitize(body.phone);
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

    const accessToken = await getAccessToken();

    // Email 1 — Business notification
    await sendMail(accessToken, {
      message: {
        subject: `New Contact Form Submission — ${name}`,
        body: { contentType: "HTML", content: buildBusinessEmail(name, email, phone, message) },
        from: { emailAddress: { address: process.env.EMAIL_FROM! } },
        toRecipients: [{ emailAddress: { address: "info@towing-no-1.com" } }],
        replyTo:      [{ emailAddress: { address: email } }],
      },
      saveToSentItems: true,
    });

    // Email 2 — User confirmation
    await sendMail(accessToken, {
      message: {
        subject: "We have received your request — TowingNo.1",
        body: { contentType: "HTML", content: buildConfirmationEmail(name, email, phone, message) },
        from: { emailAddress: { address: process.env.EMAIL_FROM! } },
        toRecipients: [{ emailAddress: { address: email } }],
        replyTo:      [{ emailAddress: { address: "info@towing-no-1.com" } }],
      },
      saveToSentItems: true,
    });

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
