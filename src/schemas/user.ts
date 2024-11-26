import { z } from "zod";
import { objectWithCamelKeys } from "./common";

export const UserLink = objectWithCamelKeys({
  // The ID of the user who owns this link.
  userId: z.number().int(),
  // The creation time, in UTC, of this link.
  createdAt: z.string().datetime(),
  // The state of this link.
  state: z.string(),
  // The ID of an associated tag for this link. null if no tag linked.
  tagId: z.nullable(z.number().int()),
});

export type UserLink = z.infer<typeof UserLink>;

export const Award = objectWithCamelKeys({
  // The URL of this award.
  imageUrl: z.string().url(),
  // The title of this award.
  title: z.string(),
  // The ID of the badge this award is derived from.
  id: z.number().int(),
  // The label of this award.
  label: z.string(),
  // The time, in UTC, when this award was given.
  awardedOn: z.string().datetime(),
});

export type Award = z.infer<typeof Award>;

export const User = objectWithCamelKeys({
  // The ID of the user.
  id: z.number().int(),
  // The name of the user.
  name: z.string(),
  // The slug of the user.
  slug: z.string(),
  // The role of the user.
  role: z.string(),
  // The description (bio) of the user.
  description: z.string(),
  // The URL of the user's thumbnail. null if the avatar is not set.
  avatarUrl: z.nullable(z.string().url()),
  // The creation time, in UTC, of the user.
  createdAt: z.string().datetime(),
  // The comment count of the user.
  commentsCount: z.number().int(),
  // The upload count of the user.
  uploadsCount: z.number().int(),
  // The forum posts count of the user.
  postsCount: z.number().int(),
  // The forum topics count of the user.
  topicsCount: z.number().int(),
  // The links the user has registered.
  links: z.array(UserLink),
  // The awards/badges of the user.
  awards: z.array(Award),
});

export type User = z.infer<typeof User>;
