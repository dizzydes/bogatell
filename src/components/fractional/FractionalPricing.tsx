'use client';

import { Clock, Check } from "lucide-react";

const tiers = [
  {
    name: "The Reality Check",
    tagline: "One-Time Technical Audit",
    price: "$2,500",
    originalPrice: null,
    duration: "1 week",
    features: [
      "Deep scan of your AI-generated codebase",
      "Security vulnerability assessment",
      "Scalability & architecture review",
      "Prioritized 'Technical Debt' remediation plan",
      "Executive summary for investors/roadmap",
    ],
    note: "Best for: Founders worrying if their MVP will break at scale",
    cta: "Book this Audit",
    featured: false,
    disabled: false,
  },
  {
    name: "Growth Partner",
    tagline: "Monthly Advisory Retainer",
    price: "$3,000",
    period: "/mo",
    originalPrice: null,
    duration: "Ongoing",
    features: [
      "Weekly strategic sync calls",
      "Ongoing code reviews & architectural guidance",
      "Hiring support (interviewing devs/freelancers)",
      "Vendor & tool selection (saving you money)",
      "Direct access via Slack/WhatsApp",
    ],
    note: "Best for: Teams scaling $5k-$20k MRR needing guidance",
    cta: "Start Advisory",
    featured: true,
    disabled: false,
  },
  {
    name: "Scale-Up Engine",
    tagline: "Hands-On Leadership",
    price: "$6,000",
    period: "/mo",
    originalPrice: null,
    duration: "Ongoing",
    features: [
      "Hands-on technical leadership & ownership",
      "Managing your external dev team/agencies",
      "Setting up CI/CD & professional workflows",
      "Database optimization & cloud infrastructure",
      "Preparing the asset for future exit",
    ],
    note: "Best for: Rapidly scaling startups needing a tech owner",
    cta: "Hire Fractional CTO",
    featured: false,
    disabled: false,
  },
];

const FractionalPricing = () => {
  return (
    <section id="pricing" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">Standardized Packages</h2>
        <p className="mb-8 max-w-2xl font-body text-muted-foreground">
          Transparent pricing for founders ready to professionalize their tech stack.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-lg border p-8 transition-all ${
                tier.featured ? "border-accent bg-card shadow-lg" : "border-border bg-card"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-6 rounded-full bg-accent px-4 py-1 font-body text-sm font-medium text-accent-foreground">
                  Most Popular
                </div>
              )}

              <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
              <p className="mt-1 font-body text-sm italic text-muted-foreground">{tier.tagline}</p>

              <div className="mt-6 flex items-center gap-2 font-body text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{tier.duration}</span>
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <p className="font-display text-3xl font-bold text-foreground">{tier.price}</p>
                {tier.period && <span className="font-body text-muted-foreground">{tier.period}</span>}
              </div>

              <ul className="mt-6 space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-foreground">
                    <Check className="mt-1.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-body text-sm italic text-muted-foreground">{tier.note}</p>

              <div className="mt-auto pt-6">
                <a
                  href="/book"
                  className={`block w-full rounded-md px-4 py-3 text-center font-body font-semibold transition-colors ${
                    tier.disabled
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : tier.featured
                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FractionalPricing;
