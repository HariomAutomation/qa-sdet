# 📘 Module 2.2 — API Testing Mastery

## Lesson 3: Contract Testing, Mock Servers, Auth Flows & GraphQL

---

## 1️⃣ Authentication Workflows (JWT & OAuth 2.0)

```typescript
export class AuthClient {
  private token: string | null = null;
  private tokenExpiresAt: number = 0;

  async getValidToken(): Promise<string> {
    const now = Date.now();
    // Auto-refresh token 30 seconds before expiry
    if (this.token && this.tokenExpiresAt > now + 30000) {
      return this.token;
    }

    const res = await fetch("https://api.example.com/v1/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
    });

    const body = await res.json();
    this.token = body.access_token;
    this.tokenExpiresAt = now + body.expires_in * 1000;
    return this.token!;
  }
}
```

---

## 2️⃣ GraphQL API Testing

```typescript
test("query GraphQL user with orders", async ({ request }) => {
  const query = `
    query GetUserProfile($userId: ID!) {
      user(id: $userId) {
        id
        name
        email
        orders {
          id
          totalAmount
          status
        }
      }
    }
  `;

  const response = await request.post("https://api.example.com/graphql", {
    data: {
      query,
      variables: { userId: "101" },
    },
    headers: {
      Authorization: "Bearer <token>",
      "Content-Type": "application/json",
    },
  });

  expect(response.status()).toBe(200);
  const { data, errors } = await response.json();
  expect(errors).toBeUndefined(); // Verify no GraphQL query errors
  expect(data.user.name).toBe("Hariom Singh");
  expect(Array.isArray(data.user.orders)).toBe(true);
});
```

---

## 3️⃣ Consumer-Driven Contract Testing (Pact.js Overview)

```typescript
// Contract definition
provider
  .given("User with ID 1 exists")
  .uponReceiving("A request for User 1")
  .withRequest({
    method: "GET",
    path: "/api/users/1",
  })
  .willRespondWith({
    status: 200,
    headers: { "Content-Type": "application/json" },
    body: {
      id: 1,
      name: "Hariom",
      email: "hariom@test.com",
    },
  });
```
