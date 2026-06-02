// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

// Find product
const product = PRODUCTS.find(p => p.id === productId);

// Render product
const container = document.getElementById("product-details");

if (product) {
    container.innerHTML = `
        <div class="bg-white p-6 rounded shadow">
            <img src="${product.image}" class="w-full h-64 object-cover rounded mb-4">

            <h1 class="text-3xl font-bold mb-2">${product.name}</h1>

            <p class="text-xl font-semibold text-gray-900 mb-2">$${product.price}</p>

            <button 
                onclick="addToCartFromDetails(${product.id})"
                class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Add to Cart
            </button>
        </div>
    `;
} else {
    container.innerHTML = `<p class="text-red-500">Product not found.</p>`;
}
function addToCartFromDetails(productId) {
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if already in cart
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to cart page
    window.location.href = "cart.html";
}