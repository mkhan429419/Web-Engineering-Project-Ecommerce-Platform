import mongoose from "mongoose";
import productModel from "../models/productModel.js"; // Import the model using ES module syntax

describe("Product Model Test", () => {
  beforeAll(async () => {
    // Connect to a MongoDB in-memory database for testing
    await mongoose.connect("mongodb://127.0.0.1:27017/testDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clean up the database
    await mongoose.connection.close(); // Close connection
  });

  it("should create a product successfully", async () => {
    const productData = {
      title: "Test Product",
      description: "This is a test product",
      category: "Electronics",
      subCategory: "Phones",
      price: 99.99,
      BestSell: true,
      sizes: ["Small", "Medium", "Large"],
      image: ["https://cloudinary.com/test-image.jpg"],
      date: new Date(),
    };

    const product = new productModel(productData);
    const savedProduct = await product.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.title).toBe(productData.title);
    expect(savedProduct.price).toBe(productData.price);
  });

  it("should fail validation without required fields", async () => {
    const product = new productModel({}); // Missing required fields
    let error;
    try {
      await product.save();
    } catch (err) {
      error = err;
    }
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.title).toBeDefined();
  });
});
