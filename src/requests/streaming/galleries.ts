import { Gallery } from '../../schemas/gallery';
import { searchGalleries, GallerySearchOptions } from '../galleries';
import { paginatedStreaming } from './common';

/**
 * A Generator wrapper around {@link searchGalleries}.
 *
 * @param baseUrl Base API URL.
 * @param limit Soft maximum number of galleries to return.
 * @returns A Generator of Galleries returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingSearchGalleries(
  baseUrl: string,
  options?: GallerySearchOptions,
  limit?: number,
): AsyncGenerator<Gallery> {
  yield* paginatedStreaming(
    baseUrl,
    searchGalleries,
    'galleries',
    options,
    limit,
  );
}
