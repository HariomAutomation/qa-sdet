import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "20s", target: 20 },
    { duration: "30s", target: 50 },  // Step up
    { duration: "30s", target: 100 }, // High Stress limit
    { duration: "20s", target: 0 },   // Recovery
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"], // Less than 5% failure allowed under heavy stress
  },
};

export default function () {
  const res = http.get("https://test.k6.io/public/crocodiles/");

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(0.5);
}
