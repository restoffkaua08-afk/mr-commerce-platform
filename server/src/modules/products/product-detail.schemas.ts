import { z } from "zod";

export const productSlugParamsSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(280)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "O slug informado é inválido.",
    ),
});
