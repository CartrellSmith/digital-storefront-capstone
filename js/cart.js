// 1. Global cart array
let cart = [];

// Update cart badge
function updateCartDisplay() {
    const cartBadge = document.getElementById("cart-count");

    if (cartBadge) {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalQty = storedCart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalQty;
        cartBadge.setAttribute("aria-live", "polite");
        cartBadge.setAttribute("aria-label", `${totalQty} items in cart`);
    }
}

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

function renderCartPage() {
    const cartContainer = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("cart-total-value");

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p class="text-gray-600 text-lg" role="status" aria-live="polite">
                Your cart is empty.
            </p>
        `;
        if (totalDisplay) totalDisplay.textContent = "0.00";
        return;
    }

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "bg-white p-4 rounded shadow flex justify-between items-center";
        itemDiv.setAttribute("role", "group");
        itemDiv.setAttribute("aria-label", `${item.name} cart item`);

        const left = document.createElement("div");
        left.className = "flex items-center gap-4";

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.className = "w-12 h-12 object-cover rounded-md border border-gray-200 shadow-sm";
        img.setAttribute("role", "img");
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");

        const info = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.name;
        name.className = "text-lg font-semibold";

        const price = document.createElement("p");
        price.textContent = `$${item.price} × ${item.quantity}`;
        price.className = "text-gray-600";

        const subtotal = document.createElement("p");
        subtotal.textContent = `Subtotal: $${itemTotal.toFixed(2)}`;
        subtotal.className = "font-semibold";

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(subtotal);

        left.appendChild(img);
        left.appendChild(info);

        const right = document.createElement("div");
        right.className = "flex items-center gap-3";

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.className = "bg-gray-300 px-3 py-1 rounded";
        minusBtn.setAttribute("aria-label", `Decrease quantity of ${item.name}`);
        minusBtn.setAttribute("role", "button");
        minusBtn.addEventListener("click", () => decreaseQty(index));

        const qty = document.createElement("span");
        qty.textContent = item.quantity;
        qty.className = "min-w-6 text-center font-semibold";
        qty.setAttribute("aria-live", "polite");

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.className = "bg-gray-300 px-3 py-1 rounded";
        plusBtn.setAttribute("aria-label", `Increase quantity of ${item.name}`);
        plusBtn.setAttribute("role", "button");
        plusBtn.addEventListener("click", () => increaseQty(index));

        right.appendChild(minusBtn);
        right.appendChild(qty);
        right.appendChild(plusBtn);

        itemDiv.appendChild(left);
        itemDiv.appendChild(right);

        cartContainer.appendChild(itemDiv);

        img.onerror = () => handleImageError(img);
    });

    if (totalDisplay) totalDisplay.textContent = total.toFixed(2);
}

function increaseQty(index) {
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    renderCartPage();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
    renderCartPage();
}
