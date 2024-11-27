import { z } from 'zod';
import { Gallery } from '../schemas/gallery';
import { apiRequest, BaseSearchOptions, PaginatedCollection } from './common';

// Gallery search types
const GalleryCollection = PaginatedCollection.extend({
  galleries: z.array(Gallery),
});
export type GalleryCollection = z.infer<typeof GalleryCollection>;

const GallerySearchSchema = BaseSearchOptions;
export type GallerySearchOptions = z.infer<typeof GallerySearchSchema>;

/**
 * Executes the gallery search query defined by the {@code options}, and
 * returns the results.
 *
 * @param baseUrl Base API url.
 * @param options GallerySearchOptions describing the search options.
 * @returns Array of search results.
 */
export async function searchGalleries(
  baseUrl: string,
  options: GallerySearchOptions,
): Promise<GalleryCollection> {
  const response = await apiRequest(
    `${baseUrl}/search/galleries`,
    GalleryCollection,
    await GallerySearchSchema.parseAsync(options),
  );

  return response;
}
