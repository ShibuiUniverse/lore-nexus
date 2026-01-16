-- Create junction table for many-to-many relationship between characters and people groups
CREATE TABLE public.character_people_groups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  character_id uuid NOT NULL REFERENCES public.characters(id) ON DELETE CASCADE,
  people_group_id uuid NOT NULL REFERENCES public.people_groups(id) ON DELETE CASCADE,
  is_primary boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(character_id, people_group_id)
);

-- Enable RLS
ALTER TABLE public.character_people_groups ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Character people groups are viewable by everyone"
ON public.character_people_groups
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert character people groups"
ON public.character_people_groups
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update character people groups"
ON public.character_people_groups
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete character people groups"
ON public.character_people_groups
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster lookups
CREATE INDEX idx_character_people_groups_character ON public.character_people_groups(character_id);
CREATE INDEX idx_character_people_groups_people_group ON public.character_people_groups(people_group_id);

-- Add comment
COMMENT ON TABLE public.character_people_groups IS 'Junction table allowing characters to belong to multiple people groups';
COMMENT ON COLUMN public.character_people_groups.is_primary IS 'When true, this is the characters primary/original people group';