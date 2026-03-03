const fs = require('fs');
const dotenv = require('dotenv');
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
}

async function main() {
  const { fetchCalendarEvents } = require('./src/lib/services/calendar');
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

main().catch(console.error);
