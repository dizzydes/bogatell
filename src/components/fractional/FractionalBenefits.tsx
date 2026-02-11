const benefits = [
  "Move beyond 'it works on my machine' to 'it scales for thousands'",
  "Eliminate security vulnerabilities common in AI-generated code",
  "Reduce churn by fixing hidden bugs and performance issues",
  "Stop wasting budget on the wrong tools or bad hires",
  "Gain credibility with investors by having a technical heavyweight on your side",
];

const achievements = [
  "Founder: Built a VC-funded, category-leading marketplace in the UK (Fixed)",
  "Transaction: Successfully exited software assets",
  "Technical: Former Top-Performing Solution Engineer at Google & Looker",
  "Industry: Various eng and finance roles at Firebolt, IBM, Stackdriver, Citi",
  "Education: Computer Science, Technical University Dublin (TUD). Finance, D'Amore-McKim School of Business (NEU)",
];

const FractionalBenefits = () => {
  return (
    <section id="benefits" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-8 font-display text-3xl font-bold text-foreground md:text-4xl">
              Why You Need a Fractional CTO
            </h2>
            <p className="mb-6 font-body text-lg text-foreground">
              Vibe coding got you to $5k MRR. But to get to $50k, you need engineering discipline.
            </p>
            <p className="mb-8 font-body text-muted-foreground">
              I partner with non-technical founders to bridge the gap between "MVP" and "Enterprise Grade". I don't just advise; I help you build a technical asset that has real equity value.
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
              Background
            </h3>
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
                View Full Resume →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FractionalBenefits;
