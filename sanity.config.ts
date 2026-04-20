import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
/** Explicit index path so Studio always bundles the full schema (incl. service.pathSegment). */
import { schemaTypes } from "./sanity/schemas/index";

export default defineConfig({
  name: "ajsan",
  title: "Ajsan CMS",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("service").title("Services"),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("partner").title("Partners"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("pricingCategory").title("Pricing"),
            S.divider(),
            S.documentTypeListItem("page").title("Pages"),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
