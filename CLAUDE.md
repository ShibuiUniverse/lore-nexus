# CLAUDE.md — Shibui Universe Lorekeeper

## PROJECT OVERVIEW
The Lorekeeper is a web-based lore encyclopedia for the Shibui Universe — an interconnected Manga, Anime, and Gaming IP created by James Fazio. This app lets fans explore the entire universe: characters, timeline, locations, artifacts, prophecies, stories, and peoples.

**Live at:** `https://lorekeeper.shibuiuniverse.com` (subdomain via Cloudflare Pages, since 2026-05-13). Path-based was attempted first but the apex `shibuiuniverse.com` is grey-cloud (Webflow's recommended setup) so the Worker route never fired — pivoted to the subdomain to avoid risking the existing Webflow site. The `cloudflare-worker/` folder is parked but unused.

## TECH STACK
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Backend:** Supabase (Postgres DB, Auth, Storage)
- **Routing:** React Router v6
- **State:** TanStack React Query
- **Icons:** Lucide React
- **Fonts:** Cinzel (headings) + Crimson Pro (body)

## PROJECT STRUCTURE
```
src/
├── App.tsx                  # Routes
├── index.css                # Theme/design system (IMPORTANT - read this)
├── contexts/AuthContext.tsx  # Auth + admin role checking
├── integrations/supabase/   # Client + generated types
├── components/
│   ├── home/                # Hero, Featured sections
│   ├── timeline/            # Timeline events, filters, modals
│   ├── characters/          # Character cards, filters
│   ├── locations/           # Location cards, filters
│   ├── peoples/             # People group cards
│   ├── codex/               # Artifacts, Prophecies
│   ├── stories/             # Story cards, filters, modal
│   ├── layout/              # Header, Footer, Layout wrapper
│   ├── admin/               # Admin layout, sidebar, image upload
│   └── ui/                  # shadcn components + custom (ParticleBackground, JapaneseAccent)
├── pages/
│   ├── Index.tsx            # Home page
│   ├── Timeline.tsx         # Timeline page
│   ├── Characters.tsx       # Characters grid
│   ├── CharacterDetail.tsx  # Individual character page
│   ├── Locations.tsx        # Locations/Realms
│   ├── LocationDetail.tsx
│   ├── PeopleDetail.tsx
│   ├── Codex.tsx            # Artifacts + Prophecies
│   ├── ArtifactDetail.tsx
│   ├── ProphecyDetail.tsx
│   ├── Stories.tsx
│   ├── Login.tsx / Register.tsx
│   └── admin/               # Full CRUD admin panel for all entities
└── hooks/                   # useScrollReveal, etc.
```

## DESIGN SYSTEM
The theme is cinematic, dark, with aged parchment textures and crimson/gold accents. See `src/index.css` for the full design system. Key tokens:
- **Background:** Dark warm brown (hsl 30 15% 8%)
- **Primary:** Crimson red (hsl 0 72% 50%)
- **Accent:** Warm gold (hsl 38 60% 45%)
- **Cards:** Subtle parchment feel with backdrop blur
- **Typography:** Cinzel for headings, Crimson Pro for body
- **Effects:** Particle backgrounds, vignette overlays, scroll reveal animations, Japanese accent text

## DATABASE SCHEMA (Supabase)
Tables:
- `eras` — Time periods (name, description, start_year, end_year, color, sort_order)
- `characters` — (name, title, description, backstory, abilities, faction, era_id, people_group_id, image_url, is_featured, sort_order)
- `timeline_events` — (title, description, full_content, year, era_id, category, event_type, video_url, reading_time, show_lore_badge, image_url, is_featured, sort_order)
- `locations` — (name, description, history, culture, region, image_url, is_featured, sort_order)
- `stories` — (title, description, content, story_type, video_url, thumbnail_url, era_id, is_featured, sort_order)
- `people_groups` — (name, description, culture_text, traditions, image_url, homeland_id→locations, is_featured, sort_order)
- `artifacts` — (name, description, lore_content, artifact_type, power_description, current_holder_id→characters, origin_story, image_url, is_featured, sort_order)
- `prophecies` — (name, prophecy_text, interpretation, status, related_era_id, source, image_url, is_featured, sort_order)
- `character_events` — junction (character_id, event_id, role)
- `character_people_groups` — junction (character_id, people_group_id, is_primary)
- `profiles` — (user_id, display_name, avatar_url)
- `user_roles` — (user_id, role: admin|moderator|user)

Auth: Role-based with `has_role()` function. First registered user auto-gets admin. RLS on all tables (public read, admin write).

Storage: `lore-images` bucket (public read, admin upload).

## KNOWN ISSUES TO FIX
1. **Admin panel access not working** — User gets admin role in DB but can't access /admin. Likely an auth check issue in the frontend code. Debug the AuthContext.tsx isAdmin check and how admin pages gate access.
2. **Timeline has overlap/design issues** — Cards overlap on certain screen sizes, layout bugs with the alternating left/right pattern.
3. **Content not populated** — Database is empty, needs all lore content entered. Reference docs in `/docs` folder.
4. **Lovable artifacts to clean up** — Remove `lovable-tagger` from vite.config.ts if not already done.

## ENVIRONMENT VARIABLES
```
VITE_SUPABASE_URL=<project-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
```

## LORE REFERENCE
All Shibui Universe lore documents are in the `/docs` folder as markdown files. USE THESE when populating content. Key files:
- `Shibui_Universe_Book_condensed.md` — THE MASTER REFERENCE. Full universe bible with origin story, all characters, all storylines.
- `Shibui_Universe_Origin_Story.md` — Creation myth (Almighty, Undying Ones, Khaonai rebellion, three realms)
- `Eternal_Blade_Synopsis.md` — Main manga storyline synopsis
- `Legend_Back_Ground_Info.md` — Deep background on the legend/mythology
- `Lux_citadel_lore.md` — Lux Citadel location lore
- `The_Prophecy_of_the_Eternity_Blade.md` — The central prophecy
- `Voice_quick_reference.md` — James's writing voice checklist
- `Voice_Examples.md` — Detailed voice and tone examples
- `Pirates_Four_Act_Structure.md` — Pirates of Fukushu story structure
- `New_The_Pirates_of_Fukushu_.md` — Pirates story content
- `The_Soulless_Citadel_Re-write.md` — Soulless Citadel storyline
- `War_For_Zillarnia.md` — War for Zillarnia storyline
- `Chapter_2__The_Rise_of_The_Women_Warriors.md` — Women Warriors chapter
- `Manga_Pitch.md` — Manga pitch document
- `Website_Copy.md` — Brand copy and messaging

## SHIBUI UNIVERSE — WORLD OVERVIEW

### Creation & Cosmology
- **The Almighty** created three groups of Undying Ones in the Upper Realm:
  - **Montes** — bore wisdom and knowledge
  - **Lacus** — bore loyalty and honor
  - **Robur** — bore strength
- Each received a precious gemstone instilled with their gift's essence
- **Khaonai** (greatest Robur) rebelled, creating Dark Magic and the Bident of Khaonai
- After the war: Robur banished to **Shadow Realm**, Montes sent to **Baransu Realm** (transformed to giants), Lacus guard the door between realms at Lake Shamakai
- The Almighty created **Novus People** (humans) in Baransu Realm — free will, no inborn gifts

### The Three Realms
1. **Upper Realm** — The Almighty's domain
2. **Baransu Realm** — Where the story takes place (mortals, Montes giants, Lacus guardians)
3. **Shadow Realm** — Prison of Khaonai and the Robur

### Key Factions/Peoples
- **Light Walker Clan** — Chosen by Almighty, keepers of the Staff, protectors
- **Montes** — Giants of wisdom, became prideful
- **Lacus** — Loyal guardians at Lake Shamakai
- **Robur** — Banished to Shadow Realm
- **Novus People** — Humans with free will
- **Pirates of Fukushu** — Led by Captain Kaito, seafaring storyline

### Key Characters
- **Emerald** — 18-year-old female lead of Eternal Blade. Rebellious, struggling with identity and loss. Adventure-driven. "A hero for today's youth."
- **Vi** — Energetic, enthusiastic ("Ohhhhhh, we are soooo BACK!!!")
- **Sensei Lux** — Wise but humorous mentor ("Are you a rice guy or a stew guy?")
- **Khaonai** — The great betrayer, created Dark Magic
- **Sensei Murakai** — Original Light Walker leader, made the vow
- **Captain Kaito** — Pirate captain, central to Pirates of Fukushu storyline
- **Tenebris** — Major antagonist, dark force

### Key Artifacts
- **The Eternity Blade** — Central to the prophecy and manga
- **Bident of Khaonai** — Dark Magic weapon
- **The Staff** — Kept by Light Walker Clan
- **Gemstones** — Each Undying One group had one, instilled with their gift

### Key Storylines
1. **Eternal Blade** (main manga) — Emerald's journey, 5 chapters published
2. **Pirates of Fukushu** — Captain Kaito's seafaring adventures
3. **The Soulless Citadel** — Dark storyline
4. **War for Zillarnia** — Major conflict
5. **The Legend of Kaito (1872)** — Historical backstory
6. **Rise of the Women Warriors** — Chapter 2 storyline

## WRITING VOICE
James's voice is casual, raw, honest — never corporate. When writing lore content:
- Short punchy sentences mixed with flowing prose
- Epic fantasy meets grounded humor
- Emotional without being manipulative
- Modern dialogue that doesn't feel forced
- Humor in darkness (Vi naming a monster "Chuck" in eternal purgatory)
- NEVER: "Join us on this epic journey", "Greetings, fellow adventurers", corporate speak
- Voice test: "Would James actually say this?"

## PRIORITY ORDER
1. Fix admin panel access
2. Fix timeline overlap/design bugs
3. Import existing data from CSV exports (if available in project root)
4. Populate lore content from /docs reference files
5. Polish design and add missing features
6. ✅ Deployed to lorekeeper.shibuiuniverse.com via Cloudflare Pages (2026-05-13)

## COMMANDS
```bash
npm run dev          # Start dev server (localhost:8080)
npm run build        # Production build
npm run preview      # Preview production build
```
