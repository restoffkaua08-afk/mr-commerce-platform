import type { MetadataRoute } from "next";

const routes = [
  "",
  "/categorias",
  "/explorar",
  "/favoritos",
  "/marcas",
  "/sobre",
  "/privacidade",
  "/termos",
  "/afiliados",
  "/contato",
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

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency:
      route === "" || route === "/explorar" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1
        : route === "/explorar"
          ? 0.9
          : route === "/privacidade" ||
              route === "/termos" ||
              route === "/afiliados" ||
              route === "/contato"
            ? 0.4
            : 0.7,
  }));
}
