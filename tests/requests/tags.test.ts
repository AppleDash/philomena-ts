import { mockedApiTest, mockedPaginatedApiTest } from './helper';
import { DERPIBOORU_API_URL } from './helper';
import mockTagData from './data/tags.json';
import { getTag, searchTags } from '../../src/requests/tags';

mockedApiTest(
  `${DERPIBOORU_API_URL}/tags/47573`,
  { tag: mockTagData.tags[0] },
  async () => {
    return await getTag(DERPIBOORU_API_URL, 47573);
  },
);

mockedPaginatedApiTest(
  `${DERPIBOORU_API_URL}/search/tags?q=analyzed_name:wing`,
  mockTagData,
  async () => {
    return await searchTags(DERPIBOORU_API_URL, { q: 'analyzed_name:wing' });
  },
);
