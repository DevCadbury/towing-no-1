import { NextResponse } from "next/server";

/* ─── OAuth2 token ─────────────────────────────────────────────── */
async function getAccessToken(): Promise<string> {
  const tenantId     = process.env.AZURE_TENANT_ID!;
  const clientId     = process.env.AZURE_CLIENT_ID!;
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

/* ─── Send via Graph API ───────────────────────────────────────── */
async function sendMail(accessToken: string, payload: object): Promise<number> {
  const sender = process.env.EMAIL_FROM!;

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

  return res.status; // 202 = accepted by Microsoft
}

/* ─── Test email HTML ──────────────────────────────────────────── */
function buildTestEmail(): string {
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
              <p style="margin:4px 0 0;color:#ffffff;font-size:20px;font-weight:700;">Email System Test</p>
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
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">prince844121@gmail.com</td>
                </tr>
                <tr style="background-color:#f9fafb;">
                  <td style="padding:11px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb;">Sender</td>
                  <td style="padding:11px 16px;font-size:13px;color:#111827;border-bottom:1px solid #e5e7eb;">info@towing-no-1.com</td>
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
    const accessToken = await getAccessToken();
    const sender = process.env.EMAIL_FROM!;
    const html = buildTestEmail();

    // Send to test recipient
    const statusExternal = await sendMail(accessToken, {
      message: {
        subject: "TowingNo.1 — Email System Test",
        body: { contentType: "HTML", content: html },
        from:         { emailAddress: { address: sender } },
        toRecipients: [{ emailAddress: { address: "prince844121@gmail.com" } }],
        replyTo:      [{ emailAddress: { address: "info@towing-no-1.com" } }],
      },
      saveToSentItems: true,
    });

    // Also send a copy to the business inbox to confirm delivery is working
    const statusInternal = await sendMail(accessToken, {
      message: {
        subject: "[Delivery Verify] TowingNo.1 Email System Test",
        body: { contentType: "HTML", content: html },
        from:         { emailAddress: { address: sender } },
        toRecipients: [{ emailAddress: { address: "info@towing-no-1.com" } }],
        replyTo:      [{ emailAddress: { address: "info@towing-no-1.com" } }],
      },
      saveToSentItems: true,
    });

    return NextResponse.json({
      success: true,
      sentAt: new Date().toISOString(),
      sender,
      results: {
        external: { to: "prince844121@gmail.com", httpStatus: statusExternal, note: "202 = accepted by Microsoft. Check spam/junk if not in inbox." },
        internal: { to: "info@towing-no-1.com",   httpStatus: statusInternal, note: "Should appear in Sent Items of the mailbox." },
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
