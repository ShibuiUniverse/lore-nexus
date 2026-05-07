import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const SUPABASE_URL = "https://gthubyikarkgxxppaign.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHVieWlrYXJrZ3h4cHBhaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQxNjQ5OSwiZXhwIjoyMDg2OTkyNDk5fQ.g7kVyiJjNGH4oPbmglHl8v7EPLyrEsR3phZ_ZLcNXYY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Clean docx-to-markdown artifacts: {.mark}, {.underline}, backslash escapes
const clean = (s) =>
  s
    .replace(/\[([^\]]+)\]\{\.mark\}/g, "$1")
    .replace(/\[([^\]]+)\]\{\.underline\}/g, "$1")
    .replace(/\\([!\*\[\]\-\#\(\)])/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const read = (path) => clean(readFileSync(path, "utf8"));

const DOCS = "/Users/shibuilabs/projects/lore-nexus/docs";

// ── Story content mapped by DB id ──────────────────────────────────────────

const updates = [

  // 1. The Last Morning (Prelude Ch.2) — id: 252384ab
  {
    id: "252384ab-00dc-4095-a139-16ea8bc84663",
    description: "Before the curse, before the battle — Sensei Lux's last peaceful morning with his family, and his first confused moments inside the Soulless Citadel.",
    content: read(`${DOCS}/Prelude - Ch. 2.md`),
  },

  // 2. A War of Minds: Life Inside the Soulless Citadel — id: c4c5fd96
  {
    id: "c4c5fd96-3693-4d5a-81c6-15ff1e861c1a",
    description: "Sensei Lux's journal from inside the Citadel — the timeless limbo, the Dark Whisper's temptations, and how Lux created the Arena to keep his men's hope alive.",
    content: read(`${DOCS}/War_For_Zillarnia.md`),
  },

  // 3. Emerald Steals a Dragon Egg — id: cb527f55
  {
    id: "cb527f55-a8a0-44f7-8aa7-8beb73dc694f",
    description: "An interactive tale of young Emerald sneaking out of the Light Walker village to steal a dragon egg — channeling her father's legendary adventurous spirit.",
    content: read(`${DOCS}/2_Twitter_Story_Night_-_Emerald_steals_an_egg.md`),
  },

  // 4. Vi Names the Beast — id: dc5fe74c
  {
    id: "dc5fe74c-b1e2-42d2-9dd8-586bf9ee87d8",
    description: "Inside the Soulless Citadel, the Light Walkers mount a mission to the Burning Mountain to avenge a fallen brother — and Vi makes an unexpected friend named Chuck.",
    content: read(`${DOCS}/1_Twitter_Story_Night.md`),
  },

  // 5. The Yellow Ship — id: c2128636
  {
    id: "c2128636-dabd-40a2-a997-d900e1bfc0c6",
    description: "An interactive pirate tale following Captain McCray after his crew is captured by the Royal Navy — loyalty, betrayal, Vane's dark curse, and the legend of the yellow ship.",
    content: read(`${DOCS}/Tightened_Copy_of_Pirates_Twitter_Night__1__the_Yellow_Ship.md`),
  },

  // 6. Vane and the Devil's Eye — id: 89e9f898
  {
    id: "89e9f898-9e17-4697-86d5-30e949904afc",
    description: "Captain Vane escapes Nassau in a blaze of fire, defies the Royal Navy, and sails headlong into the Devil's Eye — dragging his crew into the Baransu Realm.",
    content: read(`${DOCS}/PIrates_of_Fukushu__-_The_Adventure_Begins.md`),
  },

  // 7. The Mark of a Traitor — id: 7d57b90f (re-confirm verbatim)
  {
    id: "7d57b90f-5125-49fb-ab98-ebaae03f6cd7",
    description: "Kage's full backstory — orphaned at ten, slowly consumed by the Dark Whisper, and the night she opened the gates of the Forbidden Forest and earned the mark of a traitor.",
    content: read(`${DOCS}/THE MARK OF A TRAITOR.md`),
  },
];

async function run() {
  for (const { id, description, content } of updates) {
    const { data, error } = await supabase
      .from("stories")
      .update({ description, content })
      .eq("id", id)
      .select("id, title")
      .single();

    if (error) {
      console.error(`✗ Error on ${id}:`, error.message);
    } else {
      console.log(`✓ Restored: ${data.title}`);
    }
  }
}

run();
