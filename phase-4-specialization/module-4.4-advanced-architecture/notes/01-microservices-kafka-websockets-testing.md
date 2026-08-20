# 📘 Module 4.4 — Advanced Architecture Testing

## Lesson 1: Microservices, Event-Driven Kafka/RabbitMQ & WebSockets Testing

---

## 1️⃣ Testing WebSockets & Real-Time Events with Playwright

Playwright native WebSocket frame interception support karta hai:

```typescript
import { test, expect } from "@playwright/test";

test("intercept and verify WebSocket notifications", async ({ page }) => {
  let wsMessageReceived = false;

  // Listen to WebSocket connections
  page.on("websocket", (ws) => {
    console.log("WebSocket connected:", ws.url());

    ws.on("framereceived", (frame) => {
      const payload = JSON.parse(frame.payload as string);
      if (payload.type === "ORDER_PROCESSED") {
        wsMessageReceived = true;
      }
    });
  });

  await page.goto("/live-orders");
  await page.getByRole("button", { name: "Simulate Order" }).click();

  // Wait until WebSocket event receives order confirmation
  await expect.poll(() => wsMessageReceived).toBe(true);
});
```

---

## 2️⃣ Event-Driven Architecture Testing (Kafka / Message Queues)

```typescript
// Producer triggers action via API, Consumer verifies Kafka topic payload
test("verify order placed event is published to Kafka topic", async () => {
  // 1. Trigger order placement
  const res = await apiClient.post("/api/v1/orders", { itemId: 101, qty: 1 });
  expect(res.status).toBe(201);

  // 2. Consume from Kafka topic and assert event schema
  const message = await kafkaTestConsumer.waitForMessage("orders.v1.created", {
    correlationId: res.data.orderId,
    timeoutMs: 5000,
  });

  expect(message.payload.status).toBe("CREATED");
  expect(message.payload.amount).toBe(res.data.amount);
});
```
