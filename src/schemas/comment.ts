import { z } from "zod";
import { objectWithCamelKeys } from "./common";

export const Comment = objectWithCamelKeys({
  // The comment's author.
  author: z.string(),
  // The URL of the author's avatar. May be a link to the CDN path, or a data: URI.
  avatar: z.string(),
  // The comment text.
  body: z.string(),
  // The creation time, in UTC, of the comment.
  createdAt: z.string().datetime(),
  // The edit reason for this comment, or null if none provided.
  editReason: z.nullable(z.string()),
  // The time, in UTC, this comment was last edited at, or null if it was not edited.
  editedAt: z.nullable(z.string().datetime()),
  // The comment's ID.
  id: z.number().int(),
  // The ID of the image the comment belongs to.
  imageId: z.number().int(),
  // The time, in UTC, the comment was last updated at.
  updatedAt: z.string().datetime(),
  // The ID of the user the comment belongs to, if any.
  userId: z.nullable(z.number().int()),
});

export type Comment = z.infer<typeof Comment>;
