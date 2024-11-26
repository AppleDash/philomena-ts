import { z } from "zod";
import { User } from "../schemas/user";
import { apiRequest } from "./common";

const SingleUser = z.object({
  user: User
});

/**
 * Get a single User by their ID.
 * @param baseUrl Base API URL.
 * @param id User ID to request.
 * @returns The requested User.
 */
export async function getUser(
  baseUrl: string,
  id: number
): Promise<User> {
  const response = await apiRequest(
    `${baseUrl}/profiles/${id}`,
    SingleUser
  );

  return response.user;
}
