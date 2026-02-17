const API_LINK = "https://fakestoreapi.com";
let allProducts = [];
let shoppingCart = [];
document.addEventListener("DOMContentLoaded", function () {
  loadCartFromStorage();
  getAllProducts();
  getAllCategories();
  loadTopRatedProducts();
  showCartCount();
});
async function getAllProducts() {
  try {
    const response = await fetch(API_LINK + "/products");
    const data = await response.json();
    allProducts = data;
    displayProducts(allProducts);
  } catch (error) {
    console.log("Products don't loading", error);
    alert("Products loading failed");
  }
}
async function getAllCategories() {
  try {
    const response = await fetch(API_LINK + "/products/categories");
    const categories = await response.json();
    const categoryContainer = document.getElementById("category-filters");
    categories.forEach(function (category) {
      const button = document.createElement("button");
      button.className = "btn btn-outline btn-primary category-btn";
      button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      button.onclick = function () {
        getProductsByCategory(category, button);
      };
      categoryContainer.appendChild(button);
    });
  } catch (error) {
    console.log("Categories don't loading", error);
  }
}
async function getProductsByCategory(categoryName, clickedButton) {
  try {
    showLoading();
    const allButtons = document.querySelectorAll(".category-btn");
    allButtons.forEach(function (btn) {
      btn.classList.remove("active");
      btn.classList.add("btn-outline");
    });
    clickedButton.classList.add("active");
    clickedButton.classList.remove("btn-outline");
    const response = await fetch(
      API_LINK + "/products/category/" + categoryName,
    );
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.log("Category products don't loading", error);
  }
}
async function loadTopRatedProducts() {
  try {
    let products = allProducts;

    if (products.length === 0) {
      const response = await fetch(API_LINK + "/products");
      products = await response.json();
    }
    const sortedProducts = products.sort(function (a, b) {
      return b.rating.rate - a.rating.rate;
    });
    const topRated = sortedProducts.slice(0, 3);
    const container = document.getElementById("top-rated-products");
    container.innerHTML = "";
    topRated.forEach(function (product) {
      const productCard = document.createElement("div");
      productCard.className = "card bg-base-100 shadow-xl product-card";

      let shortTitle = product.title;
      if (product.title.length > 50) {
        shortTitle = product.title.substring(0, 50) + "...";
      }

      const stars = createStarRating(product.rating.rate);

      productCard.innerHTML = `
                <figure class="product-img-container">
                    <img src="${product.image}" alt="${product.title}" />
                </figure>
                <div class="card-body">
                    <div class="flex justify-between items-start mb-2">
                        <span class="category-badge">${product.category}</span>
                        <div class="flex items-center gap-1">
                            ${stars}
                            <span class="text-sm text-gray-600">(${product.rating.count})</span>
                        </div>
                    </div>
                    <h3 class="card-title text-base truncate-2-lines" title="${product.title}">${shortTitle}</h3>
                    <p class="price-badge">$${product.price}</p>
                    <div class="card-actions justify-between mt-4">
                        <button class="btn btn-outline btn-primary btn-sm" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="addProductToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;

      container.appendChild(productCard);
    });
  } catch (error) {
    console.log("Top rated products don't loading", error);
    const container = document.getElementById("top-rated-products");
    container.innerHTML =
      '<p class="col-span-full text-center text-error">Top rated products load problem।</p>';
  }
}
function displayProducts(productsList) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";
  if (productsList.length === 0) {
    container.innerHTML =
      '<p class="col-span-full text-center">কোনো product পাওয়া যায়নি।</p>';
    return;
  }
  productsList.forEach(function (product) {
    const productCard = document.createElement("div");
    productCard.className = "card bg-base-100 shadow-xl product-card";
    let shortTitle = product.title;
    if (product.title.length > 50) {
      shortTitle = product.title.substring(0, 50) + "...";
    }
    const stars = createStarRating(product.rating.rate);
    productCard.innerHTML = `
            <figure class="product-img-container">
                <img src="${product.image}" alt="${product.title}" />
            </figure>
            <div class="card-body">
                <div class="flex justify-between items-start mb-2">
                    <span class="category-badge">${product.category}</span>
                    <div class="flex items-center gap-1">
                        ${stars}
                        <span class="text-sm text-gray-600">(${product.rating.count})</span>
                    </div>
                </div>
                <h3 class="card-title text-base truncate-2-lines" title="${product.title}">${shortTitle}</h3>
                <p class="price-badge">$${product.price}</p>
                <div class="card-actions justify-between mt-4">
                    <button class="btn btn-outline btn-primary btn-sm" onclick="showProductDetails(${product.id})">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="addProductToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    container.appendChild(productCard);
  });
}
function createStarRating(rating) {
  const fullStars = Math.floor(rating);
  const needHalfStar = rating % 1 >= 0.5;
  let starsHTML = "";
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star stars"></i>';
  }
  if (needHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt stars"></i>';
  }
  const emptyStars = 5 - fullStars - (needHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star stars"></i>';
  }

  return starsHTML;
}
async function showProductDetails(productId) {
  try {
    const response = await fetch(API_LINK + "/products/" + productId);
    const product = await response.json();
    const modalContent = document.getElementById("modal-content");
    const stars = createStarRating(product.rating.rate);
    modalContent.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="flex items-center justify-center bg-base-200 p-6 rounded-lg">
                    <img src="${product.image}" alt="${product.title}" class="modal-product-img" />
                </div>
                <div>
                    <h3 class="text-2xl font-bold mb-3">${product.title}</h3>
                    <div class="flex items-center gap-2 mb-3">
                        ${stars}
                        <span class="text-sm">(${product.rating.rate} / 5)</span>
                        <span class="text-sm text-gray-600">• ${product.rating.count} reviews</span>
                    </div>
                    <span class="category-badge mb-4 inline-block">${product.category}</span>
                    <p class="text-3xl font-bold text-primary mb-4">$${product.price}</p>
                    <p class="text-gray-700 mb-6">${product.description}</p>
                    <div class="flex gap-3">
                        <button class="btn btn-primary flex-1" onclick="addProductToCart(${product.id}); closeModal();">
                            <i class="fas fa-cart-plus mr-2"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    document.getElementById("product_modal").showModal();
  } catch (error) {
    console.log("Product details don't loading", error);
    showMessage("Product details  don't loading", "error");
  }
}
function addProductToCart(productId) {
  const product = allProducts.find(function (p) {
    return p.id === productId;
  });
  if (!product) {
    showMessage("Product পাওয়া যাচ্ছে না!", "error");
    return;
  }
  const existingProduct = shoppingCart.find(function (item) {
    return item.id === productId;
  });
  if (existingProduct) {
    existingProduct.quantity = existingProduct.quantity + 1;
  } else {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    };
    shoppingCart.push(cartItem);
  }
  updateCartDisplay();
  saveCartToStorage();
  showMessage("Product added", "success");
}
function removeFromCart(productId) {
  shoppingCart = shoppingCart.filter(function (item) {
    return item.id !== productId;
  });
  updateCartDisplay();
  saveCartToStorage();
  showMessage("Product remove successfully", "info");
}
function changeQuantity(productId, change) {
  const item = shoppingCart.find(function (cartItem) {
    return cartItem.id === productId;
  });

  if (item) {
    item.quantity = item.quantity + change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
      saveCartToStorage();
    }
  }
}
function updateCartDisplay() {
  showCartCount();
  showCartTotal();
  showCartItems();
}
function showCartCount() {
  let totalItems = 0;
  shoppingCart.forEach(function (item) {
    totalItems = totalItems + item.quantity;
  });
  document.getElementById("cart-count").textContent = totalItems;
}
function showCartTotal() {
  let totalPrice = 0;
  shoppingCart.forEach(function (item) {
    totalPrice = totalPrice + item.price * item.quantity;
  });
  document.getElementById("cart-total").textContent =
    "$" + totalPrice.toFixed(2);
}
function showCartItems() {
  const container = document.getElementById("cart-items");
  if (shoppingCart.length === 0) {
    container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart text-6xl mb-4"></i>
                <p class="text-xl">cart is empty</p>
                <p class="text-sm">Product added please</p>
            </div>
        `;
    return;
  }
  container.innerHTML = "";
  shoppingCart.forEach(function (item) {
    let shortTitle = item.title;
    if (item.title.length > 40) {
      shortTitle = item.title.substring(0, 40) + "...";
    }
    const cartItemHTML = `
            <div class="cart-item flex gap-4">
                <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain bg-base-200 rounded p-2" />
                <div class="flex-1">
                    <h4 class="font-semibold text-sm mb-1">${shortTitle}</h4>
                    <p class="text-primary font-bold">$${item.price}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="btn btn-xs btn-circle" onclick="changeQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="font-semibold">${item.quantity}</span>
                        <button class="btn btn-xs btn-circle" onclick="changeQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="btn btn-xs btn-error ml-auto" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

    container.innerHTML += cartItemHTML;
  });
}
function toggleCart() {
  const sidebar = document.getElementById("cart-sidebar");
  const overlay = document.getElementById("cart-overlay");
  sidebar.classList.toggle("cart-open");
  overlay.classList.toggle("hidden");
}
function saveCartToStorage() {
  localStorage.setItem("swiftcart", JSON.stringify(shoppingCart));
}
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("swiftcart");
  if (savedCart) {
    shoppingCart = JSON.parse(savedCart);
    updateCartDisplay();
  }
}
function showLoading() {
  const container = document.getElementById("products-container");
  container.innerHTML = `
        <div class="col-span-full flex justify-center py-12">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>
    `;
}
function showMessage(messageText, messageType) {
  const toast = document.createElement("div");
  toast.className = "toast toast-end";

  let alertClass = "alert-info";
  if (messageType === "success") alertClass = "alert-success";
  if (messageType === "error") alertClass = "alert-error";
  if (messageType === "warning") alertClass = "alert-warning";

  toast.innerHTML = `
        <div class="alert ${alertClass}">
            <span>${messageText}</span>
        </div>
    `;
  document.body.appendChild(toast);
  const duration = messageType === "success" ? 5000 : 3000;
  setTimeout(function () {
    toast.remove();
  }, duration);
}

