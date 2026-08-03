import type { ProductListQuery } from "./product.schemas.js";
import {
  findProducts,
  type ProductSummary,
} from "./product.repository.js";

export interface PaginatedProducts {
  data: ProductSummary[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export async function listProducts(
  query: ProductListQuery,
): Promise<PaginatedProducts> {
  const result = await findProducts(query);
  const totalPages =
    result.total === 0
      ? 0
      : Math.ceil(result.total / query.limit);

  return {
    data: result.products,
    meta: {
      page: query.page,
      limit: query.limit,
      total: result.total,
      totalPages,
      hasPreviousPage: query.page > 1,
      hasNextPage: query.page < totalPages,
    },
  };
}
