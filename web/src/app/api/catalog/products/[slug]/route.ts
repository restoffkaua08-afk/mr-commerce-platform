import { NextResponse } from "next/server";

import { fetchApi } from "@/lib/server-api";

interface ApiProductDetail {
  id: number;
  slug: string;
  description: string;
  offers: Array<{
    purchaseUrl: string;
  }>;
}

interface DetailResponse {
  data: ApiProductDetail;
}

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;
    const encodedSlug = encodeURIComponent(slug);

    const response = await fetchApi<DetailResponse>(
      `/api/v1/products/${encodedSlug}`,
    );

    return NextResponse.json(
      {
        id: response.data.id,
        slug: response.data.slug,
        description: response.data.description,
        purchaseUrl:
          response.data.offers[0]?.purchaseUrl ?? null,
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
          code: "PRODUCT_UNAVAILABLE",
          message:
            "Não foi possível carregar os detalhes.",
        },
      },
      {
        status: 502,
      },
    );
  }
}