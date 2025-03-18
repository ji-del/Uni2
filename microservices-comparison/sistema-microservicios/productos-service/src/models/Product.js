const db = require('../database/database');

// Crear un nuevo producto
const createProduct = (name, price, callback) => {
    db.run("INSERT INTO products (name, price) VALUES (?, ?)", [name, price], function(err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { id: this.lastID, name, price });
        }
    });
};

// Obtener todos los productos
const getAllProducts = (callback) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

module.exports = { createProduct, getAllProducts };
