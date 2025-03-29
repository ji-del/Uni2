const db = require('../database/database'); // Conexión a la base de datos

// Obtener todos los usuarios
const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Obtener un usuario por ID
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Obtener un usuario por email
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

// Crear un nuevo usuario
const createUser = (name, email) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, name, email });
        });
    });
};

// Actualizar usuario por ID
const updateUser = (id, name) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE users SET name = ? WHERE id = ?", [name, id], function (err) {
            if (err) reject(err);
            else resolve({ id, name });
        });
    });
};

module.exports = { getAllUsers, getUserById, getUserByEmail, createUser, updateUser };
