import { z } from 'zod';
import { User } from '../schemas/user';
import { apiRequest, PhilomenaApiOptions } from './common';

const SingleUser = z.object({
  user: User,
});

/**
 * Get a single User by their ID.
 * @param apiOptions API options
 * @param id User ID to request.
 * @returns The requested User.
 */
export async function getUser(
  apiOptions: PhilomenaApiOptions,
  id: number,
): Promise<User> {
  const response = await apiRequest(
    `${apiOptions.url}/profiles/${id}`,
    SingleUser,
  );

  return response.user;
}
