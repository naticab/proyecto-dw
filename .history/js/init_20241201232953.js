const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments" + ".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

// const CATEGORIES_URL = "http://localhost:3000/emercado-api-main/categories";
// const PUBLISH_PRODUCT_URL = "http://localhost:3000/emercado-api-main/sell/publish.json";
// const PRODUCTS_URL = "http://localhost:3000/emercado-api-main/cats_products/";
// const PRODUCT_INFO_URL = "http://localhost:3000/emercado-api-main/products/";
// const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/emercado-api-main/products_comments/";
// const CART_INFO_URL = "http://localhost:3000/emercado-api-main/cart_info";
// const CART_BUY_URL = "http://localhost:3000/emercado-api-main/cart/buy.json";
// const EXT_TYPE = ".json";

let showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url) {
    let result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error.message;
            hideSpinner();
            return result;
        });
}

async function saveCart(cart) {
    try {
        const response = await fetch("http://localhost:3000/emercado-api-main/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: 1, // Cambiar según el usuario actual
                items: cart, // Array de productos en el carrito
            }),
        });

        if (!response.ok) {
            throw new Error('Error al guardar el carrito');
        }

        const data = await response.json();
        console.log("Carrito guardado:", data);
    } catch (error) {
        console.error("Hubo un problema con la solicitud:", error.message);
    }
}
