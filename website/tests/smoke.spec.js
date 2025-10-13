import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');

    // Just check if page loads
    await expect(page.locator('body')).toBeVisible();
  });
});
