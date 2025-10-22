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

      // Wait for menu link to be visible (indicates menu is fully open)
      const portfolioLink = page.getByRole('link', { name: 'Portfólió', exact: true }).last();
      await expect(portfolioLink).toBeVisible({ timeout: 10000 });

      // Close menu by clicking hamburger
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('should close mobile menu after navigation', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: 'Menü megnyitása' });

      // Open menu
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Wait for menu to be visible and click navigation link
      const portfolioLink = page.getByRole('link', { name: 'Portfólió', exact: true }).last();
      await expect(portfolioLink).toBeVisible({ timeout: 10000 });
      await portfolioLink.click();

      await expect(page).toHaveURL(/.*portfolio/);

      // Menu should be closed after navigation
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('should show mobile menu with all navigation items', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: 'Menü megnyitása' });
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Wait for first link to be visible, then check all items
      await expect(page.getByRole('link', { name: 'Kezdőlap', exact: true }).last()).toBeVisible({ timeout: 10000 });

      // Check all menu items are present in full-screen mobile menu
      await expect(page.getByRole('link', { name: 'A fotózás velem', exact: true }).last()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Portfólió', exact: true }).last()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Rólam', exact: true }).last()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Csomagok', exact: true }).last()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Kapcsolat', exact: true }).last()).toBeVisible();
    });

    test('should close mobile menu when clicking backdrop', async ({ page }) => {
      const menuButton = page.getByRole('button', { name: 'Menü megnyitása' });

      // Open menu
      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Wait for menu to be visible
      const portfolioLink = page.getByRole('link', { name: 'Portfólió', exact: true }).last();
      await expect(portfolioLink).toBeVisible({ timeout: 10000 });

      // Click on the backdrop (click outside the menu content, in top-left corner)
      await page.mouse.click(10, 10);

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
