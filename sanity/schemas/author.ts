import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "e.g. 'Licensed Plumber', 'Certified Electrician', 'Content Editor'",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 3,
      description: "Short bio for E-E-A-T — mention certifications and years of experience.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      description: "Used for future author profile pages.",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
