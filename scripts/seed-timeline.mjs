/**
 * Seeds 5 canonical timeline events from Shibui Universe lore.
 * Usage: node --env-file=.env scripts/seed-timeline.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const ERA = {
  ORIGINS:  "11111111-1111-1111-1111-111111111111", // Age of Origins       1–500
  DAWN:     "22222222-2222-2222-2222-222222222222", // Era of the Dawn of Baransu  501–1200
  DESTRUCT: "33333333-3333-3333-3333-333333333333", // Age of Destruction   1201–1450
  PEACE:    "44444444-4444-4444-4444-444444444444", // Age of Peace         1451–2000
  CURSED:   "177d017d-45b0-40dc-8ca3-4a3475e01527", // The Cursed           2001+
};

const events = [
  {
    id: "aaaaaaaa-0001-0001-0001-000000000001",
    title: "Khaonai's Rebellion",
    year: 300,
    era_id: ERA.ORIGINS,
    category: "battle",
    event_type: "event",
    is_featured: true,
    sort_order: 1,
    show_lore_badge: true,
    reading_time: 3,
    description:
      "The greatest of the Robur turns against the Almighty, birthing Dark Magic and fracturing the peace of the Upper Realm forever.",
    full_content: `Ambition grew in the heart of Khaonai — the greatest of the Robur. He loved the power of his strength so much that he began to seek power beyond what the Almighty had given him. Convinced his creator was withholding from him, Khaonai's bitterness and hate birthed something new and terrible: the Dark Magic.

He conjured a weapon to wield it — the Bident of Khaonai.

Then he challenged the Almighty himself.

The Montes and the Lacus, faithful, fought alongside their creator. The heavens shook. The depths were torn asunder. The animals scattered, terrified of their masters. The seas roiled. The land splintered.

In the end, the Almighty and the faithful overcame Khaonai and the Robur — but like a disease, the Dark Magic had already spread.

Knowing he could not destroy his Undying Ones, the Almighty created the Shadow Realm and banished Khaonai and the Robur within it. His betrayers would never stand in the glory of the Upper Realm again.

But nothing would ever be the same.`,
  },

  {
    id: "aaaaaaaa-0002-0002-0002-000000000002",
    title: "The Creation of the Novus People",
    year: 501,
    era_id: ERA.DAWN,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 2,
    show_lore_badge: true,
    reading_time: 2,
    description:
      "Grieved by the Undying Ones, the Almighty creates a new realm — Baransu — and places within it a new people with something none before them had: free will.",
    full_content: `The Almighty created the Baransu Realm and placed the Montes Giants within it — their enormous size a reflection of the pride that had bloomed in their hearts. The loyal Lacus he stationed at Lake Shamakai, guardians of the door between the Shadow Realm and Baransu, ensuring the banished could never breach it.

Then — grieved by the Undying Ones — the Almighty wanted to begin again.

He created the Novus People.

No divine wisdom. No inborn strength. Not even loyalty by nature. Instead, he gave them something no Undying One had ever possessed: their own will. The freedom to choose — to seek their own paths.

Their choices would bring life eternal. Or never-ending death.

To walk closely with this new creation, the Almighty descended to Baransu in human form, concealing his true identity. He wanted to teach them, to watch over them — and to give them the chance he had given no one else.`,
  },

  {
    id: "aaaaaaaa-0003-0003-0003-000000000003",
    title: "Turkan Finds the Bident",
    year: 1210,
    era_id: ERA.DESTRUCT,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 3,
    show_lore_badge: true,
    reading_time: 3,
    description:
      "A student of the Almighty follows a dark whisper to a hidden fortress — and seizes the Bident of Khaonai. The man called Tenebris is born.",
    full_content: `The Almighty had trained two men — Sensei Murkai, a man of pure heart, and his brother Turkan, driven and strong-willed. He had taken them to the Upper Realm itself, shown them the origin of creation, and revealed his true nature.

But even as the Almighty drew the brothers deeper into his confidence, Turkan began to hear something else.

A faint Whisper.

It told him there was more. That the Almighty was withholding power and glory from him. The Whisper grew louder and more insistent until one day Turkan followed it to a place he had never seen — a dark fortress, as if it had been waiting for him all along.

Inside a hidden chamber, he found its source: the Bident of Khaonai.

Knowing its power from legend, Turkan took it up. The intoxication of the Dark Magic entered his heart.

He used the Bident to transport himself back to Baransu. Transformed. Drunk with power. He brought a wave of terror wherever his shadow fell — turning his victims into mindless beasts of his bidding.

The people gave him a new name: Tenebris. Darkness comes.`,
  },

  {
    id: "aaaaaaaa-0004-0004-0004-000000000004",
    title: "The Vow of Sensei Murkai",
    year: 620,
    era_id: ERA.DAWN,
    category: "alliance",
    event_type: "event",
    is_featured: false,
    sort_order: 4,
    show_lore_badge: true,
    reading_time: 2,
    description:
      "The Almighty forges the Staff and entrusts it to Sensei Murkai and the Light Walker Clan — bound by a sacred vow to protect the Baransu Realm.",
    full_content: `When Tenebris rose and the Dark Magic spread through Baransu, the Almighty did not abandon his people.

He forged a weapon of his own — the Staff of the Almighty. A counterforce to the Bident of Khaonai. A weapon that could hold Tenebris at bay and would one day bring restoration and peace to the realm.

He chose Sensei Murkai and his people — the Light Walkers — to be its keepers. But the gift came with a condition: so long as they walked with the Almighty and followed his way.

The Almighty also bestowed upon the Light Walker Clan a gemstone — like those given to the Undying Ones, it would reveal the truth of his nature and goodwill to all the people who sought to know.

And so Sensei Murkai made his vow: the Light Walkers would protect the Almighty's creation and bring harmony to the realms.

That vow has been kept. The Staff and its sacred charge have been handed down from generation to generation.

We have kept that vow.`,
  },

  {
    id: "aaaaaaaa-0005-0005-0005-000000000005",
    title: "The Curse of the Soulless Citadel",
    year: 2001,
    era_id: ERA.CURSED,
    category: "battle",
    event_type: "event",
    is_featured: true,
    sort_order: 5,
    show_lore_badge: true,
    reading_time: 4,
    description:
      "Sensei Lux leads the Light Walkers to victory against Tenebris — but the enemy's final curse traps every warrior in a hellish limbo between realms. The Soulless Citadel claims them all.",
    full_content: `Under the protection of the Light Walker Clan, Baransu had known an age of peace — harmony and beauty stretching across the realm. But the ancient force of darkness rose again. Tenebris returned, and with him came the horde.

Sensei Lux led the Light Walkers to meet them. The battle was fierce — blades, beasts, and magic colliding across the land. In the end, the Light Walkers overcame the horde.

But the enemy's last act was its cruelest.

A curse. Not just for the warriors who fought that day — but for every firstborn son in the Light Walker Clan. On his eighteenth birthday, he would be taken. Trapped in a hellish limbo between realms. Neither alive nor dead. The Soulless Citadel.

Sensei Lux himself was taken. The men were gone.

Lux's wife, Melea, now leads what remains of the clan — into the Forbidden Forest, into hiding, into training. The women must become the warriors. They must discover the key to breaking the Citadel's curse.

Ten years have passed. They are fierce. But none has found a way to free their men.

And somewhere in the prophecy, a name is written. A Light Walker who can gather the original gemstones given by the Almighty may wield the Eternal Blade — and free them all.`,
  },
];

async function main() {
  console.log("Seeding 5 timeline events...\n");

  const { error } = await supabase
    .from("timeline_events")
    .upsert(events, { onConflict: "id" });

  if (error) {
    console.error("❌  Error:", error.message);
    process.exit(1);
  }

  console.log("✅  5 timeline events inserted.");
}

main();
