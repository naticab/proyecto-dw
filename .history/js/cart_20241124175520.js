document.addEventListener("DOMContentLoaded", function () {
    // Traemos los productos del carrito desde localStorage
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    // Función para obtener los productos del carrito
    function getCartItems() {
        return JSON.parse(localStorage.getItem("productoComprado")) || [];
    }

    // Función para renderizar el carrito
    function renderCart() {
        const cartItems = getCartItems();
        let subtotal = 0;
        cartItemsContainer.innerHTML = "";

        // Renderizamos cada producto en el carrito
        cartItems.forEach((producto, index) => {
            const { nombre, moneda, precio, imagen, cantidad } = producto;
            const itemTotal = precio * cantidad;
            subtotal += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${imagen}" alt="${nombre}" width="50"></td>
                <td>${nombre}</td>
                <td>${moneda}</td>
                <td>${precio.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${cantidad}" data-index="${index}" class="quantity-input">
                </td>
                <td>${itemTotal.toFixed(2)} ${moneda}</td>
                <td><button class="remove-item fa fa-trash" data-index="${index}"></button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        // Mostrar el subtotal
        subtotalContainer.textContent = `${subtotal.toFixed(2)} ${cartItems.length > 0 ? cartItems[0].moneda : ''}`;
        totalContainer.textContent = `${subtotal.toFixed(2)} ${cartItems.length > 0 ? cartItems[0].moneda : ''}`;

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
            const { precio, cantidad } = producto;
            subtotal += precio * cantidad;
        });

        // Guardar el subtotal en localStorage
        localStorage.setItem('subtotal', subtotal.toFixed(2));

        // Redirigir a la página de checkout
        window.location.href = 'checkout.html';
    });

    // Renderizamos el carrito al cargar la página
    renderCart();
});
