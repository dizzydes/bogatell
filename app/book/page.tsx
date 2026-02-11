'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BookPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-8 py-4 md:px-12 lg:px-16">
          <Link href="/" className="font-display text-xl font-bold text-foreground">Bogatell</Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-muted-foreground hover:text-foreground font-body text-sm">Home</Link>
            <Link href="/#sample-report" className="text-muted-foreground hover:text-foreground font-body text-sm">Sample</Link>
          </div>
        </div>
      </nav>

      <section className="bg-muted min-h-screen">
        <div className="container mx-auto px-8 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">Schedule a Free Discovery Call</h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-muted-foreground">
            Book a consultation to discuss how we can help prepare for a successful transaction or funding round. Open to buyers and sellers preparing for tech due diligence on $300k - $20M software investments.
          </p>
        </div>
        <div className="mt-12">
          <div className="calendly-inline-widget" data-url="https://calendly.com/bogatell/valuation-market-consultation" style={{ minWidth: '320px', height: '1100px' }} />
        </div>
      </div>
      </section>
    </div>
  );
}
