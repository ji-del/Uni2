const db = require('../database/database');
const axios = require('axios');

const createOrder = (user_id, product_id, quantity, callback) => {
    db.run("INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)", [user_id, product_id, quantity], function(err) {
        err ? callback(err, null) : callback(null, { id: this.lastID, user_id, product_id, quantity });
    });
};

const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM orders", [], (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};

module.exports = { createOrder, getAllOrders };
