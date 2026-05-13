// Spoiler scrub on 2026-05-13. The story frontier as of this date: Emerald and
// Kilian have just left the Forbidden Forest. They have not met the Kubu, the
// Pirates, the Montes, the Lacus, or any character outside the Light Walker
// village. They have not obtained any gemstone. The Eternal Blade is not yet
// in their hands. Anything depicting Emerald (or Kilian) interacting with
// people, places, or objects beyond the Forbidden Forest is a spoiler.
//
// This script removes from the public codex:
//   1. Eternal Blade — that Antonia holds it.
//   2. Baransu Ruby — that Antonia is Melea's sister, that Antonia gives the
//      Ruby to Emerald, and that Emerald has met Antonia. Reframed: Vegas
//      stole the Ruby from the Light Walkers; Antonia now protects it.
//   3. Staff of the Almighty — its location (Lake Shamakai / Murakai's tomb)
//      and Emerald's discovery of it. Reframed: vanished when Lux was cursed;
//      Women Warriors search for it.
//   4. Almighty Diamond — same Lake Shamakai location + entire Lacus Queen
//      riddle / uniting the five stones / transport to Citadel gates spoiler.
//      Reframed to mirror the Staff.
//   5. Emerald of Wisdom — Emerald obtaining it from Grummel and the Lake
//      Shamakai battle where Kage shatters it.
//   6. Pearl of Honor — Emerald's drowning, her father reaching her from the
//      Citadel, her second dive. (Eel/Lacus Queen test kept as public lore.)
//   7. Sensei Lux backstory — drop "He connected with Emerald once, at the
//      bottom of Lake Shamakai when she was drowning."
//   8. Grummel backstory — drop the sentence implying Grummel met Emerald +
//      the Kilian-not-happy-about-the-vow line implying Grummel joined the
//      quest. (He had known Sensei Lux historically — that stays.)
//   9. Lake Shamakai history — drop "Emerald had to earn the right to even
//      speak to the Lacus Queen…" + fix the Pearl of Wisdom → Honor typo.
//  10. The Curse of the Soulless Citadel prophecy interpretation — strip the
//      ending spoiler dump (Emerald wields the Blade, Killian sacrifices,
//      Lux reunites with daughter, Kage opens the Shadow Realm door).
//      Replaced with a vaguer cliffhanger about Tenebris's still-unresolved
//      second line.
//
// Kept as public lore (per James, 2026-05-13):
//   - Antonia is the captain of the Pirates of Fukushū
//   - Antonia holds the Baransu Ruby (and how she came by it via Vegas)
//   - The Lacus' Eel/Queen test for the Pearl of Honor (others have come)
//   - Grummel is the keeper of the Emerald of Wisdom; he knew Sensei Lux
//     historically
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
  {
    table: "characters",
    id: "78c8f7fc-31a9-413c-bf98-76699d3930b2",
    label: "Sensei Lux",
    fields: {
      backstory: `Sensei Lux led the Light Walker Clan at the peak of its power.

He was everything a leader was supposed to be: fierce in battle, calm under pressure, beloved by his people, and genuinely funny in a way that most powerful men are not. He did not use humor to deflect. He used it because he actually found the world amusing, including the parts that were trying to kill him.

He married Melea young. Thirteen. They were inseparable. She was the better strategic mind, and he knew it and said so, which made her trust him completely.

He had two children. Emerald, his firstborn daughter. Tika, his firstborn son. He loved then deeply and often sacrificed his time and health to be with them as much as he could while holding up his responsibilities in the realm.

In the valley of Zillarnia, he led the Light Walker Clan against Tenebris and the dark horde. They won. The Staff of the Almighty blazed through the Forgotten Ones like fire through paper. Tenebris was cast to the Shadow Realm.

Then came the curse.

5,555 warriors disappeared. Lux among them.

In the Soulless Citadel, he did what leaders do. He held his people together. He created the Arena so his men would have something to fight for every day. He identified the Dark Whisper's tactics and countered them. He kept making jokes because despair is a choice and he refused to make it.`,
    },
  },
  {
    table: "characters",
    id: "9f024f7c-dd2e-4e26-b7bd-172b44a2b17b",
    label: "Grummel",
    fields: {
      backstory: `The Montes were transformed into rock giants by the Almighty as a consequence of their pride. The relationship was simple: the greater the pride, the greater the giant. Some Montes stood forty feet tall and could not remember what humility felt like.

Grummel stood seven feet.

This was not celebrated among the Montes. Being small meant being humble, which meant you were admitting something the other giants did not want to admit. Grummel did not mind. He had watched the tall ones argue for centuries about things that did not matter and found the whole business exhausting.

He was made keeper of the Emerald of Wisdom for reasons that surprised everyone except Grummel. Wisdom and humility tend to go together. The Almighty apparently noticed and so did Gothan, leader of the Montes. Grummel was at the Battle of Mount Turkan. He helped to push back Tenebris from the Realm. It broke something in him. Something he didn't ever want to unleash again. Violence.

He took a vow, to never engage in war or combat again.

Grummel loves nature deeply and it manifests in a beautiful childlike faith. He is old, undying and wise, but he still acts like a child in creation.

He had known Sensei Lux from the days before the curse.`,
    },
  },
  {
    table: "locations",
    id: "771ac907-7114-4cb0-9a44-1a6a0e254dbe",
    label: "Lake Shamakai",
    fields: {
      history: `The Almighty placed the Lacus at Lake Shamakai for a reason. Beneath the surface of the water lies the door to the Shadow Realm. The Lacus guard it. They have guarded it since the beginning. Since Khaonai and the Robur were banished.

The lake is vast and still in a way that makes people uneasy. The water is clear enough to see deep, but the depths keep going past where light reaches. The Shamakai Eel Dragon, Takai, hunts below the surface and helps to guard the Pearl of Honor. It is ancient and territorial and not something a reasonable person goes near.

What makes Lake Shamakai majestic is the lava tubes that run beneath its water. Mixing fresh water with salt water and housing bother tropical and freshwater lifeforms in one place. A beautiful thing if you can muster yourself a visit.

The Pearl of Honor rests with the Lacus at the bottom of this lake.`,
    },
  },
  {
    table: "timeline_events",
    id: "bbbbbbbb-0021-0021-0021-000000000021",
    label: "Young Antonia Leaves Zillarnia (timeline event)",
    fields: {
      // Removes "Melea's sister Antonia" / "Her sister Melea" — the sister
      // relation is one of James's protected spoilers. The Vegas/Antonia
      // backstory itself is fine (already public via Vegas's character entry).
      description: "Antonia fell in love with the wrong person. Vegas was charming and mysterious and from somewhere no one could quite place. Her family had concerns. She didn't listen.",
      full_content: `Every family has a story like this.

The one person everyone could see was trouble, the one person who was clearly there for the wrong reasons, and the one family member who was absolutely certain they were different. That the love was real. That everyone else was wrong.

Antonia was that person.

Vegas arrived in Zillarnia and nobody could quite figure out where he came from. He was charming. He was attentive. He paid attention to Antonia in a way that felt like being the only person in a room. Her family had a bad feeling about him from day one. They said as much.

Antonia married him.

She wasn't stupid. She wasn't weak. She was a young woman who believed in something and she paid the price that people pay when they believe the wrong thing about someone.

Vegas would reveal what he actually was. It just took time.

And when it happened, the fallout would send Antonia on a path that eventually put her exactly where the Almighty needed her to be.`,
    },
  },
  {
    table: "prophecies",
    id: "a0e891a1-931d-4191-bdce-fafffab54ef3",
    label: "The Curse of the Soulless Citadel",
    fields: {
      interpretation: `Tenebris was moments from defeat when he spat these words. His horde was ash. The Staff of the Almighty had pushed back his darkness. He was going to the Shadow Realm and he knew it. So he did the only thing left to him — he cursed them.

And it worked.

Every warrior who fought in the Great Battle vanished into thin air moments after their victory, absorbed into the Soulless Citadel — a dark fortress hovering in the limbo between realms. Not dead. Not alive. Just... trapped. The curse didn't stop at the battlefield. Every firstborn son of the Light Walker Clan, on his 18th birthday, was taken next. Generation after generation, the Citadel filled with men who had done nothing wrong except be born into the wrong bloodline.

5,555 souls in total. Some kept their hope. Others let the Dark Whisper in, and the Citadel's darkness slowly changed them — rage and despair rotting something inside them over the long years.

For ten years after the curse, the Light Walker women rebuilt. They went into hiding in the Forbidden Forest, trained in secret, and tried to find a way to break it. None could, until the Double Prophecy surfaced and Emerald's path became clear.

As for Tenebris's second line — "I shall return, my name shall rule these lands again" — that part of the curse remains unresolved. Tenebris is bound in the Shadow Realm. But darkness has a way of finding new vessels.`,
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
