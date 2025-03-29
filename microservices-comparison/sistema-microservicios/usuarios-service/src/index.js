const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users'); // Importa correctamente el router

const app = express();
app.use(cors());
app.use(express.json());

// Verifica que esta línea está bien escrita
app.use('/api/usuarios', userRoutes); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Microservicio de Usuarios corriendo en http://localhost:${PORT}`);
});
