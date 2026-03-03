import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { fetchCalendarEvents } from './src/lib/services/calendar';

async function main() {
  console.log('Testing Google Calendar credentials...');
  try {
    const today = new Date().toISOString();
    console.log(`Fetching events for today: ${today}`);
    const events = await fetchCalendarEvents(today);
    console.log('Success! Connected to Google Calendar.');
    console.log(`Found ${events.length} events today.`);
    if (events.length > 0) {
      console.log('Events:', events);
    }
  } catch (error) {
    console.error('Error connecting to Google Calendar:');
    console.error(error);
  }
}

main();
