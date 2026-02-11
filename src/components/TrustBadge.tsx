import { Shield, Lock, DollarSign } from "lucide-react";

const TrustBadge = () => {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
            <DollarSign className="h-6 w-6 text-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">No Fees Unless Close</h3>
              <p className="font-body text-sm text-muted-foreground">
                Zero upfront costs. We only succeed when you do.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
            <Lock className="h-6 w-6 text-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">100% Confidential</h3>
              <p className="font-body text-sm text-muted-foreground">
                Your business details never shared without consent.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
            <Shield className="h-6 w-6 text-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">Private Network</h3>
              <p className="font-body text-sm text-muted-foreground">
                Access to vetted acquirers and aggregators in Europe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadge;
