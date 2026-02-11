import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is the valuation calculator?",
    answer: "The calculator uses multiples from thousands of verified closed deals in the lower middle market. It provides an indicative range based on your business category and annual profit. For a more precise valuation, we offer free consultations for businesses valued over $500K.",
  },
  {
    question: "What are your fees?",
    answer: "We operate on a success-fee model only. There are no upfront costs, retainers, or monthly fees. You only pay if we successfully close a transaction.",
  },
  {
    question: "How do you ensure confidentiality?",
    answer: "Your business details are never shared without your explicit consent. We work with a vetted network of acquirers under strict NDAs, and only share information on a need-to-know basis during the process.",
  },
  {
    question: "What types of businesses do you work with?",
    answer: "We specialize in digital assets including SaaS, e-commerce, content sites, mobile apps, and online marketplaces. Our focus is on profitable businesses in the micro and lower middle market (€1M-€10M enterprise value).",
  },
  {
    question: "How long does the sale process typically take?",
    answer: "Timelines vary based on complexity, but a typical transaction takes 3-6 months from initial engagement to close. Our off-market approach often leads to faster, more discreet transactions than public listings.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <h2 className="mb-8 font-display text-2xl font-bold text-foreground md:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="font-display font-semibold text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
