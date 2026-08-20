/**
 * Query Performance Analyzer
 *
 * Inspects EXPLAIN outputs from relational engines and warns about:
 * - Sequential Scans on large tables (missing indexes)
 * - High execution cost or excessive buffer reads
 * - Inefficient nested loop joins
 */
export class QueryPerformanceAnalyzer {
  /**
   * Analyzes an EXPLAIN result plan.
   *
   * @param {Record<string, any>} plan
   * @returns {{ hasSeqScan: boolean, warnings: string[], cost: number, recommendations: string[] }}
   */
  static analyzePlan(plan) {
    const warnings = [];
    const recommendations = [];
    let hasSeqScan = false;
    let totalCost = 0;

    function walkNode(node) {
      if (!node) return;

      const nodeType = node["Node Type"] || "";
      const cost = node["Total Cost"] || 0;
      totalCost = Math.max(totalCost, cost);

      if (nodeType.includes("Seq Scan")) {
        hasSeqScan = true;
        const relation = node["Relation Name"] || "unknown table";
        warnings.push(`Sequential Scan detected on table '${relation}' (Cost: ${cost})`);
        recommendations.push(
          `Consider adding a B-Tree index on filtered/joined columns of '${relation}'`
        );
      }

      if (nodeType.includes("Nested Loop") && cost > 5000) {
        warnings.push(`High cost Nested Loop join detected (${cost})`);
        recommendations.push(`Ensure foreign keys have indexes or query statistics are updated`);
      }

      if (node["Plans"] && Array.isArray(node["Plans"])) {
        node["Plans"].forEach(walkNode);
      }
    }

    walkNode(plan);

    return {
      hasSeqScan,
      warnings,
      cost: totalCost,
      recommendations,
      isOptimal: warnings.length === 0,
    };
  }
}
