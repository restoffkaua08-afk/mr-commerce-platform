import { z } from "zod";

const optionalTrimmedText = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  },
  z.string().max(120).optional(),
);

export const productListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(12),
  q: optionalTrimmedText,
  brand: optionalTrimmedText,
  category: optionalTrimmedText,
  featured: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
  sort: z
    .enum(["newest", "name_asc", "name_desc"])
    .default("newest"),
});

export type ProductListQuery = z.infer<
  typeof productListQuerySchema
>;
