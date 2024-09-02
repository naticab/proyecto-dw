// URL del endpoint que devuelve el JSON de productos
const productsUrl = 'https://japceibal.github.io/emercado-api/cats_products/101.json'; 

// Función para crear las tarjetas de producto
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

// Función para cargar productos desde el JSON
async function loadProducts() {
    try {
        const response = await fetch(productsUrl);
        const data = await response.json();
        const products = data.products; // Accede a la propiedad 'products'
        const container = document.getElementById('products-container');

        products.forEach(product => {
            const productCard = createProductCard(product);
            container.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProducts);
