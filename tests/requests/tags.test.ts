import { mockedApiTest, mockedPaginatedApiTest } from './helper';
import { DERPIBOORU_API_OPTIONS } from './helper';
import mockTagData from './data/tags.json';
import { getTag, searchTags } from '../../src/requests/tags';

mockedApiTest(
  `${DERPIBOORU_API_OPTIONS.url}/tags/47573`,
  { tag: mockTagData.tags[0] },
  async () => {
    return await getTag(DERPIBOORU_API_OPTIONS, 47573);
  },
);

mockedPaginatedApiTest<'tags'>(
  `${DERPIBOORU_API_OPTIONS.url}/search/tags?q=analyzed_name:wing`,
  mockTagData,
  async () => {
    return await searchTags(DERPIBOORU_API_OPTIONS, {
      q: 'analyzed_name:wing',
    });
  },
);
