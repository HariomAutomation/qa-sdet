# 📋 k6 & Performance Testing — Quick Cheatsheet

## Test Types
- **Load Test**: Normal peak volume verification
- **Stress Test**: System limits & breaking threshold discovery
- **Spike Test**: Sudden traffic jump resilience
- **Soak Test**: Memory leaks & degradation over hours

## Key k6 CLI Commands
```bash
k6 run script.js                          # Standard run
k6 run --vus 50 --duration 1m script.js   # 50 VUs for 1 minute
k6 run --out influxdb=http://localhost:8086/k6 script.js # Live Grafana export
```

## Threshold Definitions
```javascript
export const options = {
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    http_req_failed: ["rate<0.01"],
  },
};
```
