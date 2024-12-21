import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import adminAuth from "../middleware/adminAuth";

const app = express();

// Dummy route that uses the adminAuth middleware
app.use(adminAuth);
app.get("/admin", (req, res) => {
  res.json({ success: true, message: "Welcome Admin" });
});

describe("Admin Authentication Middleware", () => {
  let validToken;
  let invalidToken;

  beforeAll(() => {
    // Generate a valid token with the ADMIN_EMAIL + ADMIN_PASSWORD value
    validToken = jwt.sign(
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD, // Ensure this matches the expected format
      process.env.JWT_SECRET
    );

    // Generate an invalid token with a wrong value
    invalidToken = jwt.sign(
      "wrong-value", // This doesn't match the expected format in adminAuth
      process.env.JWT_SECRET
    );
  });

  it("should allow access with a valid token", async () => {
    const response = await request(app).get("/admin").set("token", validToken);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Welcome Admin");
  });

  it("should deny access with an invalid token", async () => {
    const response = await request(app)
      .get("/admin")
      .set("token", invalidToken);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Not Authorized Login Again");
  });

  it("should deny access if no token is provided", async () => {
    const response = await request(app).get("/admin");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Not Authorized Login Again");
  });
});
