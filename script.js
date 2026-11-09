// STYLEFIT DRESS COLLECTION

const products = [
    {
        id: 1,
        name: "Floral Summer Dress",
        price: 799,
        category: "Western Wear",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600"
    },
    {
        id: 2,
        name: "Elegant Pink Dress",
        price: 999,
        category: "Western Wear",
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600"
    },
    {
        id: 3,
        name: "Traditional Ethnic Wear",
        price: 1299,
        category: "Ethnic Wear",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600"
    },
    {
        id: 4,
        name: "Designer Kurti",
        price: 699,
        category: "Kurtis",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?w=600"
    },
    {
        id: 5,
        name: "Party Wear Dress",
        price: 1499,
        category: "Western Wear",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600"
    },
    {
        id: 6,
        name: "Classic Saree",
        price: 1799,
        category: "Sarees",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600"
    }
];

// CART ARRAY
let cart = [];

// DISPLAY PRODUCTS
const productList = document.getElementById("product-list");
// SEARCH AND CATEGORY FILTER

let selectedCategory = "All";
let searchText = "";

productList.insertAdjacentHTML("beforebegin", `
    <div class="filter-section">

        <input
            type="text"
            id="search-input"
            placeholder="Search for dresses..."
        >

        <select id="category-filter">
            <option value="All">All Categories</option>
            <option value="Western Wear">Western Wear</option>
            <option value="Ethnic Wear">Ethnic Wear</option>
            <option value="Kurtis">Kurtis</option>
            <option value="Sarees">Sarees</option>
        </select>

    </div>
`);

document.getElementById("search-input")
    .addEventListener("input", function () {
        searchText = this.value.toLowerCase();
        displayProducts();
    });

document.getElementById("category-filter")
    .addEventListener("change", function () {
        selectedCategory = this.value;
        displayProducts();
    });

// DISPLAY FILTERED PRODUCTS

function displayProducts() {
    productList.innerHTML = "";

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productList.innerHTML =
            "<p>No dresses found!</p>";
        return;
    }

    filteredProducts.forEach(product => {

        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <h4>₹${product.price}</h4>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(productCard);
    });
}

// ADD PRODUCT TO CART
function addToCart(productId) {
    const selectedProduct = products.find(
        product => product.id === productId
    );

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    updateCart();
}

// DISPLAY CART
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("p");
        cartItem.innerHTML = `
            ${item.name} - ₹${item.price}
            × ${item.quantity}
            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

// REMOVE PRODUCT FROM CART
function removeFromCart(productId) {
    const selectedItem = cart.find(
        item => item.id === productId
    );

    if (selectedItem.quantity > 1) {
        selectedItem.quantity--;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }

    updateCart();
}

// CREATE CART SECTION
const productsSection = document.getElementById("products");

productsSection.insertAdjacentHTML("beforeend", `
    <div class="cart-section">
        <h2>Shopping Cart</h2>
        <p>Items in Cart: <span id="cart-count">0</span></p>
        <div id="cart-items"></div>
        <h3>Total: ₹<span id="cart-total">0</span></h3>
    </div>
`);

// LOAD PRODUCTS
displayProducts();
updateCart();
