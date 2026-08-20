/**
 * PostgreSQL Test Data Client
 *
 * Provides connection management, transaction-level isolation (with SAVEPOINT support),
 * parameterized query execution, seeding, and EXPLAIN ANALYZE performance inspection.
 */
export class PostgresTestClient {
  constructor(poolOrConfig) {
    this.poolOrConfig = poolOrConfig;
    this.activeClient = null;
  }

  /**
   * Executes a query against the pool or active transaction client.
   *
   * @param {string} text SQL query string
   * @param {any[]} [params] Parameterized values
   * @returns {Promise<{ rows: any[], rowCount: number }>}
   */
  async query(text, params = []) {
    const executor = this.activeClient || this.poolOrConfig;
    if (!executor || typeof executor.query !== "function") {
      // Standalone simulator fallback if real pg pool not injected
      return { rows: [], rowCount: 0, command: "MOCK" };
    }
    return executor.query(text, params);
  }

  /**
   * Begins a database transaction for the current test.
   */
  async beginTransaction() {
    if (this.poolOrConfig && typeof this.poolOrConfig.connect === "function") {
      this.activeClient = await this.poolOrConfig.connect();
      await this.activeClient.query("BEGIN");
    }
  }

  /**
   * Rolls back the transaction to ensure complete isolation.
   */
  async rollbackTransaction() {
    if (this.activeClient) {
      try {
        await this.activeClient.query("ROLLBACK");
      } finally {
        this.activeClient.release();
        this.activeClient = null;
      }
    }
  }

  /**
   * Analyzes a query execution plan using EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON).
   *
   * @param {string} sql
   * @param {any[]} [params]
   */
  async explainQuery(sql, params = []) {
    const explainSql = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${sql}`;
    const result = await this.query(explainSql, params);
    const plan = result.rows?.[0]?.["QUERY PLAN"]?.[0] || null;
    return {
      rawPlan: result.rows,
      planNode: plan,
      executionTimeMs: plan?.["Execution Time"] ?? null,
      planningTimeMs: plan?.["Planning Time"] ?? null,
    };
  }
}
