import nock from 'nock';
import { camelCase } from 'lodash';
import deepMapKeys from 'deep-map-keys';
import { PaginatedCollection } from '../../src/requests/common';

/** API URL for the most popular Philomena booru, used for testing. */
export const DERPIBOORU_API_URL = 'https://derpibooru.org/api/v1/json';
export const MOCK_API_KEY = 'not a real API key';

type GenericPaginatedCollection<Key extends string> = PaginatedCollection<
  Key,
  string
>;

/**
 * Helper function to test an API function that calls one endpoint.
 * This function will handle mocking the response of that endpoint,
 * and validating that the data returned by the API function is correct.
 *
 * @param endpoint Full API endpoint URL that the callback is expected to invoke.
 * @param expected Mocked response from the API.
 * @param callback Callback that will be called to actually make the request.
 */
export function mockedApiTest(
  endpoint: string,
  expected: Record<string, unknown>,
  callback: () => unknown,
) {
  const keys = Object.keys(expected);

  if (keys.length != 1) {
    throw Error('Expected response must have exactly 1 key.');
  }

  const firstKey = keys[0] as string;
  const firstValue = expected[firstKey];
  const url = new URL(endpoint);
  const path = `${url.pathname}${url.search}`;

  describe(path, () => {
    nock(`${url.protocol}//${url.host}`).get(path).reply(200, expected);

    test('valid request should return expected results', async () => {
      const response = await callback();

      expect(response).toEqual(deepMapKeys(firstValue, camelCase));
    });
  });
}

export function mockedPaginatedApiTest<
  Key extends string,
  T extends GenericPaginatedCollection<Key> = GenericPaginatedCollection<Key>,
>(endpoint: string, expected: T, callback: () => Promise<unknown>) {
  const url = new URL(endpoint);
  const path = `${url.pathname}${url.search}`;

  describe(path, () => {
    nock(`${url.protocol}//${url.host}`).get(path).reply(200, expected);

    test('valid request should return expected results', async () => {
      const response = await callback();

      expect(response).toEqual(deepMapKeys(expected, camelCase));
    });
  });
}
