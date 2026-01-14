-- Phase 3: Create artifacts and prophecies tables for the Codex

-- Create artifacts table
CREATE TABLE public.artifacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  lore_content TEXT,
  artifact_type TEXT DEFAULT 'relic',
  power_description TEXT,
  current_holder_id UUID REFERENCES public.characters(id) ON DELETE SET NULL,
  origin_story TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add constraint for artifact_type
ALTER TABLE public.artifacts
ADD CONSTRAINT artifacts_type_check
CHECK (artifact_type IN ('weapon', 'gemstone', 'relic', 'armor', 'tome', 'other'));

-- Enable RLS on artifacts
ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for artifacts
CREATE POLICY "Artifacts are viewable by everyone"
ON public.artifacts
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert artifacts"
ON public.artifacts
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update artifacts"
ON public.artifacts
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete artifacts"
ON public.artifacts
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger for artifacts
CREATE TRIGGER update_artifacts_updated_at
BEFORE UPDATE ON public.artifacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create prophecies table
CREATE TABLE public.prophecies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  prophecy_text TEXT NOT NULL,
  interpretation TEXT,
  status TEXT DEFAULT 'unfulfilled',
  related_era_id UUID REFERENCES public.eras(id) ON DELETE SET NULL,
  source TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add constraint for status
ALTER TABLE public.prophecies
ADD CONSTRAINT prophecies_status_check
CHECK (status IN ('unfulfilled', 'partially_fulfilled', 'fulfilled', 'disputed'));

-- Enable RLS on prophecies
ALTER TABLE public.prophecies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for prophecies
CREATE POLICY "Prophecies are viewable by everyone"
ON public.prophecies
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert prophecies"
ON public.prophecies
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update prophecies"
ON public.prophecies
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete prophecies"
ON public.prophecies
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger for prophecies
CREATE TRIGGER update_prophecies_updated_at
BEFORE UPDATE ON public.prophecies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes
CREATE INDEX idx_artifacts_type ON public.artifacts(artifact_type);
CREATE INDEX idx_artifacts_holder ON public.artifacts(current_holder_id);
CREATE INDEX idx_prophecies_status ON public.prophecies(status);
CREATE INDEX idx_prophecies_era ON public.prophecies(related_era_id);