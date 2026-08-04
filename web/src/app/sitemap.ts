import type { MetadataRoute } from "next";

const routes = [
  "",
  "/categorias",
  "/explorar",
  "/favoritos",
  "/marcas",
  "/sobre",
] as const;

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3000"
  ).replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency:
      route === "" || route === "/explorar" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1
        : route === "/explorar"
          ? 0.9
          : 0.7,
  }));
}
