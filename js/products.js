// Definimos la variable de manera global para que sea accesible en toda la página
let products = [];
let filteredProducts = [];

// URL del endpoint que devuelve el JSON de productos
function getCatID() {
    const catID = localStorage.getItem("catID");
    return catID ? catID : '101'; // Si no hay catID en localStorage, usar '101' por defecto
}

// Función para crear las tarjetas de producto
function createProductCard(product) {
    return `
        <div class="product-card">
            <a href="product-info.html" onclick="saveProductId(${product.id})" class="products-link product-card-link">
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
            </div></a>
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

// Función para guardar el ID del producto seleccionado
function saveProductId(productId) {
    localStorage.setItem('selectedProductId', productId);
}

// Función para cargar productos desde el JSON
async function loadProducts() {
    const catID = getCatID();
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    try {
        const response = await fetch(productsUrl);
        const data = await response.json();
        products = data.products; // Accede a la propiedad 'products'
        filteredProducts = products;
        renderProducts(filteredProducts); // Renderizar productos iniciales
        setCategoryDescription(data.catName);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para aplicar ordenación
function applySorting(productsToSort = filteredProducts) {
    const sortOrder = document.getElementById('sortOrder').value;

    let sortedProducts = [...productsToSort];

    if (sortOrder === 'priceAsc') {
        sortedProducts.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === 'priceDesc') {
        sortedProducts.sort((a, b) => b.cost - a.cost);
    } else if (sortOrder === 'relevanceAsc') {
        sortedProducts.sort((a, b) => a.soldCount - b.soldCount);
    } else if (sortOrder === 'relevanceDesc') {
        sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
    }

    renderProducts(sortedProducts);
}

// Función para limpiar filtros y mostrar todos los productos
function clearFilters() {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('sortOrder').value = ''; 
    document.getElementById('buscador').value = '';
    filteredProducts = products; // se reinicializa filteredProducts
    renderProducts(filteredProducts); 
}

// Función para establecer la descripción de la categoría
function setCategoryDescription(catName) {
    const descriptionText = `Verás aquí todos los productos de la categoría <strong>${catName}</strong>`;
    document.getElementById('category-description').innerHTML = descriptionText;
}

// Función para aplicar filtros
function applyFilters() {

    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    filteredProducts = products.filter(product => 
        product.cost >= minPrice && product.cost <= maxPrice
    );

    const searchInput = document.getElementById("buscador");
    const searchText = searchInput.value.toLowerCase();

    if (searchText) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchText) || 
            product.description.toLowerCase().includes(searchText)
        );
    }

    applySorting(filteredProducts); // Aplicar la ordenación en los productos filtrados
}

// Event listeners para los controles de filtro y ordenación
document.getElementById('applyFilters').addEventListener('click', applyFilters);
document.getElementById('sortOrder').addEventListener('change', () => applySorting(filteredProducts));
document.getElementById('clearRangeFilter').addEventListener('click', clearFilters);

// Escucha el evento input del buscador
document.getElementById("buscador").addEventListener('input', applyFilters);

// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProducts);
