-- Phase 2: Create people_groups table for Realms & Peoples

-- Create the people_groups table
CREATE TABLE public.people_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  culture_text TEXT,
  traditions TEXT,
  image_url TEXT,
  homeland_id UUID REFERENCES public.locations(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.people_groups ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "People groups are viewable by everyone"
ON public.people_groups
FOR SELECT
USING (true);

-- Admin insert policy
CREATE POLICY "Admins can insert people groups"
ON public.people_groups
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admin update policy
CREATE POLICY "Admins can update people groups"
ON public.people_groups
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin delete policy
CREATE POLICY "Admins can delete people groups"
ON public.people_groups
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_people_groups_updated_at
BEFORE UPDATE ON public.people_groups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add people_group_id to characters for optional linking
ALTER TABLE public.characters
ADD COLUMN people_group_id UUID REFERENCES public.people_groups(id) ON DELETE SET NULL;

-- Create index for filtering
CREATE INDEX idx_people_groups_homeland ON public.people_groups(homeland_id);
CREATE INDEX idx_characters_people_group ON public.characters(people_group_id);