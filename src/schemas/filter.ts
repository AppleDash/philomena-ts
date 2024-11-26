import { z } from "zod";
import { objectWithCamelKeys } from "./common";

export const Filter = objectWithCamelKeys({
  // The ID of the filter.
  id: z.number().int(),
  // The name of the filter.
  name: z.string(),
  // The description of the filter.
  description: z.string(),
  // The ID of the user the filter belongs to. null if it isn't assigned to a user (usually system filters only).
  userId: z.nullable(z.number().int()),
  // The amount of users employing this filter.
  userCount: z.number().int(),
  // If true, is a system filter. System filters are usable by anyone and don't have a user_id set.
  system: z.boolean(),
  // If true, is a public filter. Public filters are usable by anyone.
  public: z.boolean(),
  // A list of tag IDs (as integers) that this filter will spoil.
  spoileredTagIds: z.array(z.number().int()),
  // The complex spoiled filter.
  spoileredComplex: z.string(),
  // A list of tag IDs (as integers) that this filter will hide.
  hiddenTagIds: z.array(z.number().int()),
  // The complex hidden filter.
  hiddenComplex: z.string(),
});

export type Filter = z.infer<typeof Filter>;
