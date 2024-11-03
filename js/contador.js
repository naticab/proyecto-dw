document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar el elemento del contador del carrito
    const cartCount = document.getElementById("cart-count");

    // Verificar que el elemento cartCount exista
    if (!cartCount) {
        console.error("El elemento con id 'cart-count' no fue encontrado en el DOM.");
        return;
    }

    // Función para actualizar el contador del carrito
    function updateCartCount() {
        const storedCart = localStorage.getItem("productoComprado");
        let totalItems = 0;

        if (storedCart) {
            const cartList = JSON.parse(storedCart);
            // Sumar la cantidad de cada producto en el carrito
            totalItems = cartList.reduce((acc, prod) => acc + prod.cantidad, 0);
        }

        // Actualizar el contador en el icono del carrito
        cartCount.textContent = totalItems;
    }

    // Ejecutar la actualización del contador al cargar la página
    updateCartCount();

    // Seleccionar el botón de compra
    const buyButton = document.getElementById("buyButton");

    if (buyButton) {
        buyButton.addEventListener("click", () => {
            const productoComprado = {
                id: product.id,
                nombre: product.name,
                precio: product.cost,
                imagen: product.images[0],
                cantidad: 1
            };

            // Verificar si el carrito ya tiene productos
            let cartList = [];
            const storedCart = localStorage.getItem("productoComprado");
            if (storedCart) {
                cartList = JSON.parse(storedCart);
            }

            // Comprobar si el producto ya está en el carrito y actualizar la cantidad
            const indice = cartList.findIndex(prod => prod.id === productoComprado.id);
            if (indice > -1) {
                cartList[indice].cantidad++;
            } else {
                cartList.push(productoComprado);
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem("productoComprado", JSON.stringify(cartList));
            console.log("Producto guardado en localStorage:", productoComprado);

            // Actualizar el contador en el icono del carrito
            updateCartCount();

            showToast(`${product.name} fue agregado al carrito.`);
        });
    } else {
        console.error("'buyButton' no encontrado.");
    }
});
