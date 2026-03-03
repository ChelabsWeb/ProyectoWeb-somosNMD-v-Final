import { google } from 'googleapis';

export interface CalendarSlot {
  start: string; // ISO string
  end: string;
}

export interface ApplicantEntity {
  name: string;
  email: string;
  sessionType: string;
}

// Ensure private key is properly formatted with actual newlines if it comes from env
const getPrivateKey = () => {
  const key = process.env.GOOGLE_PRIVATE_KEY || '';
  return key.replace(/\\n/g, '\n');
};

const getCalendarClient = () => {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn('Google Calendar credentials missing. Fetching will be bypassed.');
    return null;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: getPrivateKey(),
    },
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  });

  return google.calendar({ version: 'v3', auth });
};

/**
 * Fetch occupied calendar events for a given date.
 */
export async function fetchCalendarEvents(dateStr: string): Promise<CalendarSlot[]> {
  try {
    const calendar = getCalendarClient();
    if (!calendar) return []; // Fallback if no credentials

    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    // We fetch events for the entire day of the provided dateStr
    const startOfDay = new Date(dateStr);
    startOfDay.setUTCHours(0, 0, 0, 0);
    
    const endOfDay = new Date(dateStr);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const items = response.data.items || [];

    return items
      .filter(item => item.status !== 'cancelled')
      .filter(item => item.start?.dateTime && item.end?.dateTime)
      .map(item => ({
        start: item.start!.dateTime as string,
        end: item.end!.dateTime as string,
      }));
  } catch (error) {
    console.error('Failed to fetch calendar events:', error);
    throw new Error('Google Calendar Sync Error');
  }
}

/**
 * Creates a new booking event in Google Calendar for a 3-hour slot.
 */
export async function createCalendarEvent(dateStr: string, applicant: ApplicantEntity): Promise<{ success: boolean; eventId?: string; message?: string, detail?: string }> {
  try {
    const calendar = getCalendarClient();
    if (!calendar) return { success: false, message: 'Google Calendar Sync Bypass: Missing credentials', detail: 'Local dev mode' };

    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    const startTime = new Date(dateStr);
    const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours

    const event = {
      summary: `Reserva Estudio - ${applicant.name}`,
      description: `Modalidad: ${applicant.sessionType}\nEmail: ${applicant.email}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'America/Montevideo', // Assuming based on previous context, or UTC. Using timezone from date.
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Montevideo',
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    return { success: true, eventId: response.data.id || undefined };
  } catch (error) {
    console.error('Failed to create calendar event:', error);
    return { success: false, message: 'Google Calendar Sync Error', detail: error instanceof Error ? error.message : String(error) };
  }
}
