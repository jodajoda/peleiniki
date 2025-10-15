import { test, expect } from '@playwright/test';

test.describe('Lightbox Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate from home using the navigation menu to ensure proper routing
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click portfolio link in navigation
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Portfólió', exact: true }).click({ force: true });
    await page.waitForLoadState('networkidle');

    // Wait a bit for animations to settle
    await page.waitForTimeout(500);
  });

  test.afterEach(async ({ page }) => {
    // Close lightbox if it's open to ensure clean state for next test
    const lightbox = page.locator('div[class*="fixed inset-0 z-50"]');
    try {
      if (await lightbox.isVisible({ timeout: 1000 })) {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      }
    } catch {
      // Lightbox not open, that's fine
    }
  });

  test('should open lightbox when clicking on an image', async ({ page }) => {
    // Find and click first image in portfolio (skip navigation logo)
    const portfolioImages = page.locator('main img');
    await portfolioImages.first().waitFor({ state: 'visible' });
    // Force click because there might be hover overlays
    await portfolioImages.first().click({ force: true });

    // Lightbox should be visible
    const lightbox = page.locator('div[class*="fixed inset-0 z-50"]');
    await expect(lightbox).toBeVisible();

    // Should show close button
    await expect(page.getByRole('button', { name: 'Bezárás' })).toBeVisible();
  });

  test('should close lightbox when clicking close button', async ({ page }) => {
    // Open lightbox
    const portfolioImages = page.locator('main img');
    await portfolioImages.first().waitFor({ state: 'visible' });
    await portfolioImages.first().click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Click close button
    await page.getByRole('button', { name: 'Bezárás' }).click({ force: true });

    // Lightbox should close
    await expect(page.locator('div[class*="fixed inset-0 z-50"]')).not.toBeVisible({
      timeout: 1000,
    });
  });

  test('should close lightbox when pressing Escape key', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    const lightbox = page.locator('div[class*="fixed inset-0 z-50"]');
    await expect(lightbox).toBeVisible();

    // Press Escape key
    await page.keyboard.press('Escape');

    // Lightbox should close
    await expect(lightbox).not.toBeVisible({ timeout: 1000 });
  });

  test('should close lightbox when clicking backdrop', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    const lightbox = page.locator('div[class*="fixed inset-0 z-50"]');
    await expect(lightbox).toBeVisible();

    // Click on backdrop (not on image)
    await lightbox.click({ position: { x: 10, y: 10 } });

    // Lightbox should close
    await expect(lightbox).not.toBeVisible({ timeout: 1000 });
  });

  test('should navigate to next image with arrow button', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Get initial counter value
    const initialCounter = await page
      .locator('div[class*="absolute bottom-4"]')
      .textContent();

    // Click next button if available
    const nextButton = page.getByRole('button', { name: 'Következő kép' });

    if (await nextButton.isVisible()) {
      await nextButton.click({ force: true });

      // Wait for image transition
      await page.waitForTimeout(500);

      // Counter should have changed
      const newCounter = await page.locator('div[class*="absolute bottom-4"]').textContent();
      expect(newCounter).not.toBe(initialCounter);
    }
  });

  test('should navigate to previous image with arrow button', async ({ page }) => {
    // Open lightbox on second or later image
    const images = page.locator('main img');
    const imageCount = await images.count();

    if (imageCount > 1) {
      await images.nth(1).click({ force: true });

      // Wait for lightbox to open
      await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

      // Previous button should be visible
      const prevButton = page.getByRole('button', { name: 'Előző kép' });
      await expect(prevButton).toBeVisible();

      // Click previous button
      await prevButton.click({ force: true });

      // Wait for transition
      await page.waitForTimeout(500);

      // Should show first image (counter should be "1 / X")
      const counter = await page.locator('div[class*="absolute bottom-4"]').textContent();
      expect(counter.trim().startsWith('1 /')).toBeTruthy();
    }
  });

  test('should navigate with arrow keys', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Get initial counter
    const initialCounter = await page
      .locator('div[class*="absolute bottom-4"]')
      .textContent();

    // Check if there are multiple images
    const hasMultipleImages = initialCounter.includes('/');
    const totalImages = hasMultipleImages
      ? parseInt(initialCounter.split('/')[1].trim())
      : 1;

    if (totalImages > 1) {
      // Press right arrow key
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);

      // Counter should have changed
      const newCounter = await page.locator('div[class*="absolute bottom-4"]').textContent();
      expect(newCounter).not.toBe(initialCounter);

      // Press left arrow key
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(500);

      // Should be back to first image
      const finalCounter = await page.locator('div[class*="absolute bottom-4"]').textContent();
      expect(finalCounter).toBe(initialCounter);
    }
  });

  test('should show image counter', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Counter should be visible and show current position
    const counter = page.locator('div[class*="absolute bottom-4"]');
    await expect(counter).toBeVisible();

    // Should match pattern "X / Y"
    const counterText = await counter.textContent();
    expect(counterText.trim()).toMatch(/^\d+ \/ \d+$/);
  });

  test('should disable previous button on first image', async ({ page }) => {
    // Open lightbox on first image
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Previous button should not be visible
    const prevButton = page.getByRole('button', { name: 'Előző kép' });
    await expect(prevButton).not.toBeVisible();
  });

  test('should disable next button on last image', async ({ page }) => {
    // Get all images
    const images = page.locator('main img');
    const imageCount = await images.count();

    if (imageCount > 1) {
      // Open last image
      await images.nth(imageCount - 1).click({ force: true });

      // Wait for lightbox to open
      await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

      // Navigate to last image if not already there
      // Check counter to verify we're on last image
      const counter = await page.locator('div[class*="absolute bottom-4"]').textContent();
      const currentIndex = parseInt(counter.split('/')[0].trim());
      const totalImages = parseInt(counter.split('/')[1].trim());

      if (currentIndex === totalImages) {
        // Next button should not be visible
        const nextButton = page.getByRole('button', { name: 'Következő kép' });
        await expect(nextButton).not.toBeVisible();
      }
    }
  });

  test('should prevent body scroll when lightbox is open', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Check body overflow style
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('hidden');

    // Close lightbox
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Body overflow should be restored
    const bodyOverflowAfter = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflowAfter).not.toBe('hidden');
  });

  test('should display image with proper styling', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Lightbox image should be visible and properly styled
    const lightboxImage = page.locator('div[class*="fixed inset-0 z-50"] img');
    await expect(lightboxImage).toBeVisible();

    // Check if image is within viewport constraints
    const imageBox = await lightboxImage.boundingBox();
    const viewportSize = page.viewportSize();

    expect(imageBox.height).toBeLessThanOrEqual(viewportSize.height);
  });

  test('should handle rapid navigation', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Rapidly press arrow keys
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    // Should still work correctly
    const lightbox = page.locator('div[class*="fixed inset-0 z-50"]');
    await expect(lightbox).toBeVisible();
  });

  test('should maintain aspect ratio of images', async ({ page }) => {
    // Open lightbox
    const firstImage = page.locator('main img').first();
    await firstImage.waitFor({ state: 'visible' });
    await firstImage.click({ force: true });

    // Wait for lightbox to open
    await page.waitForSelector('div[class*="fixed inset-0 z-50"]');

    // Get lightbox image
    const lightboxImage = page.locator('div[class*="fixed inset-0 z-50"] img');

    // Check that object-fit is contain (preserves aspect ratio)
    const objectFit = await lightboxImage.evaluate((el) =>
      window.getComputedStyle(el).objectFit
    );
    expect(objectFit).toBe('contain');
  });
});
