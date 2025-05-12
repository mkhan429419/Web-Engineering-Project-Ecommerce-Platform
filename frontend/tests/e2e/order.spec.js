import { test, expect } from "@playwright/test";

test.describe("Order Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    console.log("Mock API called");

    await page.route("http://localhost:4000/api/order/userorders", (route) => {
      const { token } = route.request().headers();
      if (token === "valid-token") {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            orders: [
              {
                _id: "order2",
                date: "2023-11-30T15:30:00Z",
                paymentMethod: "PayPal",
                status: "Pending",
                items: [
                  {
                    _id: "item2",
                    title: "Product 2",
                    category: "Category 2",
                    price: 200,
                    quantity: 1,
                    size: "L",
                    image: ["https://via.placeholder.com/150"],
                  },
                ],
              },
              {
                _id: "order1",
                date: "2023-12-01T10:00:00Z",
                paymentMethod: "Credit Card",
                status: "Delivered",
                items: [
                  {
                    _id: "item1",
                    title: "Product 1",
                    category: "Category 1",
                    price: 100,
                    quantity: 2,
                    size: "M",
                    image: ["https://via.placeholder.com/150"],
                  },
                ],
              },
            ],
          }),
        });
      } else {
        route.fulfill({
          status: 401,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Unauthorized",
          }),
        });
      }
    });

    await page.goto("http://localhost:5173/order");
  });

  test("should display a message when there are no orders", async ({
    page,
  }) => {
    await page.route("http://localhost:4000/api/order/userorders", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, orders: [] }),
      });
    });

    await page.reload();
    const noOrdersMessage = page.locator("text=No orders to display.");
    await expect(noOrdersMessage).toBeVisible();
  });

  test("should display the user's orders", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("token", "valid-token");
    });

    await page.reload();

    const ordersLocator = page.locator(
      ".bg-white.rounded-md.shadow-md.p-5.mb-5"
    );
    await ordersLocator.first().waitFor({ timeout: 15000 });

    await expect(ordersLocator).toHaveCount(2);

    const firstOrder = ordersLocator.nth(0);
    await expect(firstOrder).toContainText("Order Number: #1");
    await expect(firstOrder).toContainText("Delivered");
    await expect(firstOrder).toContainText("Credit Card");
    await expect(firstOrder).toContainText("Product 1");
    await expect(firstOrder).toContainText("Category 1");

    const secondOrder = ordersLocator.nth(1);
    await expect(secondOrder).toContainText("Order Number: #2");
    await expect(secondOrder).toContainText("Pending");
    await expect(secondOrder).toContainText("PayPal");
    await expect(secondOrder).toContainText("Product 2");
    await expect(secondOrder).toContainText("Category 2");
  });
  test("should handle unauthorized access when token is invalid", async ({
    page,
  }) => {
    await page.evaluate(() => localStorage.setItem("token", "invalid-token"));
    await page.reload();

    const toast = page.locator(".Toastify__toast--error", {
      hasText: "Unauthorized",
    });
    await expect(toast).toBeVisible();
  });
  test("should not attempt to load orders when token is missing", async ({
    page,
  }) => {
    await page.evaluate(() => localStorage.removeItem("token"));
    await page.reload();

    const noOrdersText = page.locator("text=No orders to display.");
    await expect(noOrdersText).toBeVisible();
  });
  test("should render all supported order statuses", async ({ page }) => {
    await page.route("http://localhost:4000/api/order/userorders", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          orders: [
            {
              _id: "order3",
              date: "2024-01-01T10:00:00Z",
              paymentMethod: "COD",
              status: "Placing",
              items: [
                {
                  _id: "item3",
                  title: "Test Product",
                  category: "T-Shirts",
                  price: 120,
                  quantity: 1,
                  size: "S",
                  image: [],
                },
              ],
            },
          ],
        }),
      });
    });
    await page.evaluate(() => localStorage.setItem("token", "valid-token"));
    await page.reload();

    const status = await page.locator("button", { hasText: "Placing" });
    await expect(status).toBeVisible();
  });
  test("should handle missing image/title/category in order items", async ({
    page,
  }) => {
    await page.route("http://localhost:4000/api/order/userorders", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          orders: [
            {
              _id: "order4",
              date: "2024-01-02T10:00:00Z",
              paymentMethod: "Stripe",
              status: "Delivered",
              items: [
                {
                  _id: "item4",
                  title: null,
                  category: null,
                  price: 150,
                  quantity: 1,
                  size: "M",
                  image: [],
                },
              ],
            },
          ],
        }),
      });
    });

    await page.evaluate(() => localStorage.setItem("token", "valid-token"));
    await page.reload();

    await expect(page.locator("text=Unnamed Product")).toBeVisible();
    await expect(page.locator("text=N/A")).toBeVisible();
  });
  test("should correctly show item with boundary quantity", async ({
    page,
  }) => {
    await page.route("http://localhost:4000/api/order/userorders", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          orders: [
            {
              _id: "order5",
              date: "2024-01-05T10:00:00Z",
              paymentMethod: "Stripe",
              status: "Delivered",
              items: [
                {
                  _id: "item5",
                  title: "Boundary Test Product",
                  category: "Testing",
                  price: 999,
                  quantity: 99, // Max valid
                  size: "L",
                  image: ["https://via.placeholder.com/150"],
                },
              ],
            },
          ],
        }),
      });
    });

    await page.evaluate(() => localStorage.setItem("token", "valid-token"));
    await page.reload();

    await expect(page.locator("text=Quantity: 99")).toBeVisible();
  });
  test("should reflect payment and shipping combinations", async ({ page }) => {
    await page.route("http://localhost:4000/api/order/userorders", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          orders: [
            {
              _id: "order6",
              date: "2024-01-06T10:00:00Z",
              paymentMethod: "COD",
              status: "Delivered",
              shippingCost: 200,
              items: [
                {
                  _id: "item6",
                  title: "Shipping Combo Test",
                  category: "Logistics",
                  price: 500,
                  quantity: 1,
                  size: "M",
                  image: ["https://via.placeholder.com/150"],
                },
              ],
            },
          ],
        }),
      });
    });

    await page.evaluate(() => localStorage.setItem("token", "valid-token"));
    await page.reload();

    await expect(page.locator("text=COD")).toBeVisible();
  });
});
