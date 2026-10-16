import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TorudeAbi24.ee — Torumees & Remont 24/7",
    short_name: "TorudeAbi24",
    description:
      "Torumees, elektrik ja remont Tallinnas ümber kella. Plumber, electrician & renovation in Tallinn 24/7.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3B6CF4",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["business", "utilities"],
    lang: "et",
    dir: "ltr",
  };
}
