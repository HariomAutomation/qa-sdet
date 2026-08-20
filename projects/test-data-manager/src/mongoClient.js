/**
 * MongoDB Test Data Client
 *
 * Provides fixture insertion, cleanup tracking, collection clearing,
 * and test data teardown for MongoDB / NoSQL test environments.
 */
export class MongoTestClient {
  constructor(mongoDbOrMock) {
    this.db = mongoDbOrMock;
    this.trackedIds = new Map(); // collection -> array of ObjectIds
  }

  /**
   * Seeds documents into a given collection and tracks their IDs for automatic cleanup.
   *
   * @param {string} collectionName
   * @param {Record<string, any>[]} docs
   */
  async seedCollection(collectionName, docs) {
    if (!this.db || typeof this.db.collection !== "function") {
      // Simulator mode
      return docs.map((d, i) => ({ _id: `mock_id_${i + 1}`, ...d }));
    }

    const coll = this.db.collection(collectionName);
    const result = await coll.insertMany(docs);
    const ids = Object.values(result.insertedIds);

    if (!this.trackedIds.has(collectionName)) {
      this.trackedIds.set(collectionName, []);
    }
    this.trackedIds.get(collectionName).push(...ids);

    return ids;
  }

  /**
   * Deletes only the documents seeded during the current test execution.
   */
  async cleanupTrackedData() {
    if (!this.db || typeof this.db.collection !== "function") {
      this.trackedIds.clear();
      return { deletedCount: 0 };
    }

    let totalDeleted = 0;
    for (const [collName, ids] of this.trackedIds.entries()) {
      const coll = this.db.collection(collName);
      const res = await coll.deleteMany({ _id: { $in: ids } });
      totalDeleted += res.deletedCount;
    }

    this.trackedIds.clear();
    return { deletedCount: totalDeleted };
  }

  /**
   * Cleans entire collections (useful for suite-level teardown).
   */
  async dropOrClearCollections(collectionNames) {
    if (!this.db || typeof this.db.collection !== "function") return;
    for (const name of collectionNames) {
      await this.db.collection(name).deleteMany({});
    }
  }
}
