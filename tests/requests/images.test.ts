import {
  getFeaturedImage,
  getImage,
  searchImages,
} from '../../src/requests/images';
import {
  mockedApiTest,
  DERPIBOORU_API_URL,
  mockedPaginatedApiTest,
} from './helper';
import mockImageData from './data/images.json';

mockedApiTest(
  `${DERPIBOORU_API_URL}/images/0`,
  { image: mockImageData.images[0] },
  async () => {
    return await getImage(DERPIBOORU_API_URL, 0);
  },
);

mockedApiTest(
  `${DERPIBOORU_API_URL}/images/featured`,
  { image: mockImageData.images[1] },
  async () => {
    return await getFeaturedImage(DERPIBOORU_API_URL);
  },
);

mockedPaginatedApiTest<'images'>(
  `${DERPIBOORU_API_URL}/search/images?q=*`,
  mockImageData,
  async () => {
    return await searchImages(DERPIBOORU_API_URL, { q: '*' });
  },
);
