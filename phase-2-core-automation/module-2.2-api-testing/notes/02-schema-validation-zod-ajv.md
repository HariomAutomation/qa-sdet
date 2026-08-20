# 📘 Module 2.2 — API Testing Mastery

## Lesson 2: Schema Validation (Zod & JSON Schema / AJV)

> **Why Status Code 200 is Not Enough:** Backend agar response mein field ka naam `user_id` se `userId` ya `number` se `string` badal de, toh status 200 aayega lekin frontend crash ho jayega! Isliye **Schema Validation** mandatory hai.

---

## 1️⃣ Schema Validation with Zod (Modern TypeScript Standard)

```typescript
import { z } from "zod";

// 1. Define Strict Response Schema
export const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  username: z.string(),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipcode: z.string(),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
  }),
});

export const UserListSchema = z.array(UserSchema);

// In your test:
test("validate GET /users response schema strictly", async ({ request }) => {
  const response = await request.get("https://jsonplaceholder.typicode.com/users");
  expect(response.status()).toBe(200);

  const data = await response.json();

  // Throws if schema does not match!
  const validationResult = UserListSchema.safeParse(data);
  expect(validationResult.success).toBe(true);

  if (!validationResult.success) {
    console.error("Schema Mismatch:", validationResult.error.format());
  }
});
```

---

## 2️⃣ Schema Validation with AJV (JSON Schema Standard)

```javascript
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const userJsonSchema = {
  type: "object",
  properties: {
    id: { type: "integer", minimum: 1 },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    role: { type: "string", enum: ["admin", "tester", "viewer"] },
  },
  required: ["id", "name", "email", "role"],
  additionalProperties: false, // Disallow unexpected unknown fields!
};

const validate = ajv.compile(userJsonSchema);

function assertValidSchema(responseBody) {
  const isValid = validate(responseBody);
  if (!isValid) {
    throw new Error(`Schema Validation Error: ${JSON.stringify(validate.errors, null, 2)}`);
  }
}
```
