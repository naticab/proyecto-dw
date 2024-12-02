// server.js

const express = require('express');  // Importamos Express
const path = require('path');       // Para servir archivos estáticos
const cors = require('cors');       // Para habilitar CORS
const app = express();              // Creamos una instancia de Express
const PORT = 3000;                  // Puerto en el que correrá el servidor



// Middleware
app.use(cors());              // Habilitar CORS para solicitudes externas
app.use(express.json());       // Permite que Express maneje las solicitudes JSON


// Servir archivos estáticos de la carpeta 'emercado-api-main'
app.use(express.static(path.join(__dirname, 'emercado-api-main')));

// Ruta para obtener JSON de productos
app.get('/emercado-api-main/products/:index', (req, res) => {
    const index = req.params.index;
    const filePath = path.join(__dirname, 'emercado-api-main', 'products', `${index}.json`);
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: `Archivo ${index}.json no encontrado en products.` });
    });
});

// Otras rutas (por ejemplo, productos en categorías, etc.)
app.get('/emercado-api-main/categories', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'cats', 'cat.json');
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo cat.json no encontrado en cats.' });
    });
});

app.get('/emercado-api-main/cats_products/:index', (req, res) => {
    const index = req.params.index;
    const filePath = path.join(__dirname, 'emercado-api-main', 'cats_products', `${index}.json`);
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: `Archivo ${index}.json no encontrado en cats_products.` });
    });
});

// Manejo de la publicación de productos
app.get('/emercado-api-main/publish_product', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'sell', 'publish.json');
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo publish.json no encontrado en sell.' });
    });
});

// Ruta para obtener el carrito de un usuario específico
app.get('/emercado-api-main/cart_info', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'user_cart', '25801.json');
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo 25801.json no encontrado en user_cart.' });
    });
});

// Ruta para guardar el carrito en la base de datos
// Esto ya está incluido en cartApi.js como /emercado-api-main/cart
// Asegúrate de tener la base de datos correctamente configurada con la tabla ShoppingCart

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

