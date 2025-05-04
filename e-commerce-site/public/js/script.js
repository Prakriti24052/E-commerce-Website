// DOM Elements
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

// Show Forgot Password Modal
function showForgotPassword() {
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

// Show Register Modal
function showRegister() {
    document.getElementById('registerModal').style.display = 'block';
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password i');
    const isVisible = passwordInput.type === 'text';
    passwordInput.type = isVisible ? 'password' : 'text';
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
}



// Login with Google (mock function)
function loginWithGoogle() {
    showMessage('Redirecting to Google login...', 'success');
    // In a real app, this would redirect to Google OAuth
    setTimeout(() => {
        showMessage('Google login would be implemented with OAuth in a real app', 'success');
    }, 1500);
}

// Show message
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = 'message ' + type;
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Handle Login Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage(data.message, 'success');
            // Redirect to home or home page after successful login
            setTimeout(() => {
                window.location.href = '/home.html';
            }, 1500);
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('An error occurred. Please try again.', 'error');
        console.error('Login error:', error);
    }
});

// Handle Forgot Password Form Submission
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    
    try {
        const response = await fetch('/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage(data.message, 'success');
            closeModal('forgotPasswordModal');
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('An error occurred. Please try again.', 'error');
        console.error('Forgot password error:', error);
    }
});

// Handle Register Form Submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage(data.message, 'success');
            closeModal('registerModal');
            // Clear form
            registerForm.reset();
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        showMessage('An error occurred. Please try again.', 'error');
        console.error('Registration error:', error);
    }
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.className === 'modal') {
        e.target.style.display = 'none';
    }
});