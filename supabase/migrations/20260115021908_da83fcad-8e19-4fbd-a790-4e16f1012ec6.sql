-- Add explicit lore badge control
ALTER TABLE public.timeline_events 
ADD COLUMN show_lore_badge boolean DEFAULT false;

-- Add comment for clarity
COMMENT ON COLUMN public.timeline_events.show_lore_badge IS 'When true, displays the Read Lore badge on this event';