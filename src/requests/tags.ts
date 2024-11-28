import { z } from 'zod';
import { Tag } from '../schemas/tag';
import {
  apiRequest,
  BaseSearchOptions,
  PaginatedCollection,
  PhilomenaApiOptions,
} from './common';

const SingleTag = z.object({
  tag: Tag,
});

// Tag search types
const TagSearchOptions = BaseSearchOptions;
export type TagSearchOptions = z.infer<typeof TagSearchOptions>;

const TagCollection = PaginatedCollection.extend({
  tags: z.array(Tag),
});
export type TagCollection = z.infer<typeof TagCollection>;

export async function getTag(
  apiOptions: PhilomenaApiOptions,
  id: number,
): Promise<Tag> {
  const response = await apiRequest(`${apiOptions.url}/tags/${id}`, SingleTag);

  return response.tag;
}

/**
 * Executes the tag search query defined by the {@code options}, and
 * returns the results.
 *
 * @param apiOptions API options
 * @param options TagSearchOptions describing the search options.
 * @returns Array of search results.
 */
export async function searchTags(
  apiOptions: PhilomenaApiOptions,
  options: TagSearchOptions,
): Promise<TagCollection> {
  const response = await apiRequest(
    `${apiOptions.url}/search/tags`,
    TagCollection,
    await TagSearchOptions.parseAsync(options),
  );

  return response;
}
