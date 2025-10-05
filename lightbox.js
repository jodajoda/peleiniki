document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-image");
    const galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    const closeModal = document.querySelector(".close-button");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");
    let currentIndex;

    function showImage(index) {
        modal.style.animationName = "fadeIn";
        modal.style.display = "block";
        modalImg.src = galleryImages[index].src;
        currentIndex = index;
    }

    galleryImages.forEach((img, index) => {
        img.addEventListener("click", function() {
            showImage(index);
        });
    });

    function hideModal() {
        modal.style.animationName = "fadeOut";
        setTimeout(() => {
            modal.style.display = "none";
        }, 400);
    }

    closeModal.addEventListener("click", hideModal);

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            hideModal();
        }
    });

    function showNextImage() {
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    }

    function showPrevImage() {
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(prevIndex);
    }

    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);

    document.addEventListener("keydown", function(event) {
        if (modal.style.display === "block") {
            if (event.key === "ArrowRight") {
                showNextImage();
            } else if (event.key === "ArrowLeft") {
                showPrevImage();
            } else if (event.key === "Escape") {
                hideModal();
            }
        }
    });
});