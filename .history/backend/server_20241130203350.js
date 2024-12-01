const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const cors = require('cors');


app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// JSON de mensaje del carrito
app.get('/emercado-api-main/cart/buy.json', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'cart', 'buy.json');
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo buy.json no encontrado en cart.' });
    });
});

// JSON de categorías
app.get('/emercado-api-main/categories', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'cats', 'cat.json');
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo cat.json no encontrado en cats.' });
    });
});

// JSON de productos en categorías
app.get('/emercado-api-main/cats_products/:index', (req, res) => {
    const index = req.params.index;
    const filePath = path.join(__dirname, 'emercado-api-main', 'cats_products', `${index}.json`);
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: `Archivo ${index}.json no encontrado en cats_products.` });
    });
});

// JSON de productos
app.get('/emercado-api-main/products/:index', (req, res) => {
    const index = req.params.index;
    const filePath = path.join(__dirname, 'emercado-api-main', 'products', `${index}.json`);
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: `Archivo ${index}.json no encontrado en products.` });
    });
});

// JSON de comentarios de productos
app.get('/emercado-api-main/products_comments/:index', (req, res) => {
    const index = req.params.index;
    const filePath = path.join(__dirname, 'emercado-api-main', 'products_comments', `${index}.json`);
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: `Archivo ${index}.json no encontrado en products_comments.` });
    });
});

// JSON de publicación de producto
app.get('/emercado-api-main/publish_product', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'sell', 'publish.json');
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo publish.json no encontrado en sell.' });
    });
});

// JSON de usuario del carrito
app.get('/emercado-api-main/cart_info', (req, res) => {
    const filePath = path.join(__dirname, 'emercado-api-main', 'user_cart', '25801.json');
    res.sendFile(filePath, (err) => {
        if (err) res.status(404).json({ error: 'Archivo 25801.json no encontrado en user_cart.' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


