const db = require('../db').instance();

class Rate {
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM rate WHERE id = ?`;

      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row)
      });
    });
  }

  static create(resourceType, resourceId, action) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO rate (resource_id, resource_type, action, created_at) VALUES (?, ?, ?, datetime('now'))`;

      db.run(sql, [resourceType, resourceId, action], function (err) {
        if (err) {
          reject(err);
        }
        Rate.find(this.lastID)
          .then(rate => resolve(rate))
          .catch(reason => reject(reason))
      });
    })
  }
}

// Rate actions
Rate.ACTION_UP = 'up';
Rate.ACTION_DOWN = 'down';

module.exports = Rate;