import FractionalHero from '@/components/fractional/FractionalHero';
import FractionalPricing from '@/components/fractional/FractionalPricing';
import FractionalBenefits from '@/components/fractional/FractionalBenefits';
import FractionalFAQ from '@/components/fractional/FractionalFAQ';
import LogoBar from '@/components/LogoBar';
import ContactQuickAccess from '@/components/clients/ContactQuickAccess';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import Link from 'next/link';

export default function FractionalPage() {
  const navItems = [
    { label: 'Why You Need It', href: '#benefits' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Book a Call', href: '/book' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <ExitIntentPopup />
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <Link href="/" className="font-display text-xl font-bold text-foreground">Bogatell</Link>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className={`font-body text-sm transition-colors ${
                  item.label === 'Book a Call' 
                    ? 'rounded-md bg-accent px-4 py-2 font-semibold text-accent-foreground hover:bg-accent/90' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <Link href="/book" className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90 md:hidden">
            Book a Call
          </Link>
        </div>
      </nav>

      <FractionalHero />
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
      <FractionalBenefits />
      <FractionalPricing />

      <section className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <ContactQuickAccess />
        </div>
      </section>

      <FractionalFAQ />
      <footer className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="border-t border-border pt-8">
            <p className="font-body text-sm text-muted-foreground">Carrer de Ramon Turró, 109, Sant Martí, 08005 Barcelona, Spain</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
