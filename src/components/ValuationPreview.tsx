'use client';

import { Calculator, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ValuationPreviewProps {
  onCtaClick: () => void;
}

const ValuationPreview = ({ onCtaClick }: ValuationPreviewProps) => {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground md:text-3xl">
            What's Your Business Worth?
          </h2>
          <p className="mb-8 font-body text-muted-foreground">
            Get a free, data-driven valuation range in under 60 seconds.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="flex flex-col items-center p-4">
              <Calculator className="h-8 w-8 text-foreground mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">Instant Range</h3>
              <p className="font-body text-sm text-muted-foreground">
                Based on 1000s of closed deals
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <TrendingUp className="h-8 w-8 text-foreground mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">Industry Multiples</h3>
              <p className="font-body text-sm text-muted-foreground">
                Accurate for your vertical
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Users className="h-8 w-8 text-foreground mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">Free Consultation</h3>
              <p className="font-body text-sm text-muted-foreground">
                For valuations over $500K
              </p>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={onCtaClick}
            className="font-semibold"
          >
            Get Your Free Valuation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ValuationPreview;
