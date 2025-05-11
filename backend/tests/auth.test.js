import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import express from "express";
import authUser from "../middleware/auth.js";

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

app.post("/protected", authUser, (req, res) => {
  res.json({ success: true, userId: req.body.userId });
});

describe("authUser Middleware", () => {
  it("should allow access if valid token is provided", async () => {
    const userId = new mongoose.Types.ObjectId();
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const response = await request(app).post("/protected").set("token", token);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.userId).toBe(userId.toString());
  });
  it("should return an error if no token is provided", async () => {
    const response = await request(app).post("/protected");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Not Authorized Login Again");
  });
  it("should return an error if token is invalid", async () => {
    const invalidToken = "invalidtoken";
    const response = await request(app)
      .post("/protected")
      .set("token", invalidToken);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("jwt malformed");
  });
  it("should fail if token is valid but missing user ID", async () => {
    const token = jwt.sign({ foo: "bar" }, process.env.JWT_SECRET);
    const response = await request(app).post("/protected").set("token", token);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
  });
});
