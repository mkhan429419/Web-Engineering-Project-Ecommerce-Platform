import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    console.log("Mock API called");
    await page.route("http://localhost:4000/api/product/list", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          products: Array(10)
            .fill(0)
            .map((_, i) => ({
              _id: `product${i}`,
              image: [`https://via.placeholder.com/150?text=Product${i}`],
              title: `Product ${i}`,
              price: (i + 1) * 100,
              BestSell: i % 2 === 0,
            })),
        }),
      })
    );

    await page.route("http://localhost:4000/api/product/list", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          products: Array(10)
            .fill(0)
            .map((_, i) => ({
              _id: `product${i}`,
              image: [`https://via.placeholder.com/150?text=Product${i}`],
              title: `Product ${i}`,
              price: (i + 1) * 100,
              BestSell: i < 4, // Ensure first 4 products have BestSell: true
            })),
        }),
      })
    );

    await page.goto("http://localhost:5173/");
  });

  test("should render Hero section with images and controls", async ({
    page,
  }) => {
    allure.label("severity", "minor");
    const heroImage = await page.locator("img[src*='17.png']");
    await expect(heroImage).toBeVisible();
    const prevButton = await page.locator("button:has-text('←')");
    const nextButton = await page.locator("button:has-text('→')");
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    const indicators = await page.locator("div[data-testid='indicators'] div");
    await expect(indicators).toHaveCount(3);
  });

  test("should display loading state in LatestCollection before data is fetched", async ({
    page,
  }) => {
    console.log("Testing loading state...");

    // Mock the loading state
    await page.route("http://localhost:4000/api/product/list", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          products: [], // Simulate no products initially
        }),
      });
    });

    await page.goto("http://localhost:5173/");

    const loadingText = page.locator("text=Loading products...");
    await expect(loadingText).toBeVisible();
  });

  test("should render LatestCollection products after data is fetched", async ({
    page,
  }) => {
    allure.label("severity", "critical");
    await page.waitForSelector(".grid.grid-cols");

    const products = await page.locator(
      '[data-testid="latest-collection"] .block.m-3'
    );

    console.log("Number of matched products:", await products.count());
    await expect(products).toHaveCount(10);
  });

  test("should render BestSelling section with filtered products", async ({
    page,
  }) => {
    allure.label("severity", "critical");
    // Wait for best-selling products to load
    await page.waitForSelector(".grid.grid-cols");

    // Validate BestSelling products
    const bestSellingTitle = await page.locator("h1:has-text('Best Selling')");
    const bestSellingProducts = await page.locator(
      '[data-testid="best-selling"] .block.m-3'
    );

    console.log(
      "Number of matched best-selling products:",
      await bestSellingProducts.count()
    );
    await expect(bestSellingTitle).toBeVisible();
    await expect(bestSellingProducts).toHaveCount(4);
  });

  test("should render Newsletter subscription form", async ({ page }) => {
    allure.label("severity", "minor");
    const newsletterTitle = await page.locator(
      "h2:has-text('Stay Updated with Our Latest News')"
    );
    const emailInput = await page.locator(
      "input[placeholder='Enter your email']"
    );
    const subscribeButton = await page.locator("button:text('Subscribe')");

    await expect(newsletterTitle).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subscribeButton).toBeVisible();
  });
  test("should submit newsletter form with valid email", async ({ page }) => {
    // 👇 Mock the newsletter POST endpoint
    await page.route("http://localhost:4000/api/user/newsletter", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Subscribed" }),
      });
    });
    await page.goto("http://localhost:5173/");
    const emailInput = page.locator("input[placeholder='Enter your email']");
    const subscribeButton = page.locator("button:text('Subscribe')");

    await emailInput.fill("test@example.com");
    await subscribeButton.click();
    const toast = page.locator(".Toastify__toast");
    await expect(toast).toContainText(/subscription|success/i, {
      timeout: 8000,
    });
  });
  test("should display key sections correctly on mobile viewport", async ({
    page,
  }) => {
    allure.label("severity", "minor");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("http://localhost:5173/");

    const heroImage = page.locator("img[src*='17.png']");
    const newsletterTitle = page.locator("h2:has-text('Stay Updated')");

    await expect(heroImage).toBeVisible();
    await expect(newsletterTitle).toBeVisible();
  });
  test("should navigate carousel with arrows and indicators", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173/");
    const slider = page.locator("[data-testid='indicators']");
    const getTranslateX = async () => {
      const transform = await slider.evaluate(
        (el) => getComputedStyle(el).transform
      );
      const match = transform.match(
        /matrix.*\(\s*.*,\s*.*,\s*.*,\s*.*,\s*(-?\d+\.?\d*),/
      );
      return match ? parseFloat(match[1]) : 0;
    };
    const initialX = await getTranslateX();
    await page.locator("button:has-text('→')").click();
    await page.waitForTimeout(500);
    const nextX = await getTranslateX();
    expect(nextX).not.toBe(initialX);
    await page.locator("button:has-text('←')").click();
    await page.waitForTimeout(500);
    const revertedX = await getTranslateX();
    expect(Math.abs(revertedX)).toBeLessThan(1);
    const dot = page.locator(".absolute.bottom-4.left-1\\/2 div").nth(2);
    await dot.click();
    await page.waitForTimeout(500);
    const finalX = await getTranslateX();

    const viewportWidth = page.viewportSize()?.width ?? 1280;
    const expectedShift = -2 * viewportWidth;
    expect(Math.abs(finalX - expectedShift)).toBeLessThan(viewportWidth * 0.08);
  });
});
