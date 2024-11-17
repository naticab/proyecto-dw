document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash');
});

document.getElementById('myForm').addEventListener('submit', function (event) {
    // Evitar que el formulario se envíe al servidor
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username !== '' && password !== '' && password.length > 6) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);

        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

// Mostrar y ocultar la contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    this.classList.toggle('fa-eye-slash');
});

// Validación de email en el envío del formulario
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
    if (username === '' || password === '') {
        if (username === '') {
            document.getElementById('username-error').textContent = 'Por favor, ingrese un email.';
            document.getElementById('username').classList.add('error');
        }
        if (password === '') {
            document.getElementById('password-error').textContent = 'Por favor, ingrese una contraseña.';
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
