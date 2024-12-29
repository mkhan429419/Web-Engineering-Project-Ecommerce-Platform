import request from "supertest";
import express from "express";
import orderRouter from "../routes/orderRoute";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
const app = express();
app.use(express.json());
app.use("/orders", orderRouter);

jest.mock("../middleware/auth", () => jest.fn((req, res, next) => next()));
jest.mock("../middleware/adminAuth", () => jest.fn((req, res, next) => next()));

describe("Order Routes", () => {
  it("should place an order", async () => {
    const userId = new mongoose.Types.ObjectId();
    const mockUser = new userModel({
      _id: userId,
      email: "testuser@example.com",
      password: "password",
      name: "Test User",
      cartData: [{ productId: "prod123", quantity: 2 }],
    });
    await mockUser.save();
    const response = await request(app)
      .post("/orders/place")
      .send({
        userId: userId,
        items: [{ productId: "prod123", quantity: 2 }],
        amount: 199.98,
        address: { street: "123 Main St", city: "Test City" },
        paymentMethod: "credit card",
      })
      .set("Authorization", "Bearer testtoken");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Order Placed");
    const order = await orderModel.findOne({ userId: userId });
    expect(order).toBeTruthy();
    expect(order.amount).toBe(199.98);
    expect(order.status).toBe("Order Placed");
  });
  it("should get all orders for admin", async () => {
    const order = new orderModel({
      userId: "user123",
      items: [{ productId: "prod123", quantity: 2 }],
      amount: 199.98,
      address: { street: "123 Main St", city: "Test City" },
      paymentMethod: "credit card",
      status: "Order Placed",
      date: Date.now(),
    });
    await order.save();
    const response = await request(app)
      .post("/orders/list")
      .send()
      .set("Authorization", "Bearer adminToken");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.orders).toBeInstanceOf(Array);
    expect(response.body.orders.length).toBeGreaterThan(0);
  });
  it("should get user orders", async () => {
    const order = new orderModel({
      userId: "user123",
      items: [{ productId: "prod123", quantity: 2 }],
      amount: 199.98,
      address: { street: "123 Main St", city: "Test City" },
      paymentMethod: "credit card",
      status: "Order Placed",
      date: Date.now(),
    });
    await order.save();
    const response = await request(app)
      .post("/orders/userorders")
      .send({ userId: "user123" })
      .set("Authorization", "Bearer testtoken");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.orders).toBeInstanceOf(Array);
    expect(response.body.orders.length).toBeGreaterThan(0);
  });
  it("should update order status from admin", async () => {
    const order = new orderModel({
      userId: "user123",
      items: [{ productId: "prod123", quantity: 2 }],
      amount: 199.98,
      address: { street: "123 Main St", city: "Test City" },
      paymentMethod: "credit card",
      status: "Order Placed",
      date: Date.now(),
    });
    await order.save();
    const response = await request(app)
      .post("/orders/status")
      .send({ orderId: order._id, status: "Shipped" })
      .set("Authorization", "Bearer adminToken");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Status Updated");
    const updatedOrder = await orderModel.findById(order._id);
    expect(updatedOrder.status).toBe("Shipped");
  });
});
