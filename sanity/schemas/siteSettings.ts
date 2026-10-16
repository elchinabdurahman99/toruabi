import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Primary Phone",
      type: "string",
    }),
    defineField({
      name: "phone2",
      title: "Secondary Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "localeString",
    }),
    defineField({
      name: "regNumber",
      title: "Registration Number",
      type: "string",
    }),
    defineField({
      name: "licenseNumber",
      title: "License Number",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "heroSlides",
      title: "🖼️ Hero Slider Images",
      description: "Upload images for the homepage hero slider. Recommended size: 800×533px. Order = display order.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text (ET / EN / RU)",
              type: "localeString",
              description: "Describe the image in each language for SEO & accessibility.",
            }),
            defineField({
              name: "order",
              title: "Order",
              type: "number",
              initialValue: 1,
            }),
          ],
          preview: {
            select: { title: "alt.et", media: "asset" },
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "twitter", title: "Twitter/X", type: "url" },
      ],
    }),
  ],
  preview: {
    select: { title: "companyName" },
  },
});
