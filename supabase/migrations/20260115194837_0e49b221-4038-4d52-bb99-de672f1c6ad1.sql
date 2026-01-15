-- Create access_codes table
CREATE TABLE public.access_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  max_uses INTEGER NOT NULL DEFAULT 1,
  use_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read codes (for validation)
CREATE POLICY "Anyone can read access codes"
ON public.access_codes
FOR SELECT
USING (true);

-- Allow anyone to update codes (for marking as used)
CREATE POLICY "Anyone can update access codes"
ON public.access_codes
FOR UPDATE
USING (true);

-- Only authenticated users can insert/delete (admin)
CREATE POLICY "Authenticated users can insert access codes"
ON public.access_codes
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete access codes"
ON public.access_codes
FOR DELETE
USING (true);