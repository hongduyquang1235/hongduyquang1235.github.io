function register() {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!username || !password) {
        showMessage('Please enter both username and password.');
        return;
    }

    if (localStorage.getItem('user-' + username)) {
        showMessage('Username already exists!');
        return;
    }

    localStorage.setItem('user-' + username, password);
    showMessage('Registration successful! You can login now.');
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const savedPassword = localStorage.getItem('user-' + username);

    if (savedPassword && savedPassword === password) {
        localStorage.setItem('currentUser', username); // store logged-in user
        window.location.href = 'index.html';
    } else {
        showMessage('Invalid username or password.');
    }
}

function showMessage(msg) {
    document.getElementById('auth-message').textContent = msg;
}
