// Definimos la variable de manera global para que sea accesible en toda la página
let products = [];

// URL del endpoint que devuelve el JSON de productos
function getCatID() {
    const catID = localStorage.getItem("catID");
    return catID ? catID : '101'; // Si no hay catID en localStorage, usar '101' por defecto
}

// Función para crear las tarjetas de producto
function createProductCard(product) {
    return `
        <div class="product-card">
            <a href="product-info.html" onclick="saveProductId(${product.id})" class="products-link">
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
        renderProducts(products); // Renderizar productos iniciales
        setCategoryDescription(data.catName);
        products = data.products; // Guardamos los productos en la variable global

        const container = document.getElementById('products-container');
        container.innerHTML = "";
        products.forEach(product => {
            const productCard = createProductCard(product);
            container.innerHTML += productCard;
        });
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
// Función para establecer la descripción de la categoría
function setCategoryDescription(catName) {
    const descriptionText = `Verás aquí todos los productos de la categoría <strong>${catName}</strong>`;
    document.getElementById('category-description').innerHTML = descriptionText;
}

// Filtrar productos en tiempo real, seleccionamos el input del buscador por su id
const searchInput = document.getElementById("buscador");

// Escucha el evento input del buscador
searchInput.addEventListener('input', () => {
    // Cada vez que el uruarui ingresa texto en el input, se ejecuta esta función
    console.log("Texto ingresado:", searchInput.value); // Mostramos el texto ingresado en la consola para verificar si funciona
    const searchText = searchInput.value.toLowerCase();  // Convertimos el texto a minúsculas para comparar sin importar mayúsculas/minúsculas

    // Filtrar los productos por nombre o descripción
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText) || 
        product.description.toLowerCase().includes(searchText)
    );

    // Renderizar los productos que pasaron el filtro
    renderProducts(filteredProducts);
});

// Función para renderizar (mostrar) los productos en el HTML
function renderProducts(filteredProducts) {
    // Seleccionamos el contenedor de productos
    const container = document.getElementById('products-container');
    container.innerHTML = "";  // Limpiamos el contenedor antes de mostrar los productos filtrados

    // Recorremos la lista de productos filtrados y generamos su tarjeta HTML
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product); // Creamos la tarjeta de cada producto filtrado
        container.innerHTML += productCard; // Agregamos la tarjeta al contenedor
    });
}

// Cargar los productos cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', loadProducts);


