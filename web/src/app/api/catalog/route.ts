import { NextResponse } from "next/server";

import { fetchApi } from "@/lib/server-api";

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  featured: boolean;
  brand: {
    name: string;
    slug: string;
  };
  category: {
    name: string;
    slug: string;
  };
  primaryImage: string | null;
}

interface ApiBrand {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

interface DataResponse<T> {
  data: T;
}

export async function GET(): Promise<NextResponse> {
  try {
    const [
      productsResponse,
      brandsResponse,
      categoriesResponse,
    ] = await Promise.all([
      fetchApi<DataResponse<ApiProduct[]>>(
        "/api/v1/products?limit=20",
      ),
      fetchApi<DataResponse<ApiBrand[]>>(
        "/api/v1/brands",
      ),
      fetchApi<DataResponse<ApiCategory[]>>(
        "/api/v1/categories",
      ),
    ]);

    const products = productsResponse.data.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand.name,
      category: product.category.name,
      image: product.primaryImage || "/window.svg",
      description:
        product.shortDescription ||
        "Consulte os detalhes deste produto.",
      featured: product.featured,
      tag: product.featured ? "Destaque" : undefined,
    }));

    return NextResponse.json(
      {
        products,
        brands: brandsResponse.data,
        categories: categoriesResponse.data,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "CATALOG_UNAVAILABLE",
          message:
            "O catálogo está temporariamente indisponível.",
        },
      },
      {
        status: 502,
      },
    );
  }
}