import { Forum, Post, Topic } from '../../schemas/forum';
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
 * @param baseUrl Base API URL.
 * @param limit Soft maximum number of forums to return.
 * @returns A Generator of Forums returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingGetForums(
  baseUrl: string,
  limit?: number,
): AsyncGenerator<Forum> {
  yield* paginatedStreaming(baseUrl, getForums, 'forums', undefined, limit);
}

/**
 * A Generator wrapper around {@link getForumTopics}.
 *
 * @param baseUrl Base API URL.
 * @param limit Soft maximum number of topics to return.
 * @returns A Generator of Topics returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingGetForumTopics(
  baseUrl: string,
  shortName: string,
  options?: TopicListOptions,
  limit?: number,
): AsyncGenerator<Topic> {
  const getMore = (baseUrl: string, options: TopicListOptions) =>
    getForumTopics(baseUrl, shortName, options);

  yield* paginatedStreaming(baseUrl, getMore, 'topics', options, limit);
}

/**
 * A Generator wrapper around {@link getForumTopicPosts}.
 *
 * @param baseUrl Base API URL.
 * @param limit Soft maximum number of posts to return.
 * @returns A Generator of Posts returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingGetForumTopicPosts(
  baseUrl: string,
  shortName: string,
  topicSlug: string,
  options?: PostListOptions,
  limit?: number,
): AsyncGenerator<Post> {
  const getMore = (baseUrl: string, options: PostListOptions) =>
    getForumTopicPosts(baseUrl, shortName, topicSlug, options);

  yield* paginatedStreaming(baseUrl, getMore, 'posts', options, limit);
}

/**
 * A Generator wrapper around {@link getForumTopicPosts}.
 *
 * @param baseUrl Base API URL.
 * @param limit Soft maximum number of posts to return.
 * @returns A Generator of Ppsts returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingSearchPosts(
  baseUrl: string,
  options?: PostSearchOptions,
  limit?: number,
): AsyncGenerator<Post> {
  yield* paginatedStreaming(baseUrl, searchPosts, 'posts', options, limit);
}
