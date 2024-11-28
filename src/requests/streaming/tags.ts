import { Tag } from '../../schemas/tag';
import { PhilomenaApiOptions } from '../common';
import { searchTags, TagSearchOptions } from '../tags';
import { paginatedStreaming } from './common';

/**
 * A Generator wrapper around {@link searchTags}.
 *
 * @param apiOptions API options
 * @param options TagSearchOptions representing the search
 * @param limit Soft maximum number of tags to return.
 * @returns A Generator of Tags returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingSearchTags(
  apiOptions: PhilomenaApiOptions,
  options: TagSearchOptions,
  limit?: number,
): AsyncGenerator<Tag> {
  yield* paginatedStreaming(apiOptions, searchTags, 'tags', options, limit);
}
