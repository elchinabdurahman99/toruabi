import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact form submission",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({
      name: "attachments",
      title: "Attachments",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "caption", type: "string", title: "Caption" }],
        },
        { type: "file" },
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Received at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "emailSent",
      title: "Notification email sent",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email", createdAt: "createdAt" },
    prepare({ title, subtitle, createdAt }) {
      return {
        title: title || "Submission",
        subtitle: `${subtitle || ""} ${createdAt ? new Date(createdAt).toLocaleString() : ""}`,
      };
    },
  },
});
