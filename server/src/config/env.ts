import dotenv from "dotenv";
import { resolve } from "node:path";
import { z } from "zod";

const environmentFile = resolve(process.cwd(), ".env.local");
const dotenvResult = dotenv.config({ path: environmentFile });

if (dotenvResult.error) {
  throw new Error(
    `Não foi possível carregar o ambiente: ${environmentFile}`,
    { cause: dotenvResult.error },
  );
}

const booleanFromString = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  return ["true", "1", "yes"].includes(value.toLowerCase());
}, z.boolean());

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  HOST: z.string().min(1).default("127.0.0.1"),
  PORT: z.coerce.number().int().min(1).max(65535).default(8021),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),

  TRUST_PROXY: booleanFromString.default(false),

  CORS_ORIGIN: z.url(),
  REDIRECT_BASE_URL: z.url(),

  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().int().min(1).max(65535),
  DB_NAME: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().default(""),
  DB_CONNECTION_LIMIT: z.coerce.number().int().min(1).max(100).default(10),

  CLICK_HASH_SECRET: z.string().min(32),
});

const result = environmentSchema.safeParse(process.env);

if (!result.success) {
  const messages = result.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Ambiente inválido:\n${messages}`);
}

export const env = Object.freeze(result.data);
export type Environment = typeof env;
