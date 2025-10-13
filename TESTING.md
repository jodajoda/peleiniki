# Testing Guide for Pelei Niki Photography Portfolio

This document provides an overview of the Playwright testing setup for the photography portfolio website.

## Quick Start

```bash
# Navigate to website directory
cd website

# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npm test

# Run tests with UI (recommended for development)
npm run test:ui
```

## Test Suite Overview

The test suite includes comprehensive end-to-end tests covering all major functionality:

### ✅ Navigation Tests ([tests/navigation.spec.js](website/tests/navigation.spec.js))
- Desktop navigation menu
- Mobile hamburger menu
- Logo functionality
- Active page highlighting
- Header scroll behavior
- **23 test cases**

### ✅ Contact Form Tests ([tests/contact-form.spec.js](website/tests/contact-form.spec.js))
- Form validation (required fields, email format)
- EmailJS integration (mocked)
- Success/error message display
- Rate limiting (30-second cooldown)
- Accessibility features
- **11 test cases**

### ✅ Lightbox Tests ([tests/lightbox.spec.js](website/tests/lightbox.spec.js))
- Opening/closing lightbox
- Keyboard navigation (Arrow keys, Escape)
- Image navigation buttons
- Click outside to close
- Body scroll prevention
- **14 test cases**

### ✅ Routing Tests ([tests/routing.spec.js](website/tests/routing.spec.js))
- All 7 pages load correctly
- Browser back/forward navigation
- Base path preservation (`/peleiniki/`)
- SEO meta tags
- No JavaScript errors
- Layout stability
- **18 test cases**

**Total: 66+ test cases** across 4 test files

## Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:ui` | Run tests with interactive UI mode |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Debug tests with Playwright Inspector |
| `npm run test:report` | View HTML report of last test run |

### Advanced Usage

```bash
# Run specific test file
npx playwright test navigation

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests in mobile viewport
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Run tests matching pattern
npx playwright test -g "should open lightbox"

# Update snapshots
npx playwright test --update-snapshots
```

## Browser Coverage

Tests run across multiple browsers and devices:

- **Desktop**: Chromium, Firefox, WebKit (Safari)
- **Mobile**: Pixel 5 (Chrome), iPhone 12 (Safari)

## Configuration

Test configuration is in [website/playwright.config.js](website/playwright.config.js):

- **Base URL**: `http://localhost:5173/peleiniki`
- **Automatic dev server startup**: Yes
- **Retries on CI**: 2
- **Parallel execution**: Yes (full parallel)
- **Timeout**: 30 seconds per test
- **Screenshots**: On failure
- **Traces**: On first retry

## Continuous Integration

Tests are automatically run on GitHub Actions for:
- Push to `main` or `develop` branches
- Pull requests to `main`

See [.github/workflows/playwright-tests.yml](.github/workflows/playwright-tests.yml) for CI configuration.

### CI Setup

To enable tests in CI, add these GitHub Secrets:
1. `VITE_EMAILJS_SERVICE_ID`
2. `VITE_EMAILJS_TEMPLATE_ID`
3. `VITE_EMAILJS_PUBLIC_KEY`

(Same credentials used for production deployment)

## Environment Variables

For local testing with EmailJS:

```bash
cd website
cp .env.test.example .env
# Edit .env with your EmailJS credentials
```

**Note**: Tests mock EmailJS by default, so credentials are optional for most tests.

## Test Results and Artifacts

### HTML Report

After running tests, view the HTML report:

```bash
npm run test:report
```

The report includes:
- Test pass/fail status
- Execution time
- Screenshots on failure
- Video recordings (if enabled)
- Trace files for debugging

### Artifacts

Generated artifacts (not committed to git):
- `test-results/` - Screenshots and test artifacts from failed tests
- `playwright-report/` - HTML report
- `playwright/.cache/` - Playwright browser binaries

## Writing New Tests

See [website/tests/README.md](website/tests/README.md) for:
- Best practices
- Code examples
- Debugging tips
- Troubleshooting guide

### Quick Example

```javascript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');

    const button = page.getByRole('button', { name: 'Click me' });
    await expect(button).toBeVisible();

    await button.click();
    await expect(page.getByText('Success!')).toBeVisible();
  });
});
```

## Debugging Failed Tests

### 1. Use UI Mode (Recommended)

```bash
npm run test:ui
```

Features:
- Time-travel debugging
- Step through tests
- Inspect DOM at each step
- View network requests

### 2. Use Debug Mode

```bash
npm run test:debug
```

Opens Playwright Inspector for step-by-step debugging.

### 3. Run in Headed Mode

```bash
npm run test:headed
```

See the browser as tests run.

### 4. Check Screenshots

Failed tests automatically capture screenshots in `test-results/`.

### 5. View Traces

```bash
npx playwright show-trace test-results/trace.zip
```

## Common Issues

### Port 5173 already in use
Stop the dev server if it's running manually, or change the port in `vite.config.js`.

### Tests timeout
Increase timeout in specific tests:
```javascript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ...
});
```

### Flaky tests
Add explicit waits:
```javascript
await page.waitForLoadState('networkidle');
await page.waitForTimeout(500); // For animations
```

### EmailJS tests fail
Tests mock EmailJS by default. Check if the mock is properly configured:
```javascript
await page.route('**/api.emailjs.com/**', (route) => {
  route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
});
```

## Performance

Test execution times (approximate):
- **Navigation tests**: ~30 seconds
- **Contact form tests**: ~25 seconds
- **Lightbox tests**: ~35 seconds
- **Routing tests**: ~40 seconds

**Total runtime**: ~2-3 minutes (parallel execution across browsers)

## Best Practices

1. ✅ Use semantic selectors (`getByRole`, `getByLabel`)
2. ✅ Wait for elements properly (`waitForLoadState`, `toBeVisible()`)
3. ✅ Mock external services (EmailJS)
4. ✅ Group related tests with `describe`
5. ✅ Use descriptive test names
6. ✅ Clean up after tests (reset state)
7. ✅ Keep tests independent

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Maintenance

### Updating Playwright

```bash
cd website
npm install -D @playwright/test@latest
npx playwright install
```

### Adding New Tests

1. Create new test file in `website/tests/`
2. Follow naming convention: `feature-name.spec.js`
3. Import test utilities: `import { test, expect } from '@playwright/test';`
4. Write tests following existing patterns
5. Run tests: `npm test`

### Updating Snapshots

If visual snapshots are added in the future:

```bash
npx playwright test --update-snapshots
```

## Support

For issues or questions:
1. Check [website/tests/README.md](website/tests/README.md) for detailed troubleshooting
2. Review [Playwright documentation](https://playwright.dev/)
3. Check test artifacts and screenshots in `test-results/`
4. Use debug mode: `npm run test:debug`

---

**Last Updated**: January 2025
**Playwright Version**: 1.56.0
**Test Coverage**: Navigation, Forms, Lightbox, Routing, SEO
