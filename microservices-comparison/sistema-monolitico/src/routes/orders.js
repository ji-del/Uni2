// Importamos Express y el modelo de órdenes
const express = require("express");
const orderModel = require("../models/order");

// Creamos el router de órdenes
const router = express.Router();

/**
 * Obtener todas las órdenes
 */
router.get("/", (req, res) => {
    orderModel.getAllOrders((err, orders) => {
        if (err) {
            res.status(500).json({ error: "Error al obtener órdenes" });
        } else {
            res.json({ orders });
        }
    });
});

/**
 * Obtener una orden por ID
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    orderModel.getOrderById(id, (err, order) => {
        if (err || !order) {
            res.status(404).json({ error: "Orden no encontrada" });
        } else {
            res.json({ order });
        }
    });
});

/**
 * Crear una nueva orden
 */
router.post("/", (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ error: "userId, productId y quantity son requeridos" });
    }

    orderModel.createOrder(userId, productId, quantity, (err, order) => {
        if (err) {
            res.status(500).json({ error: "Error al crear la orden" });
        } else {
            res.status(201).json({ message: "Orden creada", order });
        }
    });
});

/**
 * Eliminar una orden por ID
 */
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    orderModel.deleteOrder(id, (err, changes) => {
        if (err || changes === 0) {
            res.status(404).json({ error: "Orden no encontrada" });
        } else {
            res.json({ message: "Orden eliminada" });
        }
    });
});

// Exportamos las rutas
module.exports = router;
