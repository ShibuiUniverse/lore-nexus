// Spoiler scrub on 2026-05-13. Removes from the public codex:
//   1. That Antonia holds the Eternal Blade
//   2. That Antonia is Melea's sister (and Emerald's aunt/niece relation)
//   3. The Staff of the Almighty's location (Lake Shamakai / Murakai's tomb)
//   4. The Almighty Diamond's location (same place as the Staff) and Emerald's
//      post-departure discovery narrative (Lacus Queen riddle, uniting all 5
//      stones, transport to the Citadel gates).
//   5. Emerald of Wisdom: Emerald obtaining it from Grummel + Lake Shamakai
//      battle where Kage shatters it (both unrevealed).
//   6. Pearl of Honor: Emerald's drowning experience and her father reaching
//      her from the Citadel. (Eel test description kept as public lore per
//      option 3.)
//
// Kept as public lore (per James, 2026-05-13):
//   - Antonia is the captain of the Pirates of Fukushū
//   - Antonia holds the Baransu Ruby
//   - The Lacus' Eel test for the Pearl of Honor (others have come before)
//
// Idempotent — re-running just re-sets the same values.

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gthubyikarkgxxppaign.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHVieWlrYXJrZ3h4cHBhaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQxNjQ5OSwiZXhwIjoyMDg2OTkyNDk5fQ.g7kVyiJjNGH4oPbmglHl8v7EPLyrEsR3phZ_ZLcNXYY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const updates = [
  {
    table: "artifacts",
    id: "80ae719e-f8b3-470d-b41d-8910909e6e24",
    label: "Eternal Blade",
    fields: {
      origin_story: "Forged by the dragon-blacksmith Kurogami at the underwater volcano Erdekan in the depths of the Fukushū Sea. Seized by his sister Ryujinshi after a great battle, then entrusted through the generations that followed.",
    },
  },
  {
    table: "artifacts",
    id: "a699e777-f9b2-4bc3-a09b-25cd8bda349a",
    label: "Baransu Ruby",
    fields: {
      // Re-rewritten same day after James caught remaining spoilers: Antonia
      // didn't peacefully inherit the Ruby (Vegas stole it from the Light
      // Walkers), and Emerald has not yet met Antonia or received the Ruby —
      // both are post-departure events. This version reflects only what is
      // currently revealed in-story.
      lore_content: `The Baransu Ruby doesn't have the flashiest story of the five gemstones. It doesn't live on a mountain or at the bottom of a lake. For a long time, it has lived on the open sea — wrapped in the coat of a pirate captain.

Antonia carries it now. The Ruby came to her through loss — taken from the Light Walker Clan one night by Vegas, the man she had brought into her clan. What happened on the water afterward is hers alone. She survived. The Ruby survived with her. She has guarded it ever since.

She knows what she holds. She doesn't advertise it. She keeps the sea between herself and the people who would take it.

The Baransu Ruby is tied to the realm itself — some say those who hold it feel the pulse of Baransu in their chest, a reminder that the land is alive and the balance is always at stake.`,
      origin_story: "Held in trust for generations among keepers loyal to the Almighty. Taken from the Light Walker Clan by Vegas in a desperate hope. Now carried by Antonia — captain of the Pirates of Fukushū — who guards it across the open sea.",
    },
  },
  {
    table: "artifacts",
    id: "ee9a630a-7b88-4d7d-86d4-44cac0d9ac41",
    label: "Staff of the Almighty",
    fields: {
      lore_content: `When Tenebris claimed the Bident of Khaonai and began his centuries-long campaign of terror across Baransu, the Almighty did not stand idle. He forged an answer — not just a weapon, but a charge. A promise.

The Staff of the Almighty was created to hold Tenebris at bay and to carry within it the Almighty Diamond — the fifth and final gemstone, the keystone of the Eternal Blade. The Almighty chose Sensei Murakai and his Light Walker Clan as its keepers, binding that stewardship to a sacred vow: walk with the Almighty, follow his ways, and the Staff is yours.

Murakai made that vow. And for generations, the Light Walkers kept it.

The Staff became the center of the Light Walker Clan's power — handed down from leader to leader, Sensei to Sensei. In the great battle against Tenebris's horde, it was the Staff that turned the tide. Sensei Lux caught it mid-air, slammed its base into the earth, and the white gem at its head exploded outward in a dome of pure light — reducing the Forgotten Ones to ash, and pushing Tenebris himself to the edge of defeat.

After Lux was cursed to the Soulless Citadel, the Staff of the Almighty disappeared. Where it fell, where it lies — none in the Baransu Realm can say. The Women Warriors have searched for it across every cliff, valley, and hidden grove, in hopes that finding it might be a key to opening the Citadel. None have found it to this day, yet.`,
      origin_story: "Forged by the Almighty in response to Tenebris's rise. Entrusted to Sensei Murakai and the Light Walker Clan. After Lux was cursed to the Soulless Citadel, the Staff of the Almighty disappeared. The Women Warriors have searched for its location in hopes that it might be a key to opening the Soulless Citadel, but none have found it to this day, yet.",
    },
  },
  {
    table: "artifacts",
    id: "852042ed-8e03-4307-82cd-3816ecc6c4c7",
    label: "Emerald of Wisdom",
    fields: {
      lore_content: `In the beginning, the Almighty gave each group of Undying Ones a precious gem — instilled with the essence of their gift. To the Montes, the bearers of wisdom and knowledge, he gave the Emerald of Wisdom.

When the Montes were sent to the Baransu Realm and transformed into giants by their own pride, they carried the Emerald with them. For centuries it has sat in their mountain stronghold, guarded not out of selfishness but out of responsibility. The Montes know what it is. They know what it is part of.

It is Grummel — the smallest and most humble of the Montes, standing just eight feet tall — who keeps it. He is the only giant to have sworn off violence, which makes him an odd choice. But wisdom was never about being the biggest in the room.

The stone waits in the upper mountains. The prophecy speaks of a chosen one who must climb to seek it. Whether that climb has begun, the scrolls do not yet say.`,
    },
  },
  {
    table: "artifacts",
    id: "00b4a125-64ef-4039-a606-5f30c858a0e0",
    label: "Pearl of Honor",
    fields: {
      lore_content: `The Lacus were the Undying Ones who bore the Almighty's loyalty and honor. When the others fell or were reshuffled after Khaonai's rebellion, the Lacus remained faithful — and they were rewarded for it. The Almighty made them guardians of the door between the Shadow Realm and Baransu, dwelling at the bottom of Lake Shamakai. With them, they kept the Pearl of Honor.

It was never simply a gem. It was a test.

The Lacus Queen does not hand it over. She bestows a blessing and sets the seeker against Takai — the giant Eel who guards the Pearl in the lake's deepest crevasse. Takai does not attack with his teeth. He attacks with fear. He pops the air bubble. He makes you choose whether to drown in your panic or find something deeper than your lungs.

The Pearl of Honor doesn't go to the bravest. It goes to the one who gets back up.`,
    },
  },
  {
    table: "artifacts",
    id: "257d4411-ef1e-4368-bef0-5ebc87bc606d",
    label: "Almighty Diamond",
    fields: {
      description: "The fifth and final gemstone — a direct piece of the Almighty's own power, embedded in the Staff of the Almighty itself.",
      lore_content: `The Almighty Diamond is not like the others. The other four gemstones were given — instilled with the essence of an Undying One's gift and handed over. The Diamond was kept. Sealed. The Almighty placed it where only the right hand could ever reach it.

It was the fifth key. The last piece. And it was embedded in the head of the Staff of the Almighty — the same Staff that radiated a dome of white light during the battle against Tenebris. Every time the Staff had been used in that iconic way, the Diamond was there, doing the actual work.

Nobody knew this. Not even the Light Walkers who wielded it for generations.

When Lux was cursed to the Soulless Citadel, the Staff disappeared with him — and the Diamond disappeared with the Staff. Where it rests now, the scrolls do not say. The Women Warriors search for the Staff. They do not yet know that finding it means finding the Diamond too.

The Diamond doesn't just belong to the Blade. It's always been the point. Everything else has been preparation.`,
      origin_story: "Kept by the Almighty himself and sealed inside the Staff of the Almighty. Entrusted to Sensei Murakai and the Light Walker Clan. Vanished with the Staff when Lux was cursed to the Soulless Citadel.",
    },
  },
];

for (const u of updates) {
  const { error } = await supabase.from(u.table).update(u.fields).eq("id", u.id);
  if (error) {
    console.error(`✗ ${u.label}:`, error.message);
    process.exit(1);
  }
  console.log(`✓ ${u.label} — updated ${Object.keys(u.fields).join(", ")}`);
}
