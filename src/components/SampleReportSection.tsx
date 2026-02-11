'use client';

import { ArrowRight, Check, Phone, Smartphone, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const SampleReportSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [alertSubmitted, setAlertSubmitted] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');

  useEffect(() => {
    // Capture the full URL including all parameters
    if (typeof window !== 'undefined') {
      setSourceUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    // Check if URL has email=submitted parameter
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      // Handle both ?email=submitted and /#sample-report?email=submitted
      // The parameter might be on the search part or part of the hash depending on how the redirect happens
      
      const isSubmitted = params.get('email') === 'submitted' || window.location.hash.includes('email=submitted');
      
      if (isSubmitted) {
        setEmailSubmitted(true);
        // Ensure we are scrolled to the section
        const section = document.getElementById('sample-report');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Check for alert submission
      const isAlertSubmitted = params.get('alert') === 'submitted' || window.location.hash.includes('alert=submitted');
      if (isAlertSubmitted) {
        setAlertSubmitted(true);
        const section = document.getElementById('sample-report');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  return (
    <section id="sample-report" className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground md:text-4xl">
          De-Risk Investments in Days
        </h2>
        
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
          {/* Left Column: Consultation */}
          <div className="flex flex-col rounded-lg border border-border bg-card p-8 shadow-sm">
            <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
              Talk to Us
            </h3>
            <p className="mb-6 font-body text-muted-foreground">
              Speak directly to frame your due diligence needs and strategy. You get:
            </p>
            
            <ul className="mb-8 space-y-3">
              {[
                "High-level risk assessment",
                "Review of initial data room materials",
                "Guidance on key technical questions to ask",
                "Scope and timeline planning for the audit",
                "No commitment required"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <span className="font-body text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3">
              <button 
                onClick={() => window.$crisp && window.$crisp.push(['do', 'chat:open'])}
                className="inline-flex h-12 w-full items-center justify-center rounded-md border-2 border-input bg-background px-6 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Text Us
                <Smartphone className="ml-2 h-4 w-4" />
              </button>
              <a 
                href="/book" 
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-6 font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Book a Free Call
                <Phone className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Sample Report */}
          <div className="flex flex-col rounded-lg border border-border bg-card p-8 shadow-sm">
            <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
              View a Sample Report
            </h3>
            <p className="mb-6 font-body text-muted-foreground">
              See a sanitized example of our comprehensive technical due diligence deliverable. You get:
            </p>

            <ul className="mb-8 space-y-3">
              {[
                "Executive briefs based around business goals",
                "Remediation budget with estimated fix costs",
                "Code quality and security vulnerability scan",
                "Infrastructure and scalability analysis",
                "Team velocity and process review"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="font-body text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {emailSubmitted ? (
                <div className="rounded-md border border-green-200 bg-green-50 p-6 text-center text-green-800">
                  <div className="mb-2 flex justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="mb-1 font-semibold">Email Saved!</h4>
                  <p className="text-sm">
                    Keep an eye on your inbox for the sample report. It will arrive in the coming hours.
                  </p>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/xnjjjqrv"
                  method="POST"
                  className="flex flex-col gap-3"
                >
                  <input
                    type="hidden" 
                    name="_next" 
                    value="https://bogatell.io/?email=submitted#sample-report" 
                  />
                  <input type="hidden" name="source_url" value={sourceUrl} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Send Me Report
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SampleReportSection;
