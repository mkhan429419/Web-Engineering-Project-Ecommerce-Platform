import { test, expect } from "@playwright/test";

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

    await page.goto("/");
  });

  test("should render Hero section with an image and title", async ({
    page,
  }) => {
    const heroTitle = await page.locator("h1", { hasText: "Our Top Selling" });

    await expect(heroTitle).toBeVisible();

    const heroImage = await page.locator("img[alt='image']");

    await expect(heroImage).toBeVisible();
  });

  test("should display loading state in LatestCollection before data is fetched", async ({
    page,
  }) => {
    const loadingText = await page.locator("text=Loading products...");
    await expect(loadingText).toBeVisible();
  });

  test("should render LatestCollection products after data is fetched", async ({
    page,
  }) => {
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
});