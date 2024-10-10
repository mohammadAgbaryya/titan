import axios from 'axios';
import { getFromCache, saveToCache } from '../utils/cache';

// Pixabay API credentials and base URL
const API_KEY = '45640711-3b2c9c3e0dd9ac6e6a5b798be';
const API_URL = 'https://pixabay.com/api/';

// Fetch images from Pixabay API
export async function fetchPixabayImages(num: number): Promise<string[]> {
  const cacheKey = `pixabay_${num}`;
  const cachedResult = getFromCache(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        per_page: num,
      },
    });

    const imageUrls = response.data.hits.map((hit: any) => hit.webformatURL);

    // Cache the result
    saveToCache(cacheKey, imageUrls);

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from Pixabay:', error);
    return [];
  }
}
