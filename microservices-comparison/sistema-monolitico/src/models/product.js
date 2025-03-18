const db = require("../database/database");

// Obtener todos los productos
const getAllProducts = (callback) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

// Obtener un producto por ID
const getProductById = (id, callback) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) return callback(err, null);
        if (!row) return callback({ status: 404, message: "Producto no encontrado." }, null);
        callback(null, row);
    });
};

// Crear un nuevo producto
const createProduct = (name, price, callback) => {
    if (!name || !price) {
        return callback({ status: 400, message: "Nombre y precio son obligatorios." }, null);
    }

    db.run("INSERT INTO products (name, price) VALUES (?, ?)", [name, price], function (err) {
        if (err) return callback(err, null);
        callback(null, { id: this.lastID, name, price });
    });
};

// Actualizar un producto
const updateProduct = (id, name, price, callback) => {
    if (!id || !name || !price) {
        return callback({ status: 400, message: "ID, nombre y precio son obligatorios." }, null);
    }

    db.run("UPDATE products SET name = ?, price = ? WHERE id = ?", [name, price, id], function (err) {
        if (err) return callback(err, null);
        if (this.changes === 0) return callback({ status: 404, message: "Producto no encontrado." }, null);
        callback(null, { id, name, price, message: "Producto actualizado correctamente." });
    });
};

// Eliminar un producto
const deleteProduct = (id, callback) => {
    if (!id) {
        return callback({ status: 400, message: "El ID es obligatorio para eliminar un producto." }, null);
    }

    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) return callback(err, null);
        if (this.changes === 0) return callback({ status: 404, message: "Producto no encontrado." }, null);
        callback(null, { message: "Producto eliminado correctamente." });
    });
};

// Exportar las funciones
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
