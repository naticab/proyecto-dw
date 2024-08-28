document.addEventListener('DOMContentLoaded', function() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const username = localStorage.getItem('username');

    const userContainer = document.getElementById('user-container');
    const userNameElement = document.getElementById('user-name');
    const loginLink = document.getElementById('loginLink');

    if (isAuthenticated !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    if (isAuthenticated === 'true' && username) {
        userNameElement.textContent = `${username}`;
        userContainer.classList.remove('d-none');
        loginLink.classList.add('d-none');
    } else {
        userContainer.classList.add('d-none');
        loginLink.classList.remove('d-none');
    }
}); 
