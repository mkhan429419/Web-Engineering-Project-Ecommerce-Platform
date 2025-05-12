// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e", // Directory where test files are stored
  use: {
    headless: true, // Run tests in headless mode
    baseURL: "http://localhost:5173", // Replace with your app's local URL
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000, // Timeout for each action (in ms)
    navigationTimeout: 30000, // Timeout for navigation actions (in ms)
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
  ],
  reporter: [["allure-playwright"]],
  // reporter: [["list"], ["html", { outputFolder: "playwright-report" }]],
});
