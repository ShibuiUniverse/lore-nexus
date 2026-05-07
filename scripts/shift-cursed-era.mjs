// Shift The Cursed era and all year-2001+ events down by 200 years.
// After this:
//   The Cursed era: 2001-null → 1801-null
//   All events with year >= 2001 → year - 200
//   (e.g. 2001 → 1801, 2012 → 1812, 2015 → 1815)
//
// Run: node --env-file=.env scripts/shift-cursed-era.mjs

import { createClient } from "@supabase/supabase-js";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(URL, KEY);

const CURSED_ID = "177d017d-45b0-40dc-8ca3-4a3475e01527";
const SHIFT = 200;

// ── 1. Update The Cursed era boundary ────────────────────────────────────────
{
  const { error } = await supabase
    .from("eras")
    .update({ start_year: 1801 })
    .eq("id", CURSED_ID);
  if (error) throw error;
  console.log("✓ The Cursed era → 1801–present");
}

// ── 2. Shift all events with year >= 2001 down by 200 ────────────────────────
{
  const { data: events, error } = await supabase
    .from("timeline_events")
    .select("id, year, title")
    .gte("year", 2001)
    .order("year", { ascending: true });
  if (error) throw error;
  console.log(`  shifting ${events.length} events by -${SHIFT} years`);

  for (const e of events) {
    const newYear = e.year - SHIFT;
    const { error: uerr } = await supabase
      .from("timeline_events")
      .update({ year: newYear })
      .eq("id", e.id);
    if (uerr) throw uerr;
    console.log(`    ${e.year} → ${newYear}  ${e.title}`);
  }
}

// ── 3. Verify ─────────────────────────────────────────────────────────────────
const { data: cursed } = await supabase
  .from("timeline_events")
  .select("year, title")
  .eq("era_id", CURSED_ID)
  .order("year", { ascending: true });
console.log(`\n── The Cursed events now (${cursed.length}) ──`);
for (const e of cursed) console.log(`  ${String(e.year).padStart(4)}  ${e.title}`);
