import { z } from 'zod';
import { Image } from '../schemas/image';
import {
  apiRequest,
  BaseSearchOptions,
  PaginatedCollection,
  PhilomenaApiOptions,
  SortDirection,
} from './common';

// Single image request/response types
const GetImageOptions = z.object({
  key: z.optional(z.string()),
  filterId: z.optional(z.string()),
});
export type GetImageOptions = z.infer<typeof GetImageOptions>;

const SingleImage = z.object({
  image: Image,
});

/**
 * The valid sort fields that can be used to sort an image.
 */
export const ImageSortField = z.enum([
  'firstSeenAt',
  'id',
  'updatedAt',
  'aspectRatio',
  'faves',
  'upvotes',
  'downvotes',
  'score',
  'wilsonScore',
  'width',
  'height',
  'commentCount',
  'tagCount',
  'size',
  'duration',
]);

export type ImageSortField = z.infer<typeof ImageSortField>;

// Multi image request/response types
const ImageSearchSchema = BaseSearchOptions.extend({
  /**
   * Assuming the user can access the filter ID given by the parameter, overrides the current filter for this request.
   * This is primarily useful for unauthenticated API access.
   */
  filterId: z.optional(z.number().int()),
  /** The sort field to use for sorting results. */
  sf: z.optional(ImageSortField),
  /** The sort direction to use for sorting results. */
  sd: z.optional(SortDirection),
});

export type ImageSearchOptions = z.input<typeof ImageSearchSchema>;

const ImageCollection = PaginatedCollection.extend({
  images: z.array(Image),
});
export type ImageCollection = z.infer<typeof ImageCollection>;

/**
 * Get a single Image by the Image's ID.
 *
 * @param apiOptions API options
 * @param id Image ID we are requesting.
 * @param options GetImageOptions representing additional options for the query.
 * @returns The requested Image.
 */
export async function getImage(
  apiOptions: PhilomenaApiOptions,
  id: number,
  options?: GetImageOptions,
): Promise<Image> {
  const response = await apiRequest(
    `${apiOptions.url}/images/${id}`,
    SingleImage,
    options && (await GetImageOptions.parseAsync(options)),
  );

  return response.image;
}

/**
 * Get the current featured image.
 *
 * @param apiOptions API options
 * @returns The featured Image.
 */
export async function getFeaturedImage(
  apiOptions: PhilomenaApiOptions,
): Promise<Image> {
  const response = await apiRequest(
    `${apiOptions.url}/images/featured`,
    SingleImage,
  );

  return response.image;
}

/**
 * Executes the image search query defined by the {@code options}, and
 * returns the results.
 *
 * @param apiOptions API options
 * @param options ImageSearchOptions describing the search options.
 * @returns Array of search results.
 */
export async function searchImages(
  apiOptions: PhilomenaApiOptions,
  options: ImageSearchOptions,
): Promise<ImageCollection> {
  const response = await apiRequest(
    `${apiOptions.url}/search/images`,
    ImageCollection,
    await ImageSearchSchema.parseAsync(options),
  );

  return response;
}
