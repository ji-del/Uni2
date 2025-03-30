const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

// Obtener todos los productos
router.get("/", (req, res) => {
    productModel.getAllProducts((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ products: rows });
    });
});

// Obtener un producto por ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    productModel.getProductById(id, (err, product) => {
        if (err) return res.status(err.status || 500).json({ error: err.message });
        res.json({ product });
    });
});

// Crear un producto
router.post("/", (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Nombre y precio son obligatorios" });

    productModel.createProduct(name, price, (err, newProduct) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(newProduct);
    });
});

// Actualizar un producto
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Nombre y precio son obligatorios" });

    productModel.updateProduct(id, name, price, (err, updatedProduct) => {
        if (err) return res.status(err.status || 500).json({ error: err.message });
        res.json(updatedProduct);
    });
});

// Eliminar un producto
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    productModel.deleteProduct(id, (err, result) => {
        if (err) return res.status(err.status || 500).json({ error: err.message });
        res.json(result);
    });
});

module.exports = router;
