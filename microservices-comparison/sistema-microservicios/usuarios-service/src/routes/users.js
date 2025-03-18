const express = require('express');
const router = express.Router();
const userModel = require('../models/User'); // Importamos el modelo de usuarios

// Obtener todos los usuarios
router.get('/', (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ message: "Error al obtener usuarios." });
        }
        res.status(200).json({ users });
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    userModel.getUserById(id, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Error al obtener usuario." });
        }
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        res.status(200).json({ user });
    });
});

// Crear un nuevo usuario o actualizar si el correo ya existe
router.post('/', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "El nombre y el correo son obligatorios." });
    }

    userModel.getUserByEmail(email, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ message: "Error en la base de datos." });
        }

        if (existingUser) {
            // Si el usuario ya existe, actualizamos su nombre
            userModel.updateUser(existingUser.id, name, (err, updatedUser) => {
                if (err) {
                    return res.status(500).json({ message: "Error al actualizar usuario." });
                }
                return res.status(200).json({ message: "Usuario actualizado.", user: updatedUser });
            });
        } else {
            // Si no existe, lo creamos
            userModel.createUser(name, email, (err, newUser) => {
                if (err) {
                    return res.status(500).json({ message: "Error al crear usuario." });
                }
                res.status(201).json({ user: newUser });
            });
        }
    });
});

module.exports = router;
