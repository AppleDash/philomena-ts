import { z } from "zod";
import { Filter } from "../schemas/filter";
import { apiRequest } from "./common";

const UserFilterOptions = z.object({
  key: z.string()
});

type UserFilterOptions = z.infer<typeof UserFilterOptions>;

const SingleFilter = z.object({
  filter: Filter
});

const FilterCollection = z.object({
  filters: z.array(Filter)
});

/**
 * Get a single Filter by its ID.
 *
 * @param baseUrl Base API URL.
 * @param id ID of the requested filter.
 * @returns The requested Filter.
 */
export async function getFilter(
  baseUrl: string,
  id: number
) {
  const response = await apiRequest(
    `${baseUrl}/filters/${id}`,
    SingleFilter
  );

  return response.filter;
}

/**
 * Get a list of Filters that are flagged as {@code system} filters, and
 * as such are usable by anyone.
 *
 * @param baseUrl Base API URL.
 * @returns Array of system Filters.
 */
export async function getSystemFilters(
  baseUrl: string
) {
  const response = await apiRequest(
    `${baseUrl}/filters/system`,
    FilterCollection
  );

  return response.filters;
}

/**
 * Get a list of Filters belonging to the currently-authenticated user.
 * An API key is required for this request.
 *
 * @param baseUrl Base API URL.
 * @param options UserFilterOptions representing the options for the request.
 * @returns Array of Filters belonging to the current user.
 */
export async function getUserFilters(
  baseUrl: string,
  options: UserFilterOptions
) {
  const response = await apiRequest(
    `${baseUrl}/filters/user`,
    FilterCollection,
    await UserFilterOptions.parse(options)
  );

  return response.filters;
}