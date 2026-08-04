import type { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";

interface ProductListResponse {
  data: unknown[];
  meta: {
    total: number;
  };
}

interface CatalogResponse {
  data: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface HealthResponse {
  status: string;
  service: string;
  dependencies: {
    database: {
      status: string;
      name: string;
    };
  };
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

describe("API pública MR", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("retorna a saúde da API e do banco", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/health",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<HealthResponse>();

    expect(body.status).toBe("ok");
    expect(body.service).toBe("product-catalog-api");
    expect(body.dependencies.database.status).toBe("ok");
    expect(body.dependencies.database.name).toBe(
      "product_aggregator_mvp",
    );
  });

  it("lista os oito produtos disponíveis", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/products",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<ProductListResponse>();

    expect(body.meta.total).toBe(8);
    expect(body.data).toHaveLength(8);
  });

  it("filtra os produtos da Nike", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/products?brand=nike",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<ProductListResponse>();

    expect(body.meta.total).toBe(3);
    expect(body.data).toHaveLength(3);
  });

  it("filtra produtos em destaque", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/products?featured=true",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<ProductListResponse>();

    expect(body.meta.total).toBe(3);
    expect(body.data).toHaveLength(3);
  });

  it("pesquisa produtos Firebird", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/products?q=firebird",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<ProductListResponse>();

    expect(body.meta.total).toBe(2);
    expect(body.data).toHaveLength(2);
  });

  it("lista as marcas disponíveis", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/brands",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<CatalogResponse>();

    expect(body.data).toHaveLength(3);
    expect(body.data.map((brand) => brand.slug)).toEqual(
      expect.arrayContaining(["adidas", "lacoste", "nike"]),
    );
  });

  it("lista as categorias disponíveis", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/categories",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<CatalogResponse>();

    expect(body.data).toHaveLength(5);

    for (const category of body.data) {
      expect(category.id).toBeTypeOf("number");
      expect(category.name.length).toBeGreaterThan(0);
      expect(category.slug.length).toBeGreaterThan(0);
      expect(category.name).not.toContain("\uFFFD");
      expect(category.name).not.toContain("?");
    }
  });

  it("retorna as contagens corretas por categoria", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/categories",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<{
      data: Array<{
        slug: string;
        productCount: number;
      }>;
    }>();

    const counts = Object.fromEntries(
      body.data.map((category) => [
        category.slug,
        category.productCount,
      ]),
    );

    expect(counts).toMatchObject({
      tenis: 3,
      jaquetas: 2,
      calcas: 1,
      moletons: 1,
      sueteres: 1,
    });
  });

  it("associa cada produto à categoria correta", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/products?limit=20",
    });

    expect(response.statusCode).toBe(200);

    const body = response.json<{
      data: Array<{
        slug: string;
        category: {
          slug: string;
        };
      }>;
    }>();

    const categoriesByProduct = Object.fromEntries(
      body.data.map((product) => [
        product.slug,
        product.category.slug,
      ]),
    );

    expect(categoriesByProduct).toMatchObject({
      "tenis-nike-air-max-excee-masculino": "tenis",
      "tenis-nike-sb-force-58-masculino": "tenis",
      "tenis-adidas-lite-racer-4": "tenis",
      "calca-esportiva-adidas-firebird": "calcas",
      "jaqueta-jeans-adidas-adicolor-firebird": "jaquetas",
      "jaqueta-corinthians-nike-total-90": "jaquetas",
      "moletom-masculino-lacoste-classico": "moletons",
      "sueter-masculino-lacoste-malha-regular": "sueteres",
    });
  });
  it("retorna erro padronizado para rota inexistente", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/rota-inexistente",
    });

    expect(response.statusCode).toBe(404);

    const body = response.json<ErrorResponse>();

    expect(body.error.code).toBeTypeOf("string");
    expect(body.error.message).toBeTypeOf("string");
  });
});