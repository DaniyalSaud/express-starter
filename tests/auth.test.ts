import request from "supertest";
import app from "../src/server";
import { describe, it } from "vitest";

import { cleanDatabase, createTestUser } from "../tests/helpers/dbHelpers";
describe("Authentication Endpoints", () => {
  afterEach(async () => {
    await cleanDatabase();
  });

  // Write your tests here
  describe("POST /api/auth/register", () => {
    it("should register a new user with valid data", async () => {
      const testUser = {
        email: "testuser@test.com",
        password: "test1234",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
      };
      const response = await request(app)
        .post("/api/auth/register")
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty("user");
      expect(response.body).toHaveProperty("token");
      expect(response.body).not.toHaveProperty("password");
    });
  });
});
