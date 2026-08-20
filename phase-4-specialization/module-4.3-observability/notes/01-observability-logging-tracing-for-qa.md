# 📘 Module 4.3 — Observability, Monitoring & Logging for QA

## Lesson 1: The Three Pillars of Observability: Logs, Metrics & Distributed Tracing

---

## 1️⃣ Structured Logging with Winston / Pino & Correlation IDs

Test automation failures ko backend logs se correlate karne ke liye har API/UI request mein unique `x-correlation-id` header inject kiya jata hai:

```typescript
import winston from "winston";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Production JSON format for Datadog / ELK
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/automation.log" }),
  ],
});

// Inject Correlation ID in tests:
export function generateCorrelationHeaders(testName: string) {
  const correlationId = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  logger.info(`Starting test '${testName}'`, { correlationId });
  return {
    "x-correlation-id": correlationId,
    "x-test-origin": "playwright-e2e",
  };
}
```

---

## 2️⃣ Distributed Tracing (OpenTelemetry)

OpenTelemetry trace spans se frontend button click se lekar API Gateway -> Microservice A -> Database query tak ka exact latency breakdown visualize hota hai.
