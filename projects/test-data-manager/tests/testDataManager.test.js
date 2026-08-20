import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { DatabaseClient } from "../src/mockDb.js";
import { TestDataSeeder } from "../src/seeder.js";
import { withTransactionIsolation } from "../src/transactionRunner.js";
import { PostgresTestClient } from "../src/postgresClient.js";
import { MongoTestClient } from "../src/mongoClient.js";
import { QueryPerformanceAnalyzer } from "../src/queryAnalyzer.js";

describe("Test Data Manager - Seeder & Cleanup", () => {
  let db;
  let seeder;

  beforeEach(() => {
    db = new DatabaseClient();
    db.createTable("users");
    db.createTable("orders");
    seeder = new TestDataSeeder(db);
  });

  test("seeds users and cleans up properly", () => {
    seeder.seedUsers([
      { name: "Hariom", email: "hariom@test.com", dept: "QA" },
      { name: "Rahul", email: "rahul@test.com", dept: "Dev" },
    ]);

    assert.equal(db.find("users").length, 2);

    const deleted = seeder.cleanupSeeded();
    assert.equal(deleted, 2);
    assert.equal(db.find("users").length, 0);
  });

  test("transaction rollback isolates test mutations", async () => {
    db.insert("users", { name: "Baseline User" });
    assert.equal(db.find("users").length, 1);

    await withTransactionIsolation(db, async (isolatedDb) => {
      isolatedDb.insert("users", { name: "Temporary Mutated User" });
      isolatedDb.insert("users", { name: "Another Temp User" });
      assert.equal(isolatedDb.find("users").length, 3);
    });

    assert.equal(db.find("users").length, 1);
    assert.equal(db.find("users")[0].name, "Baseline User");
  });
});

describe("Test Data Manager - Database Drivers & Query Analyzer", () => {
  test("PostgresTestClient handles fallback gracefully", async () => {
    const client = new PostgresTestClient(null);
    const res = await client.query("SELECT 1");
    assert.equal(res.command, "MOCK");
  });

  test("MongoTestClient tracks and cleans documents", async () => {
    const mongo = new MongoTestClient(null);
    const seeded = await mongo.seedCollection("logs", [{ message: "Test run log" }]);
    assert.equal(seeded.length, 1);
    const cleanup = await mongo.cleanupTrackedData();
    assert.equal(cleanup.deletedCount, 0);
  });

  test("QueryPerformanceAnalyzer identifies sequential scans and gives suggestions", () => {
    const badPlan = {
      "Node Type": "Seq Scan",
      "Relation Name": "large_orders_table",
      "Total Cost": 12450.0,
    };

    const analysis = QueryPerformanceAnalyzer.analyzePlan(badPlan);
    assert.equal(analysis.hasSeqScan, true);
    assert.equal(analysis.isOptimal, false);
    assert.ok(analysis.warnings[0].includes("Sequential Scan detected"));
    assert.ok(analysis.recommendations[0].includes("B-Tree index"));
  });
});
