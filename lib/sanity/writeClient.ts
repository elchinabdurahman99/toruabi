import { createClient } from "@sanity/client";
import { sanityConfig } from "./config";

/** Server-only client with write token — use only in API routes / server actions. */
export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token || !sanityConfig.projectId) return null;
  return createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    token,
    useCdn: false,
  });
}
