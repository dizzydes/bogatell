'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "I built my app with Lovable/Cursor. Why do I need a CTO?",
    answer: "AI tools are amazing for speed, but they often produce code that is hard to maintain, insecure, or difficult to scale. As you grow, 'vibe coding' hits a ceiling where features break, data leaks, or performance tanks. A Fractional CTO ensures your foundation is solid so you can keep building fast without collapsing.",
  },
  {
    question: "Why can't I just hire a freelance developer?",
    answer: "Freelancers execute tasks; a CTO owns the outcome. A freelancer will build what you ask for, even if it's the wrong technical decision. I help you decide *what* to build, *how* to build it, and *who* should build it to maximize your company's value.",
  },
  {
    question: "What is 'Technical Debt' and why should I care?",
    answer: "Technical debt is the implied cost of future reworking required when choosing an easy solution now instead of a better approach that would take longer. In AI-generated apps, this debt accumulates incredibly fast. If not paid down, it eventually halts all new feature development.",
  },
  {
    question: "Do you write code?",
    answer: "Yes, in the 'Scale-Up Engine' package, I can be hands-on. However, my highest value is in architecture, code review, and strategy. I often write the critical 'skeleton' code and let junior devs or AI agents fill in the rest under my supervision.",
  },
  {
    question: "How does the subscription work?",
    answer: "It's a simple monthly retainer with no long-term lock-in. You can pause or cancel anytime. We start with a discovery call to see if we're a good fit, then move to a month-to-month engagement.",
  },
  {
    question: "I'm looking to sell my SaaS eventually. Does this help?",
    answer: "Absolutely. This is my core expertise. Buyers pay significantly less (or walk away) when they see messy, undocumented, or insecure code. I ensure your asset is 'Due Diligence Ready' from day one, maximizing your exit multiple.",
  },
];

const FractionalFAQ = () => {
  return (
    <section id="faq" className="border-b border-border bg-background py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mb-8 max-w-2xl font-body text-muted-foreground">
          Common questions from non-technical founders scaling AI-native products.
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
          <button
            onClick={(e) => {
              e.preventDefault();
              if (window.$crisp) window.$crisp.push(['do', 'chat:open']);
            }}
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Ask a Question
          </button>
        </div>
      </div>
    </section>
  );
};

export default FractionalFAQ;
