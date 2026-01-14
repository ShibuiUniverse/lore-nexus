-- Phase 1: Enhance timeline_events for lore stories and trailers

-- Add event_type column to distinguish content types
ALTER TABLE public.timeline_events 
ADD COLUMN event_type text NOT NULL DEFAULT 'event';

-- Add video_url for trailer embedding
ALTER TABLE public.timeline_events 
ADD COLUMN video_url text;

-- Add reading_time for lore stories (estimated minutes)
ALTER TABLE public.timeline_events 
ADD COLUMN reading_time integer;

-- Add constraint to validate event_type values
ALTER TABLE public.timeline_events 
ADD CONSTRAINT timeline_events_event_type_check 
CHECK (event_type IN ('event', 'lore_story', 'trailer'));

-- Create index for filtering by event_type
CREATE INDEX idx_timeline_events_event_type ON public.timeline_events(event_type);