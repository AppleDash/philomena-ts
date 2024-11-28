import {
  getFilter,
  getSystemFilters,
  getUserFilters,
} from '../../src/requests/filters';
import { mockedApiTest, DERPIBOORU_API_OPTIONS, MOCK_API_KEY } from './helper';
import mockFilterData from './data/filters.json';

mockedApiTest(
  `${DERPIBOORU_API_OPTIONS.url}/filters/56027`,
  { filter: mockFilterData[0] },
  async () => {
    return getFilter(DERPIBOORU_API_OPTIONS, 56027);
  },
);

mockedApiTest(
  `${DERPIBOORU_API_OPTIONS.url}/filters/system`,
  { filters: mockFilterData },
  async () => {
    return getSystemFilters(DERPIBOORU_API_OPTIONS);
  },
);

mockedApiTest(
  `${DERPIBOORU_API_OPTIONS.url}/filters/user?key=${MOCK_API_KEY}`,
  { filters: mockFilterData },
  async () => {
    return getUserFilters(DERPIBOORU_API_OPTIONS, { key: MOCK_API_KEY });
  },
);
