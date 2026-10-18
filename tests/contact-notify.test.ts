import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the notify client so no network call happens.
vi.mock("../lib/whatsapp-notify", () => ({
  notifyWhatsApp: vi.fn(),
}));

import { sendContactWhatsAppNotification } from "../lib/contact-notify";
import { notifyWhatsApp } from "../lib/whatsapp-notify";

const mockedNotify = notifyWhatsApp as unknown as ReturnType<typeof vi.fn>;

describe("sendContactWhatsAppNotification", () => {
  beforeEach(() => {
    mockedNotify.mockReset();
  });

  it("forwards a contact payload with the expected shape", async () => {
    mockedNotify.mockResolvedValue({ ok: true, status: "sent" });
    await sendContactWhatsAppNotification({ name: "Bob", email: "b@x.com", phone: "1", message: "help" });
    expect(mockedNotify).toHaveBeenCalledTimes(1);
    expect(mockedNotify.mock.calls[0][0]).toEqual({
      type: "contact",
      source: "contact",
      data: { name: "Bob", email: "b@x.com", phone: "1", message: "help" },
    });
  });

  it("never throws even if the notifier rejects (email/response unaffected)", async () => {
    mockedNotify.mockRejectedValue(new Error("boom"));
    await expect(
      sendContactWhatsAppNotification({ name: "Bob", email: "b@x.com", phone: "1", message: "help" })
    ).resolves.toBeUndefined();
  });

  it("never throws when the notifier reports a non-ok result", async () => {
    mockedNotify.mockResolvedValue({ ok: false, status: "rate_limited" });
    await expect(
      sendContactWhatsAppNotification({ name: "Bob", email: "b@x.com", phone: "1", message: "help" })
    ).resolves.toBeUndefined();
  });
});
