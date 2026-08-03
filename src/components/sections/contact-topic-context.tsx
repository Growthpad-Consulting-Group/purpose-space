"use client";

import { createContext, useContext, useState } from "react";

export const CONTACT_TOPICS = [
  "Property search",
  "Sales & letting",
  "Management",
  "Advisory",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

interface ContactTopicContextValue {
  activeTopic: ContactTopic;
  selectTopic: (topic: ContactTopic) => void;
}

const ContactTopicContext = createContext<ContactTopicContextValue | null>(null);

export function ContactTopicProvider({ children }: { children: React.ReactNode }) {
  const [activeTopic, setActiveTopic] = useState<ContactTopic>(CONTACT_TOPICS[0]);

  const selectTopic = (topic: ContactTopic) => {
    setActiveTopic(topic);
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ContactTopicContext.Provider value={{ activeTopic, selectTopic }}>
      {children}
    </ContactTopicContext.Provider>
  );
}

export function useContactTopic() {
  const ctx = useContext(ContactTopicContext);
  if (!ctx) {
    throw new Error("useContactTopic must be used within ContactTopicProvider");
  }
  return ctx;
}
