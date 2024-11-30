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




const connection = require('./db'); // Importa la conexión a MariaDB

// Endpoint POST /cart
app.post('/cart', (req, res) => {
    const { ProductId, UserId, ShoppingCartSubtotalPrice, ShoppingCartTotalPrice } = req.body;

    // Validar que se envíen los datos requeridos
    if (!ProductId || !UserId || !ShoppingCartSubtotalPrice || !ShoppingCartTotalPrice) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Query SQL para insertar en ShoppingCart
    const sql = `
        INSERT INTO ShoppingCart (ProductId, UserId, ShoppingCartSubtotalPrice, ShoppingCartTotalPrice)
        VALUES (?, ?, ?, ?)
    `;

    // Ejecutar la query
    connection.query(sql, [ProductId, UserId, ShoppingCartSubtotalPrice, ShoppingCartTotalPrice], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).json({ error: 'Error al guardar el carrito.' });
        }
        res.status(201).json({ message: 'Carrito creado con éxito.', ShoppingCartId: result.insertId });
    });
});
