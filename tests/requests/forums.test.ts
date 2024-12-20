import {
  getForum,
  getForums,
  getForumTopic,
  getForumTopicPosts,
  getForumTopics,
} from '../../src/requests/forums';
import {
  mockedApiTest,
  DERPIBOORU_API_OPTIONS,
  mockedPaginatedApiTest,
} from './helper';
import mockForumData from './data/forums.json';
import mockTopicData from './data/topics.json';
import mockPostData from './data/posts.json';

mockedPaginatedApiTest<'forums'>(
  `${DERPIBOORU_API_OPTIONS.url}/forums`,
  mockForumData,
  async () => {
    return await getForums(DERPIBOORU_API_OPTIONS);
  },
);

mockedApiTest(
  `${DERPIBOORU_API_OPTIONS.url}/forums/art`,
  { forum: mockForumData.forums[0] },
  async () => {
    return await getForum(DERPIBOORU_API_OPTIONS, 'art');
  },
);

mockedPaginatedApiTest<'topics'>(
  `${DERPIBOORU_API_OPTIONS.url}/forums/art/topics`,
  mockTopicData,
  async () => {
    return await getForumTopics(DERPIBOORU_API_OPTIONS, 'art');
  },
);

mockedApiTest(
  `${DERPIBOORU_API_OPTIONS.url}/forums/art/topics/artists-group-chat`,
  { topic: mockTopicData.topics[0] },
  async () => {
    return await getForumTopic(
      DERPIBOORU_API_OPTIONS,
      'art',
      'artists-group-chat',
    );
  },
);

mockedPaginatedApiTest<'posts'>(
  `${DERPIBOORU_API_OPTIONS.url}/forums/art/topics/artists-group-chat/posts`,
  mockPostData,
  async () => {
    return await getForumTopicPosts(
      DERPIBOORU_API_OPTIONS,
      'art',
      'artists-group-chat',
    );
  },
);
