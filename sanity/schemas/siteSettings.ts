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
