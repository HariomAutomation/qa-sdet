import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { parseCSV, stringifyCSV } from "../src/csvParser.js";
import { filterRecords, aggregateField, groupRecordsBy } from "../src/transformer.js";

describe("Data Processor - CSV Parser", () => {
  test("should parse valid CSV text into typed objects", () => {
    const csv = `name,age,active,salary\nHariom,25,true,80000\nRahul,30,false,95000`;
    const result = parseCSV(csv);

    assert.equal(result.length, 2);
    assert.deepEqual(result[0], { name: "Hariom", age: 25, active: true, salary: 80000 });
  });

  test("should stringify objects back to CSV", () => {
    const data = [{ id: 1, title: "Test A" }, { id: 2, title: "Test B" }];
    const csv = stringifyCSV(data);

    assert.match(csv, /^id,title/);
    assert.match(csv, /1,Test A/);
  });
});

describe("Data Processor - Transformer", () => {
  const sampleData = [
    { name: "Hariom", dept: "QA", salary: 80000 },
    { name: "Rahul", dept: "Dev", salary: 120000 },
    { name: "Priya", dept: "QA", salary: 90000 },
  ];

  test("filterRecords by criteria object", () => {
    const filtered = filterRecords(sampleData, { dept: "QA" });
    assert.equal(filtered.length, 2);
    assert.equal(filtered[0].name, "Hariom");
  });

  test("aggregateField computes average salary correctly", () => {
    const avg = aggregateField(sampleData, "salary", "avg");
    assert.equal(avg.count, 3);
    assert.equal(avg.result, (80000 + 120000 + 90000) / 3);
  });

  test("groupRecordsBy groups by department", () => {
    const grouped = groupRecordsBy(sampleData, "dept");
    assert.equal(grouped["QA"].length, 2);
    assert.equal(grouped["Dev"].length, 1);
  });
});
