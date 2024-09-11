// URL del endpoint que devuelve el JSON de productos
function getCatID(){
    const catID= localStorage.getItem("catID");
    return catID ? catID: '101';
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

function saveProductId(productId) {
    localStorage.setItem('selectedProductId', productId);
}

// Función para cargar productos desde el JSON
async function loadProducts() {
    const catID= getCatID();
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    try {
        const response = await fetch(productsUrl);
        const data = await response.json();
        setCategoryDescription(data.catName);
        const products = data.products; // Accede a la propiedad 'products'
        const container = document.getElementById('products-container');
        container.innerHTML= "";
        products.forEach(product => {
            const productCard = createProductCard(product);
            container.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function setCategoryDescription(catName){
    const descriptionText= `Verás aquí todos los productos de la categoría <strong>${catName}</strong>`;
    document.getElementById('category-description').innerHTML = descriptionText;
}


// Cargar productos cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProducts);


