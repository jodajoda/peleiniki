import { test, expect } from '@playwright/test';

test.describe('Lightbox Scroll Prevention', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/peleiniki/portfolio');
    await page.waitForLoadState('networkidle');
  });

  test('should prevent page scrolling when lightbox is open', async ({ page }) => {
    // Wait for page to fully load and become scrollable
    await page.evaluate(() => {
      // Ensure there's content to scroll
      return new Promise((resolve) => {
        const checkHeight = () => {
          if (document.body.scrollHeight > window.innerHeight) {
            resolve();
          } else {
            setTimeout(checkHeight, 100);
          }
        };
        checkHeight();
      });
    });

    // Scroll down the page first
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    const scrollPosition = await page.evaluate(() => window.scrollY);

    // Open lightbox by clicking an image
    const firstImage = page.locator('button[aria-label*="megnyitása nagyobb méretben"]').first();
    await firstImage.click();

    // Wait for lightbox to open
    await expect(page.locator('div[role="dialog"][aria-label="Képnéző"]')).toBeVisible();

    // Check that body has no-scroll class and overflow hidden
    const bodyClasses = await page.evaluate(() => {
      return {
        hasNoScroll: document.body.classList.contains('no-scroll'),
        overflow: window.getComputedStyle(document.body).overflow,
      };
    });
    expect(bodyClasses.hasNoScroll).toBe(true);
    expect(bodyClasses.overflow).toBe('hidden');

    // Try to scroll the page (should not work) - scroll position should remain
    const scrollBefore = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
    const scrollAfter = await page.evaluate(() => window.scrollY);

    // Scroll position should remain the same (scrolling is prevented)
    expect(scrollAfter).toBe(scrollBefore);

    // Close lightbox
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Check that body overflow is restored
    const bodyOverflowAfter = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflowAfter).not.toBe('hidden');

    // Page should be scrollable again
    const finalScrollBefore = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(300);
    const finalScrollAfter = await page.evaluate(() => window.scrollY);

    expect(finalScrollAfter).toBeGreaterThan(finalScrollBefore);
  });

  test('should prevent touch scrolling when lightbox is open on mobile', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip('Skipping mobile-only test');
      return;
    }

    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 500));
    const scrollPosition = await page.evaluate(() => window.scrollY);

    // Open lightbox
    const firstImage = page.locator('button[aria-label*="megnyitása nagyobb méretben"]').first();
    await firstImage.click();

    await expect(page.locator('div[role="dialog"][aria-label="Képnéző"]')).toBeVisible();

    // Try to perform touch scroll
    const lightbox = page.locator('div[role="dialog"]');
    const box = await lightbox.boundingBox();

    await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 100);
    await page.mouse.up();

    await page.waitForTimeout(300);

    // Scroll position should remain the same
    const newScrollPosition = await page.evaluate(() => window.scrollY);
    expect(newScrollPosition).toBe(scrollPosition);
  });

  test('should maintain scroll position after closing lightbox', async ({ page }) => {
    // Wait for page to fully load
    await page.waitForSelector('button[aria-label*="megnyitása nagyobb méretben"]', { timeout: 10000 });

    // Scroll down a bit
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(300);

    // Click an image that's visible
    const firstImage = page.locator('button[aria-label*="megnyitása nagyobb méretben"]').first();
    await firstImage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const scrollBeforeClick = await page.evaluate(() => window.scrollY);

    // Open lightbox
    await firstImage.click();
    await expect(page.locator('div[role="dialog"][aria-label="Képnéző"]')).toBeVisible();

    // Get scroll position while lightbox is open
    const scrollDuringLightbox = await page.evaluate(() => window.scrollY);

    // Close lightbox
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Check that scroll position after closing is the same as during lightbox (no bounce)
    const scrollAfterClose = await page.evaluate(() => window.scrollY);
    expect(scrollAfterClose).toBe(scrollDuringLightbox);

    // The key test: verify there's no jump or bounce by checking the position stayed consistent
    // Allow small variance due to browser behavior
    expect(Math.abs(scrollAfterClose - scrollBeforeClick)).toBeLessThan(50);
  });

  test('should not cause layout shift due to scrollbar', async ({ page }) => {
    // Wait for images to load
    await page.waitForSelector('button[aria-label*="megnyitása nagyobb méretben"]', { timeout: 10000 });

    // Get page width before opening lightbox
    const widthBefore = await page.evaluate(() => document.body.clientWidth);

    // Open lightbox
    const firstImage = page.locator('button[aria-label*="megnyitása nagyobb méretben"]').first();
    await firstImage.click();

    await expect(page.locator('div[role="dialog"][aria-label="Képnéző"]')).toBeVisible();

    // Get page width after opening lightbox
    const widthAfter = await page.evaluate(() => document.body.clientWidth);

    // Width should remain the same (padding compensates for scrollbar)
    expect(widthAfter).toBe(widthBefore);

    // Check that padding is applied
    const paddingRight = await page.evaluate(() => {
      return window.getComputedStyle(document.body).paddingRight;
    });

    // Should have some padding (or none if there's no scrollbar)
    expect(paddingRight).toMatch(/^\d+px$/);
  });
});
