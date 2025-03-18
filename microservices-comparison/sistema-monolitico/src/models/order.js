// Importamos la conexión con la base de datos
const db = require("../database/database");

/**
 * Obtiene todas las órdenes de la base de datos.
 * @param {Function} callback Función de devolución de llamada con los resultados.
 */
const getAllOrders = (callback) => {
    db.all("SELECT * FROM orders", [], callback);
};

/**
 * Obtiene una orden por su ID.
 * @param {number} id ID de la orden a buscar.
 * @param {Function} callback Función de devolución de llamada con el resultado.
 */
const getOrderById = (id, callback) => {
    db.get("SELECT * FROM orders WHERE id = ?", [id], callback);
};

/**
 * Crea una nueva orden en la base de datos.
 * @param {number} userId ID del usuario que realiza la orden.
 * @param {number} productId ID del producto comprado.
 * @param {number} quantity Cantidad de productos comprados.
 * @param {Function} callback Función de devolución de llamada con el resultado.
 */
const createOrder = (userId, productId, quantity, callback) => {
    db.run(
        "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, productId, quantity],
        function (err) {
            callback(err, { id: this.lastID, userId, productId, quantity });
        }
    );
};

/**
 * Elimina una orden por su ID.
 * @param {number} id ID de la orden a eliminar.
 * @param {Function} callback Función de devolución de llamada con el resultado.
 */
const deleteOrder = (id, callback) => {
    db.run("DELETE FROM orders WHERE id = ?", [id], function (err) {
        callback(err, this.changes);
    });
};

// Exportamos las funciones para usarlas en las rutas
module.exports = { getAllOrders, getOrderById, createOrder, deleteOrder };
