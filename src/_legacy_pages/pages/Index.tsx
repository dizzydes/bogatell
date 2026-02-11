import { useEffect } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import WhatYouGetSection from "@/components/WhatYouGetSection";
import LogoBar from "@/components/LogoBar";
import TechFAQSection from "@/components/TechFAQSection";
import Link from "next/link";

const navItems = [
  { label: "What You Get", href: "#what-you-get" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Insights", href: "/insights" },
  { label: "Book a Call", href: "/book" },
];

const Index = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <a href="#" className="font-display text-xl font-bold text-foreground">
            Bogatell
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-body text-sm transition-colors ${
                  item.label === "Book a Call"
                    ? "rounded-md bg-accent px-4 py-2 font-semibold text-accent-foreground hover:bg-accent/90"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          {/* Mobile menu button */}
          <a
href="/book"
            className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90 md:hidden"
          >
            Book a Call
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
            {/* Photo */}
            <div className="shrink-0 md:order-1">
                <img
                src="/assets/headshot.png"
                alt="Des Conlon"
                className="h-64 w-64 rounded-lg object-cover shadow-lg md:h-80 md:w-80"
              />
            </div>

            {/* Content */}
            <div className="flex-1 md:order-2">
              <p className="mb-2 font-body text-accent">Hi, I'm Des</p>
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                I help you <span className="text-accent">de-risk</span> technology investments
              </h1>
              <p className="mb-8 max-w-xl font-body text-lg leading-relaxed text-muted-foreground">
                Technical due diligence for acquirers and investors. I identify the hidden liabilities in software
                assets so you can plan ahead, negotiate from strength or even walk away.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#process"
                  className="rounded-md bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Process
                </a>
                <Link
                  href="/book"
                  className="rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <LogoBar
        logos={[
          { src: "/assets/logo-citi.png", alt: "Citi" },
          { src: "/assets/logo-fixed.png", alt: "Fixed" },
          { src: "/assets/logo-google.png", alt: "Google" },
          { src: "/assets/logo-ibm.png", alt: "IBM" },
          { src: "/assets/logo-stackdriver.png", alt: "Stackdriver" },
          { src: "/assets/logo-magnetic.jpeg", alt: "Magnetic" },
          { src: "/assets/logo-firebolt.png", alt: "Firebolt" },
        ]}
      />

      {/* What You Get Section */}
      <WhatYouGetSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Contact Quick Access */}
      <section className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => {
                // navigator.clipboard.writeText("contact@bogatell.io");
                // toast.success("Email copied to clipboard");
              }}
              className="flex items-center gap-3 font-body text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              {/*<span>contact@bogatell.io</span>*/}
            </button>
            <a
              href="https://www.linkedin.com/in/technical-due-diligence/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-body text-muted-foreground transition-colors hover:text-foreground"
            >
              <img src="/assets/linkedin-icon.webp" alt="LinkedIn" className="h-5 w-5 grayscale" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section id="book-call" className="border-t border-border bg-muted">
        <div className="container mx-auto px-8 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
              Schedule a Free Discovery Call
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-muted-foreground">
              Book a consultation to discuss how we can help prepare for a successful transaction or funding round.
            </p>
          </div>

          <div className="mt-12">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/bogatell/valuation-market-consultation"
              style={{ minWidth: "320px", height: "1100px" }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <TechFAQSection />
      <footer className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="border-t border-border pt-8">
            <p className="font-body text-sm text-muted-foreground">
              Carrer de Ramon Turró, 109, Sant Martí, 08005 Barcelona, Spain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
