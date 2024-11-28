import { z } from 'zod';
import { Filter } from '../schemas/filter';
import { apiRequest, PhilomenaApiOptions } from './common';

const UserFilterOptions = z.object({
  key: z.string(),
});

type UserFilterOptions = z.infer<typeof UserFilterOptions>;

const SingleFilter = z.object({
  filter: Filter,
});

const FilterCollection = z.object({
  filters: z.array(Filter),
});
export type FilterCollection = z.infer<typeof FilterCollection>;

/**
 * Get a single Filter by its ID.
 *
 * @param apiOptions API options
 * @param id ID of the requested filter.
 * @returns The requested Filter.
 */
export async function getFilter(apiOptions: PhilomenaApiOptions, id: number) {
  const response = await apiRequest(
    `${apiOptions.url}/filters/${id}`,
    SingleFilter,
  );

  return response.filter;
}

/**
 * Get a list of Filters that are flagged as {@code system} filters, and
 * as such are usable by anyone.
 *
 * @param apiOptions API options
 * @returns Array of system Filters.
 */
export async function getSystemFilters(
  apiOptions: PhilomenaApiOptions,
): Promise<Filter[]> {
  const response = await apiRequest(
    `${apiOptions.url}/filters/system`,
    FilterCollection,
  );

  return response.filters;
}

/**
 * Get a list of Filters belonging to the currently-authenticated user.
 * An API key is required for this request.
 *
 * @param apiOptions API options
 * @param options UserFilterOptions representing the options for the request.
 * @returns Array of Filters belonging to the current user.
 */
export async function getUserFilters(
  apiOptions: PhilomenaApiOptions,
  options: UserFilterOptions,
): Promise<Filter[]> {
  const response = await apiRequest(
    `${apiOptions.url}/filters/user`,
    FilterCollection,
    await UserFilterOptions.parse(options),
  );

  return response.filters;
}
