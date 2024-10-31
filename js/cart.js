//Evento para cerrar sesión
document.getElementById('log-out').addEventListener('click', function () {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    sessionStorage.removeItem('user-name');
    
    console.log("Sesión cerrada correctamente.");
    
});

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
                <td>${precio.toFixed(2)} UYU</td>
                <td>
                  <input type="number" min="1" value="${cantidad}" data-index="${index}" class="quantity-input">
                </td>
                <td>${itemTotal.toFixed(2)} UYU</td>
                <td><button class="remove-item" data-index="${index}">Eliminar</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });

        subtotalContainer.textContent = `${subtotal.toFixed(2)} UYU`;
        totalContainer.textContent = `${subtotal.toFixed(2)} UYU`;
    }

    // Evento para eliminar un producto del carrito
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            cartItems.splice(index, 1);
            localStorage.setItem("productoComprado", JSON.stringify(cartItems));
            renderCart();
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
                renderCart();
            }
        }
    });
    

    // Evento para vaciar todo el carrito
    document.getElementById("empty-cart").addEventListener("click", () => {
        cartItems.length = 0;
        localStorage.removeItem("productoComprado");
        renderCart();
    });

    

    // Renderizar el carrito al cargar la página
    renderCart();
});