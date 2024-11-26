import { z } from "zod";
import { mapKeys, camel } from "radash";

export function objectWithCamelKeys<T extends z.ZodRawShape>(shape: T) {
  return z
    .record(z.string(), z.any())
    .transform((v) => mapKeys(v, camel))
    .pipe(z.object(shape));
}
