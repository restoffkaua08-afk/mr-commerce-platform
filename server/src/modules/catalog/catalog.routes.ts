import type { FastifyPluginAsync } from "fastify";

import {
  findActiveBrands,
  findActiveCategories,
} from "./catalog.repository.js";

export const catalogRoutes: FastifyPluginAsync = async (app) => {
  app.get("/brands", async (_request, reply) => {
    const data = await findActiveBrands();
    return reply.send({ data });
  });

  app.get("/categories", async (_request, reply) => {
    const data = await findActiveCategories();
    return reply.send({ data });
  });
};
