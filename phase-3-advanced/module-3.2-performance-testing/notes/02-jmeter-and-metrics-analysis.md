# 📘 Module 3.2 — Performance & Load Testing

## Lesson 2: JMeter, Capacity Planning & Grafana Observability

---

## 1️⃣ JMeter Core Architecture

```
Test Plan
└── Thread Group (Number of Threads/Users, Ramp-Up Period, Loop Count)
    ├── Config Element (HTTP Header Manager / Cookie Manager / CSV Data Set Config)
    ├── Sampler (HTTP Request: GET /api/v1/orders)
    ├── Assertions (Response Assertion: 200 OK, Duration Assertion < 500ms)
    └── Listeners (View Results Tree, Aggregate Report, Backend Listener for InfluxDB)
```

---

## 2️⃣ Real-Time Observability (k6 + InfluxDB + Grafana)

Performance testing mein real-time metrics capture karne ke liye k6 metrics ko InfluxDB time-series database mein push karke Grafana dashboard par visualize kiya jata hai.

```bash
# Run k6 with live InfluxDB metric export
k6 run --out influxdb=http://localhost:8086/k6 load-test.js
```

---

## 3️⃣ Performance Gates in CI/CD (Quality Gates)

CI/CD pipeline mein har build par automated performance checks lagaye jaate hain. Agar response time p95 > 500ms ho ya error rate > 1% ho, toh pipeline auto-fail ho jati hai:

```yaml
- name: Run k6 Performance Gate
  run: k6 run --thresholds "http_req_duration=p(95)<400" scripts/load-test.js
```
