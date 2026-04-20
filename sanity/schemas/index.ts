import { localeString, localeText, localeBlock } from "./localeString";
import { service } from "./service";
import { blogPost } from "./blogPost";
import { author } from "./author";
import { partner } from "./partner";
import { testimonial } from "./testimonial";
import { pricingCategory } from "./pricingCategory";
import { page } from "./page";
import { siteSettings } from "./siteSettings";
import { contactSubmission } from "./contactSubmission";

export const schemaTypes = [
  localeString,
  localeText,
  localeBlock,
  service,
  blogPost,
  author,
  partner,
  testimonial,
  pricingCategory,
  page,
  siteSettings,
  contactSubmission,
];
