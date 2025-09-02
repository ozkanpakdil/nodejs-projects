# Example for the Blog Post

https://ozkanpakdil.github.io/posts/my_collections/2025/09-01-junie-mcp-playwright/

# Prompt to generate this test with junie

```
Generate playwright test for the following scenarion:
1. navigate to https://monitor.red-gate.com/GlobalDashboard
2. search for postgre
3. verify servers are postgresql by opening their server overview page
```

# Test MCP - Playwright Tests

This repository uses Playwright Test to run end-to-end checks against public sites. The tests live in the `./tests` folder and are configured via `playwright.config.ts`.

## Prerequisites
- Node.js 18+ installed (LTS recommended)
- npm (bundled with Node)

## Install dependencies
```
npm install
```

## Install Playwright browsers (first time only)
Playwright needs browser binaries. Install them once with:
```
npx playwright install --with-deps
```
If you cannot install system dependencies (on macOS/Windows this is usually not required), you can run without `--with-deps`:
```
npx playwright install
```

## How to run the tests
There are handy npm scripts in `package.json`:

- Run the full test suite (headless):
```
npm test
```
  This is an alias for `playwright test` and will execute all tests under `./tests` using the config in `playwright.config.ts`.

- Run tests in headed (visible) browser:
```
npm run test:headed
```

- Run the Playwright Test UI (select tests, run, debug):
```
npm run test:ui
```

### Common options
You can pass Playwright CLI flags after `--`:

- Run a single spec file:
```
npm test -- tests/global-dashboard-postgres.spec.ts
```

- Run tests matching a title or pattern:
```
npm test -- -g "postgre"
```

- Choose a specific browser project (if multiple projects are defined):
```
npm test -- --project=chromium
```

- Run in headed mode ad-hoc:
```
npm test -- --headed
```

- Debug mode with inspector (break on first test line):
```
PWDEBUG=1 npm test -- tests/global-dashboard-postgres.spec.ts
```

### Reports, traces, and results
- Default reporter is `list` (see `playwright.config.ts`).
- Test artifacts (screenshots, traces when enabled, etc.) are saved under `./test-results`.
- To open the last HTML report (if you switch reporter to include `html` or run with `--reporter=html`):
```
npm test -- --reporter=html
npx playwright show-report
```

### Configuration
Key settings live in `playwright.config.ts`:
- testDir: `./tests`
- baseURL: `https://debs-obrien.github.io/playwright-movies-app` (some tests may override with absolute URLs)
- headless by default (toggle with `--headed`)
- timeouts tuned for CI

### Example test
This repo includes `tests/global-dashboard-postgres.spec.ts` which:
- Navigates to Redgate Monitor Global Dashboard
- Filters for "postgre"
- Opens the first PostgreSQL server overview and validates URL and title

Run just this test:
```
npm test -- tests/global-dashboard-postgres.spec.ts
```

### Troubleshooting
- If browsers are missing, run `npx playwright install`.
- If running on Linux CI, use `npx playwright install --with-deps` to pull required packages.
- Network-related tests hit external sites; transient failures can happen. Re-run or use `--retries=1`.
```
npm test -- --retries=1
```

## Useful links
- Playwright Test docs: https://playwright.dev/docs/test-intro
- CLI reference: https://playwright.dev/docs/test-cli
