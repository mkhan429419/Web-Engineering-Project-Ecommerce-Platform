import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";

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
describe("Order Controller", () => {
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
    const req = {
      body: {
        userId: userId,
        items: [{ productId: "prod123", quantity: 2 }],
        amount: 199.98,
        address: { street: "123 Main St", city: "Test City" },
        paymentMethod: "credit card",
      },
    };
    const res = {
      json: jest.fn(),
    };
    await placeOrder(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Order Placed",
    });
    const order = await orderModel.findOne({ userId: userId });
    expect(order).toBeTruthy();
    expect(order.amount).toBe(199.98);
    expect(order.status).toBe("Order Placed");
  });
  it("should handle errors and return failure response", async () => {
    const userId = new mongoose.Types.ObjectId();
    const saveMock = jest
      .spyOn(orderModel.prototype, "save")
      .mockImplementationOnce(() => {
        throw new Error("Database save failed");
      });
    const req = {
      body: {
        userId: userId,
        items: [{ productId: "prod123", quantity: 2 }],
        amount: 199.98,
        address: { street: "123 Main St", city: "Test City" },
        paymentMethod: "credit card",
      },
    };
    const res = {
      json: jest.fn(),
    };
    await placeOrder(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Database save failed",
    });
    saveMock.mockRestore();
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
    const req = { body: {} };
    const res = {
      json: jest.fn(),
    };
    await allOrders(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      orders: expect.any(Array),
    });
    expect(res.json.mock.calls[0][0].orders.length).toBeGreaterThan(0);
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
    const req = {
      body: { userId: "user123" },
    };
    const res = {
      json: jest.fn(),
    };
    await userOrders(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      orders: expect.any(Array),
    });
    expect(res.json.mock.calls[0][0].orders.length).toBeGreaterThan(0);
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
    const req = {
      body: { orderId: order._id, status: "Shipped" },
    };
    const res = {
      json: jest.fn(),
    };
    await updateStatus(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Status Updated",
    });
    const updatedOrder = await orderModel.findById(order._id);
    expect(updatedOrder.status).toBe("Shipped");
  });
  it("should handle placing an order with empty items array (boundary case)", async () => {
    const userId = new mongoose.Types.ObjectId();
    const mockUser = new userModel({
      _id: userId,
      name: "Boundary User",
      email: "boundary@example.com",
      password: "hashedpassword",
      cartData: [],
    });
    await mockUser.save();
    const req = {
      body: {
        userId,
        items: [],
        amount: 0,
        address: { street: "123 Main St", city: "Test City" },
        paymentMethod: "credit card",
      },
    };
    const res = {
      json: jest.fn(),
    };
    await placeOrder(req, res);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Cart is empty",
    });
    const order = await orderModel.findOne({ userId });
    expect(order).toBeNull();
  });
});
