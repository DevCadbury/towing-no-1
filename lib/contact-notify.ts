import { notifyWhatsApp } from "./whatsapp-notify";

/**
 * Best-effort WhatsApp notification for a validated contact-form submission.
 * SERVER ONLY. Never throws — a WhatsApp failure must not affect email delivery
 * or the contact route's response contract. The destination group is fixed on
 * the VPS; the recipient can never be chosen here.
 */
export async function sendContactWhatsAppNotification(fields: {
  name: string;
  email: string;
  phone: string;
  message: string;
  from?: string;
  to?: string;
}): Promise<void> {
  try {
    const data: Record<string, string> = {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
    };
    // Include pickup/destination only when provided (keeps the message tidy).
    if (fields.from) data.from = fields.from;
    if (fields.to) data.to = fields.to;

    await notifyWhatsApp({ type: "contact", source: "contact", data });
  } catch {
    // notifyWhatsApp already returns a result rather than throwing; this guard
    // is defence-in-depth so the contact flow can never be broken by it.
  }
}
