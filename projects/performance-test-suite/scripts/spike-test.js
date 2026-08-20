import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 5 },   // Normal traffic
    { duration: "10s", target: 150 }, // Massive immediate spike (Flash sale)
    { duration: "30s", target: 150 }, // Surge peak
    { duration: "10s", target: 5 },   // Immediate drop
    { duration: "15s", target: 0 },   // Cool-down
  ],
};

export default function () {
  const res = http.get("https://test.k6.io/public/crocodiles/");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(0.5);
}
