import { z } from 'zod';

/**
 * A user-curated Gallery of Images.
 */
export const Gallery = z.object({
  /** The gallery's description. */
  description: z.string(),
  /** The gallery's ID. */
  id: z.number().int(),
  /** The gallery's spoiler warning. */
  spoilerWarning: z.string(),
  /** The ID of the cover image for the gallery. */
  thumbnailId: z.number().int(),
  /** The gallery's title. */
  title: z.string(),
  /** The name of the gallery's creator. */
  user: z.string(),
  /** The ID of the gallery's creator. */
  userId: z.number().int(),
});

export type Gallery = z.infer<typeof Gallery>;
