# 📘 Module 3.2 — Performance & Load Testing

## Lesson 1: k6 Performance Testing Mastery

> **Why k6 for SDETs?** k6 modern JavaScript/TypeScript par based hai, developer-friendly hai, Git & CI/CD mein naturally fit hota hai, aur blazing fast Go engine par execute hota hai!

---

## 1️⃣ Performance Testing Types

```
┌───────────────────────────────────────────────────────────┐
│              Performance Test Categories                  │
├──────────────┬────────────────────────────────────────────┤
│ Load Test    │ Normal expected peak traffic simulation    │
│ Stress Test  │ Breaking point determine karne ke liye     │
│ Spike Test   │ Sudden 10x burst traffic (e.g. Flash Sale) │
│ Soak Test    │ Long-duration endurance (Memory leaks)     │
└──────────────┴────────────────────────────────────────────┘
```

---

## 2️⃣ k6 Script Anatomy & Stages

```javascript
import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Counter } from "k6/metrics";

// Custom Metrics
const responseTimeTrend = new Trend("api_response_time_ms");
const errorCounter = new Counter("api_errors_total");

// Test Configuration & SLA Thresholds
export const options = {
  stages: [
    { duration: "30s", target: 20 },  // Ramp-up to 20 virtual users
    { duration: "1m", target: 20 },   // Stay at 20 users
    { duration: "20s", target: 0 },   // Ramp-down to 0
  ],
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"], // 95% requests < 500ms
    http_req_failed: ["rate<0.01"],                  // Less than 1% failure rate
  },
};

export default function () {
  const res = http.get("https://test.k6.io/public/crocodiles/");

  responseTimeTrend.add(res.timings.duration);

  const passed = check(res, {
    "status is 200": (r) => r.status === 200,
    "response body not empty": (r) => r.body.length > 0,
  });

  if (!passed) {
    errorCounter.add(1);
  }

  sleep(1); // 1-second think time
}
```

---

## 3️⃣ Key SLA Metrics
- **p90 / p95 / p99**: 90th / 95th / 99th percentile response times (averages misleading hote hain!)
- **RPS (Requests Per Second)**: Throughput
- **Error Rate**: Percentage of HTTP 5xx or failed checks
- **TTFB (Time to First Byte)**: Server backend latency before streaming response
