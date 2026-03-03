import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCalendarEvents, createCalendarEvent } from './calendar';
import { google } from 'googleapis';

const mockInsert = vi.fn();
const mockList = vi.fn();

vi.mock('googleapis', () => {
  return {
    google: {
      auth: {
        GoogleAuth: vi.fn(),
      },
      calendar: vi.fn().mockImplementation(() => ({
        events: {
          insert: vi.fn((...args) => mockInsert(...args)),
          list: vi.fn((...args) => mockList(...args)),
        }
      })),
    },
  };
});

describe('Calendar Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockInsert.mockReset();
    mockList.mockReset();
    
    // Default env vars for tests
    process.env.GOOGLE_CLIENT_EMAIL = 'test@example.com';
    process.env.GOOGLE_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----';
    process.env.GOOGLE_CALENDAR_ID = 'calendar@group.calendar.google.com';
  });

  describe('fetchCalendarEvents', () => {
    it('should return a list of occupied slots from Google Calendar', async () => {
      mockList.mockResolvedValue({
        data: {
          items: [
            {
              start: { dateTime: '2026-03-01T15:00:00.000Z' },
              end: { dateTime: '2026-03-01T18:00:00.000Z' }
            }
          ]
        }
      });

      const events = await fetchCalendarEvents('2026-03-01T00:00:00.000Z');
      
      expect(mockList).toHaveBeenCalledTimes(1);
      expect(events).toEqual([
        {
          start: '2026-03-01T15:00:00.000Z',
          end: '2026-03-01T18:00:00.000Z'
        }
      ]);
    });

    it('should handle errors gracefully and throw or return empty/default', async () => {
      mockList.mockRejectedValue(new Error('API Error'));

      await expect(fetchCalendarEvents('2026-03-01T00:00:00.000Z')).rejects.toThrow('Google Calendar Sync Error');
    });
  });

  describe('createCalendarEvent', () => {
    it('should create an event in Google Calendar for a 3-hour slot', async () => {
      mockInsert.mockResolvedValue({
        data: {
          id: 'event-123',
          status: 'confirmed'
        }
      });

      const dateStr = '2026-03-10T14:00:00.000Z'; // 14:00 start
      const applicantEntity = {
        name: 'John Doe',
        email: 'john@example.com',
        sessionType: 'Solo Estudio'
      };

      const result = await createCalendarEvent(dateStr, applicantEntity);

      expect(mockInsert).toHaveBeenCalledTimes(1);
      
      const expectedEnd = '2026-03-10T17:00:00.000Z';
      
      expect(mockInsert.mock.calls[0][0].requestBody.start.dateTime).toBe(dateStr);
      expect(mockInsert.mock.calls[0][0].requestBody.end.dateTime).toBe(expectedEnd);
      expect(result).toEqual({ success: true, eventId: 'event-123' });
    });

    it('should handle creation errors gracefully', async () => {
      mockInsert.mockRejectedValue(new Error('API Error'));

      const result = await createCalendarEvent('2026-03-10T14:00:00.000Z', {
        name: 'John',
        email: 'john@example.com',
        sessionType: 'Solo Estudio'
      });

      expect(result).toEqual({ success: false, message: 'Google Calendar Sync Error', detail: 'API Error' });
    });
  });
});
