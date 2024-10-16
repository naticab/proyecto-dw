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

document.getElementById("mode-toggle").addEventListener("click", function() {
    const currentMode = localStorage.getItem("mode");
    if (currentMode === "dark") {
        localStorage.setItem("mode", "light");
        document.body.classList.remove("dark-mode");
        document.getElementById("theme-icon").classList.remove("fa-sun");
        document.getElementById("theme-icon").classList.add("fa-moon");
    } else {
        localStorage.setItem("mode", "dark");
        document.body.classList.add("dark-mode");
        document.getElementById("theme-icon").classList.remove("fa-moon");
        document.getElementById("theme-icon").classList.add("fa-sun");
    }
});
