import {
  getComment,
  getImageComments,
  searchComments,
} from '../../src/requests/comments';
import {
  mockedApiTest,
  DERPIBOORU_API_URL,
  mockedPaginatedApiTest,
} from './helper';
import mockCommentData from './data/comments.json';

mockedApiTest(
  `${DERPIBOORU_API_URL}/comments/1000`,
  { comment: mockCommentData.comments[0] },
  async () => {
    return await getComment(DERPIBOORU_API_URL, 1000);
  },
);

mockedPaginatedApiTest<'comments'>(
  `${DERPIBOORU_API_URL}/search/comments?q=*`,
  mockCommentData,
  async () => {
    return await searchComments(DERPIBOORU_API_URL, { q: '*' });
  },
);

mockedPaginatedApiTest<'comments'>(
  `${DERPIBOORU_API_URL}/search/comments?q=image_id:1`,
  mockCommentData,
  async () => {
    return await getImageComments(DERPIBOORU_API_URL, 1);
  },
);
