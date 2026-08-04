const DEFAULT_API_BASE_URL = "http://127.0.0.1:8021";

export function getApiBaseUrl(): string {
  const configuredUrl =
    process.env.API_BASE_URL?.trim() ||
    DEFAULT_API_BASE_URL;

  const url = new URL(configuredUrl);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("API_BASE_URL deve utilizar HTTP ou HTTPS.");
  }

  return url.toString().replace(/\/$/, "");
}

export async function fetchApi<T>(
  pathname: string,
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${pathname}`, {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `A API respondeu com o status ${response.status}.`,
    );
  }

  return (await response.json()) as T;
}