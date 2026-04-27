import { defineType } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    { name: "et", title: "Estonian (ET)", type: "string" },
    { name: "en", title: "English (EN)", type: "string" },
    { name: "ru", title: "Russian (RU)", type: "string" },
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    { name: "et", title: "Estonian (ET)", type: "text" },
    { name: "en", title: "English (EN)", type: "text" },
    { name: "ru", title: "Russian (RU)", type: "text" },
  ],
});

const blockOf = [
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
        validation: (Rule: { max: (n: number) => unknown }) => Rule.max(200),
      },
      { name: "caption", type: "string", title: "Caption (optional)" },
    ],
  },
];

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized Block Content",
  type: "object",
  fields: [
    { name: "et", title: "Estonian (ET)", type: "array", of: blockOf },
    { name: "en", title: "English (EN)", type: "array", of: blockOf },
    { name: "ru", title: "Russian (RU)", type: "array", of: blockOf },
  ],
});
