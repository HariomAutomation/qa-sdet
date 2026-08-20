# 📘 Module 2.2 — API Testing Mastery

## Lesson 1: HTTP Protocol, Status Codes & Supertest Deep Dive

---

## 1️⃣ HTTP Protocol Foundations for SDETs

```
┌────────────────────────────────────────────────────────┐
│                   HTTP Request Anatomy                 │
├────────────────────────────────────────────────────────┤
│ METHOD:  GET / POST / PUT / PATCH / DELETE             │
│ PATH:    /api/v1/users/101?fields=name,email           │
│ HEADERS: Content-Type: application/json                │
│          Authorization: Bearer <jwt_token>             │
│          Accept: application/json                      │
│ BODY:    { "name": "Hariom", "role": "SDET" }          │
└────────────────────────────────────────────────────────┘
```

### Critical HTTP Status Codes Matrix
| Code | Meaning | Test Assertion Use Case |
|---|---|---|
| **200 OK** | Standard success for GET / PUT / PATCH | Successful retrieval or update |
| **201 Created** | Resource created successfully via POST | User registration, order creation (`Location` header check) |
| **204 No Content** | Successful action with empty response body | Successful DELETE operation |
| **400 Bad Request** | Invalid payload, schema validation error | Missing required fields, invalid email format |
| **401 Unauthorized** | Missing or invalid auth token | Expired JWT, missing Bearer token |
| **403 Forbidden** | Authenticated but insufficient permissions | Regular user attempting Admin DELETE |
| **404 Not Found** | Resource does not exist | Invalid user ID in URL |
| **409 Conflict** | State collision | Duplicate email registration |
| **422 Unprocessable** | Semantic validation failure | Business logic violation (e.g. withdraw amount > balance) |
| **429 Too Many Req** | Rate limiting triggered | Rate limit burst test verification |
| **500 Server Error** | Unhandled backend exception | Catching server crashes & bug regressions |

---

## 2️⃣ Testing APIs with Supertest & Node.js

```javascript
import request from "supertest";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const BASE_URL = "https://jsonplaceholder.typicode.com";

describe("User API Test Suite", () => {
  it("GET /users should return 200 with JSON list", async () => {
    const res = await request(BASE_URL)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    assert.ok(Array.isArray(res.body));
    assert.equal(res.body.length, 10);
    assert.equal(typeof res.body[0].email, "string");
  });

  it("POST /posts should create a new resource with status 201", async () => {
    const payload = {
      title: "Playwright SDET Guide",
      body: "Comprehensive API and UI testing",
      userId: 1,
    };

    const res = await request(BASE_URL)
      .post("/posts")
      .send(payload)
      .set("Content-Type", "application/json")
      .expect(201);

    assert.equal(res.body.title, payload.title);
    assert.ok(res.body.id);
  });
});
```
