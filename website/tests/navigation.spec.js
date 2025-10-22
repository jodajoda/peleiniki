import { test, expect } from '@playwright/test';

test.describe('Navigation Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display logo and navigation links', async ({ page }) => {
    // Check if logo is visible in header (not footer)
    const logo = page.locator('header img[alt="Pelei Niki Fotós"]');
    await expect(logo).toBeVisible();

    // Check if all navigation links are present (desktop view)
    await page.setViewportSize({ width: 1280, height: 720 });

    // Target only navigation bar desktop menu (hidden class selector for desktop nav)
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await expect(desktopNav.getByRole('link', { name: 'Kezdőlap', exact: true })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'A fotózás velem', exact: true })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Portfólió', exact: true })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Rólam', exact: true })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Csomagok', exact: true })).toBeVisible();
    await expect(desktopNav.getByRole('link', { name: 'Kapcsolat', exact: true })).toBeVisible();
  });

  test('should highlight active page in navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Go to Portfolio page using desktop nav
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Portfólió', exact: true }).click();
    await expect(page).toHaveURL(/.*portfolio/);

    // Check if Portfolio link has active styling
    const portfolioLink = desktopNav.getByRole('link', { name: 'Portfólió', exact: true });
    await expect(portfolioLink).toHaveAttribute('aria-current', 'page');
  });

  test('should navigate between pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to About page using desktop nav
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Rólam', exact: true }).click();
    await expect(page).toHaveURL(/.*about/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Navigate to Contact page
    await desktopNav.getByRole('link', { name: 'Kapcsolat', exact: true }).click();
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.getByRole('heading', { name: 'Kapcsolat' })).toBeVisible();
  });

  test('should shrink header on scroll', async ({ page }) => {
    const logo = page.locator('header img[alt="Pelei Niki Fotós"]');

    // Get initial logo height
    const initialBox = await logo.boundingBox();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(500); // Wait for animation

    // Get new logo height
    const scrolledBox = await logo.boundingBox();

    // Logo should be smaller after scrolling
    expect(scrolledBox.height).toBeLessThan(initialBox.height);
  });

  test.describe('Mobile Menu', () => {
    test.beforeEach(async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should toggle mobile menu on hamburger click', async ({ page }) => {
      // Find and click hamburger button
      const menuButton = page.getByRole('button', { name: 'Menü megnyitása' });
      await expect(menuButton).toBeVisible();

      // Menu should be closed initially
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      // Open menu
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Wait a bit for animation, then check if link is in viewport and clickable
      await page.waitForTimeout(1000);

      // Get all Portfólió links and try to interact with the visible one
      const allPortfolioLinks = await page.getByRole('link', { name: 'Portfólió', exact: true }).all();
      let foundVisibleLink = false;
      for (const link of allPortfolioLinks) {
        if (await link.isVisible()) {
          foundVisibleLink = true;
          break;
        }
      }
      expect(foundVisibleLink).toBe(true);

      // Close menu by clicking hamburger
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('should close mobile menu after navigation', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: 'Menü megnyitása' });

      // Open menu
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Wait for animation
      await page.waitForTimeout(1000);

      // Find and click the visible Portfólió link
      const allPortfolioLinks = await page.getByRole('link', { name: 'Portfólió', exact: true }).all();
      for (const link of allPortfolioLinks) {
        if (await link.isVisible()) {
          await link.click();
          break;
        }
      }

      await expect(page).toHaveURL(/.*portfolio/);

      // Menu should be closed after navigation
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('should show mobile menu with all navigation items', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: 'Menü megnyitása' });
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Wait for animation
      await page.waitForTimeout(1000);

      // Check that at least one instance of each link is visible
      const links = [
        'Kezdőlap',
        'A fotózás velem',
        'Portfólió',
        'Rólam',
        'Csomagok',
        'Kapcsolat'
      ];

      for (const linkName of links) {
        const allLinks = await page.getByRole('link', { name: linkName, exact: true }).all();
        let foundVisible = false;
        for (const link of allLinks) {
          if (await link.isVisible()) {
            foundVisible = true;
            break;
          }
        }
        expect(foundVisible).toBe(true);
      }
    });

    test('should close mobile menu when clicking backdrop', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: 'Menü megnyitása' });

      // Open menu
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Wait for animation
      await page.waitForTimeout(1000);

      // Click in the top-left corner (backdrop area)
      await page.mouse.click(10, 10);

      // Wait a bit for close animation
      await page.waitForTimeout(600);

      // Menu should be closed
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test('should make logo clickable and return to homepage', async ({ page }) => {
    // Navigate to another page using desktop nav
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Kapcsolat', exact: true }).click();
    await expect(page).toHaveURL(/.*contact/);

    // Click logo image to return home
    const logo = page.locator('header a').first();
    await logo.click();

    // Should be back on homepage
    await expect(page).toHaveURL(/.*\/peleiniki\/?$/);
  });
});
