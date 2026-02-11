-- Create table for valuation form entries
CREATE TABLE public.valuation_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_category TEXT NOT NULL,
  industry_themes TEXT[] NOT NULL DEFAULT '{}',
  annual_profit NUMERIC NOT NULL,
  valuation_low NUMERIC,
  valuation_high NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts (no auth required for form submissions)
ALTER TABLE public.valuation_entries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert entries (public form)
CREATE POLICY "Anyone can insert valuation entries"
ON public.valuation_entries
FOR INSERT
WITH CHECK (true);

-- Only allow reading via backend/admin (no public select)
CREATE POLICY "No public read access"
ON public.valuation_entries
FOR SELECT
USING (false);