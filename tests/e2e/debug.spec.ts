import { test } from '@playwright/test';
import fs from 'fs';

test('debug calendar', async ({ page }) => {
  await page.goto('/');
  // Mobile or Desktop doesn't matter, just click the first Reservar
  await page.getByRole('button', { name: /Reservar/i }).first().click();
  
  // Wait for animation or data
  await page.waitForTimeout(3000);
  
  // Dump the full dialog html
  const html = await page.locator('[data-state="open"], [role="dialog"], [role="document"]').last().innerHTML().catch(e => e.message);
  
  fs.writeFileSync('debug-calendar.txt', html);
});
