import { galleryItems } from "./gallery-items.js";

document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");

  function createGalleryItem(item) {
    const galleryItem = document.createElement("li");
    galleryItem.classList.add("gallery__item");

    const link = document.createElement("a");
    link.classList.add("gallery__link");
    link.href = item.original;

    const image = document.createElement("img");
    image.classList.add("gallery__image");
    image.src = item.preview;
    image.alt = item.description;
    image.setAttribute("data-source", item.original);

    link.appendChild(image);
    galleryItem.appendChild(link);

    return galleryItem;
  }

  function openModal(event) {
    event.preventDefault();

    if (event.target.classList.contains("gallery__image")) {
      const largeImageURL = event.target.dataset.source;

      const instance = basicLightbox.create(`
      <img src="${largeImageURL}" width="1800" height="1600">`);
      instance.show();

      document.addEventListener("keydown", closeModalOnEscape);

      function closeModalOnEscape(event) {
        if (event.key === "Escape") {
          instance.close();
          document.removeEventListener("keydown", closeModalOnEscape);
        }
      }
    }
  }

  galleryItems.forEach((item) => {
    const galleryItem = createGalleryItem(item);
    gallery.appendChild(galleryItem);
  });

  gallery.addEventListener("click", openModal);
});
