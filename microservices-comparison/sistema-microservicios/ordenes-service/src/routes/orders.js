const express = require('express');
const axios = require('axios');
const router = express.Router();
const orderModel = require('../models/Order');

// Ruta de bienvenida
router.get("/", (req, res) => {
    res.send("Bienvenido al microservicio de órdenes");
});

// Obtener todas las órdenes con detalles de usuario y producto
router.get('/orders', async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();

        // Obtener datos de usuarios y productos con manejo de errores
        let users = [];
        let products = [];

        try {
            const usersResponse = await axios.get('http://localhost:3001/users', { timeout: 5000 });
            users = usersResponse.data.users;
        } catch (error) {
            console.warn("⚠️ No se pudo obtener usuarios. Usando valores por defecto.");
        }

        try {
            const productsResponse = await axios.get('http://localhost:3002/products', { timeout: 5000 });
            products = productsResponse.data.products;
        } catch (error) {
            console.warn("⚠️ No se pudo obtener productos. Usando valores por defecto.");
        }

        // Enriquecer las órdenes con información de usuario y producto
        const enrichedOrders = orders.map(order => ({
            ...order,
            user: users.find(u => u.id === order.user_id) || "Usuario no disponible",
            product: products.find(p => p.id === order.product_id) || "Producto no disponible"
        }));

        res.json({ orders: enrichedOrders });

    } catch (error) {
        console.error("❌ Error interno al obtener órdenes:", error);
        res.status(500).json({ message: "Error interno al obtener órdenes" });
    }
});

// Crear una orden
router.post('/orders', async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ message: "Todos los campos son obligatorios: user_id, product_id, quantity." });
    }

    orderModel.createOrder(user_id, product_id, quantity, (err, newOrder) => {
        if (err) {
            res.status(500).json({ message: "Error al crear orden", error: err.message });
        } else {
            res.status(201).json({ order: newOrder });
        }
    });
});

module.exports = router;
