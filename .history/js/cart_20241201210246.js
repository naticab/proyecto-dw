document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    const tipoCambio = 45;  // Ejemplo de 1 USD = 45 UYU

    function getCartItems() {
        return JSON.parse(localStorage.getItem("productoComprado")) || [];
    }

    function convertirUSDaUYU(precioUSD) {
        return precioUSD * tipoCambio;
    }

    function renderCart() {
        const cartItems = getCartItems();
        let subtotal = 0;
        cartItemsContainer.innerHTML = "";

        cartItems.forEach((producto, index) => {
            const { nombre, moneda, precio, imagen, cantidad } = producto;
            let precioFinal = precio;
            let monedaFinal = moneda;

            if (moneda === "USD") {
                precioFinal = convertirUSDaUYU(precio);
                monedaFinal = "UYU";
            }

            const itemTotal = precioFinal * cantidad;
            subtotal += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${imagen}" alt="${nombre}" width="50"></td>
                <td>${nombre}</td>
                <td>${monedaFinal}</td>
                <td>${precioFinal.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${cantidad}" data-index="${index}" class="quantity-input">
                </td>
                <td>${itemTotal.toFixed(2)} ${monedaFinal}</td>
                <td><button class="remove-item fa fa-trash" data-index="${index}"></button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        subtotalContainer.textContent = `${subtotal.toFixed(2)} UYU`;
        totalContainer.textContent = `${subtotal.toFixed(2)} UYU`;

        updateCartCounter();
    }

    function updateCartCounter() {
        const cartItems = getCartItems();
        const cartCount = cartItems.reduce((total, item) => total + item.cantidad, 0);

        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cartCount > 0 ? cartCount : '0';
        }
    }

    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            const cartItems = getCartItems();
            cartItems.splice(index, 1);

            localStorage.setItem("productoComprado", JSON.stringify(cartItems));
            renderCart();
        }
    });

    // Evento para cambiar la cantidad y actualizar el carrito
    cartItemsContainer.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity-input")) {
            const input = event.target;
            const index = input.dataset.index;

            // Asegurarse de que la cantidad sea válida
            let newQuantity = parseInt(input.value, 10);
            if (newQuantity <= 0 || isNaN(newQuantity)) {
                input.value = 1;  // Si no es válida, restablecerla a 1
                return;
            }

            // Se actualiza la cantidad en el carrito
            const cartItems = getCartItems();
            cartItems[index].cantidad = newQuantity;

            localStorage.setItem("productoComprado", JSON.stringify(cartItems));
        }
    });

    // Función para manejar el evento 'blur' (cuando el input pierde foco)
    function handleQuantityChange(event) {
        const input = event.target;
        const index = input.dataset.index;
        const newQuantity = parseInt(input.value, 10);

        if (newQuantity > 0) {
            const cartItems = getCartItems();
            cartItems[index].cantidad = newQuantity;

            // Guardar carrito actualizado
            localStorage.setItem("productoComprado", JSON.stringify(cartItems));
            renderCart();  // Volver a renderizar el carrito
        }
    }

    // Añadir evento para cuando el usuario hace "Enter"
    cartItemsContainer.addEventListener("keydown", (event) => {
        if (event.target.classList.contains("quantity-input") && event.key === "Enter") {
            handleQuantityChange(event);
        }
    });

    // Añadir evento para cuando el input pierde foco
    cartItemsContainer.addEventListener("blur", (event) => {
        if (event.target.classList.contains("quantity-input")) {
            handleQuantityChange(event);
        }
    }, true);  // Usamos `true` para capturar el evento en fase de captura

    document.getElementById("empty-cart").addEventListener("click", () => {
        localStorage.removeItem("productoComprado");
        renderCart();
    });

    document.getElementById("finalize-purchase").addEventListener("click", function () {
        const cartItems = getCartItems();

        if (cartItems.length === 0) {
            // Deshabilitar finalizar compra si el carrito está vacío
            alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
            return;
        }

        let subtotal = 0;
        cartItems.forEach((producto) => {
            const { precio, cantidad, moneda } = producto;
            if (moneda === "USD") {
                subtotal += convertirUSDaUYU(precio) * cantidad;
            } else {
                subtotal += precio * cantidad;
            }
        });

        localStorage.setItem('subtotal', subtotal.toFixed(2));
        window.location.href = 'checkout.html';
    });

    renderCart();
});

const express = require("express");

module.exports = (db) => {
    const router = express.Router();

    // Endpoint POST /cart
    router.post("/", (req, res) => {
        const { userId, items } = req.body;

        if (!userId || !items || !items.length) {
            return res.status(400).json({ error: "Datos incompletos" });
        }

        // Construir la consulta SQL para insertar los ítems
        const insertItems = items.map(item => [
            item.productId,
            userId,
            item.subtotal,
            item.total,
        ]);

        const query = `
            INSERT INTO ShoppingCart (ProductId, UserId, ShoppingCartSubtotalPrice, ShoppingCartTotalPrice)
            VALUES ?
        `;

        db.query(query, [insertItems], (err, result) => {
            if (err) {
                console.error("Error al insertar en la base de datos:", err);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
            res.status(201).json({ message: "Carrito guardado exitosamente", data: result });
        });
    });

    return router;
};
