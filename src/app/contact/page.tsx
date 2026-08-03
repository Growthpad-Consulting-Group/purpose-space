import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactTopicProvider } from "@/components/sections/contact-topic-context";
import { Reveal } from "@/shared/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact | Purpose Space Realtors",
  description:
    "Whether you are searching for a home, office or commercial property, listing a space, or weighing a longer-term decision, begin with the context.",
};

export default function ContactPage() {
  return (
    <ContactTopicProvider>
      <ContactHero />
      <Reveal>
        <ContactForm />
      </Reveal>
    </ContactTopicProvider>
  );
}
