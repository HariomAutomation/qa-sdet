# 🗄️ Test Data Manager

Production-grade database fixture management, seeding, and transaction-isolated test execution framework.

## 🚀 Key Features

1. **Transaction-Based Test Isolation (`withTransactionIsolation`)**: Runs tests inside `BEGIN ... ROLLBACK` blocks so zero test pollution remains.
2. **Dynamic Seeding & Tracking (`TestDataSeeder`)**: Auto-tracks generated primary keys for selective batch cleanup.
3. **PostgreSQL & MongoDB Support**: Integrated test drivers for relational (PostgreSQL) and document (MongoDB) test suites.
4. **Query Performance Analyzer (`QueryPerformanceAnalyzer`)**: Inspects `EXPLAIN` execution plans to catch unindexed sequential scans and expensive joins.

## 🧪 Running Tests

```bash
npm test
```
