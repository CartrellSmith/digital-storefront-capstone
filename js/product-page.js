/* ---------------------------------------------------------
   STOP: Only run product detail logic on product-details.html
--------------------------------------------------------- */
const isDetailsPage = window.location.pathname.includes("product-details.html");

/* ---------------------------------------------------------
   GLOBAL: Add to Cart (used by ALL pages)
--------------------------------------------------------- */
function addToCartFromDetails(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

    // Sync global cart array
    if (typeof window.cart !== "undefined") {
        window.cart = cart;
    }

    // ⭐ FINAL FIX: update badge AFTER DOM is painted
    if (typeof updateCartDisplay === "function") {
        requestAnimationFrame(() => updateCartDisplay());
    }
}

/* ---------------------------------------------------------
   PRODUCT DETAILS PAGE LOGIC (ONLY runs on details page)
--------------------------------------------------------- */
if (isDetailsPage) {

    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    function loadProductDetails() {
        const product = PRODUCTS.find(p => p.id === productId);
        const container = document.getElementById("product-details");

        if (!container || !product) return;

        container.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = "bg-white p-6 rounded shadow";
        wrapper.setAttribute("role", "region");
        wrapper.setAttribute("aria-label", `${product.name} product details`);

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.className = "w-full h-64 object-cover rounded mb-4";
        img.setAttribute("role", "img");
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        img.onerror = () => handleImageError(img);

        const name = document.createElement("h1");
        name.textContent = product.name;
        name.className = "text-3xl font-bold mb-2";
        name.setAttribute("role", "heading");
        name.setAttribute("aria-level", "1");

        const price = document.createElement("p");
        price.textContent = `$${product.price}`;
        price.className = "text-xl font-semibold mb-4";
        price.setAttribute("aria-label", `Price ${product.price} dollars`);

        const btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.className = "bg-black text-white px-4 py-2 rounded hover:bg-gray-800";
        btn.setAttribute("aria-label", `Add ${product.name} to cart`);
        btn.setAttribute("role", "button");
        btn.addEventListener("click", () => addToCartFromDetails(product.id));

        wrapper.appendChild(img);
        wrapper.appendChild(name);
        wrapper.appendChild(price);
        wrapper.appendChild(btn);

        container.appendChild(wrapper);
    }

    // Run only on product-details.html
    document.addEventListener("DOMContentLoaded", loadProductDetails);
}