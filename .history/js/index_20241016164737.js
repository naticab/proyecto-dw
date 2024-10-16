document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//Evento para cerrar sesión
document.getElementById('log-out').addEventListener('click', function () {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    sessionStorage.removeItem('user-name');
    
    console.log("Sesión cerrada correctamente.");
    
});
