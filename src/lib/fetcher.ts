export const BASE_URL = "https://jsonfakery.com/";

export async function fetcher<T>(url: string, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, init);
    const data = await response.json();
    return data as T;
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    throw Error(`Failed to fetch ${url}: ${msg}`);
  }
}
