import { z } from 'zod';
import { Image } from '../schemas/image';
import { apiRequest, BaseSearchOptions, PaginatedCollection } from './common';

// Single image request/response types
const GetImageOptions = z.object({
  key: z.optional(z.string()),
  filterId: z.optional(z.string()),
});
export type GetImageOptions = z.infer<typeof GetImageOptions>;

const SingleImage = z.object({
  image: Image,
});

// Multi image request/response types
const ImageSearchSchema = BaseSearchOptions.extend({
  // Assuming the user can access the filter ID given by the parameter, overrides the current filter for this request.
  // This is primarily useful for unauthenticated API access.
  filterId: z.optional(z.number().int()),
  // The current sort direction
  sd: z.optional(z.enum(['asc', 'desc'])),
  // The current sort field, if the request is a search request.
  sf: z.optional(z.string()),
});

export type ImageSearchOptions = z.input<typeof ImageSearchSchema>;

const ImageCollection = PaginatedCollection.extend({
  images: z.array(Image),
});
export type ImageCollection = z.infer<typeof ImageCollection>;

/**
 * Get a single Image by the Image's ID.
 *
 * @param baseUrl Base API URL.
 * @param id Image ID we are requesting.
 * @param options GetImageOptions representing additional options for the query.
 * @returns The requested Image.
 */
export async function getImage(
  baseUrl: string,
  id: number,
  options?: GetImageOptions,
): Promise<Image> {
  const response = await apiRequest(
    `${baseUrl}/images/${id}`,
    SingleImage,
    options && (await GetImageOptions.parseAsync(options)),
  );

  return response.image;
}

/**
 * Get the current featured image.
 *
 * @param baseUrl Base API URL.
 * @returns The featured Image.
 */
export async function getFeaturedImage(baseUrl: string): Promise<Image> {
  const response = await apiRequest(`${baseUrl}/images/featured`, SingleImage);

  return response.image;
}

/**
 * Executes the image search query defined by the {@code options}, and
 * returns the results.
 *
 * @param baseUrl Base API url.
 * @param options ImageSearchOptions describing the search options.
 * @returns Array of search results.
 */
export async function searchImages(
  baseUrl: string,
  options: ImageSearchOptions,
): Promise<ImageCollection> {
  const response = await apiRequest(
    `${baseUrl}/search/images`,
    ImageCollection,
    await ImageSearchSchema.parseAsync(options),
  );

  return response;
}
