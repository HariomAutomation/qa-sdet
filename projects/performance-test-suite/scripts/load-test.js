import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "20s", target: 10 }, // Ramp-up to 10 users
    { duration: "40s", target: 10 }, // Sustained load
    { duration: "10s", target: 0 },  // Ramp-down
  ],
  thresholds: {
    http_req_duration: ["p(95)<600"], // 95% of requests must complete below 600ms
    http_req_failed: ["rate<0.01"],   // Error rate must be less than 1%
  },
};

export default function () {
  const res = http.get("https://test.k6.io/public/crocodiles/");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "has crocodile list": (r) => r.body.includes("Bert"),
  });

  sleep(1);
}
