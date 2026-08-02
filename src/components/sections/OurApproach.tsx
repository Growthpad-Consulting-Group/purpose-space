import Link from "next/link";

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
          {/* connecting line — horizontal on sm+, vertical on mobile */}
          <div
            aria-hidden
            className="absolute top-1 left-0 hidden h-px w-[calc(66.6667%+1.333rem)] bg-brand-green/60 sm:block"
          />
          <div
            aria-hidden
            className="absolute top-1 bottom-1 left-1 w-px bg-brand-green/60 sm:hidden"
          />
          <div className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-8">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4 sm:flex-col sm:gap-0">
                <span
                  aria-hidden
                  className="mt-1 h-2 w-2 shrink-0 rounded-full border border-brand-green bg-white sm:mt-0"
                />
                <div>
                  <span className="text-xs font-medium text-brand-green sm:mt-6 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl text-brand-green sm:mt-2 sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-base text-black/70 sm:mt-4">
                    {step.description}
                  </p>
                </div>
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
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="#"
              className="rounded-md border border-brand-gold px-6 py-3 text-center text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              Start a conversation
            </Link>
            <Link
              href="#"
              className="rounded-md border border-brand-gold px-6 py-3 text-center text-sm font-medium text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green hover:text-brand-ivory"
            >
              Request a valuation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
