document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('button').addEventListener('click', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username !== '' && password !== '') {
         localStorage.setItem('isAuthenticated', 'true');
        window.location.href = 'index.html';
    } else {
         alert('Usuario o contraseña incorrectos.');
     }
});
