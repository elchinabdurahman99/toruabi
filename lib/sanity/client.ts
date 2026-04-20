import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

const isConfigured = sanityConfig.projectId && /^[a-z0-9-]+$/.test(sanityConfig.projectId);

export const client = isConfigured
  ? createClient({
      ...sanityConfig,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
      stega: { enabled: false },
    })
  : null;

export async function sanityFetch<T>(query: string, params = {}): Promise<T> {
  if (!client) {
    console.warn("[Sanity] Client not configured — returning empty data");
    return [] as unknown as T;
  }
  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 0 },
    });
    return data;
  } catch (error) {
    console.error("[Sanity] Fetch error:", error);
    return [] as unknown as T;
  }
}
