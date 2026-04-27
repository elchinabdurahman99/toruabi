import { defineField, defineType } from "sanity";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service Category",
  type: "document",
  icon: () => "📂",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (English)",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "Lucide icon name, e.g. 'Droplets', 'Zap', 'Flame'",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "localeText",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color (hex)",
      type: "string",
      description: "e.g. #C8A45A",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      titleEn: "title.en",
      titleEt: "title.et",
      titleAz: "title.az",
      order: "order",
    },
    prepare({ titleEn, titleEt, titleAz, order }) {
      return {
        title: titleEn || titleEt || "Category",
        subtitle: `${titleAz || ""} · order: ${order ?? "—"}`,
      };
    },
  },
});
