import { z } from "zod";
import { objectWithCamelKeys } from "./common";

const ImageMimeType = z.enum([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "video/webm",
]);

const ImageFormat = z.enum(["gif", "jpg", "jpeg", "png", "svg", "webm"]);

const ImageIntensities = z.object({
  nw: z.number(),
  ne: z.number(),
  sw: z.number(),
  se: z.number(),
});

const ImageRepresentations = objectWithCamelKeys({
  full: z.string(),
  large: z.string(),
  medium: z.string(),
  small: z.string(),
  tall: z.string(),
  thumb: z.string(),
  thumbSmall: z.string(),
  thumbTiny: z.string(),
});

export const Image = objectWithCamelKeys({
  // Whether the image is animated or not.
  animated: z.boolean(),
  // The image's width divided by its height.
  aspectRatio: z.number(),
  // The number of comments made on the image.
  commentCount: z.number().int(),
  // The creation time, in UTC, of the image.
  createdAt: z.string().datetime(),
  // The hide reason for the image, or null if none provided. This will only have a value on images which are deleted for a rule violation.
  deletionReason: z.nullable(z.string()),
  // The image's description.
  description: z.string(),
  // The number of downvotes the image has.
  downvotes: z.number().int(),
  // The ID of the target image, or null if none provided. This will only have a value on images which are merged into another image.
  duplicateOf: z.nullable(z.number()),
  // The number of seconds the image lasts, if animated, otherwise .04.
  duration: z.number(),
  // The number of faves the image has.
  faves: z.number().int(),
  // The time, in UTC, the image was first seen (before any duplicate merging).
  firstSeenAt: z.string().datetime(),
  // The file extension of the image.
  format: ImageFormat,
  // The image's height, in pixels.
  height: z.number().int(),
  // Whether the image is hidden. An image is hidden if it is merged or deleted for a rule violation.
  hiddenFromUsers: z.boolean(),
  // The image's ID.
  id: z.number().int(),
  // Optional object of internal image intensity data for deduplication purposes. May be null if intensities have not yet been generated.
  intensities: z.nullable(ImageIntensities),
  // The MIME type of this image.
  mimeType: ImageMimeType,
  // The filename that the image was uploaded with.
  name: z.string(),
  // The SHA512 hash of the image as it was originally uploaded.
  origSha512Hash: z.nullable(z.string()),
  // Whether the image has finished optimization.
  processed: z.boolean(),
  // A mapping of representation names to their respective URLs.
  representations: ImageRepresentations,
  // The image's number of upvotes minus the image's number of downvotes.
  score: z.number().int(),
  // The SHA512 hash of this image after it has been processed.
  sha512Hash: z.string(),
  // The number of bytes the image's file contains.
  size: z.number().int(),
  // A list of all source URLs provided for the image, may be empty.
  sourceUrls: z.array(z.string()),
  // Whether the image is hit by the current filter.
  spoilered: z.boolean(),
  // The number of tags present on the image.
  tagCount: z.number().int(),
  // A list of tag IDs the image contains.
  tagIds: z.array(z.number().int()),
  // A list of tag names the image contains.
  tags: z.array(z.string()),
  // Whether the image has finished thumbnail generation. Do not attempt to load images from view_url or representations if this is false.
  thumbnailsGenerated: z.boolean(),
  // The time, in UTC, the image was last updated.
  updatedAt: z.string().datetime(),
  // The image's uploader.
  uploader: z.string(),
  // The ID of the image's uploader. null if uploaded anonymously.
  uploaderId: z.nullable(z.number().int()),
  // The image's number of upvotes.
  upvotes: z.number().int(),
  // The image's view URL, including tags.
  viewUrl: z.string().url(),
  // The image's width, in pixels.
  width: z.number().int(),
  // The lower bound of the Wilson score interval for the image, based on its upvotes and downvotes, given a z-score corresponding to a confidence of 99.5%.
  wilsonScore: z.number(),
});

export type Image = z.infer<typeof Image>;

export const Comment = objectWithCamelKeys({
  // The comment's author.
  author: z.string(),
  // The URL of the author's avatar. May be a link to the CDN path, or a data: URI.
  avatar: z.string().url(),
  // The comment text.
  body: z.string(),
  // The creation time, in UTC, of the comment.
  createdAt: z.string().datetime(),
  // The edit reason for this comment, or null if none provided.
  editReason: z.nullable(z.string()),
  // The comment's ID.
  id: z.number().int(),
  // The ID of the image the comment belongs to.
  imageId: z.number().int(),
  // The time, in UTC, the comment was last updated at.
  updatedAt: z.string().datetime(),
  // The ID of the user the comment belongs to, if any.
  userId: z.nullable(z.string()),
});

export type Comment = z.infer<typeof Comment>;
