document.addEventListener('DOMContentLoaded', async () => {

    const productId = localStorage.getItem('selectedProductId');
    if (productId) {
        const response = await fetch(PRODUCT_INFO_URL + `/${productId}${EXT_TYPE}`);
        const product = await response.json();
        console.log(productId);  

    
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
        document.getElementById('related-products').src = `${product.relatedProducts}`;

          // Verifica que el array de imágenes exista y tenga al menos una imagen
          if (product.images.length > 0) {
            // Asigna la primera imagen del array como la imagen principal
            document.getElementById('mainImage').src = product.images[0];
        }

        let htmlToAppend="<div class='row'>";
        for (let img of product.images){
            htmlToAppend += `<div class=""><img src="${img}"></div>`;
        }
        htmlToAppend += `</div>`;

        document.getElementById('related-images').innerHTML = htmlToAppend;
         showRelatedProducts(product.relatedProducts);}
         catch(error){
            console.error('Error fetching product data', error);
         }
        
        const reviewsResponse = await fetch(PRODUCT_INFO_COMMENTS_URL + `/${productId}${EXT_TYPE}`);
        const comments = await reviewsResponse.json();

        let commentsToAppend = "";
        comments.forEach(comment => {
            commentsToAppend += `
                <div class="comment-card">
                    <span class="comment-user">${comment.user} | </span>
                    <span class="comment-date">${comment.dateTime}</span>
                    <div class="comment-">${generateStars(comment.score)}</div>
                    <div class="comment-description">${comment.description}</div>
                </div>
            `;
        });
        document.getElementById('comments-section').insertAdjacentHTML('beforeend', commentsToAppend);


        function generateStars(score) {
            let stars = ''
            for (let i=1; i<=5; i++) {
                if (i <= score) {
                    stars += `<span class="fa fa-star checked"></span>`;
                } else {
                    stars += `<span class="fa fa-star"></span>`;
                }
            }
            return stars;
        }
}});

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

        //Evento click
        productCard.addEventListener('click', function() {
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

// Evento para el botón de Enviar comentario
document.getElementById('submitComment').addEventListener('click', () => {
  const userName = document.getElementById('anonymousCheck').checked ? "Anónimo" : document.getElementById('userName').value;
  const commentText = document.getElementById('comment').value;

  if (rating > 0 && commentText) {
    // Crear comentario
    const comment = {
      user: userName,
      rating: parseInt(rating),
      text: commentText
    };
    commentsArray.unshift(comment); // Agregar nuevo comentario al principio
    displayComments();

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

// Función para mostrar comentarios
function displayComments() {
  const commentsSection = document.getElementById('comments-section');
  commentsSection.innerHTML = '';
  commentsArray.forEach(comment => {
    commentsSection.innerHTML += `
      <div class="comment-card">
        <p><strong>${comment.user}</strong> - ${comment.rating} estrellas</p>
        <p>${comment.text}</p>
      </div>
    `;
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
