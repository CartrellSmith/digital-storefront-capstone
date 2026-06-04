let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll("#slideshow .slide");
    const announcer = document.getElementById("slideshow-announcer");

    slides.forEach((slide, i) => {
        slide.classList.remove("active");

        // Accessibility: mark inactive slides
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("tabindex", "-1");
    });

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    const activeSlide = slides[slideIndex - 1];
    activeSlide.classList.add("active");

    // Accessibility: mark active slide
    activeSlide.setAttribute("aria-hidden", "false");
    activeSlide.setAttribute("tabindex", "0");

    // Announce slide change to screen readers
    if (announcer) {
        announcer.textContent = `Slide ${slideIndex} of ${slides.length}`;
    }

    setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    // Add announcer if missing
    if (!document.getElementById("slideshow-announcer")) {
        const announcer = document.createElement("div");
        announcer.id = "slideshow-announcer";
        announcer.className = "sr-only";
        announcer.setAttribute("aria-live", "polite");
        announcer.setAttribute("role", "status");
        document.body.appendChild(announcer);
    }

    showSlides();
});