document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("search-bar");
    const resultsBox = document.getElementById("search-results");

    if (!input || !resultsBox) return;

    input.addEventListener("input", () => {
        const value = input.value.toLowerCase().trim();

        if (value === "") {
            resultsBox.classList.add("hidden");
            resultsBox.innerHTML = "";
            return;
        }

        const matches = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(value)
        );

        if (matches.length === 0) {
            resultsBox.innerHTML = `<p class="p-3 text-gray-500">No results found</p>`;
            resultsBox.classList.remove("hidden");
            return;
        }

        resultsBox.innerHTML = matches.map(p => `
            <a href="${p.url}" class="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer">
                <img src="${p.image}" class="w-12 h-12 object-cover rounded">
                <span>${p.name}</span>
            </a>
        `).join("");

        resultsBox.classList.remove("hidden");
    });
});
