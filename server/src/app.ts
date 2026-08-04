import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import Fastify, {
  type FastifyError,
  type FastifyInstance,
} from "fastify";

import { closeDatabase } from "./database/connection.js";
import { env } from "./config/env.js";
import { healthRoutes } from "./routes/health.js";
import { productRoutes } from "./modules/products/product.routes.js";
import { affiliateRoutes } from "./modules/affiliate/affiliate.routes.js";
import { catalogRoutes } from "./modules/catalog/catalog.routes.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL,
    },
    trustProxy: env.TRUST_PROXY,
    requestIdHeader: "x-request-id",

  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  await app.register(cors, {
    origin: env.CORS_ORIGIN,
    credentials: false,
    methods: ["GET", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Accept",
      "Content-Type",
      "X-Request-Id",
    ],
  });

  await app.register(rateLimit, {
    global: true,
    max: 100,
    timeWindow: "1 minute",
    hook: "onRequest",
    errorResponseBuilder: (_request, context) => ({
      error: {
        code: "RATE_LIMIT_EXCEEDED",
        message: "Muitas requisições. Tente novamente em instantes.",
        retryAfter: context.after,
      },
    }),
  });

  app.get("/", async (_request, reply) => {
    return reply.status(200).send({
      name: "Product Catalog API",
      version: "1.0.0",
      status: "running",
      documentation: null,
    });
  });

  await app.register(healthRoutes, {
    prefix: "/api/v1",
  });

  await app.register(productRoutes, {
    prefix: "/api/v1",
  });

  await app.register(catalogRoutes, {
    prefix: "/api/v1",
  });

  await app.register(affiliateRoutes);

  app.setNotFoundHandler(async (request, reply) => {
    return reply.status(404).send({
      error: {
        code: "ROUTE_NOT_FOUND",
        message: "A rota solicitada não foi encontrada.",
        path: request.url,
      },
    });
  });

  app.setErrorHandler(
    async (
      error: FastifyError,
      request,
      reply,
    ) => {
      request.log.error(
        {
          error,
          requestId: request.id,
        },
        "Erro ao processar requisição",
      );

      if (error.validation) {
        return reply.status(400).send({
          error: {
            code: "VALIDATION_ERROR",
            message: "Os dados enviados são inválidos.",
            requestId: request.id,
          },
        });
      }

      const statusCode =
        error.statusCode &&
        error.statusCode >= 400 &&
        error.statusCode < 500
          ? error.statusCode
          : 500;

      return reply.status(statusCode).send({
        error: {
          code:
            statusCode === 500
              ? "INTERNAL_SERVER_ERROR"
              : "REQUEST_ERROR",
          message:
            statusCode === 500
              ? "Não foi possível processar a solicitação."
              : error.message,
          requestId: request.id,
        },
      });
    },
  );

  app.addHook("onClose", async () => {
    await closeDatabase();
  });

  return app;
}
