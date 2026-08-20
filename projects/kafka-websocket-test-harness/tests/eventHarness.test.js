import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { WebSocketTestHarness, validateEventSequence } from "../src/index.js";

describe("Kafka & WebSocket Test Harness Suite", () => {
  it("waits for specific asynchronous events matching payload criteria", async () => {
    const harness = new WebSocketTestHarness();

    // Trigger async event after 50ms
    setTimeout(() => {
      harness.receiveMessage({
        type: "ORDER_CREATED",
        orderId: "ORD-999",
        amount: 450,
      });
    }, 50);

    const received = await harness.waitForEvent(
      "ORDER_CREATED",
      (msg) => msg.orderId === "ORD-999"
    );

    assert.equal(received.amount, 450);
  });

  it("verifies sequential causality and event ordering", () => {
    const eventStream = [
      { type: "PAYMENT_INITIATED" },
      { type: "FRAUD_CHECK_PASSED" },
      { type: "PAYMENT_CAPTURED" },
      { type: "ORDER_FULFILLED" },
    ];

    const result = validateEventSequence(eventStream, [
      "PAYMENT_INITIATED",
      "PAYMENT_CAPTURED",
      "ORDER_FULFILLED",
    ]);

    assert.equal(result.valid, true);
    assert.equal(result.matchedCount, 3);
  });
});
