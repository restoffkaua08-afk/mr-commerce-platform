import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = await buildApp();

let isClosing = false;

async function shutdown(signal: string): Promise<void> {
  if (isClosing) {
    return;
  }

  isClosing = true;

  app.log.info(
    { signal },
    "Encerrando API de forma segura",
  );

  try {
    await app.close();
    process.exitCode = 0;
  } catch (error: unknown) {
    app.log.error(
      { error },
      "Falha ao encerrar a API",
    );

    process.exitCode = 1;
  }
}

process.once("SIGINT", () => {
  void shutdown("SIGINT");
});

process.once("SIGTERM", () => {
  void shutdown("SIGTERM");
});

try {
  await app.listen({
    host: env.HOST,
    port: env.PORT,
  });

  app.log.info(
    {
      host: env.HOST,
      port: env.PORT,
      environment: env.NODE_ENV,
    },
    "API iniciada",
  );
} catch (error: unknown) {
  app.log.fatal(
    { error },
    "Não foi possível iniciar a API",
  );

  process.exitCode = 1;
}
