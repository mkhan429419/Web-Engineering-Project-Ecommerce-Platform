import request from "supertest";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import upload from "../middleware/multer"; // Adjust the import based on your actual file structure

const app = express();
app.use(express.json());

// Test Route to handle file upload
app.post("/upload", upload.single("image1"), (req, res) => {
  // Check if a file is uploaded
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  // If file uploaded successfully
  res
    .status(200)
    .json({ success: true, message: "File uploaded", file: req.file });
});

describe("Multer File Upload Middleware", () => {
  it("should upload a file", async () => {
    const testFile = path.join(__dirname, "test-image.jpg"); // Path to your mock file for testing

    // Create a mock file for testing if necessary
    if (!fs.existsSync(testFile)) {
      fs.writeFileSync(testFile, "mock file data", "utf8");
    }

    const response = await request(app)
      .post("/upload")
      .attach("image1", testFile) // Attach the file to the request
      .set("Content-Type", "multipart/form-data");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("File uploaded");
    expect(response.body.file).toHaveProperty("originalname", "test-image.jpg"); // Check the file's original name
  });
});
