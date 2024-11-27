import { Comment } from '../../schemas/comment';
import {
  CommentSearchOptions,
  getImageComments,
  searchComments,
} from '../comments';
import { genericStreaming } from './common';

/**
 * A Generator wrapper around {@link getImageComments}.
 *
 * @param baseUrl Base API URL.
 * @param limit Soft maximum number of comments to return.
 * @returns A Generator of Comments returned by the query.
 * @see genericStreaming for implementation details.
 */
export async function* streamingGetImageComments(
  baseUrl: string,
  imageId: number,
  options?: CommentSearchOptions,
  limit?: number,
): AsyncGenerator<Comment> {
  const getMore = (baseUrl: string, options: CommentSearchOptions) =>
    getImageComments(baseUrl, imageId, options);

  yield* genericStreaming(baseUrl, getMore, 'comments', options, limit);
}

/**
 * A Generator wrapper around {@link searchComments}.
 *
 * @param baseUrl Base API URL.
 * @param options Soft maximum number of comments to return.
 * @param limit Soft maximum number of comments to return.
 * @returns A Generator of Comments returned by the query.
 */
export async function* streamingSearchComments(
  baseUrl: string,
  options?: CommentSearchOptions,
  limit?: number,
): AsyncGenerator<Comment> {
  yield* genericStreaming(baseUrl, searchComments, 'comments', options, limit);
}
