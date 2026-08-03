import { z } from "zod";

const optionalMetric = z.preprocess(
  (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  },
  z.string().max(160).optional(),
);

export const affiliateParamsSchema = z.object({
  publicCode: z.uuid(),
});

export const affiliateQuerySchema = z.object({
  utm_source: optionalMetric,
  utm_medium: optionalMetric,
  utm_campaign: optionalMetric,
});
