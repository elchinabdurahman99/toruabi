import { defineField, defineType } from "sanity";

export const jobPosting = defineType({
  name: "jobPosting",
  title: "Job Posting / Tööpakkumine",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department / Osakond",
      type: "string",
      description: "e.g. Plumbing, Electrical, Construction, Cleaning",
    }),
    defineField({
      name: "location",
      title: "Location / Asukoht",
      type: "string",
      initialValue: "Tallinn",
      description: "e.g. Tallinn, Harjumaa",
    }),
    defineField({
      name: "type",
      title: "Employment Type / Tööliik",
      type: "string",
      options: {
        list: [
          { title: "Full-time / Täiskoormus", value: "full-time" },
          { title: "Part-time / Osakoormus", value: "part-time" },
          { title: "Contract / Leping", value: "contract" },
        ],
        layout: "radio",
      },
      initialValue: "full-time",
    }),
    defineField({
      name: "salary",
      title: "Salary Range / Palgavahemik",
      type: "string",
      description: "e.g. 1500–2200 €/kuu",
    }),
    defineField({
      name: "description",
      title: "Short Description / Lühikirjeldus",
      type: "localeText",
    }),
    defineField({
      name: "requirements",
      title: "Requirements / Nõuded",
      type: "localeBlock",
    }),
    defineField({
      name: "benefits",
      title: "Benefits / Hüved",
      type: "localeBlock",
    }),
    defineField({
      name: "isActive",
      title: "Active / Aktiivne",
      type: "boolean",
      initialValue: true,
      description: "Only active postings appear on the website.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At / Avaldatud",
      type: "datetime",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: {
      titleEt: "title.et",
      titleEn: "title.en",
      department: "department",
      location: "location",
      isActive: "isActive",
    },
    prepare({ titleEt, titleEn, department, location, isActive }) {
      const title = titleEt || titleEn || "Untitled";
      const subtitle = [department, location].filter(Boolean).join(" · ");
      return {
        title: isActive ? title : `[Inactive] ${title}`,
        subtitle,
      };
    },
  },
});
