# Playwright Tests for Pelei Niki Photography Portfolio

This directory contains end-to-end tests for the photography portfolio website using [Playwright](https://playwright.dev/).

## Test Structure

- **[navigation.spec.js](navigation.spec.js)** - Tests for navigation component, mobile menu, and scroll behavior
- **[contact-form.spec.js](contact-form.spec.js)** - Tests for contact form validation, submission, and rate limiting
- **[lightbox.spec.js](lightbox.spec.js)** - Tests for image lightbox functionality and keyboard navigation
- **[routing.spec.js](routing.spec.js)** - Tests for routing, page loads, and SEO

## Running Tests

### Prerequisites

1. Install dependencies:
   ```bash
   cd website
   npm install
   ```

2. Install Playwright browsers (first time only):
   ```bash
   npx playwright install
   ```

3. (Optional) Set up environment variables for EmailJS testing:
   ```bash
   cp .env.test.example .env
   # Edit .env with your EmailJS credentials
   ```

### Test Commands

```bash
# Run all tests (headless mode)
npm test

# Run tests with UI mode (recommended for development)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests interactively
npm run test:debug

# View last test report
npm run test:report

# Run specific test file
npm test -- navigation.spec.js
npm test -- contact-form.spec.js

# Run tests matching a pattern
npm test -- --grep "lightbox"
```

### Running Specific Tests

```bash
# Run only navigation tests
npx playwright test navigation

# Run only contact form tests
npx playwright test contact-form

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests in mobile viewport
npx playwright test --project="Mobile Chrome"
```

## Test Coverage

### Navigation Tests
- Logo display and clickability
- Desktop navigation menu
- Mobile hamburger menu functionality
- Active page highlighting
- Header scroll shrink effect
- Page navigation

### Contact Form Tests
- Form field validation
- Email format validation
- Form submission with mock EmailJS
- Success and error message display
- Rate limiting (30-second cooldown)
- Accessibility (proper labels)
- Pre-filled message from navigation state

### Lightbox Tests
- Opening lightbox on image click
- Closing via close button, Escape key, or backdrop click
- Navigation with arrow buttons
- Keyboard navigation (Arrow Left/Right, Escape)
- Image counter display
- Disable navigation buttons at boundaries
- Body scroll prevention
- Image aspect ratio preservation
- Rapid navigation handling

### Routing Tests
- All pages load correctly
- Base path (`/`) for custom domain
- Scroll to top on navigation
- Browser back/forward buttons
- No JavaScript errors
- Layout stability
- SEO meta tags
- Direct URL access
- 404 handling

## Test Configuration

Configuration is defined in [playwright.config.js](../playwright.config.js):

- **Base URL**: `http://localhost:5173/peleiniki`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Parallelization**: Full parallel execution (except on CI)
- **Retries**: 2 retries on CI, 0 locally
- **Traces**: Captured on first retry
- **Screenshots**: Taken on failure

The dev server is automatically started before tests run.

## Writing New Tests

### Best Practices

1. **Use descriptive test names**:
   ```javascript
   test('should close lightbox when pressing Escape key', async ({ page }) => {
     // ...
   });
   ```

2. **Use semantic selectors**:
   ```javascript
   // Good
   page.getByRole('button', { name: 'Submit' })
   page.getByLabel('Email')

   // Avoid
   page.locator('.submit-btn')
   ```

3. **Wait for elements properly**:
   ```javascript
   await expect(element).toBeVisible();
   await page.waitForLoadState('networkidle');
   ```

4. **Group related tests**:
   ```javascript
   test.describe('Mobile Menu', () => {
     test.beforeEach(async ({ page }) => {
       await page.setViewportSize({ width: 375, height: 667 });
     });
     // Mobile-specific tests
   });
   ```

5. **Mock external services**:
   ```javascript
   await page.route('**/api.emailjs.com/**', (route) => {
     route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
   });
   ```

## Continuous Integration

Tests can be integrated into GitHub Actions workflow:

```yaml
- name: Install Playwright
  run: cd website && npm install && npx playwright install --with-deps

- name: Run Playwright tests
  run: cd website && npm test
```

## Debugging Tests

### Using Playwright Inspector

```bash
npm run test:debug
```

This opens the Playwright Inspector where you can:
- Step through tests
- Inspect page elements
- View network requests
- See console logs

### Using UI Mode

```bash
npm run test:ui
```

UI mode provides:
- Visual test runner
- Time travel debugging
- Watch mode
- Test artifacts viewer

### Screenshots and Traces

When tests fail, Playwright automatically captures:
- Screenshots (in `test-results/`)
- Traces (viewable with `npx playwright show-trace trace.zip`)

## Troubleshooting

### Tests fail with "Element not visible"
- Increase timeout: `await expect(element).toBeVisible({ timeout: 10000 })`
- Check viewport size for mobile tests
- Ensure element is not hidden by another element

### Contact form tests fail
- Verify EmailJS mock is properly set up
- Check if environment variables are loaded
- Ensure dev server is running

### Flaky tests
- Use `waitForLoadState('networkidle')` before assertions
- Add explicit waits for animations: `await page.waitForTimeout(500)`
- Use `toBeVisible()` instead of checking presence directly

### Dev server not starting
- Check if port 5173 is already in use
- Ensure you're in the `website/` directory
- Try manually starting with `npm run dev`

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Selectors Guide](https://playwright.dev/docs/selectors)
