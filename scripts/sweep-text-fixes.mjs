// One-shot text sweep across all entity tables.
// Replacements:
//   - "Murakai"        → "Murkai"        (whole-word, name typo fix)
//   - "Kuso"           → "Kage"          (whole-word, lore correction)
//   - "Eternity Blade" → "Eternal Blade" (plain substring, canonical fix)
//
// Run: node --env-file=.env scripts/sweep-text-fixes.mjs

import { createClient } from "@supabase/supabase-js";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(URL, KEY);

// Column lists per table (from CLAUDE.md schema). If a column doesn't exist, the SELECT will error and we skip.
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
  return s
    .replace(/\bMurakai\b/g, "Murkai")
    .replace(/\bKuso\b/g, "Kage")
    .replace(/Eternity Blade/g, "Eternal Blade");
};

const totals = { rowsScanned: 0, rowsUpdated: 0, fieldsChanged: 0 };
const perTable = {};

for (const [table, cols] of Object.entries(TARGETS)) {
  const { data, error } = await supabase.from(table).select(["id", ...cols].join(","));
  if (error) {
    console.warn(`[skip] ${table}: ${error.message}`);
    continue;
  }
  perTable[table] = { rows: data.length, updated: 0, fields: 0 };
  totals.rowsScanned += data.length;

  for (const row of data) {
    const patch = {};
    for (const col of cols) {
      const before = row[col];
      const after = transform(before);
      if (before !== after) {
        patch[col] = after;
        perTable[table].fields += 1;
        totals.fieldsChanged += 1;
      }
    }
    if (Object.keys(patch).length === 0) continue;

    const { error: uerr } = await supabase.from(table).update(patch).eq("id", row.id);
    if (uerr) {
      console.error(`[fail] ${table}:${row.id} → ${uerr.message}`);
      continue;
    }
    perTable[table].updated += 1;
    totals.rowsUpdated += 1;
    console.log(`  ✓ ${table}/${row.id} — ${Object.keys(patch).join(", ")}`);
  }
}

console.log("\n── Per-table summary ──");
for (const [t, s] of Object.entries(perTable)) {
  console.log(`  ${t.padEnd(18)} scanned=${s.rows}  rowsUpdated=${s.updated}  fieldsChanged=${s.fields}`);
}
console.log("\n── Totals ──");
console.log(`  scanned=${totals.rowsScanned}  rowsUpdated=${totals.rowsUpdated}  fieldsChanged=${totals.fieldsChanged}`);
