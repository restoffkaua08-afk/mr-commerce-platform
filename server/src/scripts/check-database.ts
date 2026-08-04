import type { RowDataPacket } from "mysql2/promise";

import {
  checkDatabaseConnection,
  closeDatabase,
  database,
} from "../database/connection.js";

interface EntityCountRow extends RowDataPacket {
  entity: string;
  total: number;
}

async function run(): Promise<void> {
  try {
    const connection = await checkDatabaseConnection();

    console.log("Conexão estabelecida:");
    console.log(`Banco: ${connection.databaseName}`);
    console.log(`Versão: ${connection.databaseVersion}`);

    const [rows] = await database.query<EntityCountRow[]>(
      `
        SELECT 'brands' AS entity, COUNT(*) AS total FROM brands
        UNION ALL
        SELECT 'categories', COUNT(*) FROM categories
        UNION ALL
        SELECT 'merchants', COUNT(*) FROM merchants
        UNION ALL
        SELECT 'products', COUNT(*) FROM products
        UNION ALL
        SELECT 'product_images', COUNT(*) FROM product_images
        UNION ALL
        SELECT 'offers', COUNT(*) FROM offers
        UNION ALL
        SELECT 'affiliate_links', COUNT(*) FROM affiliate_links
        UNION ALL
        SELECT 'click_events', COUNT(*) FROM click_events
      `,
    );

    console.table(
      rows.map((row) => ({
        entidade: row.entity,
        total: Number(row.total),
      })),
    );

    const counts = new Map(
      rows.map((row) => [row.entity, Number(row.total)]),
    );

    const expected = new Map<string, number>([
      ["brands", 3],
      ["categories", 5],
      ["merchants", 3],
      ["products", 8],
      ["product_images", 16],
      ["offers", 8],
      ["affiliate_links", 8],
      ["click_events", 0],
    ]);

    for (const [entity, expectedCount] of expected) {
      const actualCount = counts.get(entity);

      if (actualCount !== expectedCount) {
        throw new Error(
          `${entity}: esperado ${expectedCount}, encontrado ${actualCount}`,
        );
      }
    }

    console.log("Estrutura e dados validados com sucesso.");
  } finally {
    await closeDatabase();
  }
}

run().catch((error: unknown) => {
  console.error("Falha na validação do banco:", error);
  process.exitCode = 1;
});
