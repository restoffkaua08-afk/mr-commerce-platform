import type { RowDataPacket } from "mysql2/promise";

import { database } from "../../database/connection.js";
import type { ProductListQuery } from "./product.schemas.js";

interface ProductRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  featured: number;
  publishedAt: Date | null;
  brandName: string;
  brandSlug: string;
  categoryName: string;
  categorySlug: string;
  imageUrl: string | null;
  lowestPrice: string | null;
  offerCount: number;
}

interface CountRow extends RowDataPacket {
  total: number;
}

export interface ProductSummary {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  featured: boolean;
  publishedAt: string | null;
  brand: {
    name: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
  primaryImage: string | null;
  lowestPrice: number | null;
  currency: "BRL";
  offerCount: number;
}

const sortSql: Record<ProductListQuery["sort"], string> = {
  newest: "p.published_at DESC, p.id DESC",
  name_asc: "p.name ASC, p.id ASC",
  name_desc: "p.name DESC, p.id DESC",
};

function buildFilters(query: ProductListQuery): {
  whereSql: string;
  parameters: Record<string, unknown>;
} {
  const filters = ["p.is_active = TRUE"];
  const parameters: Record<string, unknown> = {};

  if (query.q) {
    filters.push(`
      (
        p.name LIKE :search
        OR p.short_description LIKE :search
        OR b.name LIKE :search
        OR c.name LIKE :search
      )
    `);

    parameters.search = `%${query.q}%`;
  }

  if (query.brand) {
    filters.push("b.slug = :brand");
    parameters.brand = query.brand;
  }

  if (query.category) {
    filters.push("c.slug = :category");
    parameters.category = query.category;
  }

  if (query.featured !== undefined) {
    filters.push("p.is_featured = :featured");
    parameters.featured = query.featured;
  }

  return {
    whereSql: filters.join(" AND "),
    parameters,
  };
}

export async function findProducts(
  query: ProductListQuery,
): Promise<{
  products: ProductSummary[];
  total: number;
}> {
  const { whereSql, parameters } = buildFilters(query);
  const offset = (query.page - 1) * query.limit;

  const [rows] = await database.query<ProductRow[]>(
    `
      SELECT
        p.id,
        p.name,
        p.slug,
        p.short_description AS shortDescription,
        p.is_featured AS featured,
        p.published_at AS publishedAt,
        b.name AS brandName,
        b.slug AS brandSlug,
        c.name AS categoryName,
        c.slug AS categorySlug,

        (
          SELECT pi.image_url
          FROM product_images AS pi
          WHERE pi.product_id = p.id
          ORDER BY
            pi.is_primary DESC,
            pi.display_order ASC,
            pi.id ASC
          LIMIT 1
        ) AS imageUrl,

        (
          SELECT MIN(o.price)
          FROM offers AS o
          WHERE o.product_id = p.id
            AND o.is_active = TRUE
            AND o.price IS NOT NULL
        ) AS lowestPrice,

        (
          SELECT COUNT(*)
          FROM offers AS o
          WHERE o.product_id = p.id
            AND o.is_active = TRUE
        ) AS offerCount

      FROM products AS p
      INNER JOIN brands AS b
        ON b.id = p.brand_id
      INNER JOIN categories AS c
        ON c.id = p.category_id

      WHERE ${whereSql}
      ORDER BY ${sortSql[query.sort]}
      LIMIT :limit
      OFFSET :offset
    `,
    {
      ...parameters,
      limit: query.limit,
      offset,
    },
  );

  const [countRows] = await database.query<CountRow[]>({
    sql: `
      SELECT COUNT(*) AS total
      FROM products AS p
      INNER JOIN brands AS b
        ON b.id = p.brand_id
      INNER JOIN categories AS c
        ON c.id = p.category_id
      WHERE ${whereSql}
    `,
    values: parameters as unknown as unknown[],
    namedPlaceholders: true,
  });

  const total = Number(countRows[0]?.total ?? 0);

  return {
    products: rows.map((row) => ({
      id: Number(row.id),
      name: row.name,
      slug: row.slug,
      shortDescription: row.shortDescription,
      featured: Boolean(row.featured),
      publishedAt:
        row.publishedAt instanceof Date
          ? row.publishedAt.toISOString()
          : null,
      brand: {
        name: row.brandName,
        slug: row.brandSlug,
      },
      category: {
        name: row.categoryName,
        slug: row.categorySlug,
      },
      primaryImage: row.imageUrl,
      lowestPrice:
        row.lowestPrice === null
          ? null
          : Number(row.lowestPrice),
      currency: "BRL",
      offerCount: Number(row.offerCount),
    })),
    total,
  };
}


