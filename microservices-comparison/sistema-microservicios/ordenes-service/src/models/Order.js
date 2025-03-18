const db = require('../database/database');  // Conexión a la base de datos
const axios = require('axios');

// Crear una nueva orden
const createOrder = (user_id, product_id, quantity, callback) => {
    db.run("INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, quantity], function(err) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, { id: this.lastID, user_id, product_id, quantity });
        }
    });
};

// Obtener todas las órdenes
const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};


// Obtener un usuario por ID desde el microservicio de usuarios
const getUserById = async (user_id) => {
    try {
        const response = await axios.get(`http://localhost:3001/users/${user_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuario:", error.message);
        return null;
    }
};

// Obtener un producto por ID desde el microservicio de productos
const getProductById = async (product_id) => {
    try {
        const response = await axios.get(`http://localhost:3002/products/${product_id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener producto:", error.message);
        return null;
    }
};

// Exportar todas las funciones correctamente
module.exports = { createOrder, getAllOrders, getUserById, getProductById };
