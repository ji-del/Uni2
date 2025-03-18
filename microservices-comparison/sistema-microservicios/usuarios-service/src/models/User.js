const db = require('../database/database'); // Conexión a la base de datos

// Obtener todos los usuarios
const getAllUsers = (callback) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

// Obtener un usuario por ID
const getUserById = (id, callback) => {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) return callback(err, null);
        callback(null, row);
    });
};

// Obtener un usuario por email
const getUserByEmail = (email, callback) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) return callback(err, null);
        callback(null, row);
    });
};

// Crear un nuevo usuario
const createUser = (name, email, callback) => {
    db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
        if (err) return callback(err, null);
        callback(null, { id: this.lastID, name, email });
    });
};

// Actualizar usuario por ID
const updateUser = (id, name, callback) => {
    db.run("UPDATE users SET name = ? WHERE id = ?", [name, id], function (err) {
        if (err) return callback(err, null);
        callback(null, { id, name });
    });
};

module.exports = { getAllUsers, getUserById, getUserByEmail, createUser, updateUser };
