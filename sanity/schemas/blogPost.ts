import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (English)",
      description: "English URL segment: /en/blog/…",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pathSegment",
      title: "Localized URL segments (ET & RU)",
      description:
        "Optional. Estonian and Russian paths under /et/blogi/… and /ru/блог/… English uses the Slug (English) field.",
      type: "object",
      fields: [
        defineField({
          name: "et",
          title: "Estonian slug",
          type: "string",
          validation: (Rule) =>
            Rule.custom((val) => {
              if (val == null || String(val).trim() === "") return true;
              const s = String(val).trim();
              if (!/^[\p{L}0-9]+(?:-[\p{L}0-9]+)*$/u.test(s)) {
                return "Letters, numbers, hyphens only.";
              }
              return true;
            }),
        }),
        defineField({
          name: "ru",
          title: "Russian slug (Cyrillic)",
          type: "string",
          validation: (Rule) =>
            Rule.custom((val) => {
              if (val == null || String(val).trim() === "") return true;
              const s = String(val).trim();
              if (!/^[\p{L}\p{N}_\-]+$/u.test(s)) return "Letters, numbers, hyphens.";
              if (!/[\u0400-\u04FF]/.test(s)) {
                return "Для русского URL используйте кириллицу.";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text (SEO & accessibility)",
          type: "localeString",
          description: "Describe the image in each language for screen readers and Google Image Search.",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localeText",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localeBlock",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "localeString",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "localeText",
    }),
  ],
  preview: {
    select: { title: "title.en", media: "mainImage" },
  },
});
