const db = require('../db').instance();

class Question {
  static find(id) {
    const sql = `SELECT * FROM question WHERE id = ?`;

    return db.get(sql, [id], (err, row) => {
      if (err) {
        throw err;
      }
      return row
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


    //
    // return items;
  }
}

module.exports = Question;