import type { FastifyPluginAsync } from "fastify";

import { productListQuerySchema } from "./product.schemas.js";
import { listProducts } from "./product.service.js";
import { productSlugParamsSchema } from "./product-detail.schemas.js";
import { getProductBySlug } from "./product-detail.service.js";

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
  app.get("/products/:slug", async (request, reply) => {
    const parsedParams = productSlugParamsSchema.safeParse(
      request.params,
    );

    if (!parsedParams.success) {
      return reply.status(400).send({
        error: {
          code: "INVALID_PRODUCT_SLUG",
          message: "O identificador do produto é inválido.",
          requestId: request.id,
        },
      });
    }

    const product = await getProductBySlug(
      parsedParams.data.slug,
    );

    if (!product) {
      return reply.status(404).send({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Produto não encontrado.",
          requestId: request.id,
        },
      });
    }

    return reply.status(200).send({
      data: product,
    });
  });
};
