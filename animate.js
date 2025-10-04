document.addEventListener("DOMContentLoaded", function() {
    const elementsToAnimate = document.querySelectorAll(".animate-on-load");
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add("fade-in");
    });
});