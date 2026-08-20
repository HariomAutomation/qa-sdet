import { ValidationError } from "./errors.js";

/**
 * Parses raw CSV content into an array of JavaScript objects.
 * Handles quoted strings containing commas and newlines.
 *
 * @param {string} csvText
 * @returns {Array<Record<string, string|number|boolean>>}
 */
export function parseCSV(csvText) {
  if (typeof csvText !== "string" || !csvText.trim()) {
    return [];
  }

  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^["']|["']$/g, ""));

  if (headers.some((h) => !h)) {
    throw new ValidationError("CSV headers must not contain empty names", "headers", headers);
  }

  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const rawValues = lines[i].split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""));

    const record = {};
    headers.forEach((header, index) => {
      let val = rawValues[index] ?? "";
      // Auto-cast numbers and booleans
      if (val.toLowerCase() === "true") val = true;
      else if (val.toLowerCase() === "false") val = false;
      else if (!isNaN(Number(val)) && val !== "") val = Number(val);

      record[header] = val;
    });

    records.push(record);
  }

  return records;
}

/**
 * Converts an array of objects to a CSV string.
 *
 * @param {Array<Record<string, any>>} records
 * @returns {string}
 */
export function stringifyCSV(records) {
  if (!Array.isArray(records) || records.length === 0) return "";

  const headers = Array.from(new Set(records.flatMap((r) => Object.keys(r))));
  const csvRows = [headers.join(",")];

  for (const record of records) {
    const row = headers.map((header) => {
      const val = record[header] ?? "";
      const escaped = String(val).replace(/"/g, '""');
      return escaped.includes(",") || escaped.includes("\n") ? `"${escaped}"` : escaped;
    });
    csvRows.push(row.join(","));
  }

  return csvRows.join("\n");
}
