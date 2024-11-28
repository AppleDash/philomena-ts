import { z } from 'zod';
import { Tag } from '../schemas/tag';
import {
  apiRequest,
  BaseSearchOptions,
  PaginatedCollection,
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

export async function getTag(baseUrl: string, id: number): Promise<Tag> {
  const response = await apiRequest(`${baseUrl}/tags/${id}`, SingleTag);

  return response.tag;
}

/**
 * Executes the tag search query defined by the {@code options}, and
 * returns the results.
 *
 * @param baseUrl Base API url.
 * @param options TagSearchOptions describing the search options.
 * @returns Array of search results.
 */
export async function searchTags(
  baseUrl: string,
  options: TagSearchOptions,
): Promise<TagCollection> {
  const response = await apiRequest(
    `${baseUrl}/search/tags`,
    TagCollection,
    await TagSearchOptions.parseAsync(options),
  );

  return response;
}
