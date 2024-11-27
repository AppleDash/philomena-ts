import { Tag } from '../../schemas/tag';
import { searchTags, TagSearchOptions } from '../tags';
import { paginatedStreaming } from './common';

/**
 * A Generator wrapper around {@link searchTags}.
 *
 * @param baseUrl Base API URL.
 * @param options TagSearchOptions representing the search
 * @param limit Soft maximum number of tags to return.
 * @returns A Generator of Tags returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingSearchTags(
  baseUrl: string,
  options: TagSearchOptions,
  limit?: number,
): AsyncGenerator<Tag> {
  yield* paginatedStreaming(baseUrl, searchTags, 'tags', options, limit);
}
