import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
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
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule) => Rule.required(),
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
    select: { title: "title.en", subtitle: "slug.current" },
  },
});
