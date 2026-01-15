-- Allow anyone to insert codes (admin page is public for now)
CREATE POLICY "Anyone can insert codes" 
ON public.access_codes 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to update codes (for marking as used)
CREATE POLICY "Anyone can update codes" 
ON public.access_codes 
FOR UPDATE 
USING (true);

-- Allow anyone to delete codes (admin functionality)
CREATE POLICY "Anyone can delete codes" 
ON public.access_codes 
FOR DELETE 
USING (true);