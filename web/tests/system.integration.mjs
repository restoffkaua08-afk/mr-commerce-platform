import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const webRoot = path.resolve(path.dirname(currentFile), "..");
const projectRoot = path.resolve(webRoot, "..");
const serverRoot = path.join(projectRoot, "server");

const apiPort = 8021;
const webPort = 3123;
const apiBaseUrl = `http://127.0.0.1:${apiPort}`;
const webBaseUrl = `http://127.0.0.1:${webPort}`;

const nextBinary = path.join(
  webRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const apiEntry = path.join(
  serverRoot,
  "dist",
  "server.js",
);

const logs = {
  api: "",
  web: "",
};

function startProcess(command, args, cwd, logKey) {
  const child = spawn(command, args, {
    cwd,
    env: process.env,
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  child.stdout.on("data", (chunk) => {
    logs[logKey] += chunk.toString();
  });

  child.stderr.on("data", (chunk) => {
    logs[logKey] += chunk.toString();
  });

  return child;
}

async function waitForUrl(url, child, label) {
  const deadline = Date.now() + 25_000;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `${label} encerrou antes de ficar disponível.`,
      );
    }

    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(2_000),
      });

      if (response.ok) {
        return response;
      }
    } catch {
      // O serviço ainda está inicializando.
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  throw new Error(
    `${label} não respondeu dentro do tempo esperado.`,
  );
}

async function stopProcess(child) {
  if (!child || child.exitCode !== null) {
    return;
  }

  child.kill();

  await Promise.race([
    new Promise((resolve) => {
      child.once("exit", resolve);
    }),
    new Promise((resolve) => {
      setTimeout(resolve, 2_000);
    }),
  ]);

  if (child.exitCode === null) {
    child.kill("SIGKILL");
  }
}

async function readJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10_000),
  });

  assert.equal(
    response.status,
    200,
    `${url} deveria retornar HTTP 200`,
  );

  return response.json();
}

let apiProcess;
let webProcess;

try {
  console.log("Iniciando API...");

  apiProcess = startProcess(
    process.execPath,
    [apiEntry],
    serverRoot,
    "api",
  );

  const healthResponse = await waitForUrl(
    `${apiBaseUrl}/api/v1/health`,
    apiProcess,
    "API",
  );

  const health = await healthResponse.json();

  assert.equal(health.status, "ok");
  assert.equal(
    health.dependencies.database.status,
    "ok",
  );

  console.log("API e banco: OK");
  console.log("Iniciando frontend...");

  webProcess = startProcess(
    process.execPath,
    [nextBinary, "start", "-p", String(webPort)],
    webRoot,
    "web",
  );

  const homeResponse = await waitForUrl(
    webBaseUrl,
    webProcess,
    "Frontend",
  );

  const homeHtml = await homeResponse.text();

  assert.match(homeHtml, /MR/);
  assert.doesNotMatch(
    homeHtml,
    /Demo: no sistema oficial/,
  );

  console.log("Página inicial: OK");

  const catalog = await readJson(
    `${webBaseUrl}/api/catalog`,
  );

  assert.equal(catalog.products.length, 8);
  assert.equal(catalog.brands.length, 3);
  assert.equal(catalog.categories.length, 5);

  const categoryCounts = Object.fromEntries(
    catalog.categories.map((category) => [
      category.slug,
      category.productCount,
    ]),
  );

  assert.deepEqual(categoryCounts, {
    calcas: 1,
    jaquetas: 2,
    moletons: 1,
    sueteres: 1,
    tenis: 3,
  });

  console.log("Catálogo e taxonomia: OK");

  const firstProduct = catalog.products[0];

  assert.equal(
    typeof firstProduct.slug,
    "string",
  );

  const productDetail = await readJson(
    `${webBaseUrl}/api/catalog/products/${encodeURIComponent(
      firstProduct.slug,
    )}`,
  );

  assert.equal(
    productDetail.slug,
    firstProduct.slug,
  );

  assert.match(
    productDetail.purchaseUrl,
    /\/go\/[a-zA-Z0-9-]+$/,
  );

  console.log("Detalhes e afiliado: OK");
  console.log("Sistema integrado validado.");
} catch (error) {
  console.error("");
  console.error("Teste integrado falhou.");
  console.error(error);
  console.error("");
  console.error("=== LOG DA API ===");
  console.error(logs.api);
  console.error("");
  console.error("=== LOG DO FRONTEND ===");
  console.error(logs.web);
  process.exitCode = 1;
} finally {
  await stopProcess(webProcess);
  await stopProcess(apiProcess);
}