import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas/index";

type CategoryDoc = { _id: string; title: { en?: string; et?: string; az?: string } };

export default defineConfig({
  name: "ajsan",
  title: "Ajsan CMS",
  basePath: "/studio",
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
          .title("Ajsan CMS")
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

            S.documentTypeListItem("pricingCategory").title("💰 Pricing"),
            S.divider(),
            S.documentTypeListItem("blogPost").title("✍️ Blog Posts"),
            S.documentTypeListItem("author").title("👤 Authors"),
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
