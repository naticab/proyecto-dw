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
stars.forEach(star => {
    star.addEventListener('click', function () {
        rating = this.getAttribute('data-value');
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('checked');
            } else {
                s.classList.remove('checked');
            }
        });
    });
});

// Función para generar estrellas
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

const newComment = {
    user: "Usuario Nuevo",
    dateTime: new Date().toISOString(),
    score: 4,
    description: "¡Comentario nuevo!"
};


// Precargar el nombre del usuario en el campo de nombre
const storedUserName = localStorage.getItem('username');
    
// Verificar si el usuario está logueado y asignar el nombre
if (storedUserName) {
    document.getElementById('userName').value = storedUserName;
}

// Evento para el botón de Enviar comentario
document.getElementById('submitComment').addEventListener('click', () => {
    const userName = document.getElementById('anonymousCheck').checked ? "Anónimo" : document.getElementById('userName').value;
    const commentText = document.getElementById('comment').value;

    if (rating > 0 && commentText) {
        // Crear comentario
        const comment = {
            user: userName,
            dateTime: new Date().toISOString(),
            rating: parseInt(rating),
            text: commentText
        };
        commentsArray.unshift(comment); // Agregar nuevo comentario al principio
        addNewCommentToDOM(comment);    // Añadir comentario al DOM usando appendChild

        // Recalcular el promedio de rating
        totalRatings += comment.rating;
        ratingCount += 1;
        updateRatingHistogram();

        // Limpiar el formulario
        stars.forEach(star => star.classList.remove('checked'));
        document.getElementById('comment').value = '';
    } else {
        alert("Por favor, selecciona al menos una estrella y escribe un comentario.");
    }
});

// Función para añadir un comentario al DOM sin borrar los existentes
function addNewCommentToDOM(comment) {
    // Creamos el nuevo comentario como un elemento HTML
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-card');

    commentDiv.innerHTML = `
        <span class="comment-user"><strong>${comment.user}</strong> | </span>
        <span class="comment-date">${new Date(comment.dateTime).toLocaleString()}</span>
        <div class="comment-stars">${generateStars(comment.rating)}</div>
        <div class="comment-description">${comment.text}</div>
    `;

    // Añadimos el nuevo comentario al principio de la sección de comentarios
    const commentsSection = document.getElementById('comments-section');
    commentsSection.insertBefore(commentDiv, commentsSection.firstChild);
}

// Función para mostrar comentarios (carga inicial si ya hay comentarios en el array)
function displayComments() {
    commentsArray.forEach(comment => {
        addNewCommentToDOM(comment); // Usamos appendChild para cada comentario
    });
}

// Función para actualizar el histograma de rating
function updateRatingHistogram() {
    const averageRating = (totalRatings / ratingCount).toFixed(1);
    document.getElementById('average-rating').innerText = averageRating;
    document.getElementById('rating-count').innerText = `(${ratingCount} calificaciones)`;
    const ratingPercentage = (averageRating / 5) * 100;
    document.getElementById('rating-bar').style.width = `${ratingPercentage}%`;
}

// Llamar a displayComments si ya hay comentarios al cargar la página
displayComments();
