// HAMBURGER MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// Quick View Modal Logic
function openQuickView(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    document.getElementById("qv-image").src = product.image;
    document.getElementById("qv-name").textContent = product.name;
    document.getElementById("qv-price").textContent = "$" + product.price;

    const addBtn = document.getElementById("qv-add-cart");
    addBtn.onclick = () => addToCartFromDetails(product.id);

    document.getElementById("quick-view-modal").classList.remove("hidden");
}

function closeQuickView() {
    document.getElementById("quick-view-modal").classList.add("hidden");
}

document.getElementById("quick-view-modal").addEventListener("click", (e) => {
    if (e.target.id === "quick-view-modal") {
        closeQuickView();
    }
});
