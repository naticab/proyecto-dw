document.addEventListener('click', function(event) {
    var navbar = document.querySelector('.navbar-collapse');
    var toggler = document.querySelector('.navbar-toggler');
    
    // Si el menú está abierto y se hace clic fuera de él, lo cierra
    if (navbar.classList.contains('show') && !navbar.contains(event.target) && !toggler.contains(event.target)) {
        var bsCollapse = new bootstrap.Collapse(navbar, {
            toggle: false
        });
        bsCollapse.hide();
    }
});

// Cerrar el menú automáticamente al hacer clic en cualquier enlace
var navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        var navbar = document.querySelector('.navbar-collapse');
        var bsCollapse = new bootstrap.Collapse(navbar, {
            toggle: false
        });
        bsCollapse.hide();
    });
});


// Modo Claroscuro

// Seleccionar el botón y el icono
const modeToggle = document.getElementById("mode-toggle");
const themeIcon = document.getElementById("theme-icon");

// Establecer el modo inicial según el modo de color preferido del navegador
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
} else {
    document.body.classList.add("light-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
}

// Función para alternar entre modos
modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Cambiar el icono y guardar la preferencia en localStorage
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
    }
});
