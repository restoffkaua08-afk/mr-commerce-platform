import type { RowDataPacket } from "mysql2/promise";

import { database } from "../../database/connection.js";

interface BrandRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  isActive: number;
  productCount: number;
}

interface CategoryRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: number;
  productCount: number;
}

export interface BrandSummary {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  isActive: boolean;
  productCount: number;
}

export interface CategorySummary {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  productCount: number;
}

export async function findActiveBrands(): Promise<BrandSummary[]> {
  const [rows] = await database.query<BrandRow[]>(
    `
      SELECT
        b.id,
        b.name,
        b.slug,
        b.description,
        b.logo_url AS logoUrl,
        b.is_active AS isActive,
        (
          SELECT COUNT(*)
          FROM products AS p
          WHERE p.brand_id = b.id
            AND p.is_active = TRUE
        ) AS productCount
      FROM brands AS b
      WHERE b.is_active = TRUE
      ORDER BY b.name ASC
    `,
  );

  return rows.map((row) => ({
    id: Number(row.id),
    name: row.name,
    slug: row.slug,
    description: row.description,
    logoUrl: row.logoUrl,
    isActive: Boolean(row.isActive),
    productCount: Number(row.productCount),
  }));
}

export async function findActiveCategories(): Promise<CategorySummary[]> {
  const [rows] = await database.query<CategoryRow[]>(
    `
      SELECT
        c.id,
        c.name,
        c.slug,
        c.description,
        c.is_active AS isActive,
        (
          SELECT COUNT(*)
          FROM products AS p
          WHERE p.category_id = c.id
            AND p.is_active = TRUE
        ) AS productCount
      FROM categories AS c
      WHERE c.is_active = TRUE
      ORDER BY c.name ASC
    `,
  );

  return rows.map((row) => ({
    id: Number(row.id),
    name: row.name,
    slug: row.slug,
    description: row.description,
    isActive: Boolean(row.isActive),
    productCount: Number(row.productCount),
  }));
}
