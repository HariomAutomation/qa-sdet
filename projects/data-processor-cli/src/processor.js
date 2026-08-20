import { promises as fs } from "fs";
import path from "path";
import { parseCSV, stringifyCSV } from "./csvParser.js";
import { FileError, ValidationError } from "./errors.js";

/**
 * Reads a dataset from CSV or JSON file asynchronously.
 */
export async function readDataset(filePath) {
  try {
    const resolvedPath = path.resolve(filePath);
    const rawContent = await fs.readFile(resolvedPath, "utf-8");
    const ext = path.extname(resolvedPath).toLowerCase();

    if (ext === ".json") {
      return JSON.parse(rawContent);
    } else if (ext === ".csv") {
      return parseCSV(rawContent);
    } else {
      throw new ValidationError(`Unsupported file extension: ${ext}. Expected .csv or .json`, "extension", ext);
    }
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw new FileError(`Failed to read dataset from ${filePath}`, filePath, error);
  }
}

/**
 * Writes dataset to file (CSV or JSON).
 */
export async function writeDataset(filePath, records) {
  try {
    const resolvedPath = path.resolve(filePath);
    await fs.mkdir(path.dirname(resolvedPath), { recursive: true });

    const ext = path.extname(resolvedPath).toLowerCase();
    let content = "";

    if (ext === ".json") {
      content = JSON.stringify(records, null, 2);
    } else if (ext === ".csv") {
      content = stringifyCSV(records);
    } else {
      throw new ValidationError(`Unsupported file format for writing: ${ext}`, "extension", ext);
    }

    await fs.writeFile(resolvedPath, content, "utf-8");
    return { success: true, filePath: resolvedPath, recordCount: records.length };
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw new FileError(`Failed to write dataset to ${filePath}`, filePath, error);
  }
}
