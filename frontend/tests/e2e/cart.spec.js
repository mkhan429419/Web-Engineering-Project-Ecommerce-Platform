import { test, expect } from "@playwright/test";

test.describe("Cart Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set a mock token in local storage
    await page.addInitScript(() => {
      window.localStorage.setItem("token", "mockToken123");
    });

    // Mock API for fetching cart data
    await page.route("http://localhost:4000/api/cart/get", (route) => {
      console.log("Intercepting API call to /api/cart/get");
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          cartData: {
            "6768ffd6ad9c9ad645022b9d": { M: 1 },
            "64bfc9c4b5e9fc00002": { L: 2 },
          },
        }),
      });
    });

    // Mock API for fetching product list
    await page.route("http://localhost:4000/api/product/list", (route) => {
      console.log("Intercepting API call to /api/product/list");
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          products: [
            {
              _id: "6768ffd6ad9c9ad645022b9d",
              title: "Product A",
              description: "Description for Product A",
              price: 34,
              category: "Women",
              image: ["https://via.placeholder.com/150?text=ProductA"],
            },
            {
              _id: "64bfc9c4b5e9fc00002",
              title: "Product B",
              description: "Description for Product B",
              price: 50,
              category: "Men",
              image: ["https://via.placeholder.com/150?text=ProductB"],
            },
          ],
        }),
      });
    });

    // Navigate to the Cart page
    await page.goto("http://localhost:5173/Cart");
  });

  test("should display cart items correctly", async ({ page }) => {
    // Wait for cart items to load
    await page.waitForSelector("h1", { hasText: "Shopping Bag" });

    // Verify first cart item's details
    await expect(
      page.locator("[data-testid='cart-item-title-6768ffd6ad9c9ad645022b9d-M']")
    ).toHaveText("Product A");
    await expect(
      page.locator(
        "[data-testid='cart-item-category-6768ffd6ad9c9ad645022b9d-M']"
      )
    ).toHaveText("Women");
    await expect(
      page.locator("[data-testid='cart-item-size-6768ffd6ad9c9ad645022b9d-M']")
    ).toHaveText("Size: M");
    await expect(
      page.locator("[data-testid='quantity-input-6768ffd6ad9c9ad645022b9d-M']")
    ).toHaveValue("1");
    await expect(
      page.locator("[data-testid='cart-item-price-6768ffd6ad9c9ad645022b9d-M']")
    ).toHaveText("Rs.34");

    // Verify second cart item's details
    await expect(
      page.locator("[data-testid='cart-item-title-64bfc9c4b5e9fc00002-L']")
    ).toHaveText("Product B");
    await expect(
      page.locator("[data-testid='cart-item-category-64bfc9c4b5e9fc00002-L']")
    ).toHaveText("Men");
    await expect(
      page.locator("[data-testid='cart-item-size-64bfc9c4b5e9fc00002-L']")
    ).toHaveText("Size: L");
    await expect(
      page.locator("[data-testid='quantity-input-64bfc9c4b5e9fc00002-L']")
    ).toHaveValue("2");
    await expect(
      page.locator("[data-testid='cart-item-price-64bfc9c4b5e9fc00002-L']")
    ).toHaveText("Rs.50");
  });
});
