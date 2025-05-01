document.addEventListener("DOMContentLoaded", () => {
    const products = [
      { name: "Smartphone", price: 500, category: "Electronics", image: "smartphone.jpg" },
      { name: "Laptop", price: 850, category: "Electronics", image: "laptop.jpg" },
      { name: "Nike Sportswear", price: 60, category: "Clothing", image: "nike.jpg" },
      { name: "Garden Hose", price: 25, category: "Home & Garden", image: "hose.jpg" },
      { name: "Fiction Book", price: 15, category: "Books", image: "book.jpg" },
      { name: "Headphones", price: 120, category: "Electronics", image: "headphones.jpg" },
    ];
  
    const categoryItems = document.querySelectorAll("aside ul li");
    const priceRange = document.querySelector('input[type="range"]');
    const maxPriceLabel = document.querySelector("aside p strong");
    const sortSelects = document.querySelectorAll("select");
    const searchInput = document.querySelector("#controls input[type='text']");
    const productGrid = document.querySelector(".product-grid");
    const pagination = document.getElementById("pagination");
    const prevBtn = pagination.querySelector("button:first-child");
    const nextBtn = pagination.querySelector("button:last-child");
    const pageIndicator = pagination.querySelector("span");
    const cartLink = document.querySelector(".fa-shopping-cart").parentElement;
  
    let currentCategory = "All Products";
    let currentPage = 1;
    const itemsPerPage = 4;
    let currentSort = "Name: A-Z";
    let currentMaxPrice = 1000;
    let currentSearch = "";
    let cartCount = 0;
  
    // === Navbar: allow navigation + active state ===
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", e => {
        // Allow normal link navigation by NOT using preventDefault
        document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  
    // === Category filter ===
    categoryItems.forEach(item => {
      item.addEventListener("click", () => {
        categoryItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        currentCategory = item.textContent.trim();
        currentPage = 1;
        renderProducts();
      });
    });
  
    // === Price range filter ===
    priceRange.addEventListener("input", () => {
      currentMaxPrice = parseInt(priceRange.value);
      maxPriceLabel.textContent = `$${currentMaxPrice}`;
      currentPage = 1;
      renderProducts();
    });
  
    // === Sort select ===
    sortSelects.forEach(select => {
      select.addEventListener("change", () => {
        currentSort = select.value;
        renderProducts();
      });
    });
  
    // === Search input ===
    searchInput.addEventListener("input", () => {
      currentSearch = searchInput.value.trim().toLowerCase();
      currentPage = 1;
      renderProducts();
    });
  
    // === Pagination buttons ===
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
      }
    });
  
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(getFilteredProducts().length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
      }
    });
  
    // === Filter, sort, and return products ===
    function getFilteredProducts() {
      return products
        .filter(p => (currentCategory === "All Products" || p.category === currentCategory))
        .filter(p => p.price <= currentMaxPrice)
        .filter(p => p.name.toLowerCase().includes(currentSearch))
        .sort((a, b) => {
          if (currentSort === "Name: A-Z") return a.name.localeCompare(b.name);
          if (currentSort === "Name: Z-A") return b.name.localeCompare(a.name);
          if (currentSort === "Price: Low to High") return a.price - b.price;
          if (currentSort === "Price: High to Low") return b.price - a.price;
          return 0;
        });
    }
  
    // === Render products ===
    function renderProducts() {
      const filtered = getFilteredProducts();
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      const start = (currentPage - 1) * itemsPerPage;
      const currentItems = filtered.slice(start, start + itemsPerPage);
  
      productGrid.innerHTML = currentItems.map(p => `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p>$${p.price}</p>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      `).join("");
  
      pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
  
    // === Handle add to cart clicks ===
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("add-to-cart-btn")) {
        cartCount++;
        updateCart();
      }
    });
  
    // === Update cart count display ===
    function updateCart() {
      cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> ${cartCount}`;
    }
  
    // === Initial render ===
    renderProducts();
  });
  