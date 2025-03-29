const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel'); // Asegúrate de que exista este modelo

router.get("/", (req, res) => {
    res.send("Bienvenido al microservicio de usuarios");
});

router.get('/users', async (req, res) => { 
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios.", error });
    }
});

module.exports = router;
