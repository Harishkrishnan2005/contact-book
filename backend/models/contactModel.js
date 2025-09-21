const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'db', 'contacts.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = {
  db,
  createContact: (contact, cb) => {
    const { name, email, phone } = contact;
    const sql = `INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)`;
    db.run(sql, [name, email || null, phone || null], function (err) {
      if (err) return cb(err);
      cb(null, { id: this.lastID });
    });
  },
  deleteContact: (id, cb) => {
    db.run(`DELETE FROM contacts WHERE id = ?`, [id], function (err) {
      if (err) return cb(err);
      cb(null, { changes: this.changes });
    });
  },
  getContacts: (page = 1, limit = 10, cb) => {
    const offset = (page - 1) * limit;
    db.all(`SELECT COUNT(*) as total FROM contacts`, [], (err, rows) => {
      if (err) return cb(err);
      const total = rows[0].total;
      db.all(
        `SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [limit, offset],
        (err2, data) => {
          if (err2) return cb(err2);
          cb(null, { total, page, limit, contacts: data });
        }
      );
    });
  }
};