const { defineConfig, devices } = require("@playwright/test");
const path = require("path");

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Enhanced reporter configuration
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "test-results/results.json" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["line"],
    ["list"],
  ],

  // Enhanced test configuration
  use: {
    baseURL: "https://play1.automationcamp.ir/",
    trace: "retain-on-failure",
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
    video: "retain-on-failure",

    // Performance and debugging options
    actionTimeout: 15000,
    navigationTimeout: 30000,

    // Screenshot options for debugging
    captureScreenshot: "only-on-failure",

    // Browser options
    ignoreHTTPSErrors: true,
    bypassCSP: true,

    // User agent
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

    // Viewport
    viewport: { width: 1280, height: 720 },

    // Locale
    locale: "en-US",

    // Timezone
    timezoneId: "America/New_York",

    // Color scheme
    colorScheme: "light",

    // Reduced motion
    reducedMotion: "reduce",
  },

  // Test files configuration
  testMatch: ["**/tests/**/*.spec.ts", "**/tests/optimized/**/*.spec.ts"],

  // Test ignore patterns
  testIgnore: ["**/node_modules/**", "**/test-results/**", "**/dist/**"],

  // Output directory configuration
  outputDir: "test-results",

  // Snapshot configuration
  snapshotDir: "./tests/snapshots",

  // Web server (if needed for local testing)
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  //   reuseExistingServer: !process.env.CI,
  // },

  // Projects configuration - Chrome only for desktop and mobile
  projects: [
    // Desktop Chrome
    {
      name: "desktop-chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Mobile Chrome
    {
      name: "mobile-chrome",
      use: {
        ...devices["Pixel 5"],
        viewport: { width: 393, height: 851 },
      },
    },

    // Tablet Chrome
    {
      name: "tablet-chrome",
      use: {
        ...devices["iPad Pro"],
        viewport: { width: 1024, height: 1366 },
      },
    },

    // Debug configuration (Desktop Chrome)
    {
      name: "debug",
      use: {
        ...devices["Desktop Chrome"],
        headless: false,
        slowMo: 100,
        trace: "on",
        screenshot: "on",
        video: "on",
      },
      testMatch: "**/*.debug.spec.ts",
    },
  ],

  // Metadata configuration
  metadata: {
    "Test Environment": process.env.NODE_ENV || "test",
    Browser: "Playwright",
    "Test Framework": "TypeScript + Playwright",
  },

  // Timeout configuration
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
});
