document.addEventListener('DOMContentLoaded', () => {
    const featuredProducts = [
        { title: "Stylish Sunglasses", image: "images/sunglasses.jpg" },
        { title: "Bluetooth Speaker", image: "images/speaker.jpg" },
        { title: "Casual Shoes", image: "images/shoes.jpg" }
    ];

    const bestsellers = [
        { title: "Denim Jacket", image: "images/denim-jacket.jpg" },
        { title: "Smart Watch", image: "images/smart-watch.jpg" },
        { title: "Backpack", image: "images/backpack.jpg" }
    ];

    const deals = [
        { title: "Limited Edition Hoodie", image: "images/hoodie.jpg" },
        { title: "Wireless Earbuds", image: "images/earbuds.jpg" },
        { title: "Running Shoes", image: "images/running-shoes.jpg" }
    ];

    const loadProducts = (containerId, products) => {
        const container = document.getElementById(containerId);
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <button class="btn">View</button>
            `;
            container.appendChild(card);
        });
    };

    loadProducts('featured-products', featuredProducts);
    loadProducts('bestsellers-products', bestsellers);
    loadProducts('deals-products', deals);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const allCards = document.querySelectorAll('.product-card');
        allCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            card.style.display = title.includes(query) ? 'block' : 'none';
        });
    });

    // Mobile menu toggle functionality
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('open');
});

});
