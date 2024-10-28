document.addEventListener("DOMContentLoaded", async function() {
    //Detalles del producto
    const productId = localStorage.getItem('selectedProductId');
    if (productId) {
        try {
            // Llamada a la API para obtener el producto
            const response = await fetch(`https://japceibal.github.io/emercado-api/products/${productId}.json`);
            const product = await response.json();

            // Lleva el producto al HTML
            document.getElementById('name').textContent = product.name;
            document.getElementById('description').textContent = product.description;
            document.getElementById('price').textContent = `${product.currency} ${product.cost}`;
            document.getElementById('category').textContent = product.category;
            document.getElementById('soldCount').textContent = `${product.soldCount} vendidos`;
            document.getElementById('mainImage').src = product.images[0];

            // Verifica que el array de imágenes exista y tenga al menos una imagen
            if (product.images && product.images.length > 0) {
                document.getElementById('mainImage').src = product.images[0];
            }

            let htmlToAppend = "<div class='row'>";
            for (let img of product.images) {
                htmlToAppend += `<div class=""><img src="${img}"></div>`;
            }
            htmlToAppend += `</div>`;
            document.getElementById('related-images').innerHTML = htmlToAppend;

            // Mostrar productos relacionados
            showRelatedProducts(product.relatedProducts);

            // Comentarios y calificación
            const reviewsResponse = await fetch(PRODUCT_INFO_COMMENTS_URL + `/${productId}${EXT_TYPE}`);
            const comments = await reviewsResponse.json();
            //Inicializar contadores
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
                totalRatings += comment.score;
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

            // Modificación en la sección del botón de comprar
            const buyButton = document.getElementById("buyButton");
            if (buyButton) {
                buyButton.addEventListener("click", () => {
                    const productoComprado = {
                        id: product.id,
                        nombre: product.name,
                        precio: product.cost,
                        imagen: product.images[0]
                    };

                    localStorage.setItem("productoComprado", JSON.stringify(productoComprado));
                    console.log("Producto guardado en localStorage:", productoComprado);
                });
            } else {
                console.error("'buyButton' no encontrado.");
            }

        } catch (error) {
            console.error('Error al obtener los datos del producto', error);
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

        // Reiniciar el rating
        rating = 0;
    } else {
        alert("Por favor, selecciona al menos una estrella y escribe un comentario.");
    }
});

// Función para añadir un comentario al DOM sin borrar los existentes
function addNewCommentToDOM(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-card');

    commentDiv.innerHTML = `
        <span class="comment-user"><strong>${comment.user}</strong> | </span>
        <span class="comment-date">${new Date(comment.dateTime).toLocaleString()}</span>
        <div class="comment-stars">${generateStars(comment.rating)}</div>
        <div class="comment-description">${comment.text}</div>
    `;

    // Añadir el nuevo comentario al principio de la sección de comentarios
    const commentsSection = document.getElementById('comments-section');
    commentsSection.insertBefore(commentDiv, commentsSection.firstChild);
}

// Función para mostrar comentarios
function displayComments() {
    commentsArray.forEach(comment => {
        addNewCommentToDOM(comment); // Usamos appendChild para cada comentario
    });
}

// Función para actualizar el histograma de rating
function updateRatingHistogram() {
    const average = ratingCount > 0 ? (totalRatings / ratingCount) : 0;

    document.getElementById('average-rating').textContent = average.toFixed(1);
    document.getElementById('rating-count').textContent = `(${ratingCount} calificaciones)`;
    document.getElementById('rating-stars').innerHTML = renderStars(average);
}

function renderStars(value) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(value)) {
            starsHtml += '<i class="fa fa-star checked princial-starts"></i>'; // Estrella llena
        } else if (i < value) {
            starsHtml += '<i class="fas fa-star-half-alt princial-starts"></i>'; // Estrella media
        } else {
            starsHtml += '<i class="fa fa-star princial-starts"></i>'; // Estrella vacía
        }
    }
    return starsHtml;
}

// Llamar a displayComments si ya hay comentarios al cargar la página
displayComments();

//Evento para cerrar sesión
document.getElementById('log-out').addEventListener('click', function () {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    sessionStorage.removeItem('user-name');
    
    console.log("Sesión cerrada correctamente.");
    
});