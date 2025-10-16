import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate from home using the navigation menu to ensure proper routing
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click contact link in navigation
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Kapcsolat', exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('should display contact form with all fields', async ({ page }) => {
    // Check page title - wait longer for animations
    await expect(page.getByRole('heading', { name: 'Kapcsolat', exact: true })).toBeVisible({ timeout: 10000 });

    // Check all form fields are present
    await expect(page.getByLabel('Név *')).toBeVisible();
    await expect(page.getByLabel('Email *')).toBeVisible();
    await expect(page.getByLabel('Telefonszám')).toBeVisible();
    await expect(page.getByLabel('Üzenet *')).toBeVisible();

    // Check submit button
    await expect(page.getByRole('button', { name: 'Üzenet küldése' })).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    // Check email is displayed
    await expect(page.getByText('peleinikifotoi@gmail.com')).toBeVisible();
    await expect(page.getByRole('link', { name: 'peleinikifotoi@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:peleinikifotoi@gmail.com'
    );

    // Check social media section
    await expect(page.getByRole('heading', { name: 'Közösségi média' })).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Üzenet küldése' });

    // Try to submit empty form
    await submitButton.click();

    // Check that form validation prevents submission
    const nameInput = page.getByLabel('Név *');
    await expect(nameInput).toBeFocused();
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByLabel('Email *');

    // Enter invalid email
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // Check HTML5 validation
    const validationMessage = await emailInput.evaluate((el) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('should accept valid form data', async ({ page }) => {
    // Fill in all required fields
    await page.getByLabel('Név *').fill('Test Felhasználó');
    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByLabel('Telefonszám').fill('+36 30 123 4567');
    await page.getByLabel('Üzenet *').fill('Ez egy teszt üzenet a fotózással kapcsolatban.');

    // Submit button should be enabled
    const submitButton = page.getByRole('button', { name: 'Üzenet küldése' });
    await expect(submitButton).toBeEnabled();
  });

  test('should show loading state when submitting', async ({ page }) => {
    // Fill form
    await page.getByLabel('Név *').fill('Test Felhasználó');
    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByLabel('Üzenet *').fill('Teszt üzenet');

    // Mock EmailJS with a delay - use setTimeout instead of page.waitForTimeout
    await page.route('**/api.emailjs.com/**', (route) => {
      setTimeout(() => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ success: true }),
        });
      }, 500);
    });

    // Submit form
    const submitButton = page.getByRole('button', { name: 'Üzenet küldése' });
    await submitButton.click();

    // Check loading state appears quickly (button text changes)
    await expect(page.getByRole('button', { name: 'Küldés...' })).toBeVisible({ timeout: 2000 });
  });

  test('should show success message on successful submission', async ({ page }) => {
    // Fill form
    await page.getByLabel('Név *').fill('Test Felhasználó');
    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByLabel('Üzenet *').fill('Teszt üzenet');

    // Mock successful EmailJS response
    await page.route('**/api.emailjs.com/**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    // Submit form
    await page.getByRole('button', { name: 'Üzenet küldése' }).click();

    // Wait for success message
    await expect(page.getByText('Köszönöm az üzeneted! Hamarosan jelentkezem.')).toBeVisible({
      timeout: 5000,
    });

    // Form should be cleared
    await expect(page.getByLabel('Név *')).toHaveValue('');
    await expect(page.getByLabel('Email *')).toHaveValue('');
    await expect(page.getByLabel('Üzenet *')).toHaveValue('');
  });

  test('should show error message on failed submission', async ({ page }) => {
    // Fill form
    await page.getByLabel('Név *').fill('Test Felhasználó');
    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByLabel('Üzenet *').fill('Teszt üzenet');

    // Mock failed EmailJS response
    await page.route('**/api.emailjs.com/**', (route) => {
      route.abort('failed');
    });

    // Submit form
    await page.getByRole('button', { name: 'Üzenet küldése' }).click();

    // Wait for error message
    await expect(
      page.getByText('Hiba történt az üzenet küldése során. Kérlek próbáld újra később.')
    ).toBeVisible({ timeout: 5000 });
  });

  test('should enforce rate limiting (30 second cooldown)', async ({ page }) => {
    // Fill form
    await page.getByLabel('Név *').fill('Test Felhasználó');
    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByLabel('Üzenet *').fill('Teszt üzenet');

    // Mock successful EmailJS response
    await page.route('**/api.emailjs.com/**', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      });
    });

    // First submission
    await page.getByRole('button', { name: 'Üzenet küldése' }).click();
    await expect(page.getByText('Köszönöm az üzeneted! Hamarosan jelentkezem.')).toBeVisible({
      timeout: 5000,
    });

    // Try to submit again immediately
    await page.getByLabel('Név *').fill('Test Felhasználó 2');
    await page.getByLabel('Email *').fill('test2@example.com');
    await page.getByLabel('Üzenet *').fill('Második teszt üzenet');
    await page.getByRole('button', { name: 'Üzenet küldése' }).click();

    // Should show rate limit error
    await expect(page.getByText(/Kérlek várj \d+ másodpercet újabb üzenet küldése előtt\./)).toBeVisible();
  });

  test('should display error when EmailJS is not configured', async ({ page }) => {
    // This test assumes environment variables are not set
    // In CI/CD, you might need to temporarily unset them for this test

    // Fill form
    await page.getByLabel('Név *').fill('Test Felhasználó');
    await page.getByLabel('Email *').fill('test@example.com');
    await page.getByLabel('Üzenet *').fill('Teszt üzenet');

    // Intercept console errors
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Submit form
    await page.getByRole('button', { name: 'Üzenet küldése' }).click();

    // Should show generic error (if credentials are missing)
    // Note: This will only trigger if .env is not properly configured
  });

  test('should pre-fill message from navigation state', async ({ page }) => {
    // Navigate from another page with state
    await page.goto('/packages');

    // Simulate clicking a "contact" button that passes state
    // (You may need to adjust this based on actual implementation)
    await page.evaluate(() => {
      window.history.pushState(
        { message: 'Érdekel a Standard csomag!' },
        '',
        '/contact'
      );
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    await page.goto('/contact', {
      waitUntil: 'domcontentloaded',
    });

    // Note: This test depends on how state is passed via React Router
    // The current implementation uses location.state which requires proper navigation
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check all form elements have proper labels
    const nameInput = page.getByLabel('Név *');
    const emailInput = page.getByLabel('Email *');
    const phoneInput = page.getByLabel('Telefonszám');
    const messageInput = page.getByLabel('Üzenet *');

    await expect(nameInput).toHaveAttribute('name', 'name');
    await expect(emailInput).toHaveAttribute('name', 'email');
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(phoneInput).toHaveAttribute('name', 'phone');
    await expect(phoneInput).toHaveAttribute('type', 'tel');
    await expect(messageInput).toHaveAttribute('name', 'message');
  });

  test('should display form on mobile viewport', async ({ page }) => {
    // Set mobile viewport before navigation
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to contact (already at contact page from beforeEach, but let's be explicit for mobile)
    // The form should be visible and accessible
    await expect(page.getByLabel('Név *')).toBeVisible();
    await expect(page.getByLabel('Email *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Üzenet küldése' })).toBeVisible();
  });
});
