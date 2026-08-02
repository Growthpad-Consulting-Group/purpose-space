interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Understand",
    description:
      "We listen, assess the property and clarify the priorities that will shape the right outcome.",
  },
  {
    title: "Recommend",
    description:
      "We turn those priorities into a clear strategy, with practical guidance on the best way forward.",
  },
  {
    title: "Deliver",
    description:
      "We coordinate the details, communicate clearly and carry the work through to completion.",
  },
];

export function OurApproach() {
  return (
    <section className="bg-brand-gold py-16">
      <div className="container-fluid">
        <p className="text-xs font-semibold tracking-widest text-brand-green uppercase">
          Our Approach
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-end">
          <h2 className="font-heading text-4xl leading-[1.15] text-brand-green sm:text-6xl">
            A considered path
            <br />
            forward.
          </h2>
          <p className="max-w-md text-base text-black lg:justify-self-end">
            Every engagement begins with understanding what matters—to you,
            your property and the outcome you want.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-2 text-xs font-semibold tracking-widest text-brand-green uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>From conversation to completion</span>
          <span>Clear / Coordinated / Accountable</span>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute top-1 left-0 hidden h-px w-[calc(66.6667%+1.333rem)] bg-brand-green/60 sm:block"
          />
          <div className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full border border-brand-green bg-white"
                />
                <span className="mt-6 text-xs font-medium text-brand-green">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-3xl text-brand-green">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-xs text-base text-black/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-sm bg-white px-8 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-3xl text-brand-green">
              Ready to move forward?
            </h3>
            <p className="mt-2 text-base text-black/70">
              Start with a conversation about your property, priorities or
              next decision.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              Start a conversation
            </a>
            <a
              href="#"
              className="rounded-md border border-brand-gold px-6 py-3 text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              Request a valuation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
