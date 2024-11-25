document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    // Tipo de cambio estático (puedes obtenerlo dinámicamente desde una API)
    const tipoCambio = 45;  // Ejemplo de 1 USD = 45 UYU

    // Función para obtener los productos del carrito
    function getCartItems() {
        return JSON.parse(localStorage.getItem("productoComprado")) || [];
    }

    // Función para convertir USD a UYU
    function convertirUSDaUYU(precioUSD) {
        return precioUSD * tipoCambio;
    }

    // Función para renderizar el carrito
    function renderCart() {
        const cartItems = getCartItems();
        let subtotal = 0;
        cartItemsContainer.innerHTML = "";

        // Renderizamos cada producto en el carrito
        cartItems.forEach((producto, index) => {
            const { nombre, moneda, precio, imagen, cantidad } = producto;
            let precioFinal = precio;
            let monedaFinal = moneda;

            // Si la moneda es USD, convertimos el precio a UYU
            if (moneda === "USD") {
                precioFinal = convertirUSDaUYU(precio);
                monedaFinal = "UYU";  // Cambiar la moneda a UYU
            }

            const itemTotal = precioFinal * cantidad;
            subtotal += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `<div class="align-items-center">
                <td><img src="${imagen}" alt="${nombre}" width="50"></td>
                <td>${nombre}</td>
                <td>${monedaFinal}</td>
                <td>${precioFinal.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${cantidad}" data-index="${index}" class="quantity-input">
                </td>
                <td>${itemTotal.toFixed(2)} ${monedaFinal}</td>
                <td><button class="remove-item fa fa-trash" data-index="${index}"></button></td></div>
            `;

            cartItemsContainer.appendChild(row);
        });

        // Mostrar el subtotal y el total en UYU
        subtotalContainer.textContent = `${subtotal.toFixed(2)} UYU`;
        totalContainer.textContent = `${subtotal.toFixed(2)} UYU`;

        // Actualizar el contador de productos
        updateCartCounter();
    }

    // Función para actualizar el contador de productos en el carrito
    function updateCartCounter() {
        const cartItems = getCartItems();
        const cartCount = cartItems.reduce((total, item) => total + item.cantidad, 0);

        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cartCount > 0 ? cartCount : '0';
        }
    }

    // Evento para eliminar un producto del carrito
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            const cartItems = getCartItems();
            cartItems.splice(index, 1);  // Eliminamos el producto

            // Guardamos el carrito actualizado en localStorage
            localStorage.setItem("productoComprado", JSON.stringify(cartItems));

            renderCart();  // Volver a renderizar el carrito
        }
    });

    // Evento para cambiar la cantidad y actualizar el carrito
    cartItemsContainer.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity-input")) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value, 10);

            if (newQuantity > 0) {
                const cartItems = getCartItems();
                cartItems[index].cantidad = newQuantity; // Actualizar la cantidad

                // Guardamos el carrito actualizado en localStorage
                localStorage.setItem("productoComprado", JSON.stringify(cartItems));

                renderCart();  // Volver a renderizar el carrito
            }
        }
    });

    // Evento para vaciar el carrito
    document.getElementById("empty-cart").addEventListener("click", () => {
        localStorage.removeItem("productoComprado");
        renderCart();  // Volver a renderizar el carrito
    });

    // Evento para finalizar compra
    document.getElementById("finalize-purchase").addEventListener("click", function () {
        const cartItems = getCartItems();
        let subtotal = 0;
        cartItems.forEach((producto) => {
            const { precio, cantidad, moneda } = producto;
            if (moneda === "USD") {
                subtotal += convertirUSDaUYU(precio) * cantidad;
            } else {
                subtotal += precio * cantidad;
            }
        });

        // Guardar el subtotal en localStorage
        localStorage.setItem('subtotal', subtotal.toFixed(2));

        // Redirigir a la página de checkout
        window.location.href = 'checkout.html';
    });

    // Renderizamos el carrito al cargar la página
    renderCart();
});
