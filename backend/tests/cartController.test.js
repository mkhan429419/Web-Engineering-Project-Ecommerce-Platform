import mongoose from "mongoose";
import request from "supertest";
import express from "express";
import userModel from "../models/userModel.js";
import {
  addToCart,
  deleteProductFromCart,
} from "../controllers/cartController.js";
jest.mock("../models/userModel.js");
const app = express();
app.use(express.json());
app.post("/cart/add", addToCart);
app.post("/cart/delete", deleteProductFromCart);

describe("Cart Controller Tests", () => {
  describe("POST /cart/add", () => {
    it("should add an item to the cart", async () => {
      const userId = new mongoose.Types.ObjectId();
      const itemId = "prod123";
      const size = "M";
      const mockUser = {
        _id: userId,
        cartData: {},
      };
      userModel.findById = jest.fn().mockResolvedValue(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);
      const response = await request(app)
        .post("/cart/add")
        .send({ userId, itemId, size })
        .set("Authorization", "Bearer testtoken");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Added To Cart");
      expect(mockUser.cartData[itemId]).toHaveProperty(size, 1);
    });
    it("should add a quantity if the same item and size are added again", async () => {
      const userId = new mongoose.Types.ObjectId();
      const itemId = "prod123";
      const size = "M";
      const mockUser = {
        _id: userId,
        cartData: {
          [itemId]: { [size]: 1 },
        },
      };
      userModel.findById = jest.fn().mockResolvedValue(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);
      const response = await request(app)
        .post("/cart/add")
        .send({ userId, itemId, size })
        .set("Authorization", "Bearer testtoken");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Added To Cart");
      expect(mockUser.cartData[itemId][size]).toBe(2);
    });
    it("should handle a long size string (boundary test)", async () => {
      const userId = new mongoose.Types.ObjectId();
      const itemId = "prod123";
      const size = "X".repeat(256);
      const mockUser = {
        _id: userId,
        cartData: {},
      };
      userModel.findById = jest.fn().mockResolvedValue(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);
      const response = await request(app)
        .post("/cart/add")
        .send({ userId, itemId, size })
        .set("Authorization", "Bearer testtoken");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Added To Cart");
      expect(mockUser.cartData[itemId]).toHaveProperty(size, 1);
    });
    it("should handle an empty size string (boundary test)", async () => {
      const userId = new mongoose.Types.ObjectId();
      const itemId = "prod123";
      const size = "";
      const mockUser = {
        _id: userId,
        cartData: {},
      };
      userModel.findById = jest.fn().mockResolvedValue(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);
      const response = await request(app)
        .post("/cart/add")
        .send({ userId, itemId, size })
        .set("Authorization", "Bearer testtoken");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(mockUser.cartData[itemId]).toHaveProperty(size, 1);
    });
    it("should handle an empty itemId (boundary test)", async () => {
      const userId = new mongoose.Types.ObjectId();
      const itemId = "";
      const size = "M";
      const mockUser = {
        _id: userId,
        cartData: {},
      };
      userModel.findById = jest.fn().mockResolvedValue(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);
      const response = await request(app)
        .post("/cart/add")
        .send({ userId, itemId, size })
        .set("Authorization", "Bearer testtoken");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(mockUser.cartData[itemId]).toHaveProperty(size, 1);
    });
  });
  describe("POST /cart/delete", () => {
    it("should remove a product from the cart", async () => {
      const userId = new mongoose.Types.ObjectId();
      const itemId = "prod123";
      const size = "M";
      const mockUser = {
        _id: userId,
        cartData: {
          [itemId]: { [size]: 1 },
        },
      };
      userModel.findById = jest.fn().mockResolvedValue(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/cart/delete")
        .send({ userId, itemId, size })
        .set("Authorization", "Bearer testtoken");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Product removed from cart");
      expect(mockUser.cartData[itemId]).toBeUndefined();
    });

    it("should remove the product completely if no size is specified", async () => {
      const userId = new mongoose.Types.ObjectId();
      const itemId = "prod123";
      const mockUser = {
        _id: userId,
        cartData: {
          [itemId]: { M: 1, L: 2 },
        },
      };

      userModel.findById = jest.fn().mockResolvedValue(mockUser);
      userModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/cart/delete")
        .send({ userId, itemId })
        .set("Authorization", "Bearer testtoken");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Product removed from cart");
      expect(mockUser.cartData[itemId]).toBeUndefined();
    });
  });
});
