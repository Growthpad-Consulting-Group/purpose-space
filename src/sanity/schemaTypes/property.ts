import { defineArrayMember, defineField, defineType } from "sanity";

const requiredText = (label: string) =>
  defineField({
    name: label,
    title: label,
    type: "string",
    validation: (rule) => rule.required(),
  });

export const propertyType = defineType({
  name: "property",
  title: "Property",
  type: "document",
  groups: [
    { name: "listing", title: "Listing", default: true },
    { name: "content", title: "Page content" },
    { name: "details", title: "Details" },
    { name: "media", title: "Media" },
    { name: "location", title: "Location" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Property name",
      type: "string",
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "listing",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "listing",
      options: {
        layout: "radio",
        list: ["Commercial", "Residential", "Mixed-use", "Land"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Listing status",
      type: "string",
      group: "listing",
      options: {
        layout: "dropdown",
        list: [
          "To Let",
          "For Sale",
          "To Let or For Sale",
          "Coming Soon",
          "Private Listing",
          "Let",
          "Sold",
          "Off Market",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceDisplay",
      title: "Displayed price or rent",
      description:
        "Use the exact public-facing wording, for example “KES 110 per sq. ft. per month”.",
      type: "string",
      group: "listing",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specs",
      title: "Card highlights",
      description:
        "Short facts displayed on listing cards and the property hero.",
      type: "array",
      group: "listing",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "featured",
      title: "Featured property",
      type: "boolean",
      group: "listing",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      group: "listing",
      initialValue: 100,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: "description",
      title: "Property description",
      type: "text",
      rows: 10,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Overview eyebrow",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "overviewHeading",
      title: "Overview heading",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "galleryHeading",
      title: "Gallery heading",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "detailsHeading",
      title: "Details heading",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "detailsDescription",
      title: "Details introduction",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "detailRows",
      title: "Property and commercial details",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          name: "detailRow",
          title: "Detail",
          type: "object",
          fields: [requiredText("label"), requiredText("value")],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "detailsFootnote",
      title: "Details footnote",
      type: "text",
      rows: 2,
      group: "details",
    }),
    defineField({
      name: "image",
      title: "Primary image",
      description: "Used on listing cards and as the property-page hero.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "locationDescription",
      title: "Location description",
      type: "text",
      rows: 4,
      group: "location",
    }),
    defineField({
      name: "locationNote",
      title: "Location note",
      type: "text",
      rows: 2,
      group: "location",
    }),
  ],
  orderings: [
    {
      title: "Website order",
      name: "websiteOrder",
      by: [
        { field: "featured", direction: "desc" },
        { field: "sortOrder", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      status: "status",
      location: "location",
      media: "image",
    },
    prepare({ title, category, status, location, media }) {
      return {
        title,
        subtitle: [category, status, location].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
