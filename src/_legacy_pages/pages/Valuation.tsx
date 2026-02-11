import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ValuationCalculator from "@/components/ValuationCalculator";
import LogoBar from "@/components/LogoBar";
import TrustBadge from "@/components/TrustBadge";
import ValuationPreview from "@/components/ValuationPreview";
import FAQSection from "@/components/FAQSection";
import logoCiti from "@/assets/logo-citi.png";
import logoFixed from "@/assets/logo-fixed.png";
import logoGoogle from "@/assets/logo-google.png";
import logoIbm from "@/assets/logo-ibm.png";

const Valuation = () => {
  const scrollToCalculator = () => {
    const element = document.getElementById("calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Company logos for trust bar
  const logos = [
    { src: logoGoogle, alt: "Google" },
    { src: logoIbm, alt: "IBM" },
    { src: logoCiti, alt: "Citi" },
    { src: logoFixed, alt: "Fixed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-8 py-6 md:px-12 lg:px-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Logo Bar - Social Proof */}
      <LogoBar logos={logos} />

      {/* Valuation Preview CTA */}
      <ValuationPreview onCtaClick={scrollToCalculator} />

      {/* Trust Badges */}
      <TrustBadge />

      {/* Valuation Calculator Section */}
      <section id="calculator" className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <ValuationCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-8 py-6 md:px-12 lg:px-16">
          <p className="font-body text-sm text-muted-foreground">
            Carrer de Ramon Turró, 109, Sant Martí, 08005 Barcelona, Spain
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Valuation;
