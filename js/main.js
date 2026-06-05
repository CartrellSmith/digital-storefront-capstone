let currentQuickViewProductId = null;

function handleImageError(img) {
    img.onerror = null; // Prevent infinite loop
    img.src = "assets/images/no-image.jpg";
}

/* -----------------------------
   HAMBURGER MENU (ACCESSIBLE)
----------------------------- */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-controls", "mobile-menu");
    menuBtn.setAttribute("aria-label", "Toggle navigation menu");

    menuBtn.addEventListener("click", () => {
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", !expanded);
        mobileMenu.classList.toggle("hidden");
    });
}

/* -----------------------------
   QUICK VIEW MODAL (ACCESSIBLE)
----------------------------- */
function openQuickView(id) {
    currentQuickViewProductId = id;
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById("quick-view-modal");
    const qvImg = document.getElementById("qv-image");

    qvImg.src = product.image;
    qvImg.alt = product.name;
    qvImg.setAttribute("role", "img");
    qvImg.setAttribute("loading", "lazy");
    qvImg.setAttribute("decoding", "async");
    qvImg.onerror = () => handleImageError(qvImg);

    document.getElementById("qv-name").textContent = product.name;
    document.getElementById("qv-price").textContent = "$" + product.price;

    modal.classList.remove("hidden");

    // Accessibility attributes
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "qv-name");
    modal.setAttribute("aria-describedby", "qv-price");

    // Trap focus inside modal
    document.getElementById("qv-close").focus();
}

function closeQuickView() {
    document.getElementById("quick-view-modal").classList.add("hidden");
}

/* Close when clicking outside modal */
const modal = document.getElementById("quick-view-modal");
if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target.id === "quick-view-modal") {
            closeQuickView();
        }
    });
}

/* ESC key closes modal */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeQuickView();
    }
});

/* Close button */
const qvClose = document.getElementById("qv-close");
if (qvClose) {
    qvClose.setAttribute("aria-label", "Close quick view");
    qvClose.addEventListener("click", closeQuickView);
}

/* Add to Cart button inside modal */
const qvAddCart = document.getElementById("qv-add-cart");
if (qvAddCart) {
    qvAddCart.setAttribute("aria-label", "Add item to cart");
    qvAddCart.addEventListener("click", () => {
        if (currentQuickViewProductId) {
            addToCartFromDetails(currentQuickViewProductId);
        }
    });
}

/* -----------------------------
   PRODUCT GRID (ACCESSIBLE)
----------------------------- */
function renderProducts() {
    const grid = document.getElementById("product-list");
    if (!grid) return;

    grid.innerHTML = "";

    PRODUCTS.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card bg-white rounded shadow p-4 flex flex-col";
        card.setAttribute("role", "group");
        card.setAttribute("aria-label", `${product.name} product card`);
        card.setAttribute("tabindex", "0");

        /* IMAGE WRAPPER */
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "product-img-wrapper";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.className = "product-img";
        img.onerror = () => handleImageError(img);

        const quickBtn = document.createElement("button");
        quickBtn.textContent = "Quick View";
        quickBtn.className = "quick-view-btn";
        quickBtn.addEventListener("click", () => openQuickView(product.id));

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(quickBtn);

        /* PRODUCT INFO */
        const info = document.createElement("div");
        info.className = "product-info mt-3"; // name + price only

        const actions = document.createElement("div");
        actions.className = "product-actions mt-2"; // add to cart stays visible

        const name = document.createElement("h2");
        name.textContent = product.name;
        name.className = "text-xl font-semibold mb-1";

        const price = document.createElement("p");
        price.textContent = `$${product.price}`;
        price.className = "text-lg font-bold mb-3";

        const cartBtn = document.createElement("button");
        cartBtn.textContent = "Add to Cart";
        cartBtn.className = "bg-black text-white py-2 rounded hover:bg-gray-800 w-full";
        cartBtn.addEventListener("click", () => addToCartFromDetails(product.id));

        info.appendChild(name);
        info.appendChild(price);

        actions.appendChild(cartBtn);

        /* BUILD CARD */
        card.appendChild(imgWrapper);
        card.appendChild(info);
        card.appendChild(actions);
        
        /* KEYBOARD SUPPORT */
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openQuickView(product.id);
            }
        });

        grid.appendChild(card);
    });
}

/* -----------------------------
   PAGE-SPECIFIC INITIALIZATION
----------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    // PRODUCTS PAGE
    if (document.getElementById("product-list")) {
        renderProducts();
    }

    // CART PAGE
    if (document.getElementById("cart-items")) {
        renderCartPage();
    }

    // PRODUCT DETAILS PAGE
    if (document.getElementById("product-details")) {
        loadProductDetails();
    }

    // Always update badge on page load
    if (typeof updateCartDisplay === "function") {
        updateCartDisplay();
    }

});

document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("quick-view-modal");
    if (modal.classList.contains("hidden")) return;

    if (e.key === "Escape") {
        closeQuickView();
    }

    // Trap focus inside modal
    const focusable = modal.querySelectorAll("button, [tabindex='0'], img");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

menuBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        menuBtn.click();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        mobileMenu.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
    }
});
