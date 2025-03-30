const db = require('../database/database');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", [], (err, rows) => {
            err ? reject(err) : resolve(rows);
        });
    });
};

module.exports = { getAllUsers };
