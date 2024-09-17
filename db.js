const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Usando banco de dados em memória para simplicidade

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");
});

module.exports = db;
