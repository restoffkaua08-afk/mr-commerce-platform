import type { RowDataPacket } from "mysql2/promise";

import { database } from "../../database/connection.js";

interface ProductDetailRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  featured: number;
  publishedAt: Date | null;
  updatedAt: Date;
  brandName: string;
  brandSlug: string;
  categoryName: string;
  categorySlug: string;
}

interface ProductImageRow extends RowDataPacket {
  id: number;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  primaryImage: number;
}

interface ProductOfferRow extends RowDataPacket {
  id: number;
  price: string | null;
  previousPrice: string | null;
  currency: string;
  availability: string;
  lastCheckedAt: Date | null;
  merchantName: string;
  merchantSlug: string;
  merchantLogoUrl: string | null;
  verifiedMerchant: number;
  publicCode: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  featured: boolean;
  publishedAt: string | null;
  updatedAt: string;
  brand: {
    name: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
  images: Array<{
    id: number;
    url: string;
    alt: string;
    order: number;
    primary: boolean;
  }>;
  offers: Array<{
    id: number;
    price: number | null;
    previousPrice: number | null;
    currency: string;
    availability: string;
    lastCheckedAt: string | null;
    merchant: {
      name: string;
      slug: string;
      logoUrl: string | null;
      verified: boolean;
    };
    publicCode: string;
  }>;
}

export async function findProductBySlug(
  slug: string,
): Promise<ProductDetail | null> {
  const [productRows] = await database.query<ProductDetailRow[]>(
    `
      SELECT
        p.id,
        p.name,
        p.slug,
        p.short_description AS shortDescription,
        p.description,
        p.is_featured AS featured,
        p.published_at AS publishedAt,
        p.updated_at AS updatedAt,
        b.name AS brandName,
        b.slug AS brandSlug,
        c.name AS categoryName,
        c.slug AS categorySlug
      FROM products AS p
      INNER JOIN brands AS b
        ON b.id = p.brand_id
      INNER JOIN categories AS c
        ON c.id = p.category_id
      WHERE p.slug = ?
        AND p.is_active = TRUE
        AND b.is_active = TRUE
        AND c.is_active = TRUE
      LIMIT 1
    `,
    [slug],
  );

  const product = productRows[0];

  if (!product) {
    return null;
  }

  const [imageRows, offerRows] = await Promise.all([
    database.query<ProductImageRow[]>(
      `
        SELECT
          id,
          image_url AS imageUrl,
          alt_text AS altText,
          display_order AS displayOrder,
          is_primary AS primaryImage
        FROM product_images
        WHERE product_id = ?
        ORDER BY
          is_primary DESC,
          display_order ASC,
          id ASC
      `,
      [product.id],
    ),
    database.query<ProductOfferRow[]>(
      `
        SELECT
          o.id,
          o.price,
          o.previous_price AS previousPrice,
          o.currency,
          o.availability,
          o.last_checked_at AS lastCheckedAt,
          m.name AS merchantName,
          m.slug AS merchantSlug,
          m.logo_url AS merchantLogoUrl,
          m.is_verified AS verifiedMerchant,
          al.public_code AS publicCode
        FROM offers AS o
        INNER JOIN merchants AS m
          ON m.id = o.merchant_id
        INNER JOIN affiliate_links AS al
          ON al.offer_id = o.id
        WHERE o.product_id = ?
          AND o.is_active = TRUE
          AND m.is_active = TRUE
          AND al.is_active = TRUE
          AND (
            al.starts_at IS NULL
            OR al.starts_at <= CURRENT_TIMESTAMP
          )
          AND (
            al.expires_at IS NULL
            OR al.expires_at > CURRENT_TIMESTAMP
          )
        ORDER BY
          o.price IS NULL ASC,
          o.price ASC,
          o.id ASC
      `,
      [product.id],
    ),
  ]);

  const images = imageRows[0];
  const offers = offerRows[0];

  return {
    id: Number(product.id),
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    featured: Boolean(product.featured),
    publishedAt:
      product.publishedAt instanceof Date
        ? product.publishedAt.toISOString()
        : null,
    updatedAt: product.updatedAt.toISOString(),
    brand: {
      name: product.brandName,
      slug: product.brandSlug,
    },
    category: {
      name: product.categoryName,
      slug: product.categorySlug,
    },
    images: images.map((image) => ({
      id: Number(image.id),
      url: image.imageUrl,
      alt: image.altText,
      order: Number(image.displayOrder),
      primary: Boolean(image.primaryImage),
    })),
    offers: offers.map((offer) => ({
      id: Number(offer.id),
      price:
        offer.price === null
          ? null
          : Number(offer.price),
      previousPrice:
        offer.previousPrice === null
          ? null
          : Number(offer.previousPrice),
      currency: offer.currency,
      availability: offer.availability,
      lastCheckedAt:
        offer.lastCheckedAt instanceof Date
          ? offer.lastCheckedAt.toISOString()
          : null,
      merchant: {
        name: offer.merchantName,
        slug: offer.merchantSlug,
        logoUrl: offer.merchantLogoUrl,
        verified: Boolean(offer.verifiedMerchant),
      },
      publicCode: offer.publicCode,
    })),
  };
}
