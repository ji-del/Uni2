const Order = require('../models/Order');

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener órdenes" });
    }
};

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const newOrder = await Order.create({ userId, productId, quantity });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden" });
    }
};
