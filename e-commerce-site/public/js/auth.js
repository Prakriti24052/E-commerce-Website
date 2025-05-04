async function postData(url = '', data = {}) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

// LOGIN
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await postData('/login', { email, password });
    alert(result.message || result.error);
    if (result.message) window.location.href = '/home.html';
}

// REGISTER
async function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        return alert('Passwords do not match!');
    }

    const result = await postData('/register', { name, email, password });
    alert(result.message || result.error);
    if (result.message) closeModal('registerModal');
}

// FORGOT PASSWORD
async function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;

    const result = await postData('/forgot-password', { email });
    alert(result.message || result.error);
    if (result.message) closeModal('forgotPasswordModal');
}

// UTIL: Close modal
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Show Register Modal
function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
}

// Show Forgot Password Modal
function showForgotPassword() {
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

// Close Modal Utility
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}
