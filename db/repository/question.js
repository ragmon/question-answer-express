const db = require('../db').instance();

class Question {
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT *,
                          (SELECT COUNT(*)
                           FROM rate
                           WHERE action = 'up'
                             AND resource_id = q.id
                             AND resource_type = 'question') as rate_up,
                          (SELECT COUNT(*)
                           FROM rate
                           WHERE action = 'down'
                             AND resource_id = q.id
                             AND resource_type = 'question') as rate_down
                   FROM question AS q
                   WHERE id = ?`;

      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row)
      });
    });
  }

  static all() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT *,
                          (SELECT COUNT(*)
                           FROM rate
                           WHERE action = 'up'
                             AND resource_id = q.id
                             AND resource_type = 'question') as rate_up,
                          (SELECT COUNT(*)
                           FROM rate
                           WHERE action = 'down'
                             AND resource_id = q.id
                             AND resource_type = 'question') as rate_down
                   FROM question as q ORDER BY created_at DESC`;

      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  static create(title, description, userId) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO question (title, description, user_id, created_at)
                   VALUES (?, ?, ?, datetime('now'))`;

      db.run(sql, [title, description, userId], function (err) {
        if (err) {
          reject(err);
        }
        Question.find(this.lastID)
          .then(question => resolve(question))
          .catch(reason => reject(reason))
      });
    });
  }
}

module.exports = Question;