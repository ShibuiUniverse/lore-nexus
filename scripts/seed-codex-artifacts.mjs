import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gthubyikarkgxxppaign.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHVieWlrYXJrZ3h4cHBhaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQxNjQ5OSwiZXhwIjoyMDg2OTkyNDk5fQ.g7kVyiJjNGH4oPbmglHl8v7EPLyrEsR3phZ_ZLcNXYY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const artifacts = [
  // ─── WEAPONS ───────────────────────────────────────────────────────────────
  {
    name: "The Eternal Blade",
    description:
      "A blade forged in darkness, destined to be wielded in light. The central artifact of the prophecy — it holds the fate of every realm.",
    lore_content: `Kurogami, once a wise and noble dragon and the greatest blacksmith ever to walk the Baransu Realm, fell into the deceit of the Dark Whisper. Blinded by a lust for power he could never satisfy, he set out to forge something no mortal had ever dared — a blade capable of wielding all five gemstones of the Almighty at once.

He descended to the underwater volcano Erdekan, deep in the Fukushū Sea, and there, in the heat of the earth's core, hammered out the Eternal Blade. The Emerald of Wisdom. The Pearl of Honor. The Baransu Ruby. The Opal of Strength. The Almighty Diamond. Five stones. One blade. Power enough to tear open the door to the Shadow Realm itself.

Before Kurogami and the dark ones could begin their quest to gather the gemstones, his own sister — Ryujinshi — stood in their path. The battle between them was brutal and bloody. In the end, Ryujinshi prevailed. Heartbroken, she vanished into the underground lava tubes of the eastern Baransu coast, swearing to protect the Blade with her life.

The Double Prophecy says this: one from the bloodline of Tenebris will wield it in darkness to unleash Khaonai upon all realms. But another — a direct descendant of Sensei Murkai, born of pure heart and chosen by the Almighty — will gather the stones, wield the Blade, and turn its darkness to light. Restoring balance. Freeing all people from the Whisper's grasp.

The blade does not choose its wielder. The wielder chooses themselves.`,
    artifact_type: "weapon",
    power_description:
      "Wields all five gemstones simultaneously. In dark hands, unlocks the Shadow Realm and unleashes Khaonai. In the hands of the Chosen, it restores balance to every realm and breaks curses of ancient dark magic.",
    origin_story:
      "Forged by the dragon-blacksmith Kurogami at the underwater volcano Erdekan in the depths of the Fukushū Sea. Seized by his sister Ryujinshi after a great battle, then entrusted through generations until it reached Antonia — keeper of the blade and the Baransu Ruby.",
    is_featured: true,
    sort_order: 1,
  },
  {
    name: "Bident of Khaonai",
    description:
      "The weapon of dark magic. Born of Khaonai's betrayal, it is the oldest and most destructive force in the known realms.",
    lore_content: `Before the Novus People ever walked the Baransu Realm, there was already a war.

Khaonai was the greatest of the Robur — the Undying Ones created to bear the Almighty's strength. He was unmatched. Beloved. And it was not enough. Convinced his creator was withholding power from him, Khaonai turned his strength inward — and something new was born from that bitterness. Something that had never existed before.

Dark Magic.

From that corruption, he conjured a weapon to wield it — the Bident of Khaonai. Two prongs of ancient iron, humming with a power that wasn't given — it was taken. He used it to lead the Robur in open rebellion against the Almighty. The heavens shook. The seas roiled. The land splintered. And in the end, the Almighty overcame him. Khaonai and the Robur were banished to the Shadow Realm.

But the Bident did not go with them.

It lingered. Waiting in a dark fortress. Patient the way only cursed things can be patient. Centuries later, it found Turkan — the brother of Sensei Murkai, the first man the Almighty had chosen. The Whisper led him straight to it. One touch, and the intoxication of Dark Magic consumed him. He became Tenebris, and the Bident became a weapon of mass terror across the Baransu Realm — cursing armies, turning men into beasts, leveling Light Walker warriors with a single wave.

Wherever the Bident has been, suffering has followed. It has never been destroyed. It cannot be. Not yet.`,
    artifact_type: "weapon",
    power_description:
      "Channels pure Dark Magic. Can launch devastating shockwaves capable of flattening hundreds. Curses enemies, transforms victims into mindless beasts. Creates dark forcefield energy that can match even the Staff of the Almighty.",
    origin_story:
      "Conjured by Khaonai himself from the first Dark Magic ever created. Left behind after Khaonai's banishment to the Shadow Realm. Later found by Turkan in a dark fortress and used to transform himself into Tenebris.",
    is_featured: true,
    sort_order: 2,
  },
  {
    name: "Staff of the Almighty",
    description:
      "The sacred weapon of light, given to the Light Walker Clan to hold darkness at bay. Wherever it is planted, the dark yields.",
    lore_content: `When Tenebris claimed the Bident of Khaonai and began his centuries-long campaign of terror across Baransu, the Almighty did not stand idle. He forged an answer — not just a weapon, but a charge. A promise.

The Staff of the Almighty was created to hold Tenebris at bay and to carry within it the Almighty Diamond — the fifth and final gemstone, the keystone of the Eternal Blade. The Almighty chose Sensei Murkai and his Light Walker Clan as its keepers, binding that stewardship to a sacred vow: walk with the Almighty, follow his ways, and the Staff is yours.

Murkai made that vow. And for generations, the Light Walkers kept it.

The Staff became the center of the Light Walker Clan's power — handed down from leader to leader, Sensei to Sensei. In the great battle against Tenebris's horde, it was the Staff that turned the tide. Sensei Lux caught it mid-air, slammed its base into the earth, and the white gem at its head exploded outward in a dome of pure light — reducing the Forgotten Ones to ash, and pushing Tenebris himself to the edge of defeat.

After the men were cursed to the Soulless Citadel, the Staff fell to the valley floor. It was sealed in Sensei Murkai's underwater tomb at the bottom of Lake Shamakai — waiting for the next one chosen to wield it. Emerald found it there. She pulled the Almighty Diamond from its head. And the Staff's long vigil ended.`,
    artifact_type: "relic",
    power_description:
      "Radiates divine light capable of forming a forcefield dome that vaporizes dark horde on contact. Channels the Almighty's power directly. Houses the Almighty Diamond — the fifth key to the Eternal Blade.",
    origin_story:
      "Forged by the Almighty in response to Tenebris's rise. Entrusted to Sensei Murkai and the Light Walker Clan. Dropped when the clan was cursed to the Soulless Citadel; sealed in Murkai's tomb at the bottom of Lake Shamakai.",
    is_featured: true,
    sort_order: 3,
  },

  // ─── GEMSTONES ─────────────────────────────────────────────────────────────
  {
    name: "Emerald of Wisdom",
    description:
      "The gemstone of wisdom, held by the Montes Giants for ages. One of five keys to the Eternal Blade.",
    lore_content: `In the beginning, the Almighty gave each group of Undying Ones a precious gem — instilled with the essence of their gift. To the Montes, the bearers of wisdom and knowledge, he gave the Emerald of Wisdom.

When the Montes were sent to the Baransu Realm and transformed into giants by their own pride, they carried the Emerald with them. For centuries it sat in their mountain stronghold, guarded not out of selfishness but out of responsibility. The Montes knew what it was. They knew what it was part of.

It was Grummel — the smallest and most humble of the Montes, standing just eight feet tall — who kept it. He was the only giant to have sworn off violence, which made him an odd choice. But wisdom was never about being the biggest in the room.

When Emerald came to the upper mountains seeking the stone, the Montes tested her with a riddle. She answered well. Grummel handed over the Emerald of Wisdom and joined her quest — not because he had to, but because he wanted to see where it led.

Later, during the battle at Lake Shamakai, Kuso shattered it with a dark curse. Most would have given up. Emerald pieced every shard back together — as only the true bearer of that wisdom could.`,
    artifact_type: "gemstone",
    power_description:
      "Channels the gift of wisdom from the Almighty. One of five gemstones required to fully wield the Eternal Blade. Held by the Montes Giants in their upper mountain stronghold.",
    origin_story:
      "Given by the Almighty to the Montes — the Undying Ones who bore his wisdom. Carried to the Baransu Realm when the Montes were transformed into giants. Kept by Grummel, the wisest and most humble of the clan.",
    is_featured: false,
    sort_order: 4,
  },
  {
    name: "Pearl of Honor",
    description:
      "The gemstone of honor, resting at the bottom of Lake Shamakai, guarded by the Lacus and their ancient eel.",
    lore_content: `The Lacus were the Undying Ones who bore the Almighty's loyalty and honor. When the others fell or were reshuffled after Khaonai's rebellion, the Lacus remained faithful — and they were rewarded for it. The Almighty made them guardians of the door between the Shadow Realm and Baransu, dwelling at the bottom of Lake Shamakai. With them, they kept the Pearl of Honor.

It was never simply a gem. It was a test.

The Lacus Queen does not hand it over. She bestows a blessing and sets the seeker against Takai — the giant Eel who guards the Pearl in the lake's deepest crevasse. Takai does not attack with his teeth. He attacks with fear. He pops the air bubble. He makes you choose whether to drown in your panic or find something deeper than your lungs.

Emerald almost drowned. She was pulled back up by Grummel, unconscious. But in that suspended moment between worlds, she connected with her father — still trapped in the Soulless Citadel — who urged her not to give up. When she woke, she dove again. She reached the bottom. She retrieved the Pearl.

The Pearl of Honor doesn't go to the bravest. It goes to the one who gets back up.`,
    artifact_type: "gemstone",
    power_description:
      "Channels the gift of loyalty and honor from the Almighty. One of five gemstones required to fully wield the Eternal Blade. Guarded by the Lacus people at the bottom of Lake Shamakai.",
    origin_story:
      "Given by the Almighty to the Lacus — the Undying Ones who bore his loyalty and honor. Kept at the bottom of Lake Shamakai, guarded by the giant Eel Takai. Bestowed upon the worthy by the Lacus Queen.",
    is_featured: false,
    sort_order: 5,
  },
  {
    name: "Baransu Ruby",
    description:
      "The gemstone of the realm, keeper of its balance. Hidden for generations among the Pirates of Fukushū.",
    lore_content: `The Baransu Ruby doesn't have the flashiest story of the five gemstones. It doesn't live on a mountain or at the bottom of a lake. For a long time, it lived on the open sea — wrapped in the coat of a pirate captain who happened to also be the long-lost sister of Melea.

Antonia carried it and the Eternal Blade both, having inherited them from a keeper before her. She knew what she held. She didn't advertise it. She kept the sea between herself and the people who would take it.

When Emerald and her crew ended up stranded on a rowboat in the middle of the Fukushū Sea — the way destiny always operates with terrible timing — they had a run-in with Antonia's crew. It wasn't until Emerald revealed who she was that Antonia lowered her guard. Sensing the Almighty's power on her niece, Antonia entrusted both the Ruby and the Blade to Emerald and gave her blessing.

The Baransu Ruby is tied to the realm itself — some say those who hold it feel the pulse of Baransu in their chest, a reminder that the land is alive and the balance is always at stake.`,
    artifact_type: "gemstone",
    power_description:
      "Channels the balance of the Baransu Realm. One of five gemstones required to fully wield the Eternal Blade. Said to attune its holder to the living pulse of the realm.",
    origin_story:
      "Held in trust for generations among keepers loyal to the Almighty. Passed to Antonia — Melea's sister and captain of the Pirates of Fukushū — who held it alongside the Eternal Blade until she entrusted both to Emerald.",
    is_featured: false,
    sort_order: 6,
  },
  {
    name: "Opal of Strength",
    description:
      "The gemstone of strength, once held by the Robur. Its current location is unknown. The dark ones seek it.",
    lore_content: `The Almighty gave the Opal of Strength to the Robur — the Undying Ones who bore his strength. It was meant to be a gift, a channel for power used in service and protection. Then Khaonai happened.

When the Robur were banished to the Shadow Realm after their rebellion, the Opal's fate became murky. It did not follow them into the dark. It did not stay with the Almighty's faithful. It went somewhere no one talks about, in the keeping of someone or something not yet revealed.

The Opal of Strength is the most dangerous of the five gemstones because of what it represents — raw power without wisdom, without honor, without the anchor of the Almighty's nature. In the wrong hands, the Opal alone could reshape a battlefield. Combined in the Eternal Blade alongside the other four? Catastrophic.

The dark ones have been looking for it. So far, it hasn't been found. Or maybe it has, and the finder is very, very careful about who knows.`,
    artifact_type: "gemstone",
    power_description:
      "Channels the raw strength of the Robur — the most physical and destructive of the Almighty's gifts. One of five gemstones required to fully wield the Eternal Blade. Its current location is unknown.",
    origin_story:
      "Given by the Almighty to the Robur — the Undying Ones who bore his strength. Its whereabouts after Khaonai's rebellion and the banishment of the Robur to the Shadow Realm remain unknown.",
    is_featured: false,
    sort_order: 7,
  },
  {
    name: "Almighty Diamond",
    description:
      "The fifth and final gemstone — a direct piece of the Almighty's own power, sealed in the tomb of the first Sensei.",
    lore_content: `The Almighty Diamond is not like the others. The other four gemstones were given — instilled with the essence of an Undying One's gift and handed over. The Diamond was kept. Sealed. Hidden in a tomb at the bottom of Lake Shamakai with Sensei Murkai himself, as if the Almighty needed to be sure it wouldn't fall before the right person came for it.

It was the fifth key. The last piece. And it was embedded in the head of the Staff of the Almighty — the same Staff that radiated a dome of white light during the battle against Tenebris. Every time the Staff had been used in that iconic way, the Diamond was there, doing the actual work.

Nobody knew this. Not even the Light Walkers who wielded it for generations.

Emerald found the tomb by following the Lacus Queen's riddle — "you must return to the past to prevail in the future." Led by her connection to the Almighty, she dove again into Lake Shamakai, found the sealed door, placed the Eternal Blade against it, and watched the watery tomb rise from the depths like a memory coming back to life. The Staff hovered in the air. She pulled the Diamond from it and slid it into the Blade with the other four.

The moment all five stones were together, the Blade transported her to the gates of the Soulless Citadel.

The Diamond doesn't just belong to the Blade. It's always been the point. Everything else was preparation.`,
    artifact_type: "gemstone",
    power_description:
      "The keystone of the five gemstones — a direct channel of the Almighty's own power. Embedded in the Staff of the Almighty. Once combined with the other four gems in the Eternal Blade, it completes the weapon and unlocks the full force of the prophecy.",
    origin_story:
      "Kept by the Almighty himself and sealed inside the Staff of the Almighty. Entrusted to Sensei Murkai and hidden at the bottom of Lake Shamakai in a sealed underwater tomb — waiting for the one the prophecy named.",
    is_featured: true,
    sort_order: 8,
  },
];

async function seed() {
  console.log(`Inserting ${artifacts.length} codex artifacts...`);

  // Check for existing entries to avoid duplicates
  const { data: existing } = await supabase
    .from("artifacts")
    .select("name")
    .in(
      "name",
      artifacts.map((a) => a.name)
    );

  const existingNames = new Set((existing || []).map((r) => r.name));
  const toInsert = artifacts.filter((a) => !existingNames.has(a.name));

  if (toInsert.length === 0) {
    console.log("All artifacts already exist — nothing to insert.");
    return;
  }

  if (existingNames.size > 0) {
    console.log(
      `Skipping ${existingNames.size} already-existing: ${[...existingNames].join(", ")}`
    );
  }

  const { data, error } = await supabase
    .from("artifacts")
    .insert(toInsert)
    .select("name");

  if (error) {
    console.error("Insert error:", error.message);
    process.exit(1);
  }

  console.log(`✓ Inserted ${data.length} artifacts:`);
  data.forEach((a) => console.log(`  • ${a.name}`));
}

seed();
