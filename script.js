const galleryItems = document.querySelectorAll(".gallery-item");

const searchInput = document.getElementById("searchInput");

const categoryButtons = document.querySelectorAll(".category-btn");

const noResults = document.getElementById("noResults");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


let selectedCategory = "all";

let visibleImages = [];

let currentIndex = 0;


/* ------------------------------
   FILTER IMAGES
-------------------------------- */

function filterImages() {

    const searchText = searchInput.value.toLowerCase().trim();

    visibleImages = [];

    galleryItems.forEach(item => {

        const category = item.dataset.category;

        const title = item.dataset.title.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch =
            title.includes(searchText) ||
            category.includes(searchText);

        if (matchesCategory && matchesSearch) {

            item.style.display = "block";

            visibleImages.push(item);

        } else {

            item.style.display = "none";

        }

    });


    if (visibleImages.length === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }
}


/* ------------------------------
   SEARCH
-------------------------------- */

searchInput.addEventListener("input", filterImages);


/* ------------------------------
   CATEGORY FILTER
-------------------------------- */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterImages();

    });

});


/* ------------------------------
   OPEN LIGHTBOX
-------------------------------- */

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        visibleImages = Array.from(
            document.querySelectorAll(
                ".gallery-item[style*='display: block']"
            )
        );

        /*
          If browser doesn't include the style correctly,
          create the visible list manually.
        */

        if (visibleImages.length === 0) {

            visibleImages = Array.from(galleryItems)
                .filter(image => image.style.display !== "none");

        }

        currentIndex = visibleImages.indexOf(item);

        if (currentIndex === -1) {
            currentIndex = 0;
        }

        showImage(currentIndex);

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});


/* ------------------------------
   SHOW IMAGE
-------------------------------- */

function showImage(index) {

    if (visibleImages.length === 0) {
        return;
    }

    const item = visibleImages[index];

    const image = item.querySelector("img");

    const title = item.dataset.title;

    const category = item.dataset.category;

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title;

    lightboxCategory.textContent =
        category.charAt(0).toUpperCase() +
        category.slice(1);

}


/* ------------------------------
   NEXT IMAGE
-------------------------------- */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);

});


/* ------------------------------
   PREVIOUS IMAGE
-------------------------------- */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage(currentIndex);

});


/* ------------------------------
   CLOSE LIGHTBOX
-------------------------------- */

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}


closeBtn.addEventListener("click", closeLightbox);


/* ------------------------------
   CLOSE WHEN CLICKING BACKGROUND
-------------------------------- */

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* ------------------------------
   KEYBOARD CONTROLS
-------------------------------- */

document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {

        nextBtn.click();

    }

    if (event.key === "ArrowLeft") {

        prevBtn.click();

    }

    if (event.key === "Escape") {

        closeLightbox();

    }

});


/* ------------------------------
   INITIAL LOAD
-------------------------------- */

filterImages();s