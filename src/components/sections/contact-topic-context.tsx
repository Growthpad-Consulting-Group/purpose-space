"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CONTACT_TOPICS, type ContactTopic } from "./contact-topics";

interface ContactTopicContextValue {
  activeTopic: ContactTopic;
  selectTopic: (topic: ContactTopic) => void;
}

const ContactTopicContext = createContext<ContactTopicContextValue | null>(null);

export function ContactTopicProvider({
  children,
  initialTopic,
}: {
  children: React.ReactNode;
  initialTopic?: ContactTopic;
}) {
  const [activeTopic, setActiveTopic] = useState<ContactTopic>(
    initialTopic ?? CONTACT_TOPICS[0]
  );

  useEffect(() => {
    if (!initialTopic) return;
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Only meant to run once, for the topic the page was linked in with.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
