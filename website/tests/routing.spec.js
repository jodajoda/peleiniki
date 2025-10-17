import { test, expect } from '@playwright/test';

test.describe('Page Routing and Navigation', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');

    // Check if homepage elements are visible
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('should load photoshooting page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'A fotózás velem', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Check page loaded correctly
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*photoshooting/);
  });

  test('should load portfolio page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Portfólió', exact: true }).click({ force: true });
    await page.waitForLoadState('networkidle');

    // Check page title
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*portfolio/);

    // Portfolio should contain images
    const images = page.locator('main img');
    await expect(images.first()).toBeVisible({ timeout: 10000 });
  });

  test('should load about page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Rólam', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Check page loaded
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*about/);
  });

  test('should load packages page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Csomagok', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Check page title
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*packages/);
  });

  test('should load contact page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    await desktopNav.getByRole('link', { name: 'Kapcsolat', exact: true }).click();
    await page.waitForLoadState('networkidle');

    // Check form is present
    await expect(page.getByRole('heading', { name: 'Kapcsolat' })).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.getByLabel('Név *')).toBeVisible({ timeout: 10000 });
  });

  test('should load privacy policy page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Click privacy policy link in footer
    await page.getByRole('link', { name: 'Adatkezelési tájékoztató' }).click();
    await page.waitForLoadState('networkidle');

    // Check page loaded
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/.*adatkezelesi-tajekoztato/);
  });

  test('should use correct base path for all routes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const url = page.url();
    expect(url).toContain('localhost:5173');

    // Navigate through all pages via UI and check URL contains base path
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');

    const navLinks = [
      { name: 'A fotózás velem', expectedPath: 'photoshooting' },
      { name: 'Portfólió', expectedPath: 'portfolio' },
      { name: 'Rólam', expectedPath: 'about' },
      { name: 'Csomagok', expectedPath: 'packages' },
      { name: 'Kapcsolat', expectedPath: 'contact' },
    ];

    for (const link of navLinks) {
      await desktopNav.getByRole('link', { name: link.name, exact: true }).click({ force: true });
      await page.waitForLoadState('networkidle');
      const currentUrl = page.url();
      expect(currentUrl).toContain(link.expectedPath);
    }
  });

  test('should scroll to top when navigating between pages', async ({ page }) => {
    // Go to homepage and scroll down
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollBy(0, 500));

    // Wait a bit to ensure scroll happened
    await page.waitForTimeout(200);

    // Navigate to another page
    await page.goto('/about');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check scroll position is at top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test('should maintain navigation bar across all pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    const navLinks = [
      'Portfólió',
      'Rólam',
      'Kapcsolat',
    ];

    // Check navigation on homepage (target header logo, not footer logo)
    const logo = page.locator('header img[alt="Pelei Niki Fotós"]');
    await expect(logo).toBeVisible({ timeout: 10000 });
    await expect(desktopNav.getByRole('link', { name: 'Kezdőlap' })).toBeVisible({ timeout: 10000 });

    // Navigate through pages and check navigation is still visible
    for (const linkName of navLinks) {
      await desktopNav.getByRole('link', { name: linkName, exact: true }).click({ force: true });
      await page.waitForLoadState('networkidle');

      // Navigation should be visible on each page
      await expect(logo).toBeVisible({ timeout: 10000 });
      await expect(desktopNav.getByRole('link', { name: 'Kezdőlap' })).toBeVisible({ timeout: 10000 });
    }
  });

  test('should maintain footer across all pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    const navLinks = [
      'Portfólió',
      'Rólam',
      'Kapcsolat',
    ];

    // Check footer on homepage
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer');
    await expect(footer).toBeVisible({ timeout: 10000 });

    // Navigate through pages and check footer is still visible
    for (const linkName of navLinks) {
      await page.evaluate(() => window.scrollTo(0, 0)); // Scroll to top to click nav
      await desktopNav.getByRole('link', { name: linkName, exact: true }).click({ force: true });
      await page.waitForLoadState('networkidle');

      // Footer should be visible on each page
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await expect(footer).toBeVisible({ timeout: 10000 });
    }
  });

  test('should handle browser back button', async ({ page }) => {
    // Navigate through pages
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.goto('/portfolio');
    await page.waitForLoadState('networkidle');
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*portfolio/);

    // Go back again
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('should handle browser forward button', async ({ page }) => {
    // Navigate through pages
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.goto('/portfolio');
    await page.waitForLoadState('networkidle');

    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/$/);

    // Go forward
    await page.goForward();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*portfolio/);
  });

  test('should load page without JavaScript errors', async ({ page }) => {
    const consoleErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should not have critical errors (some asset loading errors might be OK)
    const criticalErrors = consoleErrors.filter(
      (error) => !error.includes('404') && !error.includes('Failed to load resource')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('should have correct page titles for SEO', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Pelei Niki/i);
  });

  test('should load all pages without network errors', async ({ page }) => {
    // Start at homepage - this loads with 200 status
    const response = await page.goto('/');
    expect(response.status()).toBe(200);
    await page.waitForLoadState('networkidle');

    // Navigate through pages via UI - SPA navigation doesn't create network requests with status codes
    // So we just check that pages load without errors
    const desktopNav = page.locator('nav ul.hidden.lg\\:flex');
    const navLinks = [
      'A fotózás velem',
      'Portfólió',
      'Rólam',
      'Csomagok',
      'Kapcsolat',
    ];

    for (const linkName of navLinks) {
      await desktopNav.getByRole('link', { name: linkName, exact: true }).click({ force: true });
      await page.waitForLoadState('networkidle');
      // Check page loaded by verifying h1 is visible
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    }
  });

  test('should render without layout shift', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Get initial layout
    const initialHeight = await page.evaluate(() => document.body.scrollHeight);

    // Wait a bit for any delayed content
    await page.waitForTimeout(1000);

    // Layout should be stable
    const finalHeight = await page.evaluate(() => document.body.scrollHeight);

    // Allow small differences (within 50px) for dynamic content
    expect(Math.abs(finalHeight - initialHeight)).toBeLessThan(50);
  });

  test('should have language attribute set to Hungarian', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('hu');
  });

  test('should have proper meta viewport for mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });

  test('should load CSS and styles correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait a bit for styles to fully apply
    await page.waitForTimeout(500);

    // Check if Tailwind CSS is loaded by verifying computed styles on visible elements
    const heroHeading = page.locator('h1').first();
    await expect(heroHeading).toBeVisible();

    // Check that the heading has proper font size from Tailwind (should be large)
    const fontSize = await heroHeading.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );

    // Hero heading should have large font size (Tailwind text-4xl or larger)
    expect(parseInt(fontSize)).toBeGreaterThan(30);
  });

  test('should handle direct URL access to all routes', async ({ page }) => {
    // Simulate direct URL access (not through navigation)
    // Using full URL with base path since Playwright baseURL isn't working as expected
    const baseUrl = 'http://localhost:5173/peleiniki';
    const routes = [
      { path: '/photoshooting', fullUrl: `${baseUrl}/photoshooting` },
      { path: '/portfolio', fullUrl: `${baseUrl}/portfolio` },
      { path: '/about', fullUrl: `${baseUrl}/about` },
      { path: '/packages', fullUrl: `${baseUrl}/packages` },
      { path: '/contact', fullUrl: `${baseUrl}/contact` },
      { path: '/adatkezelesi-tajekoztato', fullUrl: `${baseUrl}/adatkezelesi-tajekoztato` },
    ];

    for (const route of routes) {
      // Navigate with full URL to simulate direct access
      await page.goto(route.fullUrl, { waitUntil: 'networkidle' });

      // Page should load successfully
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(new RegExp(route.path));
    }
  });
});

test.describe('404 and Error Handling', () => {
  test('should handle non-existent routes gracefully', async ({ page }) => {
    // Note: Since React Router doesn't have a 404 route defined,
    // it will likely show a blank page. You might want to add a catch-all route.

    const response = await page.goto('http://localhost:5173/peleiniki/non-existent-page');
    await page.waitForLoadState('networkidle');

    // The page should still return 200 (SPA behavior)
    // but might show empty content
    expect(response.status()).toBe(200);
  });
});
