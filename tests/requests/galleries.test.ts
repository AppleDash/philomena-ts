import { mockedPaginatedApiTest } from './helper';
import { DERPIBOORU_API_URL } from './helper';

import mockGalleryData from './data/galleries.json';
import { searchGalleries } from '../../src/requests/galleries';

mockedPaginatedApiTest<'galleries'>(
  `${DERPIBOORU_API_URL}/search/galleries?q=title:safe*`,
  mockGalleryData,
  async () => {
    return await searchGalleries(DERPIBOORU_API_URL, { q: 'title:safe*' });
  },
);
