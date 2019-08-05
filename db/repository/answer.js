const db = require('../db').instance();

class Answer {
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM answer WHERE id = ?`;

      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row)
      });
    });
  }

  static create(question_id, text) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO answer (question_id, text, created_at) VALUES (?, ?, datetime('now'))`;

      db.run(sql, [question_id, text], function (err) {
        if (err) {
          reject(err);
        }
        Answer.find(this.lastID)
          .then(answer => resolve(answer))
          .catch(reason => reject(reason))
      });
    });
  }

  static findByQuestionId(questionId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM answer WHERE question_id = ?`;

      db.all(sql, [questionId], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows)
      });
    });
  }
}

module.exports = Answer;