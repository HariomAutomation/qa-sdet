#!/usr/bin/env node

import { readDataset, writeDataset } from "../src/processor.js";
import { filterRecords, aggregateField, groupRecordsBy } from "../src/transformer.js";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
📊 Data Processor CLI
Usage:
  data-proc <input-file> [options]

Options:
  --output, -o <file>       Write transformed data to output file (.csv or .json)
  --filter <field=value>    Filter by key-value match (e.g. dept=QA)
  --aggregate <field:op>    Compute metric: sum, avg, min, max (e.g. salary:avg)
  --group-by <field>        Group output by field
  --help, -h                Show this help menu
    `);
    process.exit(0);
  }

  const inputFile = args[0];
  let outputFile = null;
  let filterParam = null;
  let aggregateParam = null;
  let groupByParam = null;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--output" || args[i] === "-o") {
      outputFile = args[++i];
    } else if (args[i] === "--filter") {
      filterParam = args[++i];
    } else if (args[i] === "--aggregate") {
      aggregateParam = args[++i];
    } else if (args[i] === "--group-by") {
      groupByParam = args[++i];
    }
  }

  try {
    console.log(`⏳ Reading ${inputFile}...`);
    let records = await readDataset(inputFile);
    console.log(`✅ Loaded ${records.length} records.`);

    if (filterParam) {
      const [field, value] = filterParam.split("=");
      records = filterRecords(records, { [field]: isNaN(Number(value)) ? value : Number(value) });
      console.log(`🔍 Filtered down to ${records.length} records where ${field}=${value}`);
    }

    if (aggregateParam) {
      const [field, op] = aggregateParam.split(":");
      const aggResult = aggregateField(records, field, op || "sum");
      console.log(`📈 Aggregation [${aggResult.operation.toUpperCase()}] for '${field}':`, aggResult.result);
    }

    if (groupByParam) {
      const grouped = groupRecordsBy(records, groupByParam);
      console.log(`📑 Grouped by '${groupByParam}':`, Object.keys(grouped).map((k) => `${k}: ${grouped[k].length} items`));
      records = grouped;
    }

    if (outputFile) {
      const res = await writeDataset(outputFile, records);
      console.log(`💾 Successfully exported to ${res.filePath}`);
    }
  } catch (error) {
    console.error(`❌ [${error.name}] ${error.message}`);
    if (error.details) console.error("Details:", error.details);
    process.exit(1);
  }
}

main();
