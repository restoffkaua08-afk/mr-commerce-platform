import { createHmac } from "node:crypto";
import { env } from "../../config/env.js";
import {
  findDestination,
  insertClick,
} from "./affiliate.repository.js";

export interface RedirectContext {
  publicCode: string;
  ip: string;
  userAgent: string | undefined;
  referrer: string | undefined;
  source: string | undefined;
  medium: string | undefined;
  campaign: string | undefined;
}

export interface RedirectResult {
  destinationUrl: string;
  track: () => Promise<void>;
}

function normalizeHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, "");
}

function validateUrl(
  affiliateUrl: string,
  merchantUrl: string,
): string {
  const destination = new URL(affiliateUrl);
  const merchant = new URL(merchantUrl);

  if (destination.protocol !== "https:") {
    throw new Error("Destino afiliado sem HTTPS.");
  }

  const destinationHost = normalizeHost(destination.hostname);
  const merchantHost = normalizeHost(merchant.hostname);

  if (
    destinationHost !== merchantHost
    && !destinationHost.endsWith(`.${merchantHost}`)
  ) {
    throw new Error("Domínio afiliado não autorizado.");
  }

  return destination.toString();
}

function device(
  userAgent?: string,
): "mobile" | "tablet" | "desktop" | "unknown" {
  if (!userAgent) return "unknown";
  if (/ipad|tablet|kindle|silk/i.test(userAgent)) return "tablet";
  if (/mobile|android|iphone|ipod/i.test(userAgent)) return "mobile";
  return "desktop";
}

function referrerHost(referrer?: string): string | null {
  if (!referrer) return null;

  try {
    return new URL(referrer).hostname.toLowerCase().slice(0, 255);
  } catch {
    return null;
  }
}

function visitorHash(ip: string): string {
  const day = new Date().toISOString().slice(0, 10);

  return createHmac("sha256", env.CLICK_HASH_SECRET)
    .update(`${day}:${ip}`)
    .digest("hex");
}

export async function resolveRedirect(
  context: RedirectContext,
): Promise<RedirectResult | null> {
  const destination = await findDestination(context.publicCode);

  if (!destination) return null;

  const host = referrerHost(context.referrer);
  const source =
    context.source
    ?? (host?.includes("instagram") ? "instagram" : undefined);

  return {
    destinationUrl: validateUrl(
      destination.affiliateUrl,
      destination.merchantWebsiteUrl,
    ),
    track: async () => {
      await insertClick({
        affiliateLinkId: destination.affiliateLinkId,
        productId: destination.productId,
        merchantId: destination.merchantId,
        source: source ?? null,
        medium: context.medium ?? null,
        campaign: context.campaign ?? null,
        referrerHost: host,
        deviceType: device(context.userAgent),
        visitorTokenHash: visitorHash(context.ip),
      });
    },
  };
}

