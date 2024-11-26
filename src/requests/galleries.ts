import { z } from "zod";
import { Gallery } from "../schemas/gallery";
import { apiRequest, BaseSearchOptions } from "./common";

// Gallery search types
const GalleryCollection = z.object({
  galleries: z.array(Gallery),
});

const GallerySearchSchema = BaseSearchOptions;
type GallerySearchOptions = z.infer<typeof GallerySearchSchema>;

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
): Promise<Gallery[]> {
  const response = await apiRequest(
    `${baseUrl}/search/galleries`,
    GalleryCollection,
    await GallerySearchSchema.parseAsync(options),
  );

  return response.galleries;
}