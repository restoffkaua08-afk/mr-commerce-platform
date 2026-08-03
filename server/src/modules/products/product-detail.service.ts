import { env } from "../../config/env.js";
import {
  findProductBySlug,
  type ProductDetail,
} from "./product-detail.repository.js";

export interface PublicProductDetail
  extends Omit<ProductDetail, "offers"> {
  offers: Array<
    Omit<ProductDetail["offers"][number], "publicCode"> & {
      purchaseUrl: string;
    }
  >;
}

export async function getProductBySlug(
  slug: string,
): Promise<PublicProductDetail | null> {
  const product = await findProductBySlug(slug);

  if (!product) {
    return null;
  }

  const redirectBaseUrl =
    env.REDIRECT_BASE_URL.replace(/\/+$/, "");

  return {
    ...product,
    offers: product.offers.map(
      ({ publicCode, ...offer }) => ({
        ...offer,
        purchaseUrl: `${redirectBaseUrl}/go/${publicCode}`,
      }),
    ),
  };
}
