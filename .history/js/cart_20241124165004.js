document.addEventListener("DOMContentLoaded", function () {
    console.log("Datos en localStorage:", localStorage.getItem("productoComprado"));

    const cartItems = JSON.parse(localStorage.getItem("productoComprado")) || [];
    if (!Array.isArray(cartItems)) {
        console.error("Los datos del carrito no son válidos. Verifica cómo se guardaron en localStorage.");
    }

    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total");

    function renderCart() {
        let subtotal = 0;
        let monedaPrincipal = ""; // Define una moneda principal si es necesario
        cartItemsContainer.innerHTML = "";

        cartItems.forEach((producto, index) => {
            if (!producto || !producto.moneda || !producto.precio) {
                console.error("Producto inválido en el carrito:", producto);
                return; // Saltar este producto si faltan propiedades
            }

            const { nombre, moneda, precio, imagen, cantidad } = producto;
            const itemTotal = precio * cantidad;
            subtotal += itemTotal;

            if (!monedaPrincipal) {
                monedaPrincipal = moneda;
            } else if (monedaPrincipal !== moneda) {
                monedaPrincipal = "Mixta";
            }

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

        subtotalContainer.textContent = `${subtotal.toFixed(2)} ${monedaPrincipal === "Mixta" ? "UYU/USD" : monedaPrincipal}`;
        totalContainer.textContent = `${subtotal.toFixed(2)} ${monedaPrincipal === "Mixta" ? "UYU/USD" : monedaPrincipal}`;

        updateCartCounter();
    }

    // (El resto de tu código sigue igual)

    renderCart();
});
