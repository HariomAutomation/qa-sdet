/**
 * Lightweight in-memory SQL/Relational mock client supporting transactions (BEGIN, COMMIT, ROLLBACK),
 * seed operations, queries, and complete test isolation.
 */
export class DatabaseClient {
  constructor() {
    this.tables = new Map();
    this.inTransaction = false;
    this.snapshot = null;
  }

  createTable(name, schema = []) {
    this.tables.set(name, []);
  }

  async beginTransaction() {
    if (this.inTransaction) throw new Error("A transaction is already active");
    this.inTransaction = true;
    // Snapshot current state for rollback
    this.snapshot = new Map();
    for (const [table, rows] of this.tables.entries()) {
      this.snapshot.set(table, JSON.parse(JSON.stringify(rows)));
    }
  }

  async commit() {
    if (!this.inTransaction) throw new Error("No active transaction to commit");
    this.inTransaction = false;
    this.snapshot = null;
  }

  async rollback() {
    if (!this.inTransaction) throw new Error("No active transaction to rollback");
    this.tables = this.snapshot;
    this.inTransaction = false;
    this.snapshot = null;
  }

  insert(table, row) {
    if (!this.tables.has(table)) {
      this.tables.set(table, []);
    }
    const rows = this.tables.get(table);
    const newRow = { id: rows.length + 1, ...row, createdAt: new Date().toISOString() };
    rows.push(newRow);
    return newRow;
  }

  find(table, predicate = () => true) {
    if (!this.tables.has(table)) return [];
    return this.tables.get(table).filter(predicate);
  }

  delete(table, predicate = () => true) {
    if (!this.tables.has(table)) return 0;
    const initialCount = this.tables.get(table).length;
    const remaining = this.tables.get(table).filter((row) => !predicate(row));
    this.tables.set(table, remaining);
    return initialCount - remaining.length;
  }

  clearTable(table) {
    if (this.tables.has(table)) {
      this.tables.set(table, []);
    }
  }

  clearAll() {
    for (const table of this.tables.keys()) {
      this.tables.set(table, []);
    }
  }
}
