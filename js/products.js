// URL del endpoint que devuelve el JSON de productos
const productsUrl = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

let products = []; // Para almacenar los productos cargados

// Función para crear las tarjetas de producto
function createProductCard(product) {
    return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><small class="text-muted">Precio: ${product.currency} ${product.cost}</small></p>
                        <p class="card-text"><small class="text-muted">${product.soldCount} vendidos</small></p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para renderizar los productos
function renderProducts(productsToRender) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Limpiar el contenedor

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        container.innerHTML += productCard;
    });
}

// Función para cargar productos desde el JSON
async function loadProducts() {
    try {
        const response = await fetch(productsUrl);
        const data = await response.json();
        products = data.products; // Accede a la propiedad 'products'
        renderProducts(products); // Renderizar productos iniciales
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para aplicar filtros
function applyFilters() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    const filteredProducts = products.filter(product => 
        product.cost >= minPrice && product.cost <= maxPrice
    );

    applySorting(filteredProducts); // Aplicar la ordenación en los productos filtrados
}

// Función para aplicar ordenación
function applySorting(productsToSort = products) {
    const sortOrder = document.getElementById('sortOrder').value;
    
    let sortedProducts = [...productsToSort];

    if (sortOrder === 'priceAsc') {
        sortedProducts.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === 'priceDesc') {
        sortedProducts.sort((a, b) => b.cost - a.cost);
    } else if (sortOrder === 'relevanceDesc') {
        sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
    }

    renderProducts(sortedProducts);
}

// Event listeners para los controles de filtro y ordenación
document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('sortOrder').addEventListener('change', () => applySorting(products));

// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProducts);
