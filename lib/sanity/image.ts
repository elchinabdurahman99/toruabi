import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder) {
    return { width: () => ({ height: () => ({ url: () => "/placeholder.jpg" }) }), url: () => "/placeholder.jpg" } as any;
  }
  return builder.image(source);
}
