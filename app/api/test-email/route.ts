import { NextResponse } from "next/server";

/* ─── Email configuration (from env, never hardcoded) ──────────── */
const SENDER_MAILBOX = process.env.GRAPH_SENDER_MAILBOX || process.env.EMAIL_FROM || "";
const EMAIL_FROM = process.env.EMAIL_FROM || SENDER_MAILBOX;
const EMAIL_DISPATCH = process.env.EMAIL_DISPATCH || EMAIL_FROM;
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || EMAIL_FROM;
const EMAIL_TEST = process.env.EMAIL_TEST || EMAIL_FROM;
const ADMIN_RECIPIENTS = (process.env.EMAIL_ADMIN || EMAIL_FROM)
  .split(",")
  .map((a) => a.trim())
  .filter(Boolean);

/* ─── OAuth2 token ─────────────────────────────────────────────── */
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

/* ─── Send via Graph API ───────────────────────────────────────── */
async function sendMail(accessToken: string, payload: object): Promise<number> {
  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(SENDER_MAILBOX)}/sendMail`,
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

  return res.status; // 202 = accepted by Microsoft
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
    if (!SENDER_MAILBOX) {
      throw new Error("Email sender mailbox is not configured (GRAPH_SENDER_MAILBOX/EMAIL_FROM).");
    }

    const accessToken = await getAccessToken();

    // 1) External deliverability test — customer-style email FROM the dispatch
    //    alias, sent to the configured test inbox.
    const statusExternal = await sendMail(accessToken, {
      message: {
        subject: "TowingNo.1 — Email System Test (Customer Confirmation)",
        body: { contentType: "HTML", content: buildTestEmail("Customer Confirmation", EMAIL_TEST, EMAIL_DISPATCH) },
        from: { emailAddress: { address: EMAIL_DISPATCH, name: "TowingNo.1 Dispatch" } },
        toRecipients: [{ emailAddress: { address: EMAIL_TEST } }],
        replyTo: [{ emailAddress: { address: EMAIL_REPLY_TO } }],
      },
      saveToSentItems: true,
    });

    // 2) Admin notification test — FROM the business address, to all admins.
    const statusAdmin = await sendMail(accessToken, {
      message: {
        subject: "[Test] New Contact Form Submission — TowingNo.1",
        body: { contentType: "HTML", content: buildTestEmail("Admin Notification", ADMIN_RECIPIENTS.join(", "), EMAIL_FROM) },
        from: { emailAddress: { address: EMAIL_FROM, name: "TowingNo.1 Website" } },
        toRecipients: ADMIN_RECIPIENTS.map((address) => ({ emailAddress: { address } })),
        replyTo: [{ emailAddress: { address: EMAIL_REPLY_TO } }],
      },
      saveToSentItems: true,
    });

    return NextResponse.json({
      success: true,
      sentAt: new Date().toISOString(),
      senderMailbox: SENDER_MAILBOX,
      results: {
        customerConfirmation: {
          from: EMAIL_DISPATCH,
          to: EMAIL_TEST,
          httpStatus: statusExternal,
          note: "202 = accepted by Microsoft. Check spam/junk if not in inbox.",
        },
        adminNotification: {
          from: EMAIL_FROM,
          to: ADMIN_RECIPIENTS,
          httpStatus: statusAdmin,
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
