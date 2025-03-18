const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');  // Rutas de usuarios

const app = express();
app.use(cors());
app.use(express.json());

// Definir las rutas
app.use('/users', userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Microservicio de Usuarios corriendo en http://localhost:${PORT}`);
});
