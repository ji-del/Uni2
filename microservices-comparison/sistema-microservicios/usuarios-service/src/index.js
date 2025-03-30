const express = require('express');
const app = express();
const { createUser, getAllUsers } = require('./models/user');

app.use(express.json());

// Ruta de prueba para verificar que el servicio está activo
app.get('/', (req, res) => {
    res.send('Usuarios-service está funcionando correctamente');
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    createUser(name, email, (err, user) => {
        err ? res.status(500).json({ message: "Error al crear el usuario" }) : res.status(201).json(user);
    });
});

app.get('/users', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
});

app.listen(3001, () => console.log("Usuarios-service corriendo en puerto 3001"));
