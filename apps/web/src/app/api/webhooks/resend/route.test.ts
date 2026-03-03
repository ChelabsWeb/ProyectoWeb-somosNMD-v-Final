import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "./route";
import { generateSecureToken } from "@/lib/services/security";

// Mock the NextResponse since we are not running a full Next.js server
vi.mock("next/server", () => {
  return {
    NextResponse: class {
      body: any;
      init: any;
      
      constructor(body: any, init?: any) {
        this.body = body;
        this.init = init;
      }
      
      static json(body: any, init?: any) {
        return new this(JSON.stringify(body), {
          ...init,
          headers: {
            "Content-Type": "application/json",
            ...init?.headers,
          },
        });
      }
      
      static redirect(url: string | URL) {
        return new this(null, {
          status: 307,
          headers: {
            Location: url.toString(),
          },
        });
      }
    },
  };
});

// Mock the calendar service
vi.mock("@/lib/services/calendar", () => ({
  createCalendarEvent: vi.fn(),
  fetchCalendarEvents: vi.fn(),
}));

// Mock the email service
vi.mock("@/lib/services/email", () => ({
  sendReservationSuccessEmail: vi.fn(),
  sendReservationRejectedEmail: vi.fn(),
}));

import { createCalendarEvent, fetchCalendarEvents } from "@/lib/services/calendar";
import { sendReservationSuccessEmail, sendReservationRejectedEmail } from "@/lib/services/email";

describe("Resend Webhook GET Route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.WEBHOOK_SECRET = "test_secret_key_12345";
  });

  const createRequest = (url: string) => {
    return new Request(url);
  };

  it("should return 400 if token is missing", async () => {
    const req = createRequest("http://localhost:3000/api/webhooks/resend");
    const response = await GET(req) as any;

    expect(response.init?.status).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.success).toBe(false);
    expect(body.error).toBe("Missing token parameter");
  });

  it("should redirect to error confirmation for an invalid token", async () => {
    const req = createRequest("http://localhost:3000/api/webhooks/resend?token=invalid.token");
    const response = await GET(req) as any;

    expect(response.init?.status).toBe(307);
    
    const location = response.init?.headers?.Location;
    expect(location).toContain("/booking/confirmation");
    expect(location).toContain("status=error");
  });

  it("should redirect to success confirmation for a valid confirm token", async () => {
    (fetchCalendarEvents as any).mockResolvedValue([]);
    (createCalendarEvent as any).mockResolvedValue({ success: true, eventId: "ev1" });
    const token = generateSecureToken({ bookingId: "booking_123", action: "confirm", applicantName: "John", applicantEmail: "john@example.com", sessionType: "Solo Estudio", timeSlot: "2026-03-01T15:00:00.000Z" });
    const req = createRequest(`http://localhost:3000/api/webhooks/resend?token=${token}`);
    
    const response = await GET(req) as any;

    expect(response.init?.status).toBe(307);
    const location = response.init?.headers?.Location;
    expect(location).toContain("/booking/confirmation");
    expect(location).toContain("status=success");
    expect(location).toContain("action=confirm");
    
    expect(fetchCalendarEvents).toHaveBeenCalledWith("2026-03-01T15:00:00.000Z");
    expect(createCalendarEvent).toHaveBeenCalled();
    expect(sendReservationSuccessEmail).toHaveBeenCalledWith("John", "john@example.com", "2026-03-01T15:00:00.000Z", "Solo Estudio");
  });

  it("should detect concurrency conflict, send rejection email, and redirect to error", async () => {
    // Mock the calendar to return an event at the exact time
    (fetchCalendarEvents as any).mockResolvedValue([{ start: "2026-03-01T15:00:00.000Z", end: "2026-03-01T18:00:00.000Z" }]);
    const token = generateSecureToken({ bookingId: "booking_456", action: "confirm", applicantName: "Jane", applicantEmail: "jane@example.com", sessionType: "Estudio + Productor", timeSlot: "2026-03-01T15:00:00.000Z" });
    const req = createRequest(`http://localhost:3000/api/webhooks/resend?token=${token}`);
    
    const response = await GET(req) as any;

    expect(response.init?.status).toBe(307);
    const location = response.init?.headers?.Location;
    expect(location).toContain("/booking/confirmation");
    expect(location).toContain("status=error");
    
    expect(createCalendarEvent).not.toHaveBeenCalled();
    expect(sendReservationRejectedEmail).toHaveBeenCalledWith("Jane", "jane@example.com", "2026-03-01T15:00:00.000Z", "Estudio + Productor");
  });

  it("should redirect to error confirmation if the timeSlot is an invalid date string", async () => {
    const token = generateSecureToken({ bookingId: "booking_999", action: "confirm", applicantName: "Bob", applicantEmail: "bob@example.com", sessionType: "Solo Estudio", timeSlot: "not-a-real-date" });
    const req = createRequest(`http://localhost:3000/api/webhooks/resend?token=${token}`);
    
    const response = await GET(req) as any;

    expect(response.init?.status).toBe(307);
    const location = response.init?.headers?.Location;
    expect(location).toContain("/booking/confirmation");
    expect(location).toContain("status=error");
    
    // Parse the URL to safely check the message param which is URL encoded
    const url = new URL(location);
    expect(url.searchParams.get("message")).toBe("El formato del horario reservado es inválido.");
    
    expect(fetchCalendarEvents).not.toHaveBeenCalled();
    expect(createCalendarEvent).not.toHaveBeenCalled();
  });

  it("should redirect to error confirmation if calendar creation fails", async () => {
    (fetchCalendarEvents as any).mockResolvedValue([]);
    (createCalendarEvent as any).mockResolvedValue({ success: false, message: "Sync error" });
    const token = generateSecureToken({ bookingId: "booking_123", action: "confirm", applicantName: "John", applicantEmail: "john@example.com", sessionType: "Solo Estudio", timeSlot: "2026-03-01T15:00:00.000Z" });
    const req = createRequest(`http://localhost:3000/api/webhooks/resend?token=${token}`);
    
    const response = await GET(req) as any;

    expect(response.init?.status).toBe(307);
    const location = response.init?.headers?.Location;
    expect(location).toContain("/booking/confirmation");
    expect(location).toContain("status=error");
    
    expect(sendReservationSuccessEmail).not.toHaveBeenCalled();
  });

  it("should redirect to success confirmation for a valid reject token", async () => {
    const token = generateSecureToken({ bookingId: "booking_456", action: "reject" });
    const req = createRequest(`http://localhost:3000/api/webhooks/resend?token=${token}`);
    
    const response = await GET(req) as any;

    expect(response.init?.status).toBe(307);
    const location = response.init?.headers?.Location;
    expect(location).toContain("/booking/confirmation");
    expect(location).toContain("status=success");
    expect(location).toContain("action=reject");
  });
});
