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

    if (username !== '' && password !== '') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);

        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});