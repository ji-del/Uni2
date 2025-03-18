const db = require("../database/database");

/**
 * Obtiene todos los usuarios de la base de datos.
 * @param {Function} callback - Función de retorno para manejar el resultado.
 */
const getAllUsers = (callback) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return callback(err, null);
        callback(null, rows);
    });
};

/**
 * Obtiene un usuario por email.
 * @param {string} email - Email del usuario.
 * @param {Function} callback - Función de retorno para manejar el resultado.
 */
const getUserByEmail = (email, callback) => {
    if (!email) {
        return callback({ status: 400, message: "El email es obligatorio." }, null);
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) return callback(err, null);
        callback(null, row);
    });
};

/**
 * Crea un usuario si el email no existe o lo actualiza si ya está registrado.
 * @param {string} name - Nombre del usuario.
 * @param {string} email - Email del usuario.
 * @param {Function} callback - Función de retorno para manejar el resultado.
 */
const createOrUpdateUser = (name, email, callback) => {
    if (!name || !email) {
        return callback({ status: 400, message: "Nombre y correo son obligatorios." }, null);
    }

    getUserByEmail(email, (err, existingUser) => {
        if (err) return callback(err, null);

        if (existingUser) {
            // Si el usuario ya existe, actualizamos su nombre
            db.run("UPDATE users SET name = ? WHERE email = ?", [name, email], function (err) {
                if (err) return callback(err, null);
                callback(null, { id: existingUser.id, name, email, message: "Usuario actualizado correctamente." });
            });
        } else {
            // Si no existe, lo creamos
            db.run("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], function (err) {
                if (err) return callback(err, null);
                callback(null, { id: this.lastID, name, email, message: "Usuario creado correctamente." });
            });
        }
    });
};

/**
 * Actualiza un usuario existente por ID.
 * @param {number} id - ID del usuario.
 * @param {string} name - Nuevo nombre del usuario.
 * @param {string} email - Nuevo email del usuario.
 * @param {Function} callback - Función de retorno para manejar el resultado.
 */
const updateUser = (id, name, email, callback) => {
    if (!id || !name || !email) {
        return callback({ status: 400, message: "ID, nombre y correo son obligatorios." }, null);
    }

    // Verificar si el usuario existe antes de actualizarlo
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
        if (err) return callback(err, null);
        if (!user) return callback({ status: 404, message: "Usuario no encontrado." }, null);

        // Si existe, procedemos con la actualización
        db.run("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, id], function (err) {
            if (err) return callback(err, null);
            callback(null, { id, name, email, message: "Usuario actualizado correctamente." });
        });
    });
};
const deleteUser = (id, callback) => {
    if (!id) {
        return callback({ status: 400, message: "El ID es obligatorio para eliminar un usuario." }, null);
    }

    // Verificar si el usuario existe antes de eliminarlo
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
        if (err) return callback(err, null);
        if (!user) return callback({ status: 404, message: "Usuario no encontrado." }, null);

        // Si el usuario existe, proceder con la eliminación
        db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
            if (err) return callback(err, null);
            callback(null, { message: "Usuario eliminado correctamente." });
        });
    });
};

/**
 * Exportar funciones del modelo
 */
module.exports = { getAllUsers, getUserByEmail, createOrUpdateUser, updateUser, deleteUser };
