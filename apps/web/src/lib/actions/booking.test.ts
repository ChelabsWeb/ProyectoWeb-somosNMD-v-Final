import { describe, it, expect, vi } from 'vitest';
import { getAvailableSlots, createBookingRequest } from './booking';
import * as calendarService from '@/lib/services/calendar';

// Mock the external service
vi.mock('@/lib/services/calendar', () => ({
  fetchCalendarEvents: vi.fn(),
}));

// Mock the email service
vi.mock('@/lib/services/email', () => ({
  sendReservationEmail: vi.fn().mockResolvedValue({ success: true, data: { id: "mock_id" } })
}));

describe('getAvailableSlots Server Action', () => {
  it('should return available slots for a valid ISO date', async () => {
    // Mock that there are no events occupied
    vi.mocked(calendarService.fetchCalendarEvents).mockResolvedValueOnce([]);

    const testDate = new Date();
    testDate.setDate(testDate.getDate() + 1); // Tomorrow
    testDate.setHours(12, 0, 0, 0);
    const isoDate = testDate.toISOString();

    const result = await getAvailableSlots(isoDate);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.length).toBe(4); // the 4 default blocks
  });

  it('should correctly filter occupied slots given a UTC UTC-3 timezone shifted date', async () => {
    // 15:00 local time in America/Montevideo is 18:00 UTC
    vi.mocked(calendarService.fetchCalendarEvents).mockResolvedValueOnce([
      { start: '2026-03-01T18:00:00.000Z', end: '2026-03-01T21:00:00.000Z' }
    ]);

    const result = await getAvailableSlots('2026-03-01T03:00:00.000Z');

    expect(result.success).toBe(true);
    // The "15:00 - 18:00" block should be missing
    expect(result.data).not.toContain("15:00 - 18:00");
    expect(result.data?.length).toBe(3);
  });

  it('should fail validation for invalid date format', async () => {
    const result = await getAvailableSlots('invalid-date-string');

    expect(result.success).toBe(false);
    expect(result.message).toBe('Error de validación');
    expect(result.error).toHaveProperty('dateIso');
  });

  it('should return error if fetching events fails', async () => {
    vi.mocked(calendarService.fetchCalendarEvents).mockRejectedValueOnce(new Error('Network issues'));

    const testDate = new Date().toISOString();
    const result = await getAvailableSlots(testDate);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Google Calendar Sync Error');
    expect(result.error).toBe('Network issues');
  });
});

describe('createBookingRequest Server Action', () => {
  it('[P0] should return success for valid booking data', async () => {
    const validData = {
      name: 'Test Artist',
      email: 'test@example.com',
      sessionType: 'solo' as const,
      timeSlot: new Date().toISOString()
    };
    
    const response = await createBookingRequest(validData);
    
    expect(response.success).toBe(true);
    expect(response.message).toBe("Reserva solicitada correctamente");
    expect(response.data).toBeNull();
  });

  it('[P1] should return validation error for invalid email', async () => {
    const invalidData = {
      name: 'Test Artist',
      email: 'not-an-email',
      sessionType: 'solo' as const,
      timeSlot: new Date().toISOString()
    };
    
    const response = await createBookingRequest(invalidData);
    
    expect(response.success).toBe(false);
    expect(response.message).toBe("Error de validación");
    expect(response.error).toHaveProperty('email');
  });

  it('[P1] should return validation error for missing name', async () => {
    const invalidData = {
      name: 'A',
      email: 'test@example.com',
      sessionType: 'solo' as const,
      timeSlot: new Date().toISOString()
    };
    
    const response = await createBookingRequest(invalidData);
    
    expect(response.success).toBe(false);
    expect(response.message).toBe("Error de validación");
    expect(response.error).toHaveProperty('name');
  });
});
