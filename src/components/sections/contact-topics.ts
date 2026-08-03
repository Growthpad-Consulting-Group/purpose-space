export const CONTACT_TOPICS = [
  "Property search",
  "Sales & letting",
  "Management",
  "Advisory",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];
