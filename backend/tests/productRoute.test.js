import request from "supertest";
import express from "express";
import productRouter from "../routes/productRoute";
import mongoose from "mongoose";
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

const app = express();
app.use(express.json());

jest.mock("../middleware/multer", () => ({
  fields: jest.fn().mockImplementation(() => (req, res, next) => {
    req.files = {
      image1: {
        originalname: "image1.jpg",
        buffer: Buffer.from("image data"),
      },
    };
    next();
  }),
}));
jest.mock("../middleware/adminAuth", () => jest.fn((req, res, next) => next()));
app.use("/products", productRouter);

describe("Product Routes", () => {
  it("should add a product", async () => {
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

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Product Added");
  });
  it("should get the list of products", async () => {
    const res = await request(app).get("/products/list");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
    expect(res.body.products).toBeInstanceOf(Array);
  });
});
