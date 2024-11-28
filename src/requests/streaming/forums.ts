import { Forum, Post, Topic } from '../../schemas/forum';
import { PhilomenaApiOptions } from '../common';
import {
  getForums,
  getForumTopicPosts,
  getForumTopics,
  TopicListOptions,
  PostListOptions,
  PostSearchOptions,
  searchPosts,
} from '../forums';
import { paginatedStreaming } from './common';

/**
 * A Generator wrapper around {@link getForums}.
 *
 * @param apiOptions API options
 * @param limit Soft maximum number of forums to return.
 * @returns A Generator of Forums returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingGetForums(
  apiOptions: PhilomenaApiOptions,
  limit?: number,
): AsyncGenerator<Forum> {
  yield* paginatedStreaming(apiOptions, getForums, 'forums', undefined, limit);
}

/**
 * A Generator wrapper around {@link getForumTopics}.
 *
 * @param apiOptions API options
 * @param limit Soft maximum number of topics to return.
 * @returns A Generator of Topics returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingGetForumTopics(
  apiOptions: PhilomenaApiOptions,
  shortName: string,
  options?: TopicListOptions,
  limit?: number,
): AsyncGenerator<Topic> {
  const getMore = (
    apiOptions: PhilomenaApiOptions,
    options: TopicListOptions,
  ) => getForumTopics(apiOptions, shortName, options);

  yield* paginatedStreaming(apiOptions, getMore, 'topics', options, limit);
}

/**
 * A Generator wrapper around {@link getForumTopicPosts}.
 *
 * @param apiOptions API options
 * @param limit Soft maximum number of posts to return.
 * @returns A Generator of Posts returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingGetForumTopicPosts(
  apiOptions: PhilomenaApiOptions,
  shortName: string,
  topicSlug: string,
  options?: PostListOptions,
  limit?: number,
): AsyncGenerator<Post> {
  const getMore = (apiOptions: PhilomenaApiOptions, options: PostListOptions) =>
    getForumTopicPosts(apiOptions, shortName, topicSlug, options);

  yield* paginatedStreaming(apiOptions, getMore, 'posts', options, limit);
}

/**
 * A Generator wrapper around {@link getForumTopicPosts}.
 *
 * @param apiOptions API options
 * @param limit Soft maximum number of posts to return.
 * @returns A Generator of Ppsts returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingSearchPosts(
  apiOptions: PhilomenaApiOptions,
  options?: PostSearchOptions,
  limit?: number,
): AsyncGenerator<Post> {
  yield* paginatedStreaming(apiOptions, searchPosts, 'posts', options, limit);
}
