import { Comment } from '../../schemas/comment';
import {
  CommentSearchOptions,
  getImageComments,
  searchComments,
} from '../comments';
import { PhilomenaApiOptions } from '../common';
import { paginatedStreaming } from './common';

/**
 * A Generator wrapper around {@link getImageComments}.
 *
 * @param apiOptions API options
 * @param limit Soft maximum number of comments to return.
 * @returns A Generator of Comments returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingGetImageComments(
  apiOptions: PhilomenaApiOptions,
  imageId: number,
  options?: CommentSearchOptions,
  limit?: number,
): AsyncGenerator<Comment> {
  const getMore = (
    apiOptions: PhilomenaApiOptions,
    options: CommentSearchOptions,
  ) => getImageComments(apiOptions, imageId, options);

  yield* paginatedStreaming(apiOptions, getMore, 'comments', options, limit);
}

/**
 * A Generator wrapper around {@link searchComments}.
 *
 * @param apiOptions API options
 * @param options Soft maximum number of comments to return.
 * @param limit Soft maximum number of comments to return.
 * @returns A Generator of Comments returned by the query.
 */
export async function* streamingSearchComments(
  apiOptions: PhilomenaApiOptions,
  options?: CommentSearchOptions,
  limit?: number,
): AsyncGenerator<Comment> {
  yield* paginatedStreaming(
    apiOptions,
    searchComments,
    'comments',
    options,
    limit,
  );
}
