import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { createDataFactory } from "../factory.js";
import { ConfigLoader } from "../configLoader.js";
import { Retry, Step, Timeout } from "../decorators.js";

interface UserProfile {
  id: number;
  email: string;
  role: "admin" | "tester" | "viewer";
  isActive: boolean;
}

describe("Test Utilities - Factory", () => {
  const userFactory = createDataFactory<UserProfile>({
    id: () => Math.floor(Math.random() * 1000),
    email: () => "tester@example.com",
    role: () => "tester",
    isActive: () => true,
  });

  test("builds single entity with default generators", () => {
    const user = userFactory.build();
    assert.equal(user.email, "tester@example.com");
    assert.equal(user.role, "tester");
    assert.equal(user.isActive, true);
    assert.ok(user.id >= 0);
  });

  test("builds entity with overridden properties", () => {
    const admin = userFactory.build({ role: "admin", email: "admin@corp.com" });
    assert.equal(admin.role, "admin");
    assert.equal(admin.email, "admin@corp.com");
  });

  test("buildMany generates specified number of distinct entities", () => {
    const list = userFactory.buildMany(5);
    assert.equal(list.length, 5);
  });
});

describe("Test Utilities - ConfigLoader", () => {
  test("loads default local configuration", () => {
    const cfg = ConfigLoader.load();
    assert.equal(cfg.envName, "local");
    assert.equal(cfg.apiTimeout, 30000);
    assert.equal(cfg.headless, true);
  });
});

describe("Test Utilities - Decorators", () => {
  class TestService {
    public attempts = 0;

    @Step("Sample test step")
    async performStep(val: string) {
      return `Processed: ${val}`;
    }

    @Retry(3, 10)
    async flakyAction() {
      this.attempts++;
      if (this.attempts < 3) throw new Error("Temporary network glitch");
      return "Success";
    }

    @Timeout(50)
    async slowAction() {
      await new Promise((res) => setTimeout(res, 100));
      return "Finished";
    }
  }

  test("@Step executes and logs properly", async () => {
    const s = new TestService();
    const res = await s.performStep("sample-data");
    assert.equal(res, "Processed: sample-data");
  });

  test("@Retry succeeds on flaky method", async () => {
    const s = new TestService();
    const res = await s.flakyAction();
    assert.equal(res, "Success");
    assert.equal(s.attempts, 3);
  });

  test("@Timeout rejects if execution takes too long", async () => {
    const s = new TestService();
    await assert.rejects(
      async () => {
        await s.slowAction();
      },
      /exceeded timeout of 50ms/
    );
  });
});
