import { z } from "zod";
import { Tag } from "../schemas/tag";
import { apiRequest } from "./common";

const SingleTag = z.object({
  tag: Tag
});

// Tag search types
const TagSearchSchema = BaseSearchSchema;
type TagSearchOptions = z.infer<typeof TagSearchSchema>;

const TagCollection = z.object({
  tags: z.array(Tag),
});

export async function getTag(
  baseUrl: string,
  id: number
): Promise<Tag> {
  const response = await apiRequest(
    `${baseUrl}/tags/${id}`,
    SingleTag
  );

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
): Promise<Tag[]> {
  const response = await apiRequest(
    `${baseUrl}/search/tags`,
    TagCollection,
    await TagSearchSchema.parseAsync(options),
  );

  return response.tags;
}
