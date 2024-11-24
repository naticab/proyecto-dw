let cartList = [];
let rating = 0;
let totalRatings = 0;
let ratingCount = 0;
let commentsArray = [];

document.addEventListener("DOMContentLoaded", async function () {
    const productId = localStorage.getItem('selectedProductId');
    if (productId) {
        await loadProductData(productId);
        await loadComments(productId);
        setupBuyButton();
    }
    setupUserSession();
});

// Función para cargar los datos del producto
async function loadProductData(productId) {
    try {
        const response = await fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`);
        const product = await response.json();

        updateProduct(product);
        showRelatedProducts(product.relatedProducts);
    } catch (error) {
        console.error('Error al obtener los datos del producto', error);
    }
}

function updateProduct(product) {
    // Actualizar información principal
    document.getElementById('name').textContent = product.name;
    document.getElementById('description').textContent = product.description;
    document.getElementById('price').textContent = `${product.currency} ${product.cost}`;
    document.getElementById('category').textContent = product.category;
    document.getElementById('soldCount').textContent = `${product.soldCount} vendidos`;

    // Configurar la imagen principal del carrusel
    const carouselInner = document.querySelector('#productCarousel .carousel-inner');
    carouselInner.innerHTML = '';

    product.images.forEach((img, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.innerHTML = `<img src="${img}" class="d-block w-100" alt="Imagen ${index + 1}">`;
        carouselInner.appendChild(carouselItem);
    });

    // Limpiar miniaturas anteriores
    const relatedImagesContainer = document.getElementById('related-images');
    relatedImagesContainer.innerHTML = '';

    // Crear miniaturas de imágenes relacionadas
    product.images.forEach((img, index) => {
        const indicator = document.createElement('img');
        indicator.src = img;
        indicator.alt = `Imagen ${index + 1}`;
        indicator.className = index === 0 ? 'active-thumbnail' : 'thumbnail'; // Clase activa
        indicator.addEventListener('click', () => {
            document.querySelector('#productCarousel .carousel-item.active').classList.remove('active');
            document.querySelectorAll('#productCarousel .carousel-item')[index].classList.add('active');
        });
        relatedImagesContainer.appendChild(indicator);
    });
}

// Función para cargar comentarios del producto
async function loadComments(productId) {
    try {
        const reviewsResponse = await fetch(`${PRODUCT_INFO_COMMENTS_URL}${productId}${EXT_TYPE}`);
        const comments = await reviewsResponse.json();

        comments.forEach(comment => addCommentToDOM(comment));
        updateRatingStatistics(comments);
    } catch (error) {
        console.error('Error al obtener los comentarios', error);
    }
}

// Función para añadir un comentario al DOM
function addCommentToDOM(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-card');
    commentDiv.innerHTML = `
        <span class="comment-user"><strong>${comment.user}</strong> | </span>
        <span class="comment-date">${new Date(comment.dateTime).toLocaleString()}</span>
        <div class="comment-stars">${generateStars(comment.score)}</div>
        <div class="comment-description">${comment.description}</div>
    `;
    document.getElementById('comments-section').appendChild(commentDiv);
}

// Función para actualizar las estadísticas de calificaciones
function updateRatingStatistics(comments) {
    totalRatings = comments.reduce((acc, comment) => acc + comment.score, 0);
    ratingCount = comments.length;
    updateRatingHistogram();
}

// Función para mostrar el histograma de ratings
function updateRatingHistogram() {
    const average = ratingCount > 0 ? (totalRatings / ratingCount) : 0;
    document.getElementById('average-rating').textContent = average.toFixed(1);
    document.getElementById('rating-count').textContent = `${ratingCount} calificaciones`;
    document.getElementById('rating-stars').innerHTML = renderStars(average);
}

// Función para renderizar estrellas
function renderStars(value) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        starsHtml += `<span class="fa fa-star ${i < Math.round(value) ? 'checked' : ''}"></span>`;
    }
    return starsHtml;
}

// Función para configurar el botón de compra
function setupBuyButton() {
    const buyButton = document.getElementById("buyButton");
    if (buyButton) {
        buyButton.addEventListener("click", handleBuy);
    } else {
        console.error("'buyButton' no encontrado.");
    }
}

// Manejo del evento de compra
function handleBuy() {
    const productId = localStorage.getItem('selectedProductId');
    const productoComprado = {
        id: productId,
        nombre: document.getElementById('name').textContent,
        precio: parseFloat(document.getElementById('price').textContent.split(' ')[1]),
        imagen: document.querySelector('#productCarousel .carousel-item.active img').src,
        cantidad: 1
    };

    const storedCart = localStorage.getItem("productoComprado");
    if (storedCart) {
        cartList = JSON.parse(storedCart);
    }

    const index = cartList.findIndex(prod => prod.id == productoComprado.id);
    if (index > -1) {
        cartList[index].cantidad++;
    } else {
        cartList.push(productoComprado);
    }

    localStorage.setItem("productoComprado", JSON.stringify(cartList));

    // Mostrar el mensaje de "Producto agregado" con un toast
    showToast(`${productoComprado.nombre} fue agregado al carrito.`);

    // Actualizar el contador del carrito
    updateCartCounter();
}

// Función para actualizar el contador del carrito
function updateCartCounter() {
    const cartCount = cartList.reduce((acc, prod) => acc + prod.cantidad, 0);
    const cartCounterElement = document.getElementById('cartCounter'); // Asegúrate de tener un elemento en tu HTML para mostrar el contador
    if (cartCounterElement) {
        cartCounterElement.textContent = cartCount; // Actualiza el contador en la UI
    }
}


// Función para configurar la sesión de usuario
function setupUserSession() {
    const storedUserName = localStorage.getItem('username');
    if (storedUserName) {
        document.getElementById('userName').value = storedUserName;
    }

    document.getElementById('log-out').addEventListener('click', () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        sessionStorage.removeItem('user-name');
        console.log("Sesión cerrada correctamente.");
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Manejo de la selección de estrellas
const stars = document.querySelectorAll('#rating-stars .fa-star');
stars.forEach(star => {
    star.addEventListener('click', function () {
        rating = this.getAttribute('data-value');
        stars.forEach((s, index) => {
            s.classList.toggle('checked', index < rating);
        });
    });
});

// Evento para enviar un nuevo comentario
document.getElementById('submitComment').addEventListener('click', () => {
    const userName = document.getElementById('anonymousCheck').checked ? "Anónimo" : document.getElementById('userName').value;
    const commentText = document.getElementById('comment').value;

    if (rating > 0 && commentText) {
        const comment = {
            user: userName,
            dateTime: new Date().toISOString(),
            score: parseInt(rating),
            description: commentText
        };
        commentsArray.unshift(comment);
        addCommentToDOM(comment);
        totalRatings += comment.score;
        ratingCount++;
        updateRatingHistogram();
        resetCommentForm();
    } else {
        alert("Por favor, selecciona al menos una estrella y escribe un comentario.");
    }
});

// Función para generar las estrellas en los comentarios
function generateStars(score) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="fa fa-star ${i <= score ? 'checked' : ''}"></span>`;
    }
    return stars;
}

// Función para reiniciar el formulario de comentario
function resetCommentForm() {
    stars.forEach(star => star.classList.remove('checked'));
    document.getElementById('comment').value = '';
    rating = 0;
}

function showRelatedProducts(relatedProducts) {
    const relatedProductsContainer = document.getElementById('related-products');
    relatedProductsContainer.innerHTML = '';

    for (let relatedProduct of relatedProducts) {
        let productCard = document.createElement('div');
        productCard.classList.add('related-products');
        productCard.innerHTML = `
            <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
            <div class="product-info">
                <span class="product-name">${relatedProduct.name}</span>
            </div>
        `;
        productCard.addEventListener('click', () => {
            localStorage.setItem('selectedProductId', relatedProduct.id);
            window.location.href = 'product-info.html';
        });
        relatedProductsContainer.appendChild(productCard);
    }
}
