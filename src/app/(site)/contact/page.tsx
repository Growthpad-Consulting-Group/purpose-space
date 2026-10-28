import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactTopicProvider } from "@/components/sections/contact-topic-context";
import { CONTACT_TOPICS, type ContactTopic } from "@/components/sections/contact-topics";
import { Reveal } from "@/shared/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact | Purpose Space Realtors",
  description:
    "Whether you are searching for a home, office or commercial property, listing a space, or weighing a longer-term decision, begin with the context.",
};

function parseTopic(value: string | undefined): ContactTopic | undefined {
  return CONTACT_TOPICS.find((topic) => topic === value);
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;

  return (
    <ContactTopicProvider initialTopic={parseTopic(topic)}>
      <ContactHero />
      <Reveal>
        <ContactForm />
      </Reveal>
    </ContactTopicProvider>
  );
}
