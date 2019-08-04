const db = require('../db').instance();

class Question {
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM question WHERE id = ?`;

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
      const sql = `SELECT * FROM question`;

      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  static create(title, description) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO question (title, description, created_at) VALUES (?, ?, datetime('now'))`;

      db.run(sql, [title, description], function (err) {
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