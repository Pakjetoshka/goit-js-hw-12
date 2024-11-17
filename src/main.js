import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  hideBtn,
  showBtn,
  scrollMore,
} from './js/render-functions';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const moreBtn = document.querySelector('.more-btn');

let query = '';
let page = 1;
let totalHits = 0;
let per_page = 15;
hideBtn();

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

async function loadImages() {
  try {
    showLoader();
    const data = await fetchImages(query, page);

    totalHits = data.totalHits;

    if (data.hits.length === 0 && page === 1) {
      iziToast.info({
        message:
          'Sorry, has no images for your request',
        position: 'topRight'
      });
      hideBtn();
      return;
    }

    renderGallery(data.hits);

    if (page * per_page >= totalHits) {
      hideBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showBtn();
    }
    scrollMore();
  }
  catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const request = event.currentTarget.elements.searchRequest.value.trim();

  if (!request) {
    iziToast.warning({
      message: 'Please enter a valid search term.',
      position: 'topRight',
    });
    clearGallery();
    hideBtn();
    return;
  }

  query = request;
  page = 1;
  clearGallery();
  hideBtn();
  showLoader();
  loadImages();
});

moreBtn.addEventListener('click', () => {
  page += 1;
  showLoader();
  loadImages();
});