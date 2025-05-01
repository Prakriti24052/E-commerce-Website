const products = [
    {
      name: "Smartphone",
      price: 500,
      image: "https://cdn.pixabay.com/photo/2014/04/05/11/39/mobile-phone-316506_1280.png",
      category: "Electronics"
    },
    {
      name: "Laptop",
      price: 850,
      image: "https://cdn.pixabay.com/photo/2016/03/09/09/22/laptop-1245981_1280.jpg",
      category: "Electronics"
    },
    {
      name: "Nike Sportswear Rally",
      price: 60,
      image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,q_auto:eco/0f290bcf-3397-4c90-95b3-fc7808fa1d12/sportswear-rally-womens-crew-4Ld9PB.png",
      category: "Clothing"
    },
    {
      name: "Garden Hose",
      price: 25,
      image: "https://cdn.pixabay.com/photo/2016/04/19/10/57/hose-1333967_1280.jpg",
      category: "Home & Garden"
    },
    {
      name: "The Great Gatsby",
      price: 10,
      image: "https://cdn.pixabay.com/photo/2016/11/23/14/45/book-1853677_1280.jpg",
      category: "Books"
    }
  ];
  
  
  function renderProducts(productList) {
    const container = document.getElementById("productGrid");
    container.innerHTML = "";
  
    productList.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
      `;
      container.appendChild(card);
    });
  }
  
  function updatePriceLabel() {
    const rangeInput = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    priceValue.textContent = `$${rangeInput.value}`;
  }
  
  document.getElementById("priceRange").addEventListener("input", () => {
    updatePriceLabel();
  });
  
  window.onload = () => {
    updatePriceLabel();
    renderProducts(products);
  };
  