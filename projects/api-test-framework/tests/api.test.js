import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { ApiClient } from "../src/apiClient.js";
import { UserService } from "../src/services/userService.js";
import { validateSchema } from "../src/schemaValidator.js";

describe("Custom API Test Framework - Core Suite", () => {
  const client = new ApiClient("https://jsonplaceholder.typicode.com");
  const userService = new UserService(client);

  test("GET /users retrieves 10 users and conforms to schema", async () => {
    const res = await userService.getUsers();
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.data));
    assert.equal(res.data.length, 10);

    const userSchema = {
      id: "number",
      name: "string",
      email: "string",
      phone: "string",
    };

    const validation = validateSchema(res.data[0], userSchema);
    assert.equal(validation.valid, true);
  });

  test("POST /users creates a new user successfully", async () => {
    const payload = {
      name: "Hariom Singh",
      email: "hariom@sdet.io",
      role: "Senior SDET",
    };

    const res = await userService.createUser(payload);
    assert.equal(res.status, 201);
    assert.equal(res.data.name, payload.name);
    assert.equal(res.data.email, payload.email);
    assert.ok(res.data.id);
  });

  test("PUT /users/1 updates user details", async () => {
    const res = await userService.updateUser(1, { name: "Hariom Updated" });
    assert.equal(res.status, 200);
    assert.equal(res.data.name, "Hariom Updated");
  });

  test("DELETE /users/1 removes user resource", async () => {
    const res = await userService.deleteUser(1);
    assert.equal(res.status, 200);
  });
});
