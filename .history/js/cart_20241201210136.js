document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    let tipoCambio = 45;  // Valor inicial de 1 USD = 45 UYU

    // Obtener el tipo de cambio de USD a UYU dinámicamente
    async function obtenerTipoCambio() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            tipoCambio = data.rates.UYU;  // Actualiza el tipo de cambio con la respuesta de la API
            renderCart();  // Vuelve a renderizar el carrito después de obtener el tipo de cambio
        } catch (error) {
            console.error("Error al obtener el tipo de cambio:", error);
        }
    }

    // Inicializa el tipo de cambio
    obtenerTipoCambio();

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

    // Consolidación de la lógica para actualizar la cantidad del producto
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

            // Actualizar la cantidad en el carrito
            const cartItems = getCartItems();
            cartItems[index].cantidad = newQuantity;

            localStorage.setItem("productoComprado", JSON.stringify(cartItems));
            renderCart();  // Volver a renderizar el carrito
        }
    });

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
