import { TransformationError } from "./errors.js";

/**
 * Filter records by predicate or field criteria.
 */
export function filterRecords(records, predicateOrCriteria) {
  if (typeof predicateOrCriteria === "function") {
    return records.filter(predicateOrCriteria);
  }

  if (typeof predicateOrCriteria === "object" && predicateOrCriteria !== null) {
    return records.filter((item) => {
      return Object.entries(predicateOrCriteria).every(([key, expected]) => {
        return item[key] === expected;
      });
    });
  }

  throw new TransformationError("Invalid filter criteria provided", "FILTER", predicateOrCriteria);
}

/**
 * Group records by a given property or key function.
 */
export function groupRecordsBy(records, keySelector) {
  const getKey = typeof keySelector === "function" ? keySelector : (item) => item[keySelector];

  return records.reduce((groups, item) => {
    const key = String(getKey(item));
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});
}

/**
 * Aggregate numerical field values (sum, avg, min, max, count).
 */
export function aggregateField(records, fieldName, operation = "sum") {
  if (!Array.isArray(records) || records.length === 0) {
    return { count: 0, result: 0 };
  }

  const values = records
    .map((r) => Number(r[fieldName]))
    .filter((v) => !isNaN(v) && v !== null);

  if (values.length === 0) {
    return { count: 0, result: 0 };
  }

  const count = values.length;
  const sum = values.reduce((acc, v) => acc + v, 0);

  switch (operation.toLowerCase()) {
    case "sum":
      return { operation: "sum", count, result: sum };
    case "avg":
      return { operation: "avg", count, result: sum / count };
    case "min":
      return { operation: "min", count, result: Math.min(...values) };
    case "max":
      return { operation: "max", count, result: Math.max(...values) };
    default:
      throw new TransformationError(`Unsupported aggregation operation: ${operation}`, "AGGREGATE", {
        fieldName,
        operation,
      });
  }
}
