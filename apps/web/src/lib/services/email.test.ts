import { describe, it, expect, vi, beforeEach } from "vitest";
import { Resend } from "resend";

// Hoist mock variable correctly for vitest
const { mockSend } = vi.hoisted(() => {
  return { mockSend: vi.fn() };
});

// Mock the Resend module
vi.mock("resend", () => {
  return {
    Resend: vi.fn(function() {
      return {
        emails: {
          send: mockSend,
        },
      };
    }),
  };
});

// Import after the mock to ensure properly hoisted injection
import { sendReservationEmail } from "./email";

// Mock the React Email component since it might cause issues importing in a pure vitest env
vi.mock("@/components/emails/reservation-request", () => ({
  ReservationRequestEmail: vi.fn().mockImplementation(() => {
    // Return a dummy div for the mock since Resend expects a React element
    const React = require('react');
    return React.createElement('div', null, 'Mocked Email HTML');
  })
}));

describe("sendReservationEmail", () => {
  const mockBookingData = {
    name: "Test User",
    email: "test@example.com",
    timeSlot: "15:00 - 18:00",
    sessionType: "solo" as const,
    dateIso: "2026-03-01T00:00:00.000Z",
  };

  beforeEach(() => {
    mockSend.mockReset();
  });

  it("should send an email successfully", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "test_id" }, error: null });

    const result = await sendReservationEmail(mockBookingData);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["nmd.wav@gmail.com"],
        subject: "Nueva Solicitud de Reserva: Test User",
      })
    );
    expect(result).toEqual({ success: true, data: { id: "test_id" } });
  });

  it("should handle Resend API errors gracefully", async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: "API Error" } });

    const result = await sendReservationEmail(mockBookingData);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: false, error: "API Error" });
  });

  it("should catch unexpected errors", async () => {
    mockSend.mockRejectedValueOnce(new Error("Unexpected failure"));

    const result = await sendReservationEmail(mockBookingData);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: false, error: "Unexpected failure" });
  });
});
