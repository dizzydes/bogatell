'use client';

import { useState, useEffect } from "react";
import { Flame, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const valuationData = [
  { vertical: "E-Commerce", avgMultiple: 1.7, topMultiple: 2.8 },
  { vertical: "Amazon FBA", avgMultiple: 2.0, topMultiple: 3.6 },
  { vertical: "Mobile App", avgMultiple: 3.6, topMultiple: 5.4 },
  { vertical: "Content", avgMultiple: 2.5, topMultiple: 4.2 },
  { vertical: "Amazon KDP", avgMultiple: 1.6, topMultiple: 2.0 },
  { vertical: "SaaS", avgMultiple: 2.4, topMultiple: 3.8 },
  { vertical: "Service", avgMultiple: 1.0, topMultiple: 1.6 },
  { vertical: "YouTube", avgMultiple: 2.3, topMultiple: 3.7 },
];

const industryData = [
  { category: "AI & Data Intelligence", count: 17 },
  { category: "Enterprise Operations", count: 16 },
  { category: "Marketing & AdTech", count: 8 },
  { category: "Web Development & Services", count: 8 },
  { category: "Media, Content & Entertainment", count: 8 },
  { category: "Cloud & Infrastructure", count: 6 },
  { category: "E-Commerce & Retail", count: 6 },
  { category: "FinTech & Accounting", count: 5 },
  { category: "Robotics & Industrial", count: 5 },
  { category: "Hardware & Semiconductors", count: 5 },
  { category: "Health & MedTech", count: 4 },
  { category: "Mobile Ecosystem", count: 4 },
  { category: "Security & Risk Management", count: 4 },
  { category: "Consumer & Lifestyle", count: 3 },
  { category: "HR & Workforce", count: 3 },
  { category: "Blockchain", count: 2 },
  { category: "Education & EdTech", count: 2 },
  { category: "AR / VR", count: 2 },
  { category: "Location & Mapping", count: 2 },
  { category: "Transportation", count: 1 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
};

interface ValuationCalculatorProps {
  showTitle?: boolean;
}

const ValuationCalculator = ({ showTitle = true }: ValuationCalculatorProps) => {
  const [category, setCategory] = useState<string>("");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [ebitda, setEbitda] = useState<string>("");
  const [result, setResult] = useState<{
    lowValue: number;
    avgValue: number;
    highValue: number;
  } | null>(null);

  const hotThemes = selectedThemes.filter((theme) => {
    const themeData = industryData.find((t) => t.category === theme);
    return themeData && themeData.count > 6;
  });

  const handleThemeToggle = (theme: string) => {
    setSelectedThemes((prev) => (prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]));
  };

  const handleCalculate = async () => {
    if (!category || !ebitda) return;

    const categoryData = valuationData.find((v) => v.vertical === category);
    if (!categoryData) return;

    const ebitdaValue = parseFloat(ebitda.replace(/,/g, ""));
    if (isNaN(ebitdaValue)) return;

    // Calculate variance based on distance from avg to top (representing 10th percentile spread)
    const variance = categoryData.topMultiple - categoryData.avgMultiple;
    const lowMultiple = Math.max(0.5, categoryData.avgMultiple - variance);

    const lowValue = ebitdaValue * lowMultiple;
    const highValue = ebitdaValue * categoryData.topMultiple;

    // Save entry to database
    await supabase.from("valuation_entries").insert({
      business_category: category,
      industry_themes: selectedThemes,
      annual_profit: ebitdaValue,
      valuation_low: lowValue,
      valuation_high: highValue,
    });

    setResult({
      lowValue,
      avgValue: ebitdaValue * categoryData.avgMultiple,
      highValue,
    });
  };

  const showCalendlyCTA = result && result.avgValue > 500000;

  return (
    <div>
      {showTitle && (
        <>
          <h2 className="mb-2 font-display text-2xl font-bold text-foreground md:text-3xl">
            Business Valuation Calculator
          </h2>
          <p className="mb-8 font-body text-muted-foreground max-w-2xl">
            Get an indicative valuation range for your digital business based on multiples from thousands of closed deals. This is of course a range and varies based on asset age, traffic sources, revenue consistency / trend and market dynamics.
          </p>
        </>
      )}

      <div className="max-w-xl space-y-6">
        {/* Category Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="category" className="font-semibold">
            Business Category *
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              {valuationData.map((item) => (
                <SelectItem key={item.vertical} value={item.vertical}>
                  {item.vertical}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theme Multi-select */}
        <div className="space-y-2">
          <Label className="font-semibold">Industry Themes (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal bg-background">
                {selectedThemes.length > 0
                  ? `${selectedThemes.length} theme${selectedThemes.length > 1 ? "s" : ""} selected`
                  : "Select themes..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-64 overflow-y-auto bg-background border border-border z-50">
              <div className="space-y-2">
                {industryData.map((item) => (
                  <div key={item.category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`home-${item.category}`}
                      checked={selectedThemes.includes(item.category)}
                      onCheckedChange={() => handleThemeToggle(item.category)}
                    />
                    <label htmlFor={`home-${item.category}`} className="text-sm font-body cursor-pointer flex-1">
                      {item.category}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* EBITDA Input */}
        <div className="space-y-2">
          <Label htmlFor="ebitda-home" className="font-semibold">
            Annual Profit ($) *
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="ebitda-home"
              type="text"
              placeholder="eg. 250,000"
              value={ebitda}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                const formatted = raw ? Number(raw).toLocaleString("en-US") : "";
                setEbitda(formatted);
              }}
              className="pl-7 bg-background"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <Button onClick={handleCalculate} disabled={!category || !ebitda} className="w-full">
          Calculate Valuation
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-12 max-w-xl">
          <h3 className="mb-6 font-display text-xl font-semibold text-foreground">Estimated Valuation Range</h3>

          {/* Range Bar */}
          <div className="mb-6 rounded-lg border border-border bg-muted/30 p-6">
            <div className="mb-4 flex justify-between text-sm font-body text-muted-foreground">
              <span>Worst 10%</span>
              <span>Average</span>
              <span>Top 10%</span>
            </div>
            <div className="relative h-4 rounded-full bg-muted overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-muted-foreground/40 via-foreground to-foreground"
                style={{ width: "100%" }}
              />
            </div>
            <div className="mt-4 flex justify-between font-display font-semibold text-foreground">
              <span>{formatCurrency(result.lowValue)}</span>
              <span className="text-lg">{formatCurrency(result.avgValue)}</span>
              <span>{formatCurrency(result.highValue)}</span>
            </div>
          </div>

          {/* Hot Themes Info */}
          {hotThemes.length > 0 && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <Flame className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="font-body text-sm">
                {hotThemes.map((theme, idx) => (
                  <p key={theme} className={idx > 0 ? "mt-1" : ""}>
                    <span className="font-semibold">{theme}</span> is hot for deals this year.
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Consultation CTA */}
          {showCalendlyCTA && (
            <div className="rounded-lg border border-border bg-muted/30 p-6">
              {/* Urgency indicator */}
              <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-foreground/5 rounded-md border border-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-body text-sm text-foreground">
                  Limited consultation slots available this week
                </span>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm text-muted-foreground">
                    For a valuation of this size, we offer a free consultation to get a more precise valuation and
                    details on potential acquirers in our network.
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-3">
                    We offer the option of a confidential Market Test with our network of investors and aggregators.
                    No fees unless we close. If there is no interest, I will personally fast-track your listing to a
                    senior broker at the public marketplaces for smaller buyers.
                  </p>
                </div>
              </div>

              <a href="/book" className="block w-full rounded-md bg-accent px-4 py-3 text-center font-body font-semibold text-accent-foreground hover:bg-accent/90">
                Book a Discovery Call
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ValuationCalculator;
