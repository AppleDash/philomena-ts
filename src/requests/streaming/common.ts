import { PaginatedCollection, PaginatedOptions } from '../common';

/**
 * Generic wrapper function to turn a normal API function that returns a {@link PaginatedCollection},
 * into a streaming generator.
 *
 * @param baseUrl Base API URL.
 * @param options Options passed to the {@link getMore} function.
 *                The {@code page} parameter is ignored here.
 * @param getMore Function that will be called to get each chunk of results from the API.
 * @param key     Key that is used to extract the actual results array from each {@link PaginatedCollection} chunk.
 * @param limit   A soft maximum number of images to return.
 *                This may return up to {@code options.perPage - 1} results over the limit.
 */
export async function* genericStreaming<
  TOpts extends PaginatedOptions,
  TKey extends string & keyof TCollection,
  TCollection extends PaginatedCollection<TKey, TResult>,
  TResult,
>(
  baseUrl: string,
  getMore: (baseUrl: string, options: TOpts) => Promise<TCollection>,
  key: TKey,
  options?: TOpts,
  limit?: number,
): AsyncGenerator<TResult> {
  let totalReturned = 0;
  let currentPage = 1;
  const realOptions = options ?? ({ perPage: 25 } as TOpts);

  // Keep querying results until we either hit the limit or run out of results.
  while (!limit || totalReturned < limit) {
    const results = await getMore(baseUrl, {
      ...realOptions,
      page: currentPage,
    });

    if (results[key].length === 0) {
      break;
    }

    yield* results[key];

    currentPage++;
    totalReturned += results[key].length;
  }
}
