document.addEventListener("DOMContentLoaded", function() {
    // Traemos los productos del carrito desde localStorage
    const cartItems = JSON.parse(localStorage.getItem("productoComprado")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    function renderCart() {
        let subtotal = 0;
        cartItemsContainer.innerHTML = "";

        cartItems.forEach((producto, index) => {
            const { nombre, precio, imagen, cantidad } = producto;
            const itemTotal = precio * cantidad;
            subtotal += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${imagen}" alt="${nombre}" width="50"></td>
                <td>${nombre}</td>
                <td>${precio.toFixed(2)} ${moneda}</td>
                <td>
                    <input type="number" min="1" value="${cantidad}" data-index="${index}" class="quantity-input">
                </td>
                <td>${itemTotal.toFixed(2)} ${moneda}</td>
                <td><button class="remove-item fa fa-trash" data-index="${index}"></button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        subtotalContainer.textContent = `${subtotal.toFixed(2)} ${moneda}`;
        totalContainer.textContent = `${subtotal.toFixed(2)} ${moneda}`;

        // Actualizamos el contador del carrito
        updateCartCounter();
    }

    // Función para actualizar el contador del carrito
    function updateCartCounter() {
        const cartItems = JSON.parse(localStorage.getItem("productoComprado")) || [];
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
            cartItems.splice(index, 1);  // Eliminamos el producto
            localStorage.setItem("productoComprado", JSON.stringify(cartItems));  // Guardamos el carrito actualizado
            renderCart();  // Volvemos a renderizar el carrito
        }
    });

    // Evento para cambiar la cantidad y actualizar el localStorage
    cartItemsContainer.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity-input")) {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value, 10);

            if (newQuantity > 0) {
                cartItems[index].cantidad = newQuantity;
                localStorage.setItem("productoComprado", JSON.stringify(cartItems));
                renderCart();  // Volver a renderizar el carrito
            }
        }
    });

    // Evento para vaciar todo el carrito
    document.getElementById("empty-cart").addEventListener("click", () => {
        cartItems.length = 0;  // Vaciar el carrito
        localStorage.removeItem("productoComprado");
        renderCart();  // Volver a renderizar el carrito
    });

    // Evento para finalizar compra y guardar el subtotal en localStorage
    document.getElementById("finalize-purchase").addEventListener("click", function() {
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

    // Renderizar el carrito al cargar la página
    renderCart();  
});