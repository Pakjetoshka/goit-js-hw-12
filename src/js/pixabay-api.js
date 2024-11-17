import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = `46861005-d1ea17891df84db160fa13612`;
const PER_PAGE = 15;

async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export { fetchImages };
