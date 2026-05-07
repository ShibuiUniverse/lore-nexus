// Age of Peace compression + texture pass.
//   1. Compress the era boundary: Age of Peace 1451–2000 → 1451–1800
//   2. Move "Tenebris Returns to Baransu" from year 2000 → 1800
//   3. Insert 3 new anchor events between The Long Restoration (1470) and Tenebris Returns (1800)
//   4. Bump sort_order on all later events to keep insertion clean
//
// Run: node --env-file=.env scripts/age-of-peace-fill.mjs

import { createClient } from "@supabase/supabase-js";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(URL, KEY);

const AGE_OF_PEACE_ID = "44444444-4444-4444-4444-444444444444";
const INSERT_AT = 14; // current sort_order of "Tenebris Returns to Baransu"

// ── 1. Compress Age of Peace era boundary ───────────────────────────────────
{
  const { error } = await supabase
    .from("eras")
    .update({ end_year: 1800 })
    .eq("id", AGE_OF_PEACE_ID);
  if (error) throw error;
  console.log("✓ Age of Peace era → 1451–1800");
}

// ── 2. Move Tenebris Returns 2000 → 1800 ─────────────────────────────────────
{
  const { error } = await supabase
    .from("timeline_events")
    .update({ year: 1800 })
    .eq("title", "Tenebris Returns to Baransu");
  if (error) throw error;
  console.log("✓ Tenebris Returns to Baransu → year 1800");
}

// ── 3. Bump sort_order for all events at INSERT_AT or later (in reverse so we don't collide) ─
{
  const { data, error } = await supabase
    .from("timeline_events")
    .select("id, sort_order")
    .gte("sort_order", INSERT_AT)
    .order("sort_order", { ascending: false });
  if (error) throw error;
  console.log(`  bumping ${data.length} events sort_order +3`);
  for (const row of data) {
    const { error: uerr } = await supabase
      .from("timeline_events")
      .update({ sort_order: row.sort_order + 3 })
      .eq("id", row.id);
    if (uerr) throw uerr;
  }
  console.log("✓ sort_order bumped");
}

// ── 4. Insert the 3 new anchor events ────────────────────────────────────────
const NEW_EVENTS = [
  {
    title: "The Kubu and the Light Walkers Become Kin",
    year: 1490,
    sort_order: 14,
    era_id: AGE_OF_PEACE_ID,
    category: "alliance",
    event_type: "event",
    reading_time: 2,
    description: "Forty years after Mount Turkan, the Light Walker Clan and the Kubu people formalize what the battle had already proven. Trade flows both ways. Children of one are raised among the other so the friendship survives the ones who started it.",
    full_content: `The Kubu had stood with them at Mount Turkan.

Without the Kubu, the Light Walkers would have lost the eastern flank. The forest people had moved through the trees in ways no Forgotten One understood. They had cut supply lines. They had kept the wounded alive. They had asked nothing in return.

Forty years on, the bond went from battle-friendship to something deeper.

A Light Walker delegation traveled to the Kubu Forest carrying gifts — forged steel, sacred parchment, salt from the eastern coast, the kind of generosity that signals you remember. The Kubu opened the forest to them in return. Hunting routes. Gathering paths. The healing groves their ancestors had kept hidden for generations.

The trade flowed both ways from then on. Kubu remedies in the Light Walker storerooms. Zillarnian steel in Kubu hands. Children of one people raised among the other for seasons at a time so the friendship would survive the ones who started it.

It would.

The Kubu would remember this when no one else did. Centuries later, when a young chosen one and her companions came stumbling through the forest with the Dark Ones at their heels, the Kubu would still know who Light Walkers were.`,
  },
  {
    title: "Zillarnian Steel Reaches Lake Shamakai",
    year: 1565,
    sort_order: 15,
    era_id: AGE_OF_PEACE_ID,
    category: "alliance",
    event_type: "event",
    reading_time: 2,
    description: "For the first time, the Lacus accept forged weapons from the Light Walker Clan. The trade is quiet. The change to what guarding the door means is not.",
    full_content: `The Lacus had never needed weapons before.

Their post at Lake Shamakai was a thing of presence, not arms. They were the door between realms. They were the hands of the Almighty at the place where realms touched. The water answered them.

But Mount Turkan had taught them something. Standing in formation against Tenebris's hoard had shown them that presence alone could be overwhelmed if the numbers were wrong.

The Light Walker delegation arrived in the deep of winter carrying blades.

They brought spears too — long, balanced, made for two-handed work in shallow water. The kind of thing that could hurt a Forgotten One without forcing the Lacus to leave the lake.

The Lacus queen accepted them with the grace of someone who knew the gift was also a warning.

The Lacus did not stop being who they were. The water still answered them. The door still held. But from that day forward, when they walked the lakeshore, there was steel at their belts, and the door felt slightly more like a fortress.`,
  },
  {
    title: "The Montes Withdraw",
    year: 1640,
    sort_order: 16,
    era_id: AGE_OF_PEACE_ID,
    category: "event",
    event_type: "event",
    reading_time: 2,
    description: "After Mount Turkan, the Montes draw deeper into the upper mountains. Some never come down again. The Novus people start telling their children different stories about the giants.",
    full_content: `The Montes had come down for Mount Turkan.

They had not done that in a thousand years. They were Undying Ones. They had been giants of wisdom in the Upper Realm before they ever knew rock or weight. Coming down at all had cost them something the Novus could not see.

Coming down to fight cost them more.

In the centuries after, they returned to the peaks. They went higher than before. They built homes in places no human foot would reach. They stopped sending emissaries down for festivals. Stopped trading the herbs they had been trading for generations. Stopped answering when the wind carried questions up the slopes.

The Novus people noticed.

In one generation, the Montes had been the wise giants who came down at need. In the next, they were stories. Shadows on the high ridges that mothers used to hush their children. Things to be feared.

Most Light Walkers understood. A few still climbed. They sat with Gohan and with Grummel and the rest, drank what was offered, asked nothing of them.

The friendship lived in those visits. It was not what it had been. But it was not gone.`,
  },
];

{
  const { data, error } = await supabase
    .from("timeline_events")
    .insert(NEW_EVENTS)
    .select("year, title");
  if (error) throw error;
  console.log("✓ Inserted:");
  for (const e of data) console.log(`    ${e.year}  ${e.title}`);
}

// ── 5. Verify ─────────────────────────────────────────────────────────────────
const { data: peace } = await supabase
  .from("timeline_events")
  .select("year, title, sort_order")
  .eq("era_id", AGE_OF_PEACE_ID)
  .order("year", { ascending: true });
console.log("\n── Age of Peace events now ──");
for (const e of peace) console.log(`  ${String(e.year).padStart(4)}  [${e.sort_order}]  ${e.title}`);
