import { defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    { name: "et", title: "Estonian", type: "string" },
    { name: "en", title: "English", type: "string" },
    { name: "ru", title: "Russian", type: "string" },
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    { name: "et", title: "Estonian", type: "text" },
    { name: "en", title: "English", type: "text" },
    { name: "ru", title: "Russian", type: "text" },
  ],
});

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized Block Content",
  type: "object",
  fields: [
    {
      name: "et",
      title: "Estonian",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text (SEO)",
              description: "Describe the image for accessibility and search engines.",
              validation: (Rule) => Rule.max(200),
            },
            { name: "caption", type: "string", title: "Caption (optional)" },
          ],
        },
      ],
    },
    {
      name: "en",
      title: "English",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text (SEO)",
              description: "Describe the image for accessibility and search engines.",
              validation: (Rule) => Rule.max(200),
            },
            { name: "caption", type: "string", title: "Caption (optional)" },
          ],
        },
      ],
    },
    {
      name: "ru",
      title: "Russian",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text (SEO)",
              description: "Describe the image for accessibility and search engines.",
              validation: (Rule) => Rule.max(200),
            },
            { name: "caption", type: "string", title: "Caption (optional)" },
          ],
        },
      ],
    },
  ],
});
