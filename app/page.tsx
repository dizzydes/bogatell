import ProcessSection from '@/components/ProcessSection';
import PricingSection from '@/components/PricingSection';
import SampleReportSection from '@/components/SampleReportSection';
import MarketAlertsSection from '@/components/MarketAlertsSection';
import WhatYouGetSection from '@/components/WhatYouGetSection';
import LogoBar from '@/components/LogoBar';
import TechFAQSection from '@/components/TechFAQSection';
import Image from 'next/image';
import ContactQuickAccess from '@/components/clients/ContactQuickAccess';
import ExitIntentPopup from '@/components/ExitIntentPopup';

import MobileNav from '@/components/MobileNav';

export default function HomePage() {

  const navItems = [
    { label: 'What You Get', href: '#what-you-get' },
    { label: 'Checklist', href: '#checklist' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Deal Sourcing', href: '#market-alerts' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Sample', href: '#sample-report' },
    { label: 'Book a Call', href: '/book' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <ExitIntentPopup />
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <a href="#" className="font-display text-xl font-bold text-foreground">Bogatell</a>
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className={`font-body text-sm transition-colors relative ${item.label === 'Book a Call' ? 'rounded-md bg-accent px-4 py-2 font-semibold text-accent-foreground hover:bg-accent/90' : 'text-muted-foreground hover:text-foreground'}`}>
                {item.label}
                {item.label === 'Deal Sourcing' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[2px] bg-[#53D9B5] px-1 py-[1px] text-[8px] font-bold leading-none text-black">
                    NEW
                  </span>
                )}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <a href="/book" className="rounded-md bg-accent px-4 py-2 font-body text-sm font-semibold text-accent-foreground hover:bg-accent/90">Book a Call</a>
            <MobileNav navItems={navItems} />
          </div>
        </div>
      </nav>

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
            <div className="shrink-0 md:order-1">
              <Image src="/assets/hero-profile.png" alt="Expert Team" width={320} height={320} className="h-64 w-64 rounded-lg object-cover grayscale shadow-lg md:h-80 md:w-80" priority />
            </div>
            <div className="flex-1 md:order-2">
              <p className="mb-2 font-body text-accent">Expert Team</p>
              <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">We help you <span className="text-accent">de-risk</span> technology investments</h1>
              <p className="mb-8 max-w-xl font-body text-lg leading-relaxed text-muted-foreground">Technical due diligence for acquirers and investors. <span className="font-bold text-foreground">Tailored to your thesis</span>. We identify the hidden liabilities in software assets so you can plan ahead, negotiate from strength or even walk away.</p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#checklist" className="rounded-md bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Checklist</a>
                <a href="/book" className="rounded-md bg-accent px-6 py-3 font-body font-semibold text-accent-foreground transition-colors hover:bg-accent/90">Book a Call</a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <WhatYouGetSection />
      <ProcessSection />
      <PricingSection />
      <SampleReportSection />
      <MarketAlertsSection />

{/*      <section className="bg-background py-8">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <ContactQuickAccess />
        </div>
      </section>*/}

      <TechFAQSection />
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