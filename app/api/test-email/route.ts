import { NextResponse } from "next/server";

/* ─── Email configuration (from env, never hardcoded) ──────────── */
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "info@towingno1.com";
const EMAIL_DISPATCH = process.env.EMAIL_DISPATCH || EMAIL_FROM;
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || EMAIL_FROM;
const EMAIL_TEST = process.env.EMAIL_TEST || EMAIL_FROM;
const ADMIN_RECIPIENTS = (process.env.EMAIL_ADMIN || EMAIL_FROM)
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);

/* ─── Send via Resend REST API ─────────────────────────────────── */
async function sendEmail(opts: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ id?: string }> {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Resend send failed (${res.status}): ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

/* ─── Test email HTML ──────────────────────────────────────────── */
function buildTestEmail(label: string, recipient: string, fromAddress: string): string {
  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
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
              <p style="margin:4px 0 0;color:#ffffff;font-size:20px;font-weight:700;">Email System Test &mdash; ${label}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 16px;color:#111827;font-size:15px;font-weight:600;">This is a test email from TowingNo.1</p>
              <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.7;">
                If you are reading this message, the email system is configured correctly and working as expected.
                Both the Microsoft Graph API connection and the email delivery pipeline are functioning properly.
              </p>

              <!-- Details -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e5e7eb;border-radius:4px;overflow:hidden;">
                <tr style="background-color:#f9fafb;">
                  <td style="padding:11px 16px;width:140px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Sent At</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${timestamp} (Pacific)</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Recipient</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${recipient}</td>
                </tr>
                <tr style="background-color:#f9fafb;">
                  <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Sender</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">${fromAddress}</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Method</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;">Microsoft Graph API (OAuth2 client credentials)</td>
                </tr>
              </table>

              <p style="margin:28px 0 0;color:#374151;font-size:13px;line-height:1.6;">
                This message was triggered by a GET request to <code style="background:#f3f4f6;padding:2px 6px;border-radius:3px;font-size:12px;">/api/test-email</code>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">TowingNo.1 &mdash; 24/7 Emergency Towing &amp; Roadside Assistance, British Columbia</p>
              <p style="margin:4px 0 0;color:#9ca3af;font-size:12px;">This is an automated test message. No action is required.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── Route handler (GET to trigger easily from browser) ───────── */
export async function GET() {
  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

    // 1) Customer confirmation test — sent FROM the dispatch alias to the test inbox.
    const customerResult = await sendEmail({
      from: `TowingNo.1 Dispatch <${EMAIL_DISPATCH}>`,
      to: [EMAIL_TEST],
      subject: "TowingNo.1 — Email System Test (Customer Confirmation)",
      html: buildTestEmail("Customer Confirmation", EMAIL_TEST, EMAIL_DISPATCH),
      replyTo: EMAIL_REPLY_TO,
    });

    // 2) Admin notification test — sent FROM the business address to all admins.
    const adminResult = await sendEmail({
      from: `TowingNo.1 Website <${EMAIL_FROM}>`,
      to: ADMIN_RECIPIENTS,
      subject: "[Test] New Contact Form Submission — TowingNo.1",
      html: buildTestEmail("Admin Notification", ADMIN_RECIPIENTS.join(", "), EMAIL_FROM),
      replyTo: EMAIL_REPLY_TO,
    });

    return NextResponse.json({
      success: true,
      sentAt: new Date().toISOString(),
      provider: "resend",
      results: {
        customerConfirmation: {
          from: EMAIL_DISPATCH,
          to: EMAIL_TEST,
          id: customerResult.id,
          note: "Sent via Resend. Check spam/junk if not in inbox.",
        },
        adminNotification: {
          from: EMAIL_FROM,
          to: ADMIN_RECIPIENTS,
          id: adminResult.id,
          note: "Sent to all configured admin recipients.",
        },
      },
    });
  } catch (err) {
    console.error("[test-email]", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json({ error: "Use GET to trigger a test email" }, { status: 405 });
}
