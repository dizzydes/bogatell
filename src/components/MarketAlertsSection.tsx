'use client';

import { ArrowRight, Check, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { FancyMultiSelect } from "@/components/ui/fancy-multi-select";

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value}`;
};

// Use a cubic scale to give more space to lower numbers
const POWER_SCALE = 3;

const toSliderValue = (val: number, max: number) => {
  if (val <= 0) return 0;
  return Math.pow(val / max, 1 / POWER_SCALE) * 100;
};

const fromSliderValue = (sliderVal: number, max: number) => {
  if (sliderVal <= 0) return 0;
  const val = max * Math.pow(sliderVal / 100, POWER_SCALE);
  
  // Rounding logic for cleaner numbers
  if (val < 1000000) {
    return Math.round(val / 10000) * 10000; // Round to nearest 10k under 1M
  }
  return Math.round(val / 100000) * 100000; // Round to nearest 100k over 1M
};

const MarketAlertsSection = () => {
  const [alertSubmitted, setAlertSubmitted] = useState(false);
  const [arrRange, setArrRange] = useState([0, 50000000]); 
  const [ebitdaRange, setEbitdaRange] = useState([0, 20000000]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [sourceUrl, setSourceUrl] = useState('');

  useEffect(() => {
    // Capture the full URL including all parameters
    if (typeof window !== 'undefined') {
      setSourceUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const isAlertSubmitted = params.get('alerts') === 'submitted' || window.location.hash.includes('alerts=submitted');
      
      if (isAlertSubmitted) {
        setAlertSubmitted(true);
        const section = document.getElementById('market-alerts');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, []);

  return (
    <section id="market-alerts" className="bg-background py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Deal Sourcing
                </h2>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
              <p className="mb-8 text-lg text-muted-foreground">
                Don't waste time scrolling marketplaces. Tell us your buy box, and we'll notify you when deals match your criteria.
              </p>

              <ul className="space-y-4">
                {[
                  "Custom alerts on new software listings",
                  "Curated off-market deal flow not listed publicly",
                  "Filter by your financial criteria and attributes",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-6xl font-bold font-display" style={{ color: '#53D9B5' }}>
                    74
                  </div>
                  <div className="text-sm font-body text-muted-foreground uppercase tracking-wider mt-2">
                    listings this week
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold font-display" style={{ color: '#53D9B5' }}>
                    12
                  </div>
                  <div className="text-sm font-body text-muted-foreground uppercase tracking-wider mt-2">
                    marketplaces monitored
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
              {alertSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-foreground">Alerts Active!</h4>
                  <p className="text-muted-foreground">
                    We'll be in touch as deals match your criteria.
                  </p>
                </div>
              ) : (
                <form
                  action="https://formspree.io/f/xnjjdkgn"
                  method="POST"
                  className="flex flex-col gap-4"
                >
                  <input
                    type="hidden" 
                    name="_next" 
                    value="https://bogatell.io/?alerts=submitted#market-alerts" 
                  />
                  <input type="hidden" name="source_url" value={sourceUrl} />
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@company.com"
                        required
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-foreground">
                          ARR Range: {formatCurrency(arrRange[0])} - {arrRange[1] >= 50000000 ? "$50M+" : formatCurrency(arrRange[1])}
                        </label>
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={0.1}
                          value={[toSliderValue(arrRange[0], 50000000), toSliderValue(arrRange[1], 50000000)]}
                          onValueChange={(vals) => setArrRange([fromSliderValue(vals[0], 50000000), fromSliderValue(vals[1], 50000000)])}
                          className="py-2"
                        />
                        <input type="hidden" name="arr_min" value={arrRange[0]} />
                        <input type="hidden" name="arr_max" value={arrRange[1]} />
                      </div>
                      
                      <div>
                        <label className="mb-3 block text-sm font-medium text-foreground">
                          EBITDA Range: {formatCurrency(ebitdaRange[0])} - {ebitdaRange[1] >= 20000000 ? "$20M+" : formatCurrency(ebitdaRange[1])}
                        </label>
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={0.1}
                          value={[toSliderValue(ebitdaRange[0], 20000000), toSliderValue(ebitdaRange[1], 20000000)]}
                          onValueChange={(vals) => setEbitdaRange([fromSliderValue(vals[0], 20000000), fromSliderValue(vals[1], 20000000)])}
                          className="py-2"
                        />
                        <input type="hidden" name="ebitda_min" value={ebitdaRange[0]} />
                        <input type="hidden" name="ebitda_max" value={ebitdaRange[1]} />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Keywords (Match Any)</label>
                      <FancyMultiSelect
                        placeholder="Type and press Enter (e.g. SaaS, Fintech)"
                        onChange={setKeywords}
                      />
                      <input type="hidden" name="keywords" value={keywords.join(", ")} />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="mt-2 inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Dealflow
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketAlertsSection;
