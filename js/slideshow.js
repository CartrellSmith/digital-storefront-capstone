let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll("#slideshow .slide");

    slides.forEach(slide => slide.classList.remove("active"));

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", showSlides);
