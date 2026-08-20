import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 30 }, // Ramp-up
    { duration: "4h", target: 30 }, // 4-Hour endurance test (memory leaks & degradation)
    { duration: "1m", target: 0 },  // Ramp-down
  ],
};

export default function () {
  const res = http.get("https://test.k6.io/public/crocodiles/");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
