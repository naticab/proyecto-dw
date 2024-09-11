

/*document.addEventListener('DOMContentLoaded', async () => {
    const productId = localStorage.getItem('selectedProductID');
    if (productId) {
        console.log(productId);
        const response = await fetch( PRODUCT_INFO_URL+`/${productId}${EXT_TYPE}`);
        const product = await response.json();
        console.log(product);
        // lleva el producto al HTML
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = `${product.currency} ${product.cost}`;
        document.getElementById('product-category').textContent = product.category;
        document.getElementById('product-sold').textContent = `${product.soldCount} vendidos`;
        document.getElementById('main-image').src = product.image;
        // Maneja la galería de imágenes y otros 
    }
});



// Función para hacer las tarjetas de producto
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-info">
                <div class="product-title">
                    <span>${product.name}</span>
                    <span>${product.currency} ${product.cost}</span>
                </div>
                <small>${product.soldCount} vendidos</small>
            </div>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-description">
                ${product.description}
            </div>
        </div>
    `;
}*/
