const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbPath = './src/database/ordenes.db';
const dirPath = './src/database';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite de órdenes');
        db.run("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, user_id INTEGER, product_id INTEGER, quantity INTEGER)");
    }
});

module.exports = db;
