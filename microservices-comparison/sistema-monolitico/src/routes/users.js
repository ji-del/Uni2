const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

// Obtener todos los usuarios
router.get("/", (req, res) => {
    userModel.getAllUsers((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ users: rows });
    });
});

// Obtener un usuario por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    userModel.getUserById(id, (err, user) => {
        if (err) return res.status(err.status || 500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json({ user });
    });
});

// Crear o actualizar un usuario por email
router.post("/", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Nombre y email son obligatorios" });

    userModel.createOrUpdateUser(name, email, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(user); // Se devuelve 200 en ambos casos (creado o actualizado)
    });
});

// Actualizar un usuario por ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Nombre y email son obligatorios" });

    userModel.updateUser(id, name, email, (err, updatedUser) => {
        if (err) return res.status(err.status || 500).json({ error: err.message });
        res.json({ message: "Usuario actualizado correctamente", user: updatedUser });
    });
});

// Actualizar un usuario por email (sin ID)
router.put("/email/:email", (req, res) => {
    const { email } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "El nombre es obligatorio" });

    userModel.updateUserByEmail(email, name, (err, updatedUser) => {
        if (err) return res.status(err.status || 500).json({ error: err.message });
        res.json({ message: "Usuario actualizado correctamente", user: updatedUser });
    });
});

// Eliminar un usuario por ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    userModel.deleteUser(id, (err, result) => {
        if (err) return res.status(err.status || 500).json({ error: err.message });
        res.json(result);
    });
});

module.exports = router;
