// Importamos SQLite3 y el módulo 'path' para manejar rutas
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Definimos la ruta del archivo de la base de datos SQLite
const dbPath = path.resolve(__dirname, "database.sqlite");

// Creamos la conexión a la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Error al conectar con la base de datos:", err.message);
    } else {
        console.log("✅ Conectado a la base de datos SQLite");
    }
});

// Ejecutamos una serie de comandos SQL para crear las tablas si no existen
db.serialize(() => {
    // Tabla de usuarios
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID autoincremental
            name TEXT NOT NULL,                    -- Nombre del usuario
            email TEXT UNIQUE NOT NULL             -- Correo electrónico único
        )
    `);

    // Tabla de productos
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID autoincremental
            name TEXT NOT NULL,                    -- Nombre del producto
            price REAL NOT NULL                    -- Precio del producto
        )
    `);

    // Tabla de órdenes
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID autoincremental
            user_id INTEGER,                       -- ID del usuario que hizo la orden
            product_id INTEGER,                    -- ID del producto comprado
            quantity INTEGER NOT NULL,             -- Cantidad del producto comprado
            FOREIGN KEY(user_id) REFERENCES users(id),   -- Relación con la tabla users
            FOREIGN KEY(product_id) REFERENCES products(id) -- Relación con la tabla products
        )
    `);
});

// Exportamos la base de datos para usarla en otros módulos
module.exports = db;
