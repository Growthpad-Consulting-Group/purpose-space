interface Reason {
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    title: "Purpose-led advice",
    description: "Decisions shaped around what truly matters to you.",
  },
  {
    title: "Local understanding",
    description: "Clear guidance grounded in relevant market knowledge.",
  },
  {
    title: "Attentive stewardship",
    description: "Thoughtful support from the first conversation onward.",
  },
];

export function WhyPurposeSpace() {
  return (
    <section className="bg-brand-ivory py-16 lg:py-24">
      <div className="container-fluid grid gap-16 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
            Why Purpose Space
          </p>
          <h2 className="mt-6 font-heading text-4xl leading-[1.15] text-brand-green sm:text-5xl">
            Property decisions,
            <br />
            made with purpose.
          </h2>
          <p className="mt-8 max-w-sm text-base text-brand-green/70">
            Thoughtful advice, grounded knowledge and attentive
            service—without the noise.
          </p>
        </div>

        <div>
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="flex flex-col gap-4 border-b border-brand-green py-6 first:pt-0 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="text-sm font-medium text-brand-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-2xl text-brand-green sm:w-64 sm:shrink-0">
                {reason.title}
              </h3>
              <p className="text-base text-brand-green/70">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
