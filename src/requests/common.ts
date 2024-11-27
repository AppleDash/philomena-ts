import { z } from 'zod';
import { camelCase, snakeCase } from 'lodash';
import deepMapKeys from 'deep-map-keys';

function toSearchParams(dict: Record<string, unknown>) {
  const params = new URLSearchParams();

  for (const key in dict) {
    // Special case because the sort field enum is in camel-case on our end.
    if (key === 'sf') {
      params.append(snakeCase(key), snakeCase(String(dict[key])));
    } else {
      params.append(snakeCase(key), String(dict[key]));
    }
  }

  console.log(params);

  return params;
}

/** Base request options that include an API key and pagination. */
export const PaginatedOptions = z.object({
  /** An optional authentication token. If omitted, no user will be authenticated. */
  key: z.optional(z.string()),
  /** Controls the current page of the response, if the response is paginated. Empty values default to the first page. */
  page: z.optional(z.number().int()),
  /** Controls the number of results per page, up to a limit of 50, if the response is paginated. The default is 25. */
  perPage: z.optional(z.number().int().min(1).max(50)),
});
export type PaginatedOptions = z.infer<typeof PaginatedOptions>;

export const SortDirection = z.enum(['asc', 'desc']);
export type SortDirection = z.infer<typeof SortDirection>;

/**
 * Request options that include a query as well as everything from PaginatedOptions.
 * Note that the sort field ({@code sf}) is defined in the schemas that extend this, due to needing
 * to be of a different type per request type.
 */
export const BaseSearchOptions = PaginatedOptions.extend({
  /** The current search query. */
  q: z.optional(z.string()),
});
export type BaseSearchOptions = z.infer<typeof BaseSearchOptions>;

/** Base response schema for a paginated collection. */
export const PaginatedCollection = z.object({
  total: z.number().int(),
});

export type IndexableBy<Key extends string> = {
  [K in Key]: unknown;
};

// The type parameters here are not used in the normal inheritance structure of
// this API, but they are used in the streaming API for better type safety.
export type PaginatedCollection<
  /** The key which is used to get the actual elements of the collection; eg: 'images' */
  Key extends string,
  /** Keys which must exist on all of the values in the collection. */
  ValueKey extends string,
  /** Type of the values in the collection. */
  Value = IndexableBy<ValueKey>,
> = z.infer<typeof PaginatedCollection> & {
  [K in Key]: Value[];
};

/**
 * Make a request to the Philomena API endpoint at the given URL.
 *
 * @param baseUrl API endpoint URL.
 * @param schema Schema used to parse/validate the result.
 * @param options Pre-parsed/validated query string options.
 * @returns Result type as defined by the {@code schema}.
 */
export async function apiRequest<T>(
  baseUrl: string,
  schema: z.ZodType<T>,
  options?: Record<string, unknown>,
): Promise<z.output<typeof schema>> {
  let url = baseUrl;

  if (options) {
    const urlParams = toSearchParams(options);
    url += `?${urlParams}`;
  }

  const response = await fetch(url);

  const data = await response.json();

  // Transform the snake-case keys returned by the API to the camel-case keys used in our data types.
  const transformer = z
    .record(z.string(), z.unknown())
    .transform((v) => deepMapKeys(v, camelCase))
    .pipe(schema);

  return await transformer.parseAsync(data);
}
