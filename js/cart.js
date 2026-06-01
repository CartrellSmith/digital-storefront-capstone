// 1. Global cart array
let cart = [];


// 2. Sync cart on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = storedCart;

    updateCartDisplay();
    renderCartPage();
});


// 3. Sync cart when returning with back button
window.addEventListener("pageshow", () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = storedCart;

    updateCartDisplay();
    renderCartPage();
});


// 4. Add to cart (with quantity support)
function addToCart(button) {
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const image = button.dataset.image;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    renderCartPage();
}

// 5. Update cart badge
function updateCartDisplay() {
    const cartBadge = document.getElementById("cart-count");

    if (cartBadge) {
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalQty;
    }
}


// 6. ⭐ THIS IS WHERE renderCartPage() GOES ⭐
function renderCartPage() {
    const cartContainer = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total");

    if (!cartContainer) return;

    // Empty cart first
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p class="text-gray-600 text-lg">Your cart is empty.</p>
        `;
        totalDisplay.textContent = "0.00";
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "bg-white p-4 rounded shadow flex justify-between items-center";

        itemDiv.innerHTML = `
            <div class="flex items-center gap-4">
                <img 
                    src="${item.image}" 
                    class="w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm
                            transition-transform duration-200 hover:scale-110"
                    alt="${item.name}"
                />

                <div>
                    <h3 class="text-lg font-semibold">${item.name}</h3>
                    <p class="text-gray-600">$${item.price} × ${item.quantity}</p>
                    <p class="font-semibold">Subtotal: $${itemTotal.toFixed(2)}</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button 
                    class="bg-gray-300 px-3 py-1 rounded" 
                    onclick="decreaseQty(${index})"
                    >-</button>

                <span class="min-w-6 text-center font-semibold">${item.quantity}</span>

                <button 
                    class="bg-gray-300 px-3 py-1 rounded" 
                    onclick="increaseQty(${index})"
                    >+</button>
                </div>
        `;

        cartContainer.appendChild(itemDiv);
    });

    totalDisplay.textContent = total.toFixed(2);
}


// 7. Increase quantity
function increaseQty(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    renderCartPage();
}


// 8. Decrease quantity
function decreaseQty(index) {
    cart[index].quantity -= 1;

    if (cart[index].quantity <= 0) {
        removeFromCart(index);
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    renderCartPage();
}


// 9. Remove item
function removeFromCart(index) {
    cart.splice(index, 1);

    if (cart.length === 0) {
        localStorage.removeItem("cart");
        cart = [];
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateCartDisplay();
    renderCartPage();
}

// Run on cart page load
document.addEventListener("DOMContentLoaded", () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = storedCart;

    updateCartDisplay();
    renderCartPage();
});