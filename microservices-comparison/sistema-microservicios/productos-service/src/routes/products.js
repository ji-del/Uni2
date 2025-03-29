const express = require('express');
const router = express.Router();
const productModel = require('../models/Product');

// Ruta de bienvenida
router.get("/", (req, res) => {
    res.send("Bienvenido al microservicio de productos");
});

// Endpoint para crear un producto
router.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    productModel.createProduct(name, price, (err, newProduct) => {
        if (err) {
            res.status(500).json({ message: "Error al crear producto" });
        } else {
            res.status(201).json({ product: newProduct });
        }
    });
});

// Endpoint para obtener todos los productos
router.get('/products', (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) {
            res.status(500).json({ message: "Error al obtener productos" });
        } else {
            res.status(200).json({ products });
        }
    });
});

module.exports = router;
