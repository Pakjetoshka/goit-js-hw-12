import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more-btn');
let lightbox = new SimpleLightbox('.gallery a');

 export function showBtn() {
  moreBtn.style.display = 'block';
}
export function hideBtn() {
  moreBtn.style.display = 'none';
}

function renderGallery(images) {
  const markup = images.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => `
  <li class="image-card">
        <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}">
        </a>
        <div class="image-info">
                <p> Likes ${likes}</p>
                <p> Comments ${comments}</p>
                <p> Views ${views}</p>
                <p> Downloads ${downloads}</p>
</div>
        </li>`)
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}


function clearGallery() {
  gallery.innerHTML = '';
};

function scrollMore() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

export { scrollMore };
export { clearGallery };
export { renderGallery };