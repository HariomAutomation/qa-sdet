# ⚡ k6 Performance & Load Testing Suite

Production-ready k6 load, stress, spike, and soak test scripts with SLA thresholds and Grafana observability.

## 🚀 Running Tests

```bash
# Standard Load Test
k6 run scripts/load-test.js

# Stress Test (Breaking Point)
k6 run scripts/stress-test.js

# Spike Test (Flash Surge)
k6 run scripts/spike-test.js

# Live Grafana Dashboards
docker compose up -d
k6 run --out influxdb=http://localhost:8086/k6 scripts/load-test.js
```
