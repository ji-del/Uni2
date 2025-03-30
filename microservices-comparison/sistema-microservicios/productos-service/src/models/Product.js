const db = require('../database/database');

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products", [], (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};

module.exports = { getAllProducts };
