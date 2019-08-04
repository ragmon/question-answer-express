const db = require('./db').instance();

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS question (
        id INTEGER PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at DATETIME NOT NULL
    );
  `);

  db.run(`
      CREATE TABLE IF NOT EXISTS answer (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          question_id INTEGER NOT NULL,
          text TEXT NOT NULL,
          created_at DATETIME NOT NULL
      );
  
      CREATE INDEX answer_question_id_index ON answer(question_id);
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS rate (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resource_id INTEGER NOT NULL,
        resource_type VARCHAR(50) NOT NULL,
        action VARCHAR NOT NULL,
        created_at DATETIME NOT NULL
    );

    CREATE INDEX rate_resource_id_type_index ON rate(resource_id, resource_type);
  `);
});

db.close();