import { Gallery } from '../../schemas/gallery';
import { searchGalleries, GallerySearchOptions } from '../galleries';
import { genericStreaming } from './common';

/**
 * A Generator wrapper around {@link searchGalleries}.
 *
 * @param baseUrl Base API URL.
 * @param limit Soft maximum number of galleries to return.
 * @returns A Generator of Galleries returned by the query.
 * @see genericStreaming for implementation details.
 */
export async function* streamingSearchGalleries(
  baseUrl: string,
  options?: GallerySearchOptions,
  limit?: number,
): AsyncGenerator<Gallery> {
  yield* genericStreaming(
    baseUrl,
    searchGalleries,
    'galleries',
    options,
    limit,
  );
}
