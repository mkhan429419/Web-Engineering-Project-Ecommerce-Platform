import request from "supertest";
import express from "express";
import cartRouter from "../routes/cartRoute.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import userModel from "../models/userModel.js";

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
afterEach(async () => {
  await userModel.deleteMany();
});
const app = express();
app.use(express.json());
app.use("/cart", cartRouter);

jest.mock("../middleware/auth.js", () => jest.fn((req, res, next) => next()));

describe("Cart Routes", () => {
  it("should add an item to the cart", async () => {
    const userId = new mongoose.Types.ObjectId();
    const email = `testuser${Date.now()}@example.com`;
    const mockUser = new userModel({
      _id: userId,
      email: email,
      password: "password",
      name: "Test User",
      cartData: {},
    });
    await mockUser.save();
    const response = await request(app)
      .post("/cart/add")
      .send({
        userId: userId,
        itemId: "prod123",
        size: "M",
      })
      .set("Authorization", "Bearer testtoken");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Added To Cart");
    const updatedUser = await userModel.findById(userId);
    expect(updatedUser.cartData.prod123).toHaveProperty("M", 1);
  });
  it("should get the user's cart data", async () => {
    const userId = new mongoose.Types.ObjectId();
    const email = `testuser${Date.now()}@example.com`;
    const mockUser = new userModel({
      _id: userId,
      email: email,
      password: "password",
      name: "Test User",
      cartData: {
        prod123: { M: 2 },
      },
    });
    await mockUser.save();
    const response = await request(app)
      .post("/cart/get")
      .send({ userId: userId })
      .set("Authorization", "Bearer testtoken");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.cartData).toEqual(mockUser.cartData);
  });
});
