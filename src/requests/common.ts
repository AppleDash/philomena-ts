import { z } from 'zod';
import { camelCase, snakeCase } from 'lodash';
import deepMapKeys from 'deep-map-keys';

function toSearchParams(dict: Record<string, unknown>) {
  const params = new URLSearchParams();

  for (const key in dict) {
    params.append(snakeCase(key), String(dict[key]));
  }

  return params;
}

/** Base request options that include an API key and pagination. */
export const PaginatedOptions = z.object({
  // An optional authentication token. If omitted, no user will be authenticated.
  key: z.optional(z.string()),
  // Controls the current page of the response, if the response is paginated. Empty values default to the first page.
  page: z.optional(z.number().int()),
  // Controls the number of results per page, up to a limit of 50, if the response is paginated. The default is 25.
  perPage: z.optional(z.number().int().min(1).max(50)),
});
export type PaginatedOptions = z.infer<typeof PaginatedOptions>;

/** Request options that include a query as well as everything from PaginatedOptions. */
export const BaseSearchOptions = PaginatedOptions.extend({
  // The current search query.
  q: z.optional(z.string()),
});

/** Base response schema for a paginated collection. */
export const PaginatedCollection = z.object({
  total: z.number().int(),
});

// The type parameters here are not used in the normal inheritance structure of
// this API, but they are used in the streaming API for better type safety.
export type PaginatedCollection<Key extends string, Value> = z.infer<
  typeof PaginatedCollection
> & {
  [K in Key]: Array<Value>;
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
