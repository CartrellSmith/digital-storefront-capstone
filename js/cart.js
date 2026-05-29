// Load cart from localStorage or create empty array
let cart = [];

// Load cart count on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = storedCart;
    updateCartDisplay();
    renderCartPage();
});

window.addEventListener("pageshow", (event) => {
    // When coming back from back/forward cache, re-sync with localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = storedCart;
    updateCartDisplay();
    renderCartPage();
});

// Add product to cart
function addToCart(button) {
    const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price)
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Update cart counter badge
function updateCartDisplay() {
    const cartBadge = document.getElementById("cart-count");
    if (cartBadge) {
        cartBadge.textContent = cart.length > 0 ? cart.length : 0;
    }
}

// Render cart items on cart.html
function renderCartPage() {
    const cartContainer = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");

    if (!cartContainer) return; // Only run on cart page

    //FIRST: Handle empty cart immediately
    if (cart.length === 0) {
        cartContainer.innerHTML = `
        <p class="text-gray-600 text-lg">Your cart is empty.</p>
    `;
        totalDisplay.textContent = "0.00";
        return;
    }
    // Clear previous items
    cartContainer.innerHTML = "";

    let total = 0;

    // Render items
    cart.forEach((item, index) => {
        total += item.price;

        const itemDiv = document.createElement("div");
        itemDiv.className = "bg-white p-4 rounded shadow flex justify-between items-center";

        itemDiv.innerHTML = `
            <div>
                <h3 class="text-lg font-semibold">${item.name}</h3>
                <p class="text-gray-600">$${item.price}</p>
            </div>

            <button 
                class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    totalDisplay.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);

    if (cart.length === 0) {
        localStorage.removeItem("cart");
        cart = []; // reset to empty array
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateCartDisplay();
    renderCartPage();
}

// Run on cart page load
document.addEventListener("DOMContentLoaded", renderCartPage);