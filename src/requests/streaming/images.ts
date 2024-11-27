import { Image } from '../../schemas/image';
import { ImageSearchOptions, searchImages } from '../images';
import { cursorStreaming } from './common';

/**
 * A Generator wrapper around {@link searchImages}.
 *
 * @param baseUrl Base API URL.
 * @param options ImageSearchOptions representing the search
 * @param limit Soft maximum number of images to return.
 * @returns A Generator of Images returned by the query.
 * @see genericStreaming for implementation details.
 */
export async function* streamingSearchImages(
  baseUrl: string,
  options: ImageSearchOptions,
  limit?: number,
): AsyncGenerator<Image> {
  yield* cursorStreaming(
    baseUrl,
    searchImages,
    'images',
    options,
    options.sf ?? 'id',
    options.sd ?? 'asc',
    limit,
  );
}
