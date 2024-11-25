document.addEventListener("DOMContentLoaded", function () {
    // Obtener los productos del carrito desde localStorage
    const cartItems = JSON.parse(localStorage.getItem("productoComprado")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    // Función para renderizar el carrito
    function renderCart() {
        let subtotal = 0;
        let monedaPrincipal = ""; // Definir la moneda base
        cartItemsContainer.innerHTML = "";

        cartItems.forEach((producto, index) => {
            // Validar que el producto tenga las propiedades necesarias
            if (!producto || !producto.moneda || !producto.precio) {
                console.error("Producto inválido:", producto);
                return; // Ignorar productos inválidos
            }

            // Desestructurar las propiedades del producto
            const { nombre, moneda, precio, imagen, cantidad } = producto;

            // Calcular el subtotal del producto
            const itemTotal = precio * cantidad;
            subtotal += itemTotal;

            // Asignar la moneda base si no está definida aún
            if (!monedaPrincipal) {
                monedaPrincipal = moneda;
            } else if (monedaPrincipal !== moneda) {
                monedaPrincipal = "Mixta"; // Indicar mezcla de monedas
            }

            // Crear una fila para cada producto
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

            // Agregar la fila al contenedor
            cartItemsContainer.appendChild(row);
        });

        // Actualizar los valores de subtotal y total
        const displayCurrency = monedaPrincipal === "Mixta" ? "UYU/USD" : monedaPrincipal;
        subtotalContainer.textContent = `${subtotal.toFixed(2)} ${displayCurrency}`;
        totalContainer.textContent = `${subtotal.toFixed(2)} ${displayCurrency}`;

        // Actualizar el contador del carrito
        updateCartCounter();
    }

    // Actualizar el contador del carrito
    function updateCartCounter() {
        const cartCount = cartItems.reduce((total, item) => total + item.cantidad, 0);
        const cartCountElement = document.getElementById("cart-count");

        if (cartCountElement) {
            cartCountElement.textContent = cartCount > 0 ? cartCount : '0';
        }
    }

    // Eliminar un producto del carrito
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            cartItems.splice(index, 1); // Quitar el producto
            localStorage.setItem("productoComprado", JSON.stringify(cartItems)); // Actualizar localStorage
            renderCart(); // Renderizar de nuevo
        }
    });

    // Cambiar cantidad de producto y actualizar
    cartItemsContainer.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity-input")) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value, 10);

            if (newQuantity > 0) {
                cartItems[index].cantidad = newQuantity; // Actualizar cantidad
                localStorage.setItem("productoComprado", JSON.stringify(cartItems)); // Guardar cambios
                renderCart(); // Renderizar de nuevo
            }
        }
    });

    // Vaciar el carrito
    document.getElementById("empty-cart").addEventListener("click", () => {
        cartItems.length = 0; // Vaciar array
        localStorage.removeItem("productoComprado"); // Quitar del almacenamiento
        renderCart(); // Renderizar de nuevo
    });

    // Finalizar la compra
    document.getElementById("finalize-purchase").addEventListener("click", function () {
        let subtotal = 0;
        cartItems.forEach((producto) => {
            subtotal += producto.precio * producto.cantidad;
        });

        // Guardar subtotal en localStorage
        localStorage.setItem('subtotal', subtotal.toFixed(2));

        // Redirigir al checkout
        window.location.href = 'checkout.html';
    });

    // Renderizar el carrito al cargar
    renderCart();
});
