import { Gallery } from '../../schemas/gallery';
import { PhilomenaApiOptions } from '../common';
import { searchGalleries, GallerySearchOptions } from '../galleries';
import { paginatedStreaming } from './common';

/**
 * A Generator wrapper around {@link searchGalleries}.
 *
 * @param apiOptions API options
 * @param limit Soft maximum number of galleries to return.
 * @returns A Generator of Galleries returned by the query.
 * @see paginatedStreaming for implementation details.
 */
export async function* streamingSearchGalleries(
  apiOptions: PhilomenaApiOptions,
  options?: GallerySearchOptions,
  limit?: number,
): AsyncGenerator<Gallery> {
  yield* paginatedStreaming(
    apiOptions,
    searchGalleries,
    'galleries',
    options,
    limit,
  );
}
