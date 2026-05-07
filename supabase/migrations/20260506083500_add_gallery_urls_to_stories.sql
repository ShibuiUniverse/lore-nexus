-- Multi-image support for chronicles. The first image stays in `thumbnail_url`
-- as the hero; additional images go in `gallery_urls` and render as a clickable
-- thumbnail strip beneath the hero in StoryModal.
alter table public.stories
  add column if not exists gallery_urls text[] default '{}'::text[];

comment on column public.stories.gallery_urls is
  'Additional images for the story modal carousel. Order is preserved.';
