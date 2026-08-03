const steps = [
  {
    number: "01",
    title: "Review",
    description: "We review the property details and photographs.",
  },
  {
    number: "02",
    title: "Confirm",
    description: "An advisor contacts you to verify the information.",
  },
  {
    number: "03",
    title: "Recommend",
    description:
      "We outline the right sale, letting or management approach.",
  },
];

export function ListPropertyProcess() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-fluid grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
            What happens next
          </p>
          <h2 className="mt-6 font-heading text-5xl leading-[1.05] text-brand-green sm:text-6xl">
            A considered path
            <br />
            from submission to
            <br />
            market.
          </h2>
          <p className="mt-6 max-w-lg text-base text-brand-ink">
            We review the information, confirm the property with you and
            recommend the most suitable next step.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-brand-gold pt-4">
              <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
                {step.number}
              </p>
              <h3 className="mt-2 font-heading text-3xl text-brand-green">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-brand-ink">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
