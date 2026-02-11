const benefits = [
  "A clear picture of what you're actually buying before you commit",
  "Quantified technical debt with remediation cost estimates",
  "Leverage to renegotiate the deal price based on actual findings",
  "Confidence that the IP is clean, transferable, and defensible",
  "Evidence of scalability to support your growth thesis",
];

const achievements = [
  "Founded and exited VC-funded category-leading marketplace in the UK (Fixed)",
  "Successfully completed software asset transactions as both buyer and seller",
  "Top-performing solution engineering at Google, Looker & enterprise SaaS companies",
  "Deep engineering and finance experience across Firebolt, IBM, Stackdriver, Citi",
  "Combined expertise in Computer Science (TUD) and Finance (NEU D'Amore-McKim)",
];

const WhatYouGetSection = () => {
  return (
    <section id="what-you-get" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground md:text-4xl">
              What You Get
            </h2>
            <p className="mb-6 font-body text-lg text-foreground">
              We partner with acquirers, investors, and deal teams to de-risk technology acquisitions before capital is deployed.
            </p>
            <p className="mb-8 font-body text-muted-foreground">
              By identifying hidden liabilities and quantifying technical debt, we provide actionable intelligence that translates directly into:
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 font-body text-foreground">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-[#F5F5F5] p-6 shadow-sm">
            <h3 className="mb-6 font-display text-xl font-bold text-foreground">
              SaaS Lead - Des Conlon
            </h3>
            <img 
              src="/assets/headshot_old.png" 
              alt="Founder" 
              className="float-right ml-4 mb-4 h-48 w-48 rounded-lg object-cover shadow-sm" 
            />
            <ul className="space-y-4">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 font-body text-foreground">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {achievement}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <a 
                href="https://drive.google.com/file/d/1Zd2e50VgexcVviXH0XRiqh-pPee6x7X4/view?usp=drive_link" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline"
              >
                Resume →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="#checklist"
            className="rounded-md bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Process
          </a>
<a
            href="/book"
            className="rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhatYouGetSection;
