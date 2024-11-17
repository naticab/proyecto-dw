document.getElementById('myForm').addEventListener('submit', function (event) {
    // Evitar que el formulario se envíe al servidor
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Expresión regular para verificar formato de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Limpiar mensajes de error previos
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('username').classList.remove('error');
    document.getElementById('password').classList.remove('error');

    // Validación
    if (username === '' || password === '' || password.length <= 6) {
        if (username === '') {
            document.getElementById('username-error').textContent = 'Por favor, ingrese un email.';
            document.getElementById('username').classList.add('error');
        }
        if (password === '') {
            document.getElementById('password-error').textContent = 'Por favor, ingrese una contraseña.';
            document.getElementById('password').classList.add('error');
        } else if (password.length <= 6) {
            document.getElementById('password-error').textContent = 'La contraseña debe tener al menos 6 caracteres.';
            document.getElementById('password').classList.add('error');
        }
    } else if (!emailPattern.test(username)) {
        document.getElementById('username-error').textContent = 'Por favor, ingrese un email válido.';
        document.getElementById('username').classList.add('error');
    } else {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        window.location.href = 'index.html';
    }
});


