'use client';

import { useState, useEffect } from "react";
import { Check, CheckCircle } from "lucide-react";

// COMMENTED OUT PRICING TIERS
// const tiers = [
//   {
//     name: "Founder Package",
//     tagline: "Due Diligence Preparation Guide",
//     price: "$1,000",
//     originalPrice: "$2,000",
//     duration: "1 day",
//     features: [
//       "Technical Due Diligence preparation framework and checklist",
//       "Overview of tools and methodologies buyers use",
//       "Documentation and presentation guidance",
//       "Self-assessment templates",
//       "Guidance on valuation and potential buyers",
//     ],
//     note: "Best for: Founders looking to sell or raise funding",
//     cta: "Book a Discovery Call",
//     featured: false,
//     disabled: false,
//     whatsappLink: false,
//   },
//   {
//     name: "Buyer Package",
//     tagline: "Complete Due Diligence Report",
//     price: "$8,000",
//     originalPrice: "$12,000",
//     duration: "1 week",
//     features: [
//       "Rapid infrastructure visualization and asset verification",
//       "Red flag liability sweep with IP and license audit",
//       "Delivery engine and culture audit with team interviews",
//       "Detailed remediation budget with cost-to-fix estimates",
//       "Traffic light executive summary with key findings",
//     ],
//     note: "Best for: Serious buyers entering Due Diligence phase",
//     cta: "Book a Discovery Call",
//     featured: true,
//     disabled: false,
//     whatsappLink: false,
//   },
//   {
//     name: "Post-Close Package",
//     tagline: "Fractional CTO Advisory",
//     price: "From $15,000",
//     originalPrice: null,
//     duration: "Varies",
//     features: [
//       "Post-close integration roadmap and technical planning",
//       "Migration and system consolidation support",
//       "Technical debt remediation guidance",
//       "Ongoing advisory via monthly strategic calls",
//       "Priority access for technical questions",
//     ],
//     note: "Waitlist offering - limited availability",
//     cta: "Enquire",
//     featured: false,
//     disabled: true,
//     whatsappLink: true,
//   },
// ];

const PricingSection = () => {
  const [dealSize, setDealSize] = useState(1000000);
  const [pricingSubmitted, setPricingSubmitted] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');

  useEffect(() => {
    // Capture the full URL including all parameters
    if (typeof window !== 'undefined') {
      setSourceUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isSubmitted = params.get('pricing') === 'submitted' || window.location.hash.includes('pricing=submitted');
      
      if (isSubmitted) {
        setPricingSubmitted(true);
        const section = document.getElementById('pricing');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  // Cubic scale for deal size slider
  const sliderToDealSize = (value: number) => {
    const min = 200000;
    const max = 30000000;
    const minCube = Math.cbrt(min);
    const maxCube = Math.cbrt(max);
    const scaled = minCube + (value / 100) * (maxCube - minCube);
    return Math.round(Math.pow(scaled, 3));
  };

  const dealSizeToSlider = (dealSize: number) => {
    const min = 200000;
    const max = 30000000;
    const minCube = Math.cbrt(min);
    const maxCube = Math.cbrt(max);
    const cube = Math.cbrt(dealSize);
    return ((cube - minCube) / (maxCube - minCube)) * 100;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = parseFloat(e.target.value);
    setDealSize(sliderToDealSize(sliderValue));
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}k`;
  };

  return (
    <section id="pricing" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">Pricing</h2>
        <p className="mb-12 max-w-2xl font-body text-muted-foreground">
          Get a custom quote within 24 hours. Typical project turnaround is 1 week.
        </p>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
          {/* Left Column: What's Included */}
          <div className="flex flex-col rounded-lg border border-border bg-card p-8 shadow-sm">
            <h3 className="mb-6 font-display text-2xl font-bold text-foreground">
              What's Included
            </h3>
            
            <ul className="space-y-4">
              {[
                "Rapid infrastructure visualization and asset verification",
                "Red flag liability sweep with IP and license audit",
                "Delivery engine and culture audit with team interviews",
                "Detailed remediation budget with cost-to-fix estimates",
                "Traffic light executive summary with key findings",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <span className="font-body text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg bg-muted p-4">
              <p className="font-body text-sm text-muted-foreground">
                <strong className="text-foreground">Delivery:</strong> Typical turnaround 1 week
              </p>
            </div>
          </div>

          {/* Right Column: Request Quote Form */}
          <div className="flex flex-col rounded-lg border border-accent bg-card p-8 shadow-lg">
            <h3 className="mb-6 font-display text-2xl font-bold text-foreground">
              Request a Quote
            </h3>
            
            {pricingSubmitted ? (
              <div className="rounded-md border border-green-200 bg-green-50 p-6 text-center text-green-800">
                <div className="mb-2 flex justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="mb-1 font-semibold">Email Saved!</h4>
                <p className="text-sm">
                  Keep an eye on your inbox for our pricing quote. It will arrive in the coming day.
                </p>
              </div>
            ) : (
              <form
                action="https://formspree.io/f/xaqoognz"
                method="POST"
                className="flex flex-col gap-6"
              >
                <input type="hidden" name="source_url" value={sourceUrl} />
                <div>
                  <label htmlFor="email" className="mb-2 block font-body text-sm font-medium text-foreground">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@company.com"
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="deal-size" className="mb-2 block font-body text-sm font-medium text-foreground">
                    Acquisition Size (Approx)
                  </label>
                  <div className="mb-3 text-center">
                    <span className="font-display text-2xl font-bold text-accent">{formatCurrency(dealSize)}</span>
                  </div>
                  <input
                    type="range"
                    id="deal-size"
                    min="0"
                    max="100"
                    step="1"
                    value={dealSizeToSlider(dealSize)}
                    onChange={handleSliderChange}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-accent"
                  />
                  <input type="hidden" name="acquisition_size" value={formatCurrency(dealSize)} />
                  <div className="mt-2 flex justify-between font-body text-xs text-muted-foreground">
                    <span>$200k</span>
                    <span>$30M</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="tech-details" className="mb-2 block font-body text-sm font-medium text-foreground">
                    Company & Technology Details
                  </label>
                  <textarea
                    id="tech-details"
                    name="technology_details"
                    rows={5}
                    required
                    placeholder="e.g. SaaS company with AWS infrastructure, React frontend, Python backend, PostgreSQL database, 3-person dev team..."
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 font-body font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Quote
                </button>
                <p className="mt-1.5 text-center font-body text-sm text-muted-foreground">
                  Custom quote within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#market-alerts"
            className="rounded-md border border-input bg-background px-6 py-3 font-body font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Get More Dealflow
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
