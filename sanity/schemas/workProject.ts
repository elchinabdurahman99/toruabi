import { defineType, defineField, defineArrayMember } from "sanity";

export const workProject = defineType({
  name: "workProject",
  title: "Work Project",
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
      name: "serviceType",
      title: "Service Type",
      type: "string",
      options: {
        list: [
          { title: "Plumbing / Torustik", value: "plumbing" },
          { title: "Electrical / Elekter", value: "electrical" },
          { title: "Renovation / Remont", value: "renovation" },
          { title: "Bathroom / Vannituba", value: "bathroom" },
          { title: "Gas / Gaas", value: "gas" },
          { title: "Cleaning / Puhastus", value: "cleaning" },
          { title: "Construction / Ehitus", value: "construction" },
          { title: "Design / Disain", value: "design" },
          { title: "Other / Muu", value: "other" },
        ],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'e.g. "Tallinn, Kristiine"',
    }),
    defineField({
      name: "completedAt",
      title: "Completed At",
      type: "datetime",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "localeText",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text (SEO)",
          type: "localeString",
          description: "Describe the image in each language for accessibility and SEO.",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text (SEO)",
              type: "localeString",
              description: "Describe the photo in each language for SEO.",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "localeString",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "label.et", subtitle: "value" },
          },
        }),
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "localeString",
      description: "Overrides the page title for search engines (50–60 chars recommended).",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Description",
      type: "localeText",
      description: "Meta description for search engines (140–160 chars recommended).",
    }),
    defineField({
      name: "isPublished",
      title: "Is Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title.et",
      subtitle: "location",
      media: "mainImage",
    },
  },
});
