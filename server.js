const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que el servidor entienda JSON
app.use(express.json());

// Ruta de prueba (GET)
app.get('/', (req, res) => {
    res.json({ mensaje: '¡Tu web service está funcionando correctamente!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
