import request from "supertest";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import upload from "../middleware/multer"; // Your multer middleware

const app = express();
app.use(express.json());

// Define the route
app.post("/upload", upload, (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  res.status(200).json({
    success: true,
    message: "File uploaded",
    file: req.file,
  });
});

// Test suite for multer
describe("Multer File Upload Middleware", () => {
  it("should upload a file", async () => {
    const testFile = path.join(__dirname, "test-image.jpg");

    // Create a mock file if it doesn't exist
    if (!fs.existsSync(testFile)) {
      fs.writeFileSync(testFile, "mock file data", "utf8");
    }

    const response = await request(app)
      .post("/upload")
      .attach("image", testFile) // Ensure the key matches the middleware
      .set("Content-Type", "multipart/form-data");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("File uploaded");
    expect(response.body.file).toHaveProperty("originalname", "test-image.jpg");
  });

  afterAll(() => {
    // Clean up the test file after the tests
    const testFile = path.join(__dirname, "test-image.jpg");
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });
});
