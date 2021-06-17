import defaultExport from './gallery-items';

const gallery = document.querySelector('ul.gallery');
const createMarkup = createGalleryMarkup(defaultExport);
const modal = document.querySelector('div.lightbox');
const modalBackdrop = document.querySelector('div.lightbox__overlay');
const closeBtn = document.querySelector('button[data-action=close-lightbox]');
const currentImage = document.querySelector('img.lightbox__image');

gallery.insertAdjacentHTML('beforeend', createMarkup);

gallery.addEventListener('click', onGalleryItemClick);
closeBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

function createGalleryMarkup(cards) {
  let cardIndex = 1;
  return cards
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        data-index="${cardIndex++}"
        alt="${description}"
      />
    </a>
  </li>
    `;
    })
    .join('');
}

function onGalleryItemClick(evt) {
  evt.preventDefault();
  const currentItem = evt.target.classList.contains('gallery__image');

  if (!currentItem) {
    return;
  }

  modal.classList.add('is-open');
  currentImage.src = evt.target.dataset.source;
  currentImage.alt = evt.target.alt;
  currentImage.dataset.index = evt.target.dataset.index;

  window.addEventListener('keydown', closeModalOnEscBtnPush);
  window.addEventListener('keydown', changeImg);
}

function closeModal() {
  modal.classList.remove('is-open');
  currentImage.src = '';
  currentImage.alt = '';

  window.removeEventListener('keydown', closeModalOnEscBtnPush);
  window.removeEventListener('keydown', changeImg);
}

function closeModalOnEscBtnPush(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function changeImg(evt) {
  const nextImg = evt.code === 'ArrowRight';
  const prevImg = evt.code === 'ArrowLeft';
  let currentIndex = Number(currentImage.dataset.index);
  // console.log(currentIndex);
  if (nextImg) {
    if (currentIndex > 0 && currentIndex < defaultExport.length) {
      currentIndex += 1;

      let newImg = document.querySelector(`img[data-index='${currentIndex}']`);
      // console.log(newImg);
      currentImage.src = newImg.dataset.source;
      currentImage.alt = newImg.alt;
      currentImage.dataset.index = newImg.dataset.index;
    } else if (currentIndex === defaultExport.length) {
      currentIndex = 1;
      // currentIndex += 1;

      let newImg = document.querySelector(`img[data-index='${currentIndex}']`);
      // console.log(newImg);
      currentImage.src = newImg.dataset.source;
      currentImage.alt = newImg.alt;
      currentImage.dataset.index = newImg.dataset.index;
    }
  } else if (prevImg) {
    if (currentIndex > 1 && currentIndex <= defaultExport.length) {
      currentIndex -= 1;

      let newImg = document.querySelector(`img[data-index='${currentIndex}']`);
      // console.log(newImg);
      currentImage.src = newImg.dataset.source;
      currentImage.alt = newImg.alt;
      currentImage.dataset.index = newImg.dataset.index;
    } else if (currentIndex === 1) {
      currentIndex = defaultExport.length;
      // currentIndex -= 1;

      let newImg = document.querySelector(`img[data-index='${currentIndex}']`);
      // console.log(newImg);
      currentImage.src = newImg.dataset.source;
      currentImage.alt = newImg.alt;
      currentImage.dataset.index = newImg.dataset.index;
    }
  }
}
