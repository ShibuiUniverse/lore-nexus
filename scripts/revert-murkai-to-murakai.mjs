// Revert: Murkai → Murakai across all text columns.
// (Earlier sweep had it backwards — turns out Murakai is the canonical spelling.)

import { createClient } from "@supabase/supabase-js";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing env");

const supabase = createClient(URL, KEY);

const TARGETS = {
  characters:      ["name", "title", "description", "backstory", "abilities", "faction"],
  timeline_events: ["title", "description", "full_content", "category", "event_type"],
  locations:       ["name", "description", "history", "culture", "region"],
  stories:         ["title", "description", "content", "story_type"],
  people_groups:   ["name", "description", "culture_text", "traditions"],
  artifacts:       ["name", "description", "lore_content", "power_description", "origin_story"],
  prophecies:      ["name", "prophecy_text", "interpretation", "source"],
  eras:            ["name", "description"],
};

const transform = (s) => {
  if (typeof s !== "string") return s;
  return s.replace(/\bMurkai\b/g, "Murakai");
};

let totalRows = 0, totalFields = 0;

for (const [table, cols] of Object.entries(TARGETS)) {
  const { data, error } = await supabase.from(table).select(["id", ...cols].join(","));
  if (error) {
    console.warn(`[skip] ${table}: ${error.message}`);
    continue;
  }
  for (const row of data) {
    const patch = {};
    for (const col of cols) {
      const before = row[col];
      const after = transform(before);
      if (before !== after) {
        patch[col] = after;
        totalFields += 1;
      }
    }
    if (Object.keys(patch).length === 0) continue;
    const { error: uerr } = await supabase.from(table).update(patch).eq("id", row.id);
    if (uerr) {
      console.error(`[fail] ${table}:${row.id} → ${uerr.message}`);
      continue;
    }
    totalRows += 1;
    console.log(`  ✓ ${table}/${row.id} — ${Object.keys(patch).join(", ")}`);
  }
}

console.log(`\nTotals — rowsUpdated=${totalRows}  fieldsChanged=${totalFields}`);
