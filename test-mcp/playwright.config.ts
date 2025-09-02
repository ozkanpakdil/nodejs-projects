import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list']],
  // Increase default timeout to accommodate slower CI environments
  timeout: 30_000,
  use: {
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    baseURL: 'https://debs-obrien.github.io/playwright-movies-app',
  },
});
