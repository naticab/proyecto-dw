const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'usuario',    // tu usuario de MySQL
    password: 'contraseña', // tu contraseña de MySQL
    database: 'EmercadoDB'
});

// Verificar la conexión
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida.');
});

app.use(cors());
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

// Recibir items de carrito y guardar en database
app.post('/emercado-api-main/cart', (req, res) => {
    const { userId, items } = req.body;

    // Validar datos del cuerpo de la petición
    if (!userId || !items || !items.length) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    // Query para insertar datos
    const query = `
        INSERT INTO ShoppingCart (ProductId, UserId, ShoppingCartSubtotalPrice, ShoppingCartTotalPrice)
        VALUES ?
    `;

    // Construir los valores
    const values = items.map(item => [
        item.productId,
        userId,
        item.subtotal,
        item.total,
    ]);

    // Ejecutar la query
    db.query(query, [values], (err, result) => {
        if (err) {
            console.error("Error al guardar el carrito:", err.message);
            return res.status(500).json({ error: "Error del servidor", details: err.message });
        }
        res.status(201).json({ message: "Carrito guardado exitosamente", result });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Cerrar la conexión cuando el servidor se detenga
process.on('SIGINT', () => {
    db.end((err) => {
        if (err) console.error('Error al cerrar la conexión:', err);
        console.log('Conexión a la base de datos cerrada.');
        process.exit(0);
    });
});