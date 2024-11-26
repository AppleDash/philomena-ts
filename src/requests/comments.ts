import { z } from "zod";
import { Comment } from "../schemas/image";
import { apiRequest, BaseSearchOptions } from "./common";

const SingleComment = z.object({
  comment: Comment
});

// Comment search types
const CommentSearchOptions = BaseSearchOptions;
type CommentSearchOptions = z.infer<typeof CommentSearchOptions>;

const CommentCollection = z.object({
  comments: z.array(Comment),
});

/**
 * Get a single Comment by its ID.
 *
 * @param baseUrl Base API URL.
 * @param id ID of the comment to request.
 * @returns The requested Comment.
 */
export async function getComment(
  baseUrl: string,
  id: number
): Promise<Comment> {
  const response = await apiRequest(
    `${baseUrl}/comments/${id}`,
    SingleComment
  );

  return response.comment;
}

/**
 * Executes the comment search query defined by the {@code options}, and
 * returns the results.
 *
 * @param baseUrl Base API url.
 * @param options CommentSearchOptions describing the search options.
 * @returns Array of search results.
 */
export async function searchComments(
  baseUrl: string,
  options: CommentSearchOptions,
): Promise<Comment[]> {
  const response = await apiRequest(
    `${baseUrl}/search/comments`,
    CommentCollection,
    await CommentSearchSchema.parseAsync(options),
  );

  return response.comments;
}

/**
 * Retrieve the Comments for the image with the given ID.
 * Internally, this executes a Comment search with the {@code image_id} search option added to the query.
 * @param baseUrl Base API URL.
 * @param imageId ID of the image to retrieve comments for.
 * @param options CommentSearchOptions describing the search options. If a query is provided, the query will be merged with the {@code image_id} query.
 * @returns Array of Comments on the given image.
 */
export async function getImageComments(
  baseUrl: string,
  imageId: number,
  options?: CommentSearchOptions
): Promise<Comment[]> {
  let optionsWithSearch;

  // If they provided a query already, add the image ID to it, otherwise just set the query to the image ID.
  if (options) {
    if (options.q) {
      optionsWithSearch = {...options, q: `image_id:${imageId},${options.q}`};
    } else {
      optionsWithSearch = {...options, q: `image_id:${imageId}`};
    }
  } else {
    optionsWithSearch = { q: `image_id:${imageId}` };
  }

  return await searchComments(
    baseUrl,
    optionsWithSearch
  );
}