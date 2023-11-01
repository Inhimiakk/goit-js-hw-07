import { galleryItems } from './gallery-items.js';
// Change code below this line

const list = document.querySelector(".gallery");
list.insertAdjacentHTML('beforeend', createMarkup(galleryItems));
list.addEventListener('click', (handleClick));

function handleClick(event) {
    event.preventDefault();

    if (event.target === event.currentTarget) {
        return;
    }
    const currentProduct = event.target.closest(".gallery__item");
     const currentProductSource = currentProduct.querySelector('.gallery__image').dataset.source;
    const product = galleryItems.find(({ original }) => original=== currentProductSource);
    const instance = basicLightbox.create(`
    <div class="modal">
        <img class="gallery__image"
        src="${product.original}"
        alt="${product.description}"/>
    </div>
    `,
     {
      onShow: () => {
        window.addEventListener('keydown', onKeydownEsc);
      },
      onClose: () => {
        window.removeEventListener('keydown', onKeydownEsc);
      },
    });

     const onKeydownEsc = event => {
    console.log(event.code);
    if (event.code === 'Escape') {
      instance.close();
    }
  };

    instance.show();
}

function createMarkup(arr) {
    return arr
        .map(({ preview, original, description }) =>
    `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"/> </a>
    </li>
    `).join("");
}

console.log(galleryItems);
