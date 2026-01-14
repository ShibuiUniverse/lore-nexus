-- Step 1: Create role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 2: Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 3: Migrate existing admins from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT user_id, 'admin'::app_role
FROM public.profiles
WHERE is_admin = true
ON CONFLICT DO NOTHING;

-- Step 4: RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Step 5: Drop all old policies that reference is_admin
DROP POLICY IF EXISTS "Only admins can insert eras" ON public.eras;
DROP POLICY IF EXISTS "Only admins can update eras" ON public.eras;
DROP POLICY IF EXISTS "Only admins can delete eras" ON public.eras;
DROP POLICY IF EXISTS "Only admins can insert characters" ON public.characters;
DROP POLICY IF EXISTS "Only admins can update characters" ON public.characters;
DROP POLICY IF EXISTS "Only admins can delete characters" ON public.characters;
DROP POLICY IF EXISTS "Only admins can insert timeline events" ON public.timeline_events;
DROP POLICY IF EXISTS "Only admins can update timeline events" ON public.timeline_events;
DROP POLICY IF EXISTS "Only admins can delete timeline events" ON public.timeline_events;
DROP POLICY IF EXISTS "Only admins can insert locations" ON public.locations;
DROP POLICY IF EXISTS "Only admins can update locations" ON public.locations;
DROP POLICY IF EXISTS "Only admins can delete locations" ON public.locations;
DROP POLICY IF EXISTS "Only admins can insert stories" ON public.stories;
DROP POLICY IF EXISTS "Only admins can update stories" ON public.stories;
DROP POLICY IF EXISTS "Only admins can delete stories" ON public.stories;
DROP POLICY IF EXISTS "Only admins can insert character events" ON public.character_events;
DROP POLICY IF EXISTS "Only admins can delete character events" ON public.character_events;
DROP POLICY IF EXISTS "Only admins can upload lore images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can update lore images" ON storage.objects;
DROP POLICY IF EXISTS "Only admins can delete lore images" ON storage.objects;

-- Step 6: Update profiles SELECT policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Step 7: Remove is_admin column
ALTER TABLE public.profiles DROP COLUMN IF EXISTS is_admin;

-- Step 8: Create new policies using has_role

-- Eras
CREATE POLICY "Admins can insert eras" ON public.eras FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update eras" ON public.eras FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete eras" ON public.eras FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Characters
CREATE POLICY "Admins can insert characters" ON public.characters FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update characters" ON public.characters FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete characters" ON public.characters FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Timeline events
CREATE POLICY "Admins can insert timeline events" ON public.timeline_events FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update timeline events" ON public.timeline_events FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete timeline events" ON public.timeline_events FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Locations
CREATE POLICY "Admins can insert locations" ON public.locations FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update locations" ON public.locations FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete locations" ON public.locations FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Stories
CREATE POLICY "Admins can insert stories" ON public.stories FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update stories" ON public.stories FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete stories" ON public.stories FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Character events
CREATE POLICY "Admins can insert character events" ON public.character_events FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete character events" ON public.character_events FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Storage
CREATE POLICY "Admins can upload lore images" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'lore-images' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update lore images" ON storage.objects FOR UPDATE
  USING (bucket_id = 'lore-images' AND public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete lore images" ON storage.objects FOR DELETE
  USING (bucket_id = 'lore-images' AND public.has_role(auth.uid(), 'admin'::app_role));