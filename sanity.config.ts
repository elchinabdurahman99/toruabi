import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas/index";

type CategoryDoc = { _id: string; title: { en?: string; et?: string; az?: string } };

export default defineConfig({
  name: "torudeabi24",
  title: "TorudeAbi24 CMS",
  basePath: "/studio",
  icon: () => {
    const { createElement } = require("react");
    return createElement("img", { src: "/favicon.png", alt: "TorudeAbi24", style: { width: 24, height: 24, borderRadius: 4 } });
  },
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: async (S, context) => {
        const client = context.getClient({ apiVersion: "2026-04-20" });

        const categories = await client.fetch<CategoryDoc[]>(
          `*[_type == "serviceCategory"] | order(order asc) { _id, title }`
        );

        const categoryItems = categories.map((cat) =>
          S.listItem()
            .id(`cat-${cat._id}`)
            .title(cat.title?.en || cat.title?.et || cat.title?.az || "Category")
            .child(
              S.documentList()
                .title(cat.title?.en || cat.title?.et || "Services")
                .filter('_type == "service" && category._ref == $catId')
                .params({ catId: cat._id })
                .defaultOrdering([{ field: "order", direction: "asc" }])
            )
        );

        return S.list()
          .title("TorudeAbi24 CMS")
          .items([
            S.listItem()
              .title("⚙️ Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),

            // ── Services (grouped by category) ──────────────────────────────
            S.listItem()
              .title("🔧 Teenused / Services")
              .id("services-group")
              .child(
                S.list()
                  .title("Services")
                  .items([
                    S.documentTypeListItem("serviceCategory").title("📂 Categories"),
                    S.divider(),
                    ...(categoryItems.length
                      ? categoryItems
                      : [S.listItem().title("No categories yet — add one above").id("no-cats")]),
                    S.divider(),
                    S.documentTypeListItem("service").title("📋 All Services"),
                  ])
              ),

            S.listItem()
              .title("🖼️ Hero Slider")
              .id("hero-slider")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Hero Slider Images")
              ),
            S.listItem()
              .title("🏗️ Our Works")
              .id("works-group")
              .schemaType("workProject")
              .child(
                S.documentList()
                  .title("Our Works")
                  .filter('_type == "workProject"')
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.documentTypeListItem("pricingCategory").title("💰 Pricing"),
            S.divider(),
            S.documentTypeListItem("blogPost").title("✍️ Blog Posts"),
            S.documentTypeListItem("partner").title("🤝 Partners"),
            S.documentTypeListItem("testimonial").title("⭐ Testimonials"),
            S.divider(),
            S.documentTypeListItem("page").title("📄 Pages"),
            S.documentTypeListItem("contactSubmission").title("📬 Contact Forms"),
          ]);
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
