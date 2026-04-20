import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
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
      description:
        "English URL segment: /en/services/[slug]. This is the canonical slug; Estonian and Russian use the fields below when set.",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pathSegment",
      title: "Localized URL segments (ET & RU)",
      description:
        "Optional. Per-language path under /et/teenused/… and /ru/услуги/… English always uses the Slug (English) field above. Leave empty to fall back to English slug or site defaults.",
      type: "object",
      fields: [
        defineField({
          name: "et",
          title: "Estonian slug",
          description: "Latin letters, numbers, hyphens (e.g. santehnik-tallinnas).",
          type: "string",
          validation: (Rule) =>
            Rule.custom((val) => {
              if (val == null || String(val).trim() === "") return true;
              const s = String(val).trim();
              if (!/^[\p{L}0-9]+(?:-[\p{L}0-9]+)*$/u.test(s)) {
                return "Letters (incl. ä, ö, ü, õ), numbers, hyphens only.";
              }
              return true;
            }),
        }),
        defineField({
          name: "ru",
          title: "Russian slug (Cyrillic)",
          description: "Кириллица, цифры и дефисы (например: сантехник-таллин).",
          type: "string",
          validation: (Rule) =>
            Rule.custom((val) => {
              if (val == null || String(val).trim() === "") return true;
              const s = String(val).trim();
              // Cyrillic + Latin + digits + hyphen/underscore (URL-safe Unicode)
              if (!/^[\p{L}\p{N}_\-]+$/u.test(s)) {
                return "Допустимы буквы (кириллица или латиница), цифры, дефис.";
              }
              // Prefer at least one Cyrillic letter for RU URLs (warn only — optional strict)
              if (!/[\u0400-\u04FF]/.test(s)) {
                return "Для русского URL используйте кириллицу (например: сантехник-таллин).";
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Lucide)",
      type: "string",
      description: "Lucide icon name, e.g. 'Wrench', 'Zap', 'Droplets'",
    }),
    defineField({
      name: "image",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text (SEO)",
          type: "localeString",
          description: "Describe the image for accessibility and search engines (per language).",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery (more photos)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text (SEO)",
              type: "localeString",
              description: "Describe the photo for accessibility and SEO in each language.",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "localeText",
    }),
    defineField({
      name: "body",
      title: "Full Content",
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
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
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
      title: "title.en",
      titleEt: "title.et",
      slugEn: "slug.current",
      segEt: "pathSegment.et",
      segRu: "pathSegment.ru",
      media: "image",
    },
    prepare({ title, titleEt, slugEn, segEt, segRu, media }) {
      const bits = [
        slugEn && `en: ${slugEn}`,
        segEt && `et: ${segEt}`,
        segRu && `ru: ${segRu}`,
      ].filter(Boolean);
      return {
        title: title || titleEt || "Service",
        subtitle: bits.length ? bits.join(" · ") : "Add localized slugs",
        media,
      };
    },
  },
});
