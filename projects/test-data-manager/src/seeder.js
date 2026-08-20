/**
 * Test seeder module for batch inserting fixture data.
 */
export class TestDataSeeder {
  constructor(db) {
    this.db = db;
    this.seededTrackers = new Map(); // table -> array of ids
  }

  seedUsers(usersList) {
    const created = [];
    for (const user of usersList) {
      const record = this.db.insert("users", user);
      created.push(record);
      this.track("users", record.id);
    }
    return created;
  }

  seedOrders(ordersList) {
    const created = [];
    for (const order of ordersList) {
      const record = this.db.insert("orders", order);
      created.push(record);
      this.track("orders", record.id);
    }
    return created;
  }

  track(table, id) {
    if (!this.seededTrackers.has(table)) {
      this.seededTrackers.set(table, []);
    }
    this.seededTrackers.get(table).push(id);
  }

  cleanupSeeded() {
    let totalDeleted = 0;
    for (const [table, ids] of this.seededTrackers.entries()) {
      totalDeleted += this.db.delete(table, (row) => ids.includes(row.id));
    }
    this.seededTrackers.clear();
    return totalDeleted;
  }
}
