/**
 * Executes a test block within an isolated transaction.
 * Automatically rolls back the transaction when done to ensure 100% test isolation.
 */
export async function withTransactionIsolation(db, testCallback) {
  await db.beginTransaction();
  try {
    const result = await testCallback(db);
    return result;
  } finally {
    await db.rollback();
  }
}
