import { z } from 'zod';

const TagCategory = z.enum([
  'character',
  'content-fanmade',
  'content-official',
  'error',
  'oc',
  'origin',
  'rating',
  'species',
  'spoiler',
]);

export const Tag = z.object({
  // The slug of the tag this tag is aliased to, if any.
  aliasedTag: z.nullable(z.string()),
  // The slugs of the tags aliased to this tag.
  aliases: z.array(z.string()),
  // The category class of the tag.
  category: z.nullable(TagCategory),
  // The long description for the tag.
  description: z.string(),
  // An array of objects containing DNP entries claimed on the tag.
  dnpEntries: z.array(z.record(z.any())),
  // The tag's ID.
  id: z.number().int(),
  // The image count of the tag.
  images: z.number().int(),
  // The slugs of the tags this tag is implied by.
  impliedByTags: z.array(z.string()),
  // The slugs of the tags this tag implies.
  impliedTags: z.array(z.string()),
  // The name of the tag.
  name: z.string(),
  // The name of the tag in its namespace.
  nameInNamespace: z.string(),
  // The namespace of the tag.
  namespace: z.nullable(z.string()),
  // The short description for the tag.
  shortDescription: z.nullable(z.string()),
  // The slug for the tag.
  slug: z.string(),
  // The spoiler image for the tag.
  spoilerImageUri: z.nullable(z.string().url()),
});

export type Tag = z.infer<typeof Tag>;
