import type { FastifyPluginAsync } from "fastify";
import {
  affiliateParamsSchema,
  affiliateQuerySchema,
} from "./affiliate.schemas.js";
import { resolveRedirect } from "./affiliate.service.js";

export const affiliateRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/go/:publicCode",
    {
      config: {
        rateLimit: {
          max: 30,
          timeWindow: "1 minute",
        },
      },
    },
    async (request, reply) => {
      const params = affiliateParamsSchema.safeParse(request.params);
      const query = affiliateQuerySchema.safeParse(request.query);

      if (!params.success || !query.success) {
        return reply.status(400).send({
          error: {
            code: "INVALID_AFFILIATE_LINK",
            message: "O link informado é inválido.",
            requestId: request.id,
          },
        });
      }

      const result = await resolveRedirect({
        publicCode: params.data.publicCode,
        ip: request.ip,
        userAgent: request.headers["user-agent"],
        referrer: request.headers.referer,
        source: query.data.utm_source,
        medium: query.data.utm_medium,
        campaign: query.data.utm_campaign,
      });

      if (!result) {
        return reply.status(404).send({
          error: {
            code: "AFFILIATE_LINK_NOT_FOUND",
            message: "Esta oferta não está disponível.",
            requestId: request.id,
          },
        });
      }

      try {
        await result.track();
      } catch (error: unknown) {
        request.log.warn({ error }, "Falha ao registrar clique");
      }

      return reply
        .status(302)
        .header("Location", result.destinationUrl)
        .header("Cache-Control", "no-store")
        .header("Referrer-Policy", "strict-origin-when-cross-origin")
        .send();
    },
  );
};
