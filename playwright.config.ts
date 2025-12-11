// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests', // Directory for test files
  retries: 0, // Number of retries for failed tests
  workers: 3, //Running tests using 5 workers
  timeout: 60 * 1000, // Timeout for each test (30 seconds)
  reporter: 'html', // Use HTML reporter
  expect: {
    timeout: 30 * 1000, // Timeout for expect assertions (30 seconds)
  },

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit', // Browser to use for tests
        trace: 'on', // Collect trace for debugging
        permissions: ['geolocation'], // Corrected key name for permissions
        screenshot: 'only-on-failure', // Capture screenshots only on failure
        headless: false, // Run tests in headful mode (non-headless)
        viewport: { width: 1280, height: 720 }, // Set a default viewport size
        // launchOptions: {
        //   slowMo: 500, // Slow down actions for better visibility
        // },
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium', // Browser to use for tests
        channel: 'chrome', // Explicitly use Chrome browser
        trace: 'on', // Collect trace for debugging
        ...devices['iPhone 11'], // Corrected device name
        screenshot: 'only-on-failure', // Capture screenshots only on failure
        headless: false, // Run tests in headful mode (non-headless)
        // viewport: { width: 1280, height: 720 }, // Set a default viewport size
        launchOptions: {
          args:['--start-maximized'],
          slowMo: 10000, // Slow down actions for better visibility
        },
        viewport:null
      },
    },
  ],
});