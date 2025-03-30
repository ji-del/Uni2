const express = require('express');
const app = express();
const { createOrder, getAllOrders } = require('./models/order');

app.use(express.json());

// Ruta de prueba para verificar que el servicio está activo
app.get('/', (req, res) => {
    res.send('Ordenes-service está funcionando correctamente');
});

app.post('/orders', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    createOrder(user_id, product_id, quantity, (err, order) => {
        err ? res.status(500).json({ message: "Error al crear la orden" }) : res.status(201).json(order);
    });
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener órdenes" });
    }
});

app.listen(3000, () => console.log("Ordenes-service corriendo en puerto 3000"));
