import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  workers: 2,
  webServer: {
    command: 'npm run start',
    port: 3000,
    env: {
      USE_BABEL_PLUGIN_ISTANBUL: '1',
    },
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
      },
    },
  ],
};

export default config;
