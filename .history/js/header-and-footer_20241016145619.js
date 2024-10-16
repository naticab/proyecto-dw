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

    // Verificamos si el click fue sobre el botón de alternar tema
    if (event.target.id === 'themeToggle' || event.target.closest('#themeToggle')) {
        // Seleccionamos el botón de alternar tema y el ícono
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');

        // Cargar el tema guardado de localStorage o usar 'light' por defecto
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.add(savedTheme);
        themeIcon.classList.add(savedTheme === 'dark' ? 'fa-sun' : 'fa-moon');

        // Cambiar el tema y guardar la preferencia en localStorage
        const isDarkMode = document.body.classList.toggle('dark');
        
        // Cambiar el ícono según el modo
        themeIcon.classList.toggle('fa-sun', isDarkMode);
        themeIcon.classList.toggle('fa-moon', !isDarkMode);

        // Guardar el tema actual en localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
});
