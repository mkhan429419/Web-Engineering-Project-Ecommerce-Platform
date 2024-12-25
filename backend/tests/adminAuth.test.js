import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import adminAuth from "../middleware/adminAuth";

const app = express();

app.use(adminAuth);
app.get("/admin", (req, res) => {
  res.json({ success: true, message: "Welcome Admin" });
});

describe("Admin Authentication Middleware", () => {
  let validToken;
  let invalidToken;

  beforeAll(() => {
    validToken = jwt.sign(
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
      process.env.JWT_SECRET
    );
    invalidToken = jwt.sign("wrong-value", process.env.JWT_SECRET);
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
