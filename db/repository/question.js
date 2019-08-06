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

    static all(userId) {
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
                             AND resource_type = 'question') as rate_down,
                          (SELECT COUNT(*)
                           FROM answer as a
                           WHERE a.question_id = q.id
                             AND a.user_id = ?)              as was_answered
                   FROM question as q
                   ORDER BY created_at DESC`;

            db.all(sql, [userId], (err, rows) => {
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

    static delete(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE
                   FROM question
                   WHERE id = ?`;

            db.run(sql, [id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        })
    }

    static update(id, title, description) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE question
                   SET title       = ?,
                       description = ?
                   WHERE id = ?`;

            db.run(sql, [title, description, id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Question;