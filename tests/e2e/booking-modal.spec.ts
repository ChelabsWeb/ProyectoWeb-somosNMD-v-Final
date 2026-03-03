import { test, expect } from '../support/fixtures';

test.describe('Booking Module E2E Test Suite', () => {

  test('[P0] should open Dialog overlay when Reservar is clicked on Desktop', async ({ page }) => {
    // Set viewport to desktop min-width
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const reservarButton = page.getByRole('button', { name: /reservar/i });
    await expect(reservarButton).toBeVisible();
    await reservarButton.click();

    // Dialog should open
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(page.getByText('Reserva tu sesión')).toBeVisible();
  });

  test('[P0] should open Drawer overlay when Reservar is clicked on Mobile', async ({ page }) => {
    // Set viewport to mobile dimensions
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const reservarButton = page.getByRole('button', { name: /reservar/i });
    await expect(reservarButton).toBeVisible();
    await reservarButton.click();

    // Drawer should open containing the reservation text
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(page.getByText('Reserva tu sesión')).toBeVisible();
  });

  test('[P1] should close Dialog overlay on Desktop via Escape key', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.getByRole('button', { name: /reservar/i }).click();
    
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    
    // Press Escape to close
    await page.keyboard.press('Escape');
    
    // Ensure hidden eventually
    await expect(dialog).toBeHidden();
  });

  test('[P0] should open modal and allow selecting a timeslot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const reservarButton = page.getByRole('button', { name: /reservar/i }).first();
    await reservarButton.click();

    // Wait for modal content (Calendar + Grid)
    await expect(page.getByText(/SELECCIONA UNA FECHA/i)).toBeVisible();
    
    // Wait for the loader to disappear
    await expect(page.getByTestId('loading-spinner')).toBeHidden({ timeout: 10000 });
    await expect(page.getByTestId('loading-spinner')).toBeHidden({ timeout: 10000 });

    // Select slot (any available slot)
    const availableSlot = page.getByRole('button', { name: /Disponible/i }).first();
    await expect(availableSlot).toBeVisible();
    await availableSlot.click();
    await expect(availableSlot).toHaveAttribute('aria-pressed', 'true');
    await expect(availableSlot).toHaveClass(/bg-white|bg-nmd-orange/);
      
    // Proceed to next step
    const nextButton = page.getByRole('button', { name: /Siguiente/i });
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    // Verify we moved to the next step
    await expect(page.getByText(/TIPO DE SESIÓN/i)).toBeVisible();
  });

  test('[P0] should complete full booking flow including optimistic form submission', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const reservarButton = page.getByRole('button', { name: /reservar/i }).first();
    await reservarButton.click();

    // Step 1: Time Slot
    await expect(page.getByText(/SELECCIONA UNA FECHA/i)).toBeVisible();
    await expect(page.getByTestId('loading-spinner')).toBeHidden({ timeout: 10000 });
    const availableSlot = page.getByRole('button', { name: /Disponible/i }).first();
    await expect(availableSlot).toBeVisible();
    await availableSlot.click();
    const nextButton = page.getByRole('button', { name: /Siguiente/i });
    await nextButton.click();

    // Step 2: Session Type
    await expect(page.getByText(/TIPO DE SESIÓN/i)).toBeVisible();
    // Assuming the selection components has role='button' or is a clickable card
    const sessionCard = page.getByText(/Productor en el Room/i).first();
    await sessionCard.click();
    
    // Step 3: Booking Form
    const nameInput = page.getByRole('textbox', { name: /nombre/i });
    await expect(nameInput).toBeVisible();
    const emailInput = page.getByRole('textbox', { name: /email/i });
    const submitButton = page.getByRole('button', { name: /Solicitar Reserva/i });

    // Validation check
    await nameInput.fill('Test Artist');
    await emailInput.fill('invalid-email');
    await expect(page.getByText(/inválido|invalido|incorrecto/i)).toBeVisible();
    await expect(submitButton).toBeDisabled();

    // Valid submission
    await emailInput.fill('test@example.com');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Verify optimistic sileo toast
    await expect(page.getByText(/¡Reserva solicitada!/i)).toBeVisible();
    await expect(page.getByText(/Te contactaremos a la brevedad/i)).toBeVisible();
  });
});
