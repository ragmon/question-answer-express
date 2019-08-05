const db = require('./db').instance();

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS question (
        id INTEGER PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        user_id VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL
    );

    CREATE INDEX question_user_id_index ON question(user_id);
  `);

  db.run(`
      CREATE TABLE IF NOT EXISTS answer (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          question_id INTEGER NOT NULL,
          text TEXT NOT NULL,
          user_id VARCHAR(255) NOT NULL,
          created_at DATETIME NOT NULL
      );
  
      CREATE INDEX answer_question_id_index ON answer(question_id);
      CREATE INDEX answer_user_id_index ON answer(user_id);
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS rate (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resource_id INTEGER NOT NULL,
        resource_type VARCHAR(50) NOT NULL,
        action VARCHAR NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL
    );

    CREATE INDEX rate_resource_id_type_index ON rate(resource_id, resource_type);
    CREATE INDEX rate_user_id_index ON rate(user_id);
  `);
});

db.close();