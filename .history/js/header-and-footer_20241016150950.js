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



