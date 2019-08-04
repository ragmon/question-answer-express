const sqlite3 = require('sqlite3').verbose();

class DB {

  static instance() {
    if ( ! DB._db) {
      DB._db = new sqlite3.Database("database.db");
    }
    return DB._db;
  }

  static close() {
    if (DB._db) {
      DB._db.close()
    }
  }

}

module.exports = DB;