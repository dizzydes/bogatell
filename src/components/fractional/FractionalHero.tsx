'use client';

import { Phone, Smartphone } from "lucide-react";
import Image from 'next/image';

const FractionalHero = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <div className="shrink-0 md:order-1">
            <Image 
              src="/assets/headshot.png" 
              alt="Des Conlon" 
              width={320} 
              height={320} 
              className="h-64 w-64 rounded-lg object-cover shadow-lg md:h-80 md:w-80" 
              priority 
            />
          </div>
          <div className="flex-1 md:order-2">
            <p className="mb-2 font-body text-accent">For AI-Native Founders</p>
            <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Turn "Vibe Code" into <span className="text-accent">Enterprise Scale</span>
            </h1>
            <p className="mb-8 max-w-xl font-body text-lg leading-relaxed text-muted-foreground">
              You built your MVP with Lovable or Cursor and hit $5k+ MRR. Now you need a Fractional CTO to stabilize your stack, secure your data, and help you scale without hiring a full-time executive.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="/book" 
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Book a Discovery Call
                <Phone className="ml-2 h-4 w-4" />
              </a>
              <button 
                onClick={() => window.$crisp && window.$crisp.push(['do', 'chat:open'])}
                className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Text Us
                <Smartphone className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FractionalHero;
