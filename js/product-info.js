document.addEventListener('DOMContentLoaded', async () => {
    const productId = localStorage.getItem('selectedProductId');
    if (productId) {
        const response = await fetch(PRODUCT_INFO_URL + `/${productId}${EXT_TYPE}`);
        const product = await response.json();
        console.log(productId);
        // lleva el producto al HTML
        document.getElementById('name').textContent = product.name;
        document.getElementById('description').textContent = product.description;
        document.getElementById('price').textContent = `${product.currency} ${product.cost}`;
        document.getElementById('category').textContent = product.category;
        document.getElementById('soldCount').textContent = `${product.soldCount} vendidos`;
        document.getElementById('mainImage').src = product.image;
        document.getElementById('related-products').src = `${product.relatedProducts}`;

          // Verifica que el array de imágenes exista y tenga al menos una imagen
          if (product.images.length > 0) {
            // Asigna la primera imagen del array como la imagen principal
            document.getElementById('mainImage').src = product.images[0];
        }

        let htmlToAppend="<div class='row'>";
        for (let img of product.images){
            htmlToAppend += `<div class=""><img src="${img}"></div>`;
        }
        htmlToAppend += `</div>`;
        document.getElementById('related-images').innerHTML = htmlToAppend;
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
}
