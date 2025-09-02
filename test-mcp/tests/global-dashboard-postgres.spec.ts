import { test, expect } from '@playwright/test';

// Scenario:
// 1. navigate to https://monitor.red-gate.com/GlobalDashboard
// 2. search for postgre
// 3. verify servers are postgresql by opening their server overview page

test('filter for postgre and verify server overview is PostgreSQL', async ({ page }) => {
  // Step 1: navigate to Global Dashboard with absolute URL to avoid baseURL dependency
  await page.goto('https://monitor.red-gate.com/GlobalDashboard', { waitUntil: 'domcontentloaded' });

  // Wait for the page to settle: hide initial loading spinners if present
  // Some parts of the page render progressively; we wait for the filter box to ensure the main area is ready
  const filter = page.getByRole('textbox', { name: 'Filter by names' });
  await expect(filter).toBeVisible({ timeout: 30_000 });

  // Step 2: search for "postgre"
  await filter.fill('postgre');
  // Press Enter in case the UI applies filter on submit; even if it filters as-you-type, Enter is harmless
  await page.keyboard.press('Enter');

  // Wait for any results to appear that correspond to PostgreSQL instances.
  // On this site, DBMS-specific overview links include "PostgresInstance" in the href under the /overviews/.../dbms/... path.
  const postgresLink = page.locator('a[href*="/overviews/"][href*="/dbms/"][href*="PostgresInstance"]');
  await expect(postgresLink.first()).toBeVisible({ timeout: 30_000 });

  // Step 3: open the first PostgreSQL server overview page
  await postgresLink.first().click();

  // Verify navigated to a DBMS overview page for a PostgreSQL instance
  await expect(page).toHaveURL(/\/overviews\/.*\/dbms\/.*PostgresInstance/i);

  // Additionally, the page title should contain "Server Overview" for the chosen server
  await expect(page).toHaveTitle(/Server Overview/i);
});
