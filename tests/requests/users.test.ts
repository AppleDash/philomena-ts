import { getUser } from '../../src/requests/users';
import { DERPIBOORU_API_OPTIONS, mockedApiTest } from './helper';
import mockUserData from './data/users.json';

mockedApiTest(
  `${DERPIBOORU_API_OPTIONS.url}/profiles/216494`,
  { user: mockUserData[0] },
  async () => {
    return getUser(DERPIBOORU_API_OPTIONS, 216494);
  },
);
