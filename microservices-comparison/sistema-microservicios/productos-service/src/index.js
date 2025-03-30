const express = require('express');
const app = express();
const { createProduct, getAllProducts } = require('./models/product');

app.use(express.json());

// Ruta de prueba para verificar que el servicio está activo
app.get('/', (req, res) => {
    res.send('Productos-service está funcionando correctamente');
});

app.post('/products', (req, res) => {
    const { name, price, stock } = req.body;
    createProduct(name, price, stock, (err, product) => {
        err ? res.status(500).json({ message: "Error al crear el producto" }) : res.status(201).json(product);
    });
});

app.get('/products', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
});

app.listen(3002, () => console.log("Productos-service corriendo en puerto 3002"));
