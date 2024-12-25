import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import { MongoMemoryServer } from "mongodb-memory-server";

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

describe("Order Model Test", () => {
  it("should create and save a valid order", async () => {
    const orderData = {
      userId: "user123",
      items: [{ productId: "prod123", quantity: 2 }],
      amount: 100,
      address: { street: "123 Test St", city: "Test City" },
      paymentMethod: "Credit Card",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();

    expect(savedOrder._id).toBeDefined();
    expect(savedOrder.userId).toBe(orderData.userId);
    expect(savedOrder.amount).toBe(orderData.amount);
    expect(savedOrder.status).toBe("Order Placed");
  });
});