function closeModal() {
  document.getElementById("product_modal").close();
}

function handleNewsletter(event) {
  event.preventDefault();
  const emailInput = event.target.querySelector('input[type="email"]');
  const email = emailInput.value;
  showMessage("thanks! " + email + " subscribe", "success");
  event.target.reset();
}
loadCartFromStorage();
function showAllProducts() {
  showLoading();
  const allButtons = document.querySelectorAll(".category-btn");
  allButtons.forEach(function (btn) {
    btn.classList.remove("active");
    btn.classList.add("btn-outline");
  });
  const allProductsBtn = document.querySelector('[data-category="all"]');
  if (allProductsBtn) {
    allProductsBtn.classList.add("active");
    allProductsBtn.classList.remove("btn-outline");
  }
  displayProducts(allProducts);
}
window.addEventListener("load", function () {
  const allProductsBtn = document.querySelector('[data-category="all"]');
  if (allProductsBtn) {
    allProductsBtn.onclick = function () {
      showAllProducts();
    };
  }
});

function checkout() {
  if (shoppingCart.length === 0) {
    showMessage("added products", "warning");
    return;
  }
  let totalAmount = 0;
  shoppingCart.forEach(function (item) {
    totalAmount = totalAmount + item.price * item.quantity;
  });
  shoppingCart = [];
  localStorage.removeItem("swiftcart");
  updateCartDisplay();
  toggleCart();
  showMessage(
    "🎉 thanks orders purchase $" + totalAmount.toFixed(2),
    "success",
  );
}
