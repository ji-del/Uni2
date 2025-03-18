const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta donde se almacenará la base de datos SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Crear la conexión a SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Error al conectar con la base de datos:", err.message);
    } else {
        console.log("✅ Conectado a la base de datos SQLite.");
    }
});

// Crear la tabla orders si no existe
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            product_id INTEGER,
            quantity INTEGER
        )
    `, (err) => {
        if (err) {
            console.error("❌ Error al crear la tabla orders:", err.message);
        } else {
            console.log("✅ Tabla orders verificada.");
        }
    });
});

module.exports = db;
