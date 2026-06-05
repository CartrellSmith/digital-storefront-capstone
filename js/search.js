document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search-bar");
    const resultsBox = document.getElementById("search-results");

    if (!input || !resultsBox) return;

    resultsBox.addEventListener("mousedown", (e) => {
        e.preventDefault(); // Prevents blur so arrow keys keep working
    });

    let activeIndex = -1;

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase().trim();

        if (value === "") {
            resultsBox.classList.add("hidden");
            resultsBox.innerHTML = "";
            activeIndex = -1;
            return;
        }

        const matches = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(value)
        );

        if (matches.length === 0) {
            resultsBox.innerHTML = `
                <p class="p-3 text-gray-500" role="alert">No results found</p>
            `;
            resultsBox.classList.remove("hidden");
            activeIndex = -1;
            return;
        }

        resultsBox.innerHTML = matches.map(p => `
            <a 
                href="${p.url}" 
                role="option"
                class="search-item flex items-center gap-3 p-3 cursor-pointer
                    hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
            >
                <img 
                    src="${p.image}" 
                    alt="${p.name}" 
                    class="w-12 h-12 object-cover rounded"
                >
                <span>${p.name}</span>
            </a>
        `).join("");

        resultsBox.classList.remove("hidden");
        activeIndex = -1;
    });

    // ⭐ ARROW KEY NAVIGATION
    input.addEventListener("keydown", (e) => {
    const items = resultsBox.querySelectorAll(".search-item");
    if (!items.length) return;

    // helper: clear previous highlight
    const clearActive = () => {
        items.forEach(item => item.classList.remove("bg-gray-200"));
    };

    if (e.key === "ArrowDown") {
        e.preventDefault(); // stop page scroll
        activeIndex = (activeIndex + 1) % items.length;
        clearActive();
        items[activeIndex].classList.add("bg-gray-200"); // highlight only
    }

    if (e.key === "ArrowUp") {
        e.preventDefault(); // stop page scroll
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        clearActive();
        items[activeIndex].classList.add("bg-gray-200");
    }

    if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        items[activeIndex].click(); // open selected product
    }
});
});