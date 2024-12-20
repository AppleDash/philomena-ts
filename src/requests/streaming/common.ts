import { snake } from 'radash';
import {
  BaseSearchOptions,
  IndexableBy,
  PaginatedCollection,
  PaginatedOptions,
  PhilomenaApiOptions,
  SortDirection,
} from '../common';

/**
 * Generic wrapper function to turn a normal API function that returns a {@link PaginatedCollection},
 * into a streaming generator.
 * This function uses a "sort field" that is returned in each element of the yielded collection,
 * in order to more efficiently request additional results without using pagination.
 *
 * @param apiOptions API options
 * @param options Options passed to the {@link getMore} function.
 *                The {@code page} parameter is ignored here.
 * @param getMore Function that will be called to get each chunk of results from the API.
 * @param key     Key that is used to extract the actual results array from each {@link PaginatedCollection} chunk.
 * @param limit   A soft maximum number of results to return.
 *                This may return up to {@code options.perPage - 1} results over the limit.
 */
export async function* cursorStreaming<
  /** Type of the options that will be passed to {@link getMore()}. */
  TOpts extends BaseSearchOptions,
  /** The key that will be used to get the actual elements from the {@link PaginatedCollection}. */
  TKey extends string & keyof TCollection,
  /** Type of the collection returned by {@link getMore()}. */
  TCollection extends PaginatedCollection<TKey, TSort, TResult>,
  /** Type of the individual results in the collection. */
  TResult extends IndexableBy<TSort>,
  /** Type of the key used for sorting. */
  TSort extends string,
>(
  apiOptions: PhilomenaApiOptions,
  getMore: (
    apiOptions: PhilomenaApiOptions,
    options: TOpts,
  ) => Promise<TCollection>,
  key: TKey,
  options: TOpts,
  sortField: TSort,
  sortDirection: SortDirection,
  limit?: number,
): AsyncGenerator<TResult> {
  const isAscending = sortDirection === 'asc';
  let totalReturned = 0;
  let highestSortField = null;

  while (!limit || totalReturned < limit) {
    let realOptions = options;

    if (highestSortField) {
      const query = isAscending
        ? `${snake(sortField)}.gt:${highestSortField}`
        : `${snake(sortField)}.lt:${highestSortField}`;
      const realQuery = options.q ? `${options.q},${query}` : query;

      realOptions = { ...options, q: realQuery };
    }

    const results = await getMore(apiOptions, realOptions);
    const resultsCollection = results[key];

    if (resultsCollection.length === 0) {
      break;
    }

    const lastResult = resultsCollection[resultsCollection.length - 1];

    if (!lastResult) {
      throw new Error(
        'Last element of resultsCollection was null or undefined, this should never happen!',
      );
    }

    highestSortField = lastResult[sortField];

    yield* resultsCollection;
    totalReturned += resultsCollection.length;

    if (apiOptions.streamingDelay && apiOptions.streamingDelay > 0) {
      await new Promise((r) => setTimeout(r, apiOptions.streamingDelay));
    }
  }
}

/**
 * Generic wrapper function to turn a normal API function that returns a {@link PaginatedCollection},
 * into a streaming generator.
 *
 * {@link cursorStreaming()} should be preferred over this function when the results are searchable/sortable,
 * as it is more efficient on the server side.
 *
 * @param apiOptions API options
 * @param options Options passed to the {@link getMore} function.
 *                The {@code page} parameter is ignored here.
 * @param getMore Function that will be called to get each chunk of results from the API.
 * @param key     Key that is used to extract the actual results array from each {@link PaginatedCollection} chunk.
 * @param limit   A soft maximum number of results to return.
 *                This may return up to {@code options.perPage - 1} results over the limit.
 */
export async function* paginatedStreaming<
  /** Type of the options passed to {@link getMore()}. */
  TOpts extends PaginatedOptions,
  /** Key that is used to get the actual results from the collection. */
  TKey extends string & keyof TCollection,
  /** Type of the collection returned by {@link getMore()}. */
  TCollection extends PaginatedCollection<TKey, string, TResult>,
  /** Type of each element in the collection. */
  TResult,
>(
  apiOptions: PhilomenaApiOptions,
  getMore: (
    apiOptions: PhilomenaApiOptions,
    options: TOpts,
  ) => Promise<TCollection>,
  key: TKey,
  options?: TOpts,
  limit?: number,
): AsyncGenerator<TResult> {
  let totalReturned = 0;
  let currentPage = 1;
  const realOptions = options ?? ({ perPage: 25 } as TOpts);

  // Keep querying results until we either hit the limit or run out of results.
  while (!limit || totalReturned < limit) {
    const results = await getMore(apiOptions, {
      ...realOptions,
      page: currentPage,
    });

    if (results[key].length === 0) {
      break;
    }

    yield* results[key];

    currentPage++;
    totalReturned += results[key].length;

    if (apiOptions.streamingDelay && apiOptions.streamingDelay > 0) {
      await new Promise((r) => setTimeout(r, apiOptions.streamingDelay));
    }
  }
}
