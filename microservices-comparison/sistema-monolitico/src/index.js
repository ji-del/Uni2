// Importamos Express y otros módulos
const express = require("express");
const cors = require("cors");

// Importamos las rutas
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

// Creamos la aplicación de Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.get("/", (req, res) => {
    res.send("Servidor Monolítico en funcionamiento...");
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
