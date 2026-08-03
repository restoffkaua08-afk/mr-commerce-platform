import mysql, {
  type Pool,
  type PoolConnection,
  type RowDataPacket,
} from "mysql2/promise";

import { env } from "../config/env.js";

export const database: Pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  charset: "utf8mb4",
  connectionLimit: env.DB_CONNECTION_LIMIT,
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  namedPlaceholders: true,
});

export async function withConnection<T>(
  callback: (connection: PoolConnection) => Promise<T>,
): Promise<T> {
  const connection = await database.getConnection();

  try {
    return await callback(connection);
  } finally {
    connection.release();
  }
}

export async function checkDatabaseConnection(): Promise<{
  databaseName: string;
  databaseVersion: string;
}> {
  const [rows] = await database.query<RowDataPacket[]>(
    `
      SELECT
        DATABASE() AS databaseName,
        VERSION() AS databaseVersion
    `,
  );

  const firstRow = rows[0];

  if (!firstRow) {
    throw new Error("O banco não retornou informações da conexão.");
  }

  return {
    databaseName: String(firstRow.databaseName),
    databaseVersion: String(firstRow.databaseVersion),
  };
}

export async function closeDatabase(): Promise<void> {
  await database.end();
}
