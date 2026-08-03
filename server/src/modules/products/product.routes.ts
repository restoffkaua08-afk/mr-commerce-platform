import type { FastifyPluginAsync } from "fastify";

import { productListQuerySchema } from "./product.schemas.js";
import { listProducts } from "./product.service.js";

export const productRoutes: FastifyPluginAsync = async (app) => {
  app.get("/products", async (request, reply) => {
    const parsedQuery = productListQuerySchema.safeParse(
      request.query,
    );

    if (!parsedQuery.success) {
      return reply.status(400).send({
        error: {
          code: "INVALID_QUERY",
          message: "Os filtros enviados são inválidos.",
          details: parsedQuery.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
          requestId: request.id,
        },
      });
    }

    const result = await listProducts(parsedQuery.data);

    return reply.status(200).send(result);
  });
};
