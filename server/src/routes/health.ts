import type { FastifyPluginAsync } from "fastify";

import {
  checkDatabaseConnection,
} from "../database/connection.js";

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/health",
    {
      config: {
        rateLimit: {
          max: 120,
          timeWindow: "1 minute",
        },
      },
    },
    async (_request, reply) => {
      const database = await checkDatabaseConnection();

      return reply.status(200).send({
        status: "ok",
        service: "product-catalog-api",
        timestamp: new Date().toISOString(),
        dependencies: {
          database: {
            status: "ok",
            name: database.databaseName,
            version: database.databaseVersion,
          },
        },
      });
    },
  );
};
