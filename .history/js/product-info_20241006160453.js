document.addEventListener('DOMContentLoaded', async () => {
    // Detalles del producto
    const productId = localStorage.getItem('selectedProductId');
    if (productId) {
        const response = await fetch(PRODUCT_INFO_URL + `/${productId}${EXT_TYPE}`);
        const product = await response.json();

        try {
            // Llamada a la API para obtener el producto
            const response = await fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`);
            const product = await response.json();
            // lleva el producto al HTML
            document.getElementById('name').textContent = product.name;
            document.getElementById('description').textContent = product.description;
            document.getElementById('price').textContent = `${product.currency} ${product.cost}`;
            document.getElementById('category').textContent = product.category;
            document.getElementById('soldCount').textContent = `${product.soldCount} vendidos`;
            document.getElementById('mainImage').src = product.image;

            // Verifica que el array de imágenes exista y tenga al menos una imagen
            if (product.images && product.images.length > 0) {
                // Asigna la primera imagen del array como la imagen principal
                document.getElementById('mainImage').src = product.images[0];
            }

            let htmlToAppend = "<div class='row'>";
            for (let img of product.images) {
                htmlToAppend += `<div class=""><img src="${img}"></div>`;
            }
            htmlToAppend += `</div>`;

            document.getElementById('related-images').innerHTML = htmlToAppend;
            showRelatedProducts(product.relatedProducts);
        } catch (error) {
            console.error('Error fetching product data', error);
        }

        const reviewsResponse = await fetch(PRODUCT_INFO_COMMENTS_URL + `/${productId}${EXT_TYPE}`);
        const comments = await reviewsResponse.json();

        // Inicializar contadores
        totalRatings = 0;
        ratingCount = 0;

        let commentsToAppend = "";
        comments.forEach(comment => {
            commentsToAppend += `
                <div class="comment-card">
                    <span class="comment-user"><strong>${comment.user}</strong> | </span>
                    <span class="comment-date">${new Date(comment.dateTime).toLocaleString()}</span>
                    <div class="comment-stars">${generateStars(comment.score)}</div>
                    <div class="comment-description">${comment.description}</div>
                </div>
            `;

            // Sumar las puntuaciones de los comentarios existentes
            totalRatings += comment.score; // Asegúrate de que esto coincida con el nombre de la propiedad del JSON
            ratingCount += 1; // Contamos cada comentario
        });
        document.getElementById('comments-section').innerHTML = commentsToAppend;

        // Actualiza el histograma con los comentarios ya existentes
        updateRatingHistogram();

        function generateStars(score) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= score) {
                    stars += `<span class="fa fa-star checked"></span>`;
                } else {
                    stars += `<span class="fa fa-star"></span>`;
                }
            }
            return stars;
        }
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

function showRelatedProducts(relatedProducts) {
    let relatedProductsContainer = document.getElementById('related-products');
    relatedProductsContainer.innerHTML = '';

    for (let relatedProduct of relatedProducts) {
        console.log('Related Product ID:', relatedProduct.id);

        let productCard = document.createElement('div');
        productCard.classList.add('related-products');

        productCard.innerHTML = `
            <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
            <div class="product-info">
                <span class="product-name">${relatedProduct.name}</span>
            </div>
        `;

        // Evento click
        productCard.addEventListener('click', function () {
            localStorage.setItem('selectedProductId', relatedProduct.id);
            window.location.href = 'product-info.html';
        });

        relatedProductsContainer.appendChild(productCard);
    }
}

// Variables para el cálculo del rating y manejo de comentarios
let rating = 0;
let totalRatings = 0;
let ratingCount = 0;
let commentsArray = [];

// Estrellas interactivas
const stars = document.querySelectorAll('#rating-stars .fa-star');

// Agregar evento de clic a las estrellas
stars.forEach(star => {
    star.addEventListener('click', (event) => {
        rating = event.target.getAttribute('data-value'); // Obtener el valor de la estrella seleccionada
        updateStarDisplay();
    });
});

// Función para actualizar la visualización de estrellas
function updateStarDisplay() {
    stars.forEach(star => {
        star.classList.remove('checked');
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('checked'); // Marcar las estrellas seleccionadas
        }
    });
}

// Manejo del formulario de comentarios
document.getElementById('submitComment').addEventListener('click', () => {
    const userName = document.getElementById('userName').value;
    const isAnonymous = document.getElementById('anonymousCheck').checked;
    const commentText = document.getElementById('comment').value;

    if (rating > 0 && commentText.trim() !== "") {
        const comment = {
            user: isAnonymous ? "Anónimo" : userName,
            dateTime: new Date().toISOString(),
            score: parseInt(rating), // Asegúrate de que esto sea el score
            description: commentText
        };

        // Agregar el comentario a la sección de comentarios
        commentsArray.push(comment);
        const commentsSection = document.getElementById('comments-section');
        commentsSection.innerHTML += `
            <div class="comment-card">
                <span class="comment-user"><strong>${comment.user}</strong> | </span>
                <span class="comment-date">${new Date(comment.dateTime).toLocaleString()}</span>
                <div class="comment-stars">${generateStars(comment.score)}</div>
                <div class="comment-description">${comment.description}</div>
            </div>
        `;

        // Actualizar totales de ratings
        totalRatings += comment.score;
        ratingCount += 1;

        // Calcular y mostrar rating promedio
        updateRatingHistogram();

        // Limpiar el formulario
        document.getElementById('comment').value = ""; // Limpiar el cuadro de comentario
        rating = 0; // Resetear la calificación
        updateStarDisplay(); // Actualizar la visualización de estrellas
    } else {
        alert("Por favor, completa todos los campos.");
    }
});

// Función para actualizar el histograma de rating
function updateRatingHistogram() {
    const averageRating = (totalRatings / ratingCount).toFixed(1) || 0;
    document.getElementById('average-rating').textContent = averageRating;
    document.getElementById('rating-count').textContent = `(${ratingCount} calificaciones)`;
}
