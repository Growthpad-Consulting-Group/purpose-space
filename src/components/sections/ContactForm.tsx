"use client";

import { Icon } from "@iconify/react";
import { CONTACT_TOPICS, useContactTopic } from "./contact-topic-context";

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-widest text-brand-green uppercase">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full border-b border-brand-gold/60 bg-transparent pb-3 text-base text-brand-green placeholder-brand-ink/50 outline-none transition-colors focus:border-brand-green"
      />
    </label>
  );
}

export function ContactForm() {
  const { activeTopic, selectTopic } = useContactTopic();

  return (
    <section id="contact-form" className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            Your enquiry
          </p>
          <h2 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
            Tell us <br /> where
            <br />
            you are <br />
            now.
          </h2>
          <p className="mt-6 max-w-xs text-base text-brand-ink">
            A little context helps us make the first conversation useful. Share
            only what feels relevant—we can work through the rest together.
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="lg:border-l lg:border-brand-gold/40 lg:pl-12"
        >
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            What would you like to discuss?
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CONTACT_TOPICS.map((topic) => {
              const isActive = topic === activeTopic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => selectTopic(topic)}
                  className={`rounded-md border px-5 py-3 text-center text-sm font-medium transition-colors ${
                    isActive
                      ? "border-brand-green bg-brand-green text-brand-ivory"
                      : "border-brand-gold/60 text-brand-green hover:border-brand-green"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            <Field label="Full name" placeholder="Your full name" />
            <Field
              label="Email address"
              placeholder="name@example.com"
              type="email"
            />
            <Field
              label="Phone number"
              placeholder="Your contact number"
              type="tel"
            />
            <label className="block">
              <span className="text-xs font-semibold tracking-widest text-brand-green uppercase">
                Preferred contact
              </span>
              <div className="relative mt-3">
                <select className="w-full appearance-none border-b border-brand-gold/60 bg-transparent pb-3 text-base text-brand-green outline-none transition-colors focus:border-brand-green">
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
                <Icon
                  icon="mdi:chevron-down"
                  className="pointer-events-none absolute right-0 bottom-3 text-lg text-brand-green"
                />
              </div>
            </label>
          </div>

          <label className="mt-8 block">
            <span className="text-xs font-semibold tracking-widest text-brand-green uppercase">
              Your message
            </span>
            <textarea
              rows={2}
              placeholder="Tell us about the property, place or decision you would like to discuss."
              className="mt-3 w-full resize-none border-b border-brand-gold/60 bg-transparent pb-3 text-base text-brand-green placeholder-brand-ink/50 outline-none transition-colors focus:border-brand-green"
            />
          </label>

          <label className="mt-8 flex items-start gap-3 text-sm text-brand-green">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 appearance-none border border-brand-gold/60 bg-transparent checked:border-brand-green checked:bg-brand-green"
            />
            I&apos;m happy for Purpose Space to contact me about this enquiry.
          </label>

          <button
            type="submit"
            className="mt-8 rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
          >
            Send enquiry
          </button>
        </form>
      </div>
    </section>
  );
}
