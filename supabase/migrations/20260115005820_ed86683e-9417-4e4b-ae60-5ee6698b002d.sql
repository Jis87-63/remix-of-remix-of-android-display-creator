-- Create table for access codes
CREATE TABLE public.access_codes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    is_used BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can check if a code is valid (for login)
CREATE POLICY "Anyone can validate codes" 
ON public.access_codes 
FOR SELECT 
USING (true);

-- Policy: Only service role can insert/update/delete (admin functions via edge function)
-- No insert/update/delete policies for anon - will use edge function with service role