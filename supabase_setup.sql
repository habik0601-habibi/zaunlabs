-- Zaunlabs Contact Form Submissions Table
-- Execute this SQL block in your Supabase SQL Editor to enable contact form storage.

CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service TEXT DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous form submissions (Public INSERT only)
CREATE POLICY "Allow anonymous submission insertion" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Optional: Restrict reading to authenticated service role / admins only
CREATE POLICY "Allow admins to view submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (auth.role() = 'authenticated');
