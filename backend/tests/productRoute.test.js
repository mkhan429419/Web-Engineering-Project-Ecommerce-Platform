import request from "supertest";
import express from "express";
import productRouter from "../routes/productRoute";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { v2 as cloudinary } from "cloudinary";

jest.mock("cloudinary", () => ({
  v2: {
    uploader: {
      upload: jest.fn(),
    },
  },
}));

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
  if (mongoServer) await mongoServer.stop();
});

const app = express();
app.use(express.json());

// Mock Multer Middleware
jest.mock("../middleware/multer", () => {
  return jest.fn((req, res, next) => {
    req.file = {
      originalname: "image1.jpg",
      path: "test-image-path.jpg", // Mocked file path
    };
    next();
  });
});

// Mock Admin Auth Middleware
jest.mock("../middleware/adminAuth", () => jest.fn((req, res, next) => next()));

app.use("/products", productRouter);

describe("Product Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a product", async () => {
    // Mock Cloudinary upload
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "https://cloudinary.com/test-image.jpg",
    });

    const response = await request(app)
      .post("/products/add")
      .send({
        title: "New Product",
        description: "Description here",
        price: 99.99,
        category: "Category",
        subCategory: "SubCategory",
        sizes: '["S", "M"]',
        BestSell: "true",
      })
      .set("Authorization", "Bearer testtoken");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Product Added");
    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(
      "test-image-path.jpg",
      {
        resource_type: "image",
      }
    );
  });

  it("should get the list of products", async () => {
    const res = await request(app).get("/products/list");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
    expect(res.body.products).toBeInstanceOf(Array);
  });
});
