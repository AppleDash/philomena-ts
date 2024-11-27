import { Tag } from '../../schemas/tag';
import { searchTags, TagSearchOptions } from '../tags';
import { genericStreaming } from './common';

/**
 * A Generator wrapper around {@link searchTags}.
 *
 * @param baseUrl Base API URL.
 * @param options TagSearchOptions representing the search
 * @param limit Soft maximum number of tags to return.
 * @returns A Generator of Tags returned by the query.
 * @see genericStreaming for implementation details.
 */
export async function* streamingSearchTags(
  baseUrl: string,
  options: TagSearchOptions,
  limit?: number,
): AsyncGenerator<Tag> {
  yield* genericStreaming(baseUrl, searchTags, 'tags', options, limit);
}
