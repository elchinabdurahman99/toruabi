import { defineField, defineType } from "sanity";

export const pricingCategory = defineType({
  name: "pricingCategory",
  title: "Pricing Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Price Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Service Name",
              type: "localeString",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
            }),
            defineField({
              name: "unit",
              title: "Unit",
              type: "localeString",
              description: "e.g. per hour, per m², per piece",
            }),
          ],
          preview: {
            select: { title: "name.en", subtitle: "price" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title.en" },
  },
});
