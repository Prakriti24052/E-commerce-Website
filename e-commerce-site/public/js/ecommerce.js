// Global variables
let currentUser = null;
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkLoginStatus();
    
    // Initialize page specific functions
    if (document.querySelector('.shop-main')) {
        loadProducts();
    }
    
    if (document.querySelector('.product-main')) {
        loadProductDetails();
    }
    
    if (document.querySelector('.cart-main')) {
        loadCart();
    }
    
    if (document.querySelector('.dashboard-main')) {
        loadUserProfile();
    }
    
    // Event listeners
    if (document.getElementById('logoutBtn')) {
        document.getElementById('logoutBtn').addEventListener('click', logout);
    }
});

// Check login status
function checkLoginStatus()