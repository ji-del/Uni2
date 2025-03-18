const express = require('express');
const app = express();
const productsRoutes = require('./routes/products');

app.use(express.json());
app.use('/products', productsRoutes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Microservicio de Productos corriendo en http://localhost:${PORT}`);
});
