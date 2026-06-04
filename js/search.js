document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search-bar");
    const resultsBox = document.getElementById("search-results");

    if (!input || !resultsBox) return;

    // Accessibility attributes for search box
    input.setAttribute("role", "searchbox");
    input.setAttribute("aria-label", "Search products");
    input.setAttribute("aria-controls", "search-results");
    input.setAttribute("aria-expanded", "false");

    // Accessibility for results container
    resultsBox.setAttribute("role", "listbox");
    resultsBox.setAttribute("aria-live", "polite");
    resultsBox.setAttribute("aria-label", "Search results");

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase().trim();

        if (value === "") {
            resultsBox.classList.add("hidden");
            resultsBox.innerHTML = "";
            input.setAttribute("aria-expanded", "false");
            return;
        }

        const matches = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(value)
        );

        if (matches.length === 0) {
            resultsBox.innerHTML = `
                <p class="p-3 text-gray-500" role="alert">
                    No results found
                </p>
            `;
            resultsBox.classList.remove("hidden");
            input.setAttribute("aria-expanded", "true");
            return;
        }

        resultsBox.innerHTML = matches.map(p => `
            <a 
                href="${p.url}" 
                role="option"
                aria-label="View product ${p.name}"
                class="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
            >
                <img 
                    src="${p.image}" 
                    alt="${p.name}" 
                    role="img"
                    loading="lazy"
                    decoding="async"
                    class="w-12 h-12 object-cover rounded"
                >
                <span>${p.name}</span>
            </a>
        `).join("");

        resultsBox.classList.remove("hidden");
        input.setAttribute("aria-expanded", "true");
    });
});

