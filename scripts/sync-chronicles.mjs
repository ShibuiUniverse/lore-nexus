// Chronicles cleanup pass — sync stories verbatim from canonical docs.
//
// Actions:
//   - DELETE 4 stories (Quest for Redemption, Antonia's Journey, Davie's Quest, Pirates of Fukushu)
//   - SYNC content from docs for: Prophecy, Legend of Soulless Citadel, Last Morning, Women Warriors,
//                                   Emerald Steals Egg, Yellow Ship, Vane and Devil's Eye
//   - REPLACE Vi Names the Beast → "A Lost Soul" with content from 1_Twitter_Story_Night.md
//   - LEAVE: Kurogami, A War of Minds, Kaito, Mark of a Traitor
//
// Run: node --env-file=.env scripts/sync-chronicles.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(URL, KEY);

const DOCS = "/Users/shibuilabs/projects/lore-nexus/docs";

// Strip pandoc artifacts the StoryModal can't render
function clean(text) {
  let out = text;
  // pandoc escapes: \-, \!, \[, \], \\, etc
  out = out.replace(/\\([^a-zA-Z0-9])/g, "$1");
  // [text]{.mark} or [text]{.underline} → text
  out = out.replace(/\[([^\]]+)\]\{\.[a-z]+\}/g, "$1");
  // **bold** → *italic*, single-line only (multi-line bold spans become plain text)
  out = out.replace(/\*\*([^*\n]+)\*\*/g, "*$1*");
  // strip any orphan ** that didn't pair within a line
  out = out.replace(/\*\*+/g, "");
  // leading markdown headers (# Title)
  out = out.replace(/^#+\s*/gm, "");
  // strip Written by / Copyright bylines
  out = out.replace(/^.*\bWritten by\b.*$/gim, "");
  out = out.replace(/^.*\bCopyright\b.*$/gim, "");
  // collapse 3+ blank lines to 2
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

const read = (filename) => readFileSync(join(DOCS, filename), "utf8");

// Slice between two header markers (used to extract Ch.1 from the Re-write doc)
function sliceBetween(text, start, end) {
  const s = text.indexOf(start);
  const e = end ? text.indexOf(end, s + start.length) : text.length;
  if (s < 0) throw new Error(`marker not found: ${start}`);
  return text.slice(s + start.length, e < 0 ? text.length : e);
}

// ── Source content per story ──────────────────────────────────────────────────
const rewrite = read("The_Soulless_Citadel_Re-write.md");
const ch1Section = sliceBetween(
  rewrite,
  "**Ch.1 - The Legend of the Soulless Citadel**",
  "**Prelude - Chapter 2**"
);

const SYNCS = [
  // [story_id, title (or null to keep), content_source]
  {
    id: "9d2076ba-6e4b-409e-83fb-f6f6935d94df",
    title: null,
    content: clean(read("The_Prophecy_of_the_Eternity_Blade.md")),
    label: "The Prophecy of the Eternal Blade",
  },
  {
    id: "322288bc-b5f1-4391-ba5b-4c5b3600c53d",
    title: null,
    content: clean(ch1Section),
    label: "The Legend of the Soulless Citadel",
  },
  {
    id: "252384ab-fda6-44e8-9f7a-... TBD",
    title: null,
    content: clean(read("Prelude - Ch. 2.md")),
    label: "The Last Morning",
  },
  {
    id: "91f88a84-9e96-4c25-9a51-... TBD",
    title: null,
    content: clean(read("Chapter_2__The_Rise_of_The_Women_Warriors.md")),
    label: "The Rise of the Women Warriors",
  },
  {
    id: "cb527f55-f17f-4f7b-83c4-... TBD",
    title: null,
    content: clean(read("2_Twitter_Story_Night_-_Emerald_steals_an_egg.md")),
    label: "Emerald Steals a Dragon Egg",
  },
  {
    id: "dc5fe74c-... TBD",
    title: "A Lost Soul",
    content: clean(read("1_Twitter_Story_Night.md")),
    label: "A Lost Soul (was: Vi Names the Beast)",
  },
  {
    id: "c2128636-... TBD",
    title: null,
    content: clean(read("Tightened_Copy_of_Pirates_Twitter_Night__1__the_Yellow_Ship.md")),
    label: "The Yellow Ship",
  },
  {
    id: "89e9f898-... TBD",
    title: null,
    content: clean(read("PIrates_of_Fukushu__-_The_Adventure_Begins.md")),
    label: "Vane and the Devil's Eye",
  },
];

const DELETIONS = [
  { id: "16af6887-472d-4994-af3b-2267e2887e11", label: "The Eternal Blade: Quest for Redemption" },
  { id: "e4f83693-... TBD", label: "Antonia's Journey: From Exile to Captain" },
  { id: "07662096-... TBD", label: "Davie's Quest: The Son of Vane" },
  { id: "274c9a4b-... TBD", label: "The Pirates of Fukushu" },
];

// ── 0. Resolve "TBD" ids by title lookup ─────────────────────────────────────
{
  const { data: rows } = await supabase.from("stories").select("id, title");
  const idByTitle = Object.fromEntries(rows.map((r) => [r.title, r.id]));

  const resolveByLabel = (entry) => {
    // Use existing id if it's already valid (no "TBD")
    if (!entry.id.includes("TBD")) return entry;
    // Map by label substring
    // Try multiple possible titles (handles re-runs after rename)
    const candidates = {
      "The Last Morning": ["The Last Morning"],
      "The Rise of the Women Warriors": ["The Rise of the Women Warriors"],
      "Emerald Steals a Dragon Egg": ["Emerald Steals a Dragon Egg"],
      "A Lost Soul (was: Vi Names the Beast)": ["A Lost Soul", "Vi Names the Beast"],
      "The Yellow Ship": ["The Yellow Ship"],
      "Vane and the Devil's Eye": ["Vane and the Devil's Eye"],
      "Antonia's Journey: From Exile to Captain": ["Antonia's Journey: From Exile to Captain"],
      "Davie's Quest: The Son of Vane": ["Davie's Quest: The Son of Vane"],
      "The Pirates of Fukushu": ["The Pirates of Fukushu"],
    };
    const titles = candidates[entry.label] ?? [];
    const id = titles.map((t) => idByTitle[t]).find(Boolean);
    return { ...entry, id }; // id may be undefined if already deleted
  };

  for (let i = 0; i < SYNCS.length; i++) SYNCS[i] = resolveByLabel(SYNCS[i]);
  for (let i = 0; i < DELETIONS.length; i++) DELETIONS[i] = resolveByLabel(DELETIONS[i]);
}

// ── 1. Apply syncs ────────────────────────────────────────────────────────────
console.log("── Syncing content ──");
for (const s of SYNCS) {
  if (!s.id) {
    console.log(`  - skip: ${s.label} (not found, may have been renamed/deleted)`);
    continue;
  }
  const patch = { content: s.content };
  if (s.title) patch.title = s.title;
  const { error } = await supabase.from("stories").update(patch).eq("id", s.id);
  if (error) {
    console.error(`  ✗ ${s.label}: ${error.message}`);
    continue;
  }
  console.log(`  ✓ ${s.label}  (${s.content.length} chars${s.title ? `, retitled → "${s.title}"` : ""})`);
}

// ── 2. Apply deletions ────────────────────────────────────────────────────────
console.log("\n── Deleting ──");
for (const d of DELETIONS) {
  if (!d.id) {
    console.log(`  - skip: ${d.label} (already gone)`);
    continue;
  }
  const { error } = await supabase.from("stories").delete().eq("id", d.id);
  if (error) {
    console.error(`  ✗ ${d.label}: ${error.message}`);
    continue;
  }
  console.log(`  ✓ deleted: ${d.label}`);
}

// ── 3. Final state ────────────────────────────────────────────────────────────
const { data: final } = await supabase
  .from("stories")
  .select("title, story_type, sort_order")
  .order("sort_order", { ascending: true });
console.log(`\n── Stories now (${final.length}) ──`);
for (const r of final) console.log(`  [${String(r.sort_order).padStart(2)}] ${r.story_type.padEnd(15)} ${r.title}`);
