document.addEventListener("DOMContentLoaded", function() {
    // Traemos los productos del carrito desde localStorage
    const cartItems = JSON.parse(localStorage.getItem("productoComprado")) || [];
    console.log("Productos del carrito:", cartItems);  // Log para verificar qué hay en localStorage

    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    function renderCart() {
        let subtotal = 0;
        cartItemsContainer.innerHTML = "";  // Limpiar el carrito antes de renderizar

        // Verificar si hay productos en el carrito
        if (cartItems.length === 0) {
            console.log("El carrito está vacío.");
            cartItemsContainer.innerHTML = "<tr><td colspan='7'>El carrito está vacío</td></tr>";
            subtotalContainer.textContent = "0.00 USD";  // Ajusta según la moneda por defecto
            totalContainer.textContent = "0.00 USD";    // Ajusta según la moneda por defecto
            return;  // Salir de la función si no hay productos
        }

        // Obtener la moneda del primer producto (suponemos que todos usan la misma moneda)
        const moneda = cartItems[0].currency || 'USD'; // Valor por defecto 'USD' en caso de que la moneda no esté definida

        // Iterar sobre los productos del carrito
        cartItems.forEach((producto, index) => {
            const { name, currency, cost, image, quantity } = producto;
            const itemTotal = cost * quantity;
            subtotal += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${image}" alt="${name}" width="50"></td>
                <td>${name}</td>
                <th>${currency}</th>
                <td>${cost.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${quantity}" data-index="${index}" class="quantity-input">
                </td>
                <td>${itemTotal.toFixed(2)} ${currency}</td>
                <td><button class="remove-item fa fa-trash" data-index="${index}"></button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        // Mostrar el subtotal y total con la moneda correcta
        subtotalContainer.textContent = `${subtotal.toFixed(2)} ${moneda}`;
        totalContainer.textContent = `${subtotal.toFixed(2)} ${moneda}`;

        // Actualizamos el contador del carrito
        updateCartCounter();
    }

    // Función para actualizar el contador del carrito
    function updateCartCounter() {
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        
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
                cartItems[index].quantity = newQuantity;
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
            const { cost, quantity } = producto;
            subtotal += cost * quantity;
        });

        // Guardar el subtotal en localStorage
        localStorage.setItem('subtotal', subtotal.toFixed(2));

        // Redirigir a la página de checkout
        window.location.href = 'checkout.html';  
    });

    // Renderizar el carrito al cargar la página
    renderCart();  
});
