-- Extend artifact_type check constraint to include armory types
ALTER TABLE public.artifacts
DROP CONSTRAINT artifacts_type_check;

ALTER TABLE public.artifacts
ADD CONSTRAINT artifacts_type_check
CHECK (artifact_type IN ('weapon', 'gemstone', 'relic', 'armor', 'tome', 'other', 'armory_weapon', 'armory_sidekick'));
