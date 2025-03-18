const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/orders');  // Rutas de órdenes

const app = express();
app.use(cors());
app.use(express.json());


console.log("Rutas de órdenes registradas");

// Definir las rutas
app.use('/orders', orderRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Microservicio de Órdenes corriendo en http://localhost:${PORT}`);
});
