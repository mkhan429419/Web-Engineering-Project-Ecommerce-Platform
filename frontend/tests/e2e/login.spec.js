import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    console.log("Mock API called");

    // Mock login API
    await page.route("http://localhost:4000/api/user/login", (route) => {
      const { email, password } = JSON.parse(route.request().postData());
      if (email === "test@example.com" && password === "password123") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            token: "mock-token",
          }),
        });
      } else {
        route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Invalid credentials",
          }),
        });
      }
    });

    // Mock sign-up API
    await page.route("http://localhost:4000/api/user/register", (route) => {
      const { email, password } = JSON.parse(route.request().postData());

      if (email === "existing@example.com") {
        route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "User already exists",
          }),
        });
      } else if (password.length < 8) {
        route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Please enter a strong password",
          }),
        });
      } else {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            token: "mock-token",
          }),
        });
      }
    });

    await page.goto("http://localhost:5173/login");
  });
  test("should successfully log in with correct credentials", async ({
    page,
  }) => {
    allure.label("severity", "critical");
    await page.fill("input#email", "test@example.com");
    await page.fill("input#password", "password123");
    await page.click("button[type='submit']");

    await page.waitForURL("http://localhost:5173/");
    expect(page.url()).toBe("http://localhost:5173/");
  });
  test("should show error for invalid login credentials", async ({ page }) => {
    await page.fill("input#email", "wrong@example.com");
    await page.fill("input#password", "wrongpassword");
    await page.click("button[type='submit']");

    const errorToast = page
      .locator(".Toastify__toast--error")
      .filter({ hasText: "Invalid credentials" });
    await expect(errorToast).toHaveCount(1);
    await expect(errorToast.first()).toContainText("Invalid credentials");
  });

  test("should switch to sign-up view and back to login", async ({ page }) => {
    allure.label("severity", "minor");
    await page.click("text=Create Account");
    const signUpTitle = await page.locator("h1:has-text('Sign up')");
    await expect(signUpTitle).toBeVisible();

    await page.click("text=Login");
    const loginTitle = await page.locator("h1:has-text('Login')");
    await expect(loginTitle).toBeVisible();
  });
  test("should successfully sign up with valid details", async ({ page }) => {
    allure.label("severity", "critical");
    await page.click("text=Create Account");

    await page.fill("input#name", "Test User");
    await page.fill("input#email", "test@example.com");
    await page.fill("input#password", "password123");
    await page.click("button[type='submit']");

    await page.waitForURL("http://localhost:5173/");
    expect(page.url()).toBe("http://localhost:5173/");
  });
  test("should show error for weak password during sign-up", async ({
    page,
  }) => {
    await page.click("text=Create Account");
    await page.fill("input#name", "Test User");
    await page.fill("input#email", "test@example.com");
    await page.fill("input#password", "short");
    await page.click("button[type='submit']");

    const errorToast = page
      .locator(".Toastify__toast--error")
      .filter({ hasText: "Please enter a strong password" });
    await expect(errorToast).toHaveCount(1);
    await expect(errorToast.first()).toContainText(
      "Please enter a strong password"
    );
  });
  test("should show error for existing email during sign-up", async ({
    page,
  }) => {
    await page.click("text=Create Account");
    await page.fill("input#name", "Test User");
    await page.fill("input#email", "existing@example.com");
    await page.fill("input#password", "password123");
    await page.click("button[type='submit']");

    const errorToast = page
      .locator(".Toastify__toast--error")
      .filter({ hasText: "User already exists" });
    await expect(errorToast).toHaveCount(1);
    await expect(errorToast.first()).toContainText("User already exists");
  });
  test("should show error for 7-character password during sign-up", async ({
    page,
  }) => {
    await page.click("text=Create Account");
    await page.fill("input#name", "Test User");
    await page.fill("input#email", "test7char@example.com");
    await page.fill("input#password", "1234567");
    await page.click("button[type='submit']");

    const errorToast = page
      .locator(".Toastify__toast--error")
      .filter({ hasText: "Please enter a strong password" });
    await expect(errorToast).toHaveCount(1);
    await expect(errorToast.first()).toContainText(
      "Please enter a strong password"
    );
  });
  test("should redirect to homepage if token exists in localStorage", async ({
    page,
  }) => {
    allure.label("severity", "critical");
    await page.addInitScript(() => {
      window.localStorage.setItem("token", "mock-token");
    });
    await page.goto("http://localhost:5173/login");
    await page.waitForURL("http://localhost:5173/");
    expect(page.url()).toBe("http://localhost:5173/");
  });
  test("should stay on login page if no token exists", async ({ page }) => {
    await page.goto("http://localhost:5173/login");
    expect(page.url()).toBe("http://localhost:5173/login");
  });
  test("should block invalid email format before form submission", async ({
    page,
  }) => {
    allure.label("severity", "minor");
    await page.fill("input#email", "invalid-email");
    await page.fill("input#password", "somepassword");

    const [request] = await Promise.all([
      page.waitForRequest("**/api/user/login").catch(() => null),
      page.click("button[type='submit']"),
    ]);
    expect(request).toBeNull();
  });
  test("should not submit login form with empty fields", async ({ page }) => {
    allure.label("severity", "minor");
    await page.fill("input#email", "");
    await page.fill("input#password", "");

    const [request] = await Promise.all([
      page.waitForRequest("**/api/user/login").catch(() => null),
      page.click("button[type='submit']"),
    ]);

    expect(request).toBeNull();
  });
});
