import type { RowDataPacket } from "mysql2/promise";
import { database } from "../../database/connection.js";

interface DestinationRow extends RowDataPacket {
  affiliateLinkId: number;
  productId: number;
  merchantId: number;
  affiliateUrl: string;
  merchantWebsiteUrl: string;
}

export interface Destination {
  affiliateLinkId: number;
  productId: number;
  merchantId: number;
  affiliateUrl: string;
  merchantWebsiteUrl: string;
}

export interface ClickInput {
  affiliateLinkId: number;
  productId: number;
  merchantId: number;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  referrerHost: string | null;
  deviceType: "mobile" | "tablet" | "desktop" | "unknown";
  visitorTokenHash: string;
}

export async function findDestination(
  publicCode: string,
): Promise<Destination | null> {
  const [rows] = await database.query<DestinationRow[]>(
    `
      SELECT
        al.id AS affiliateLinkId,
        o.product_id AS productId,
        o.merchant_id AS merchantId,
        al.affiliate_url AS affiliateUrl,
        m.website_url AS merchantWebsiteUrl
      FROM affiliate_links AS al
      INNER JOIN offers AS o ON o.id = al.offer_id
      INNER JOIN products AS p ON p.id = o.product_id
      INNER JOIN merchants AS m ON m.id = o.merchant_id
      WHERE al.public_code = ?
        AND al.is_active = TRUE
        AND o.is_active = TRUE
        AND p.is_active = TRUE
        AND m.is_active = TRUE
        AND (al.starts_at IS NULL OR al.starts_at <= CURRENT_TIMESTAMP)
        AND (al.expires_at IS NULL OR al.expires_at > CURRENT_TIMESTAMP)
      LIMIT 1
    `,
    [publicCode],
  );

  const row = rows[0];

  return row
    ? {
        affiliateLinkId: Number(row.affiliateLinkId),
        productId: Number(row.productId),
        merchantId: Number(row.merchantId),
        affiliateUrl: row.affiliateUrl,
        merchantWebsiteUrl: row.merchantWebsiteUrl,
      }
    : null;
}

export async function insertClick(input: ClickInput): Promise<void> {
  await database.execute(
    `
      INSERT INTO click_events (
        affiliate_link_id,
        product_id,
        merchant_id,
        source,
        medium,
        campaign,
        referrer_host,
        device_type,
        visitor_token_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      input.affiliateLinkId,
      input.productId,
      input.merchantId,
      input.source,
      input.medium,
      input.campaign,
      input.referrerHost,
      input.deviceType,
      input.visitorTokenHash,
    ],
  );
}
