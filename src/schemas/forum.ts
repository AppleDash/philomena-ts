import { z } from "zod";
import { objectWithCamelKeys } from "./common";

export const Forum = objectWithCamelKeys({
  // The forum's name.
  name: z.string(),
  // The forum's short name (used to identify it.)
  shortName: z.string(),
  // The forum's description.
  description: z.string(),
  // The number of topics in the forum.
  topicCount: z.number().int(),
  // The number of posts in the forum.
  postCount: z.number().int(),
});

export type Forum = z.infer<typeof Forum>;

export const Topic = objectWithCamelKeys({
  // The topic's slug (used to identify it.)
  slug: z.string(),
  // The topic's title.
  title: z.string(),
  // The number of posts in the topic.
  postCount: z.number().int(),
  // The number of views the topic has received.
  viewCount: z.number().int(),
  // Whether the topic is sticky.
  sticky: z.boolean(),
  // The time, in UTC, when the last reply was made.
  lastRepliedToAt: z.string().datetime(),
  // Whether the topic is locked.
  locked: z.boolean(),
  // The ID of the user who made the topic. null if posted anonymously.
  userId: z.nullable(z.number().int()),
  // The name of the user who made the topic.
  author: z.string(),
});

export type Topic = z.infer<typeof Topic>;

export const Post = objectWithCamelKeys({
  // The post's author.
  author: z.string(),
  // The URL of the author's avatar. May be a link to the CDN path, or a data: URI.
  avatar: z.string().url(),
  // The post's text.
  body: z.string(),
  // The creation time, in UTC, of the post.
  createdAt: z.string().datetime(),
  // The edit reason for this post.
  editReason: z.string(),
  // The time, in UTC, this post was last edited at, or null if it was not edited.
  editedAt: z.nullable(z.string().datetime()),
  // The post's ID (used to identify it).
  id: z.number().int(),
  // The time, in UTC, the post was last updated at.
  updatedAt: z.nullable(z.string().datetime()),
  // The ID of the user the post belongs to, if any.
  userId: z.nullable(z.number().int()),
});

export type Post = z.infer<typeof Post>;
