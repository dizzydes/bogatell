'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Technical Due Diligence (TDD)?",
    answer: "Technical Due Diligence (Tech DD) is a comprehensive audit of a target company's technology stack, engineering team, and software architecture. Primarily used during Mergers and Acquisitions (M&A) or Venture Capital (VC) fundraising, it assesses the risks, scalability, and quality of the IT assets being acquired. Unlike financial diligence, which looks at past revenue, Tech DD predicts future stability and cost of ownership.",
  },
  {
    question: "Why is Technical Due Diligence important for M&A?",
    answer: "For Private Equity firms and Search Funds, software is often the most valuable - and risky - asset in a deal. A proper Tech DD audit reveals hidden liabilities that financial audits miss - see the checklist below.",
  },
  {
    question: "What is in a Technical Due Diligence Checklist?",
    answer: `A standard M&A technology audit covers five stages:

• Access & Infrastructure: Secure a connection and request data to begin assessment.
• Security & Code Liability: Identify technical deal breakers early in process - code quality, licensing and security.
• Team & Culture: Discover how their dev processes and if there's key man risk.
• Data & Scale: Validate how much weight their tech can bear along with stored data.
• Review: A practical document and discussion of findings, with full detail attached.`,
  },
  {
    question: "How long does a Technical Due Diligence audit take?",
    answer: "We move at deal speed. For a standard buy-side audit, we deliver our results within a week of receiving access.",
  },
  {
    question: "Do you need access to the target company's production servers?",
    answer: "We prefer it for the most accurate results, but it is not strictly required. We can perform a deep analysis using Read-Only access to their cloud environment (AWS/GCP/Azure) and code repositories (GitHub/GitLab). We do not need write access and never disrupt live operations.",
  },
  {
    question: "What exactly do you analyze?",
    answer: (<>See our <a href="#checklist" className="text-primary underline hover:text-primary/80">process section</a> above for the full breakdown of our technical assessment methodology. You can also view a <a href="#sample-report" className="text-primary underline hover:text-primary/80">Sample Report</a> to see the depth of analysis provided.</>),
  },
  {
    question: "Will your findings kill the deal?",
    answer: (<>Rarely. Most findings are not deal-breakers but leverage you can use to negotiate a lower purchase price. We distinguish between Critical Risks (e.g. active data breaches, license violations) that stop deals, and Technical Debt (e.g. sloppy code) that simply requires a post-close remediation budget. See exactly how we present these risks in our <a href="#sample-report" className="text-primary underline hover:text-primary/80">Sample Report</a>.</>),
  },
  {
    question: "Do you provide a fix cost estimate?",
    answer: "Yes. We don't just list problems; we price them. Your report will include an estimated Remediation Budget required to fix issues found (e.g. security gaps, upgrade infrastructure, improve code).",
  },
  {
    question: "The target has no documentation. Can you still audit them?",
    answer: "Yes. This is actually a common Red Flag we assess. We provide them a questionnaire and use automated tools to map their cloud architecture and code structure ourselves. This process in itself helps bridge the documentation gap.",
  },
  {
    question: "I'm not technical. Will I understand the report?",
    answer: (<>Absolutely. Our deliverables are written for Investment Committees. You get a clear Traffic Light dashboard (Red/Amber/Green) summarizing risks in plain English, with a separate technical appendix for your engineering team to integrate and fix. Check out the <a href="#sample-report" className="text-primary underline hover:text-primary/80">Sample Report</a> to see this in practice.</>),
  },
  {
    question: "Why can't I just ask their CTO these questions?",
    answer: "The CTO is selling you the vision; we verify the reality. Self-reported technical questionnaires often miss 40% of the actual risks because internal teams become blind to their own legacy issues or technical debt. Given the amounts of money at stake, standardised testing gives a much fuller picture and helps prepare for integration.",
  },
];

const TechFAQSection = () => {
  return (
    <section id="faq" className="border-b border-border bg-background py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mb-8 max-w-2xl font-body text-muted-foreground">
          Common questions about our Technical Due Diligence process for M&A transactions and VC fundraising.
        </p>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
href="/book"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a Call
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (window.$crisp) window.$crisp.push(['do', 'chat:open']);
            }}
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Ask a Question
          </a>
        </div>
      </div>
    </section>
  );
};

export default TechFAQSection;
