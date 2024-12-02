const express = require('express');
const router = express.Router();

// Endpoint POST /emercado-api-main/cart para guardar el carrito
module.exports = (db) => {
    router.post("/", (req, res) => {
        const { userId, items } = req.body;

        // Validar los datos del cuerpo de la solicitud
        if (!userId || !items || !items.length) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        // Preparamos los valores para insertar en la base de datos
        const insertItems = items.map(item => [
            item.productId,
            userId,
            item.subtotal,
            item.total,
        ]);

        // Consulta SQL para insertar los ítems del carrito
        const query = `
            INSERT INTO ShoppingCart (ProductId, UserId, ShoppingCartSubtotalPrice, ShoppingCartTotalPrice)
            VALUES ?
        `;

        // Ejecutamos la consulta
        db.query(query, [insertItems], (err, result) => {
            if (err) {
                console.error("Error al guardar el carrito:", err.message);
                return res.status(500).json({ error: "Error del servidor", details: err.message });
            }
            res.status(201).json({ message: "Carrito guardado exitosamente", result });
        });
    });

    return router;  // Devolvemos el router para ser utilizado en el servidor
};
