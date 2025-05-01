// Example JavaScript for dynamic account details, like username and email.
document.addEventListener('DOMContentLoaded', () => {
    // Simulating fetching user data (e.g., from a backend or local storage).
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+123456789',
      orders: [
        { id: 1234, status: 'Completed' },
        { id: 5678, status: 'Processing' },
      ],
      wishlist: [
        { productId: 1, name: 'Product 1' },
        { productId: 2, name: 'Product 2' },
      ],
      address: '123 Main St, City, Country',
    };
  
    // Populate account details
    document.getElementById('username').textContent = user.name;
    document.getElementById('account-name').textContent = user.name;
    document.getElementById('account-email').textContent = user.email;
    document.getElementById('account-phone').textContent = user.phone;
  
    // Populate orders list
    const orderList = document.getElementById('order-list');
    user.orders.forEach(order => {
      const li = document.createElement('li');
      li.innerHTML = `Order #${order.id} - <a href="order-details.html">View Details</a>`;
      orderList.appendChild(li);
    });
  
    // Populate wishlist
    const wishlist = document.getElementById('wishlist');
    user.wishlist.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="product-details.html">${item.name}</a>`;
      wishlist.appendChild(li);
    });
  
    // Populate address
    document.querySelector('.address p').textContent = `Shipping Address: ${user.address}`;
  });
  
  // Logout functionality
  document.getElementById('logout-btn').addEventListener('click', () => {
    // Add any logout logic here (clear session, redirect, etc.)
    alert('You have been logged out!');
    // Redirect to the login page or home page
    window.location.href = 'login.html';
  });
  