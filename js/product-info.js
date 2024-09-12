document.addEventListener('DOMContentLoaded', async () => {
    const productId = localStorage.getItem('selectedProductId');
    if (productId) {
        console.log(productId);
        const response = await fetch(PRODUCT_INFO_URL + `/${productId}${EXT_TYPE}`);
        const product = await response.json();
        console.log(productId);
        // lleva el producto al HTML
        document.getElementById('name').textContent = product.name;
        document.getElementById('description').textContent = product.description;
        document.getElementById('price').textContent = `${product.currency} ${product.cost}`;
        document.getElementById('category').textContent = product.category;
        document.getElementById('soldCount').textContent = `${product.soldCount} vendidos`;
        document.getElementById('images').src = product.image;

        let htmlToAppend="<div class=`row`>";
        for (let img of product.images){
            htmlToAppend += `<div class="col-4 mb-3"><img src="${img}" class="img-fluid"></div>`;
        }
        htmlToAppend += `</div>`;
        document.getElementById('images').innerHTML = htmlToAppend;
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
