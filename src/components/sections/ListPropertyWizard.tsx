"use client";

import { useRef, useState, useTransition, ViewTransition } from "react";
import { Icon } from "@iconify/react";

type Step = 1 | 2;

const propertyKinds = ["Residential", "Commercial", "Land", "Mixed-use"];
const intents = ["Sell", "Let", "Manage", "Get advice"];

const stepCopy: Record<
  Step,
  { eyebrow: string; heading: React.ReactNode; description: string }
> = {
  1: {
    eyebrow: "Step 1 of 2 · Property details",
    heading: (
      <>
        Tell us about
        <br />
        the property.
      </>
    ),
    description:
      "Start with the essentials. You can review everything before submitting.",
  },
  2: {
    eyebrow: "Step 2 of 2 · Your details",
    heading: (
      <>
        Your details and
        <br />
        photographs.
      </>
    ),
    description:
      "Your information is treated confidentially. Review the submission, add photographs and send it when ready.",
  },
};

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

function SegmentedGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
        {label}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.map((option) => {
          const isActive = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-md border px-5 py-3 text-center text-sm font-medium transition-colors ${
                isActive
                  ? "border-brand-green bg-brand-green text-brand-ivory"
                  : "border-brand-gold/60 text-brand-green hover:border-brand-green"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ListPropertyWizard() {
  const [step, setStep] = useState<Step>(1);
  const [propertyKind, setPropertyKind] = useState(propertyKinds[0]);
  const [intent, setIntent] = useState(intents[0]);
  const [, startTransition] = useTransition();
  const sectionRef = useRef<HTMLElement>(null);

  const goToStep = (next: Step) => {
    startTransition(() => setStep(next));
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="list-property-form"
      ref={sectionRef}
      className={`scroll-mt-24 py-16 transition-colors duration-1000 lg:py-24 ${
        step === 1 ? "bg-brand-ivory" : "bg-white"
      }`}
    >
      <div className="container-fluid grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            {stepCopy[step].eyebrow}
          </p>
          <ViewTransition name="list-property-sidebar" key={step}>
            <h2 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
              {stepCopy[step].heading}
            </h2>
          </ViewTransition>
          <p className="mt-6 max-w-xs text-base text-brand-ink">
            {stepCopy[step].description}
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="lg:min-h-180 lg:border-l lg:border-brand-gold/40 lg:pl-12"
        >
          <div className="grid grid-cols-2 border-b border-brand-green/10">
            {([1, 2] as Step[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => goToStep(s)}
                className={`border-b-2 pb-4 text-left text-xs font-semibold tracking-widest uppercase transition-colors ${
                  step === s
                    ? "border-brand-green text-brand-green"
                    : "border-transparent text-brand-green/40 hover:text-brand-green/70"
                }`}
              >
                {s === 1 ? "01 Property details" : "02 Your details & photos"}
              </button>
            ))}
          </div>

          <ViewTransition>
          {step === 1 ? (
            <div className="pt-8">
              <SegmentedGroup
                label="What kind of property is it?"
                options={propertyKinds}
                value={propertyKind}
                onChange={setPropertyKind}
              />

              <div className="mt-8">
                <SegmentedGroup
                  label="What would you like to do?"
                  options={intents}
                  value={intent}
                  onChange={setIntent}
                />
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
                <Field label="Location" placeholder="Neighbourhood, town or county" />
                <Field
                  label="Property type"
                  placeholder="House / Apartment / Office / Retail"
                />
                <Field
                  label="Bedrooms or floor area"
                  placeholder="e.g. 4 bedrooms or 320 sqm"
                />
                <Field label="Parking" placeholder="Number of parking spaces" />
                <Field
                  label="Expected price or rent"
                  placeholder="Your expected amount, if known"
                />
                <Field
                  label="Current occupancy"
                  placeholder="Vacant / Owner occupied / Tenanted"
                />
              </div>

              <label className="mt-8 block">
                <span className="text-xs font-semibold tracking-widest text-brand-green uppercase">
                  Short description
                </span>
                <textarea
                  rows={1}
                  placeholder="Tell us briefly about the property and what makes it distinctive."
                  className="mt-3 w-full resize-none border-b border-brand-gold/60 bg-transparent pb-3 text-base text-brand-green placeholder-brand-ink/50 outline-none transition-colors focus:border-brand-green"
                />
              </label>

              <button
                type="button"
                onClick={() => goToStep(2)}
                className="mt-8 inline-flex items-center gap-2 rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
              >
                Next: Your details
                <Icon icon="mdi:arrow-right" className="text-base" />
              </button>
            </div>
          ) : (
            <div className="pt-8">
              <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2">
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
                <Field
                  label="Preferred contact"
                  placeholder="Email / Phone / WhatsApp"
                />
              </div>

              <div className="mt-10">
                <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                  Property photographs
                </p>
                <label className="relative mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm bg-brand-ivory px-4 py-10 text-center text-brand-gold/60 transition-colors hover:text-brand-green">
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="calc(100% - 2px)"
                      height="calc(100% - 2px)"
                      rx="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeDasharray="14 10"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple
                    className="hidden"
                  />
                  <Icon icon="mdi:plus" className="text-6xl text-brand-gold" />
                  <span className="font-heading text-xl md:text-2xl text-brand-green">
                    Add property photographs
                  </span>
                  <span className="text-sm text-brand-ink/70">
                    JPG or PNG · Up to 10 images · You can also share them
                    later
                  </span>
                </label>
              </div>

              <label className="mt-8 block">
                <span className="text-xs font-semibold tracking-widest text-brand-green uppercase">
                  Additional notes
                </span>
                <textarea
                  rows={1}
                  placeholder="Anything else that would help us understand the property or your timeline?"
                  className="mt-3 w-full resize-none border-b border-brand-gold/60 bg-transparent pb-3 text-base text-brand-green placeholder-brand-ink/50 outline-none transition-colors focus:border-brand-green"
                />
              </label>

              <label className="mt-8 flex items-start gap-3 text-sm text-brand-green">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 appearance-none border border-brand-gold/60 bg-transparent checked:border-brand-green checked:bg-brand-green"
                />
                I&apos;m happy for Purpose Space to contact me about this
                property submission.
              </label>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="rounded-md bg-brand-green px-6 py-3 text-sm font-medium text-brand-ivory transition-colors hover:bg-brand-green/90"
                >
                  Submit property
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="flex items-center gap-2 rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
                >
                  <Icon icon="mdi:arrow-left" className="text-base" />
                  Back to property details
                </button>
              </div>
            </div>
          )}
          </ViewTransition>
        </form>
      </div>
    </section>
  );
}
