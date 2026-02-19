/**
 * Populates all Shibui Universe characters.
 * Updates existing records by ID and inserts new ones.
 * Usage: node --env-file=.env scripts/seed-characters.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// ─── IDs from the DB ──────────────────────────────────────────────────────────
const ERA = {
  ORIGINS:  "11111111-1111-1111-1111-111111111111",
  DAWN:     "22222222-2222-2222-2222-222222222222",
  DESTRUCT: "33333333-3333-3333-3333-333333333333",
  PEACE:    "44444444-4444-4444-4444-444444444444",
  CURSED:   "177d017d-45b0-40dc-8ca3-4a3475e01527",
};

const GROUP = {
  DARK_ONES:   "f52c1558-7e25-4031-9162-7ec01676d7a4",
  LIGHT_WALKER:"36c41662-3c0e-4731-817d-980816cfb9ff",
  UNDYING:     "2dd456af-7cf4-4f1b-b33d-391d491e8a3f",
  PIRATES:     "c0a8152a-5588-449e-ba9a-1642bf011ab9",
  LACUS:       "d74692b3-f0e0-4d61-84f1-6dcb92d2faba",
  MONTES:      "ab99d79f-0d09-4993-8734-7afa87d7786e",
  KUBU:        "171eb3f9-93fc-47b0-b7f6-65f2ca87008f",
  TENSHI:      "a765d20b-c1ca-4179-95bf-af644464dcc0",
  NOVUS:       "d6101ab2-43c1-416a-98e1-e459c0917eab",
  ROGUE_NAVY:  "1843bfc4-7da6-4c67-ab37-187f5ccadfe7",
  DARK_PIRATES:"4f2fb7c6-6ab8-40ff-9b7b-8ce9cc56e13f",
  SOULLESS:    "4ecde5da-8ded-4790-9484-9f79bbb9dd1f",
};

// ─── Existing character IDs ───────────────────────────────────────────────────
const ID = {
  KHAONAI:    "5b4c5e49-f01d-4356-bb71-15038c546fc9",
  EMERALD:    "a0dd6b47-2a9e-4467-ac1b-5d879ae5263f",
  VI:         "8b00d136-3c05-49a0-876f-2fd8bc3f206f",
  LUX:        "78c8f7fc-31a9-413c-bf98-76699d3930b2",
  MELEA:      "8b3a3465-ceec-4474-9077-36263b2fdd8d",
  KILIAN:     "0b703e4b-0c53-405f-af39-c80c29a856e7",
  KAGE:       "809ecc5d-297b-445d-a64b-a176858e134e",
  GRUMMEL:    "9f024f7c-dd2e-4e26-b7bd-172b44a2b17b",
  VANE:       "d5841464-658a-454b-9eeb-fdbd19be93a3",
  DAVIE:      "17ace758-6396-4916-aeaf-da3735d7c1e4",
  ALMIGHTY:   "5966287f-23e7-46f1-b49b-64900bd2d167",
  TENEBRIS:   "c76fc364-c54d-4a62-b61e-81e6f1819679",
  ANTONIA:    "e07ff608-9c67-4a11-af42-520642be2b28",
  KUROGAMI:   "8c4659cf-45d3-4245-82b6-31b71dc0e8e5",
  RYUJINSHI:  "68841dad-83cf-473c-841e-cff05545985c",
  JULIUS:     "80f4e141-ea80-4aca-850d-e6de176a7ca3",
  NANA:       "b5306b37-1478-41a8-a2ff-62ff571ca956",
  WHISPER:    "88a1273d-42d7-439f-9f5b-c6213bcfb325",
};

// ─── Updates for existing characters ─────────────────────────────────────────
const updates = [
  {
    id: ID.EMERALD,
    name: "Emerald Lux",
    title: "The Chosen One",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.LIGHT_WALKER,
    is_featured: true,
    sort_order: 1,
    description:
      "Daughter of Sensei Lux and Melea. Eighteen years old. Impulsive, brave, and absolutely certain she is the wrong person for this prophecy. She is not.",
    backstory: `Emerald grew up in the Forbidden Forest knowing her father only through stories.

He disappeared before she was old enough to remember his voice properly. She had the way he laughed. The shape of his jaw. A few vivid memories of sitting on the floor of their house eating rice while he watched her with this look on his face, like she was the most remarkable thing he had ever seen.

Then the house came down and he was gone.

Her mother raised her to be a warrior. Every firstborn daughter of the clan became a Hogo-sha, a guardian trained in combat and in the power of the Almighty. Emerald was better than most and more restless than all of them. She trained harder than she needed to and pushed further than she was told to and generally made Melea's life more complicated on a weekly basis.

She was not trying to be difficult. She was trying to be ready. For something. She did not know what.

When Kilian stumbled into the forest being chased by the Dark Ones, she pulled him out of trouble before she thought about whether that was a good idea. That has always been her move. Act first. Think later. Figure out the consequences somewhere in between.

The scroll he carried named her as the chosen one. The one who could gather the five gemstones and wield the Eternal Blade to break the curse on the Light Walker Clan.

She put the scroll down and wanted nothing to do with it.

Then the Dark Ones attacked the village, and she ran toward the fire instead of away from it. Because that has always been her move too.`,
    abilities: `Harnesses the power of the Almighty, which surges through her during combat and moments of extreme emotion. Can project thoughts and visions telepathically, a gift she shares with her mother. Has a deep psychic connection to her father that allows them to communicate across realms when the conditions are right.

Trained warrior since childhood in the ways of the Light Walker Clan. Fast, precise, and aggressive in a fight. Not the strongest combatant on the field but often the most dangerous because she does not stop.

Wields the Eternal Blade at the story's climax. The only person the blade responds to fully. Pieced the shattered Emerald of Wisdom back together shard by shard, which no one else could do.`,
  },

  {
    id: ID.LUX,
    name: "Sensei Lux",
    title: "The Great Lux",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.LIGHT_WALKER,
    is_featured: true,
    sort_order: 2,
    description:
      "Leader of the Light Walker Clan. The greatest warrior the Baransu Realm has ever known. Currently cursed in the Soulless Citadel. Probably making jokes about it.",
    backstory: `Sensei Lux led the Light Walker Clan at the peak of its power.

He was everything a leader was supposed to be: fierce in battle, calm under pressure, beloved by his people, and genuinely funny in a way that most powerful men are not. He did not use humor to deflect. He used it because he actually found the world amusing, including the parts that were trying to kill him.

He married Melea young. Thirteen. They were inseparable. She was the better strategic mind, and he knew it and said so, which made her trust him completely.

He had two children. Emerald, his firstborn daughter. Tika, his firstborn son. He whispered to Tika on the morning of the battle that his son would be mighty. He threw Emerald through the doorway before the house collapsed. He did not make it through the door himself.

In the valley of Zillarnia, he led the Light Walker Clan against Tenebris and the dark horde. They won. The Staff of the Almighty blazed through the Forgotten Ones like fire through paper. Tenebris was cast to the Shadow Realm.

Then came the curse.

5,555 warriors disappeared. Lux among them.

In the Soulless Citadel, he did what leaders do. He held his people together. He created the Arena so his men would have something to fight for every day. He identified the Dark Whisper's tactics and countered them. He kept making jokes because despair is a choice and he refused to make it.

He connected with Emerald once, at the bottom of Lake Shamakai when she nearly drowned. He told her not to give up.

She did not.`,
    abilities: `Master of the Staff of the Almighty, the most powerful relic in the Baransu Realm. Channels the Almighty's power at a level matched only by Melea and later Emerald. Brilliant battlefield tactician. Able to read enemy strategy in real time and adapt.

Supreme combat skill across all weapons and fighting styles. No one in the clan could beat him consistently. Fought with a calm that made him nearly impossible to unsettle.

Deep connection to the Almighty that persists even within the Soulless Citadel, though significantly weakened by the curse.`,
  },

  {
    id: ID.MELEA,
    name: "Melea Lux",
    title: "Sensei of the Light Walker Clan",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.LIGHT_WALKER,
    is_featured: true,
    sort_order: 3,
    description:
      "The strongest woman warrior to ever lead the Light Walker Clan. Lost her husband to the curse. Raised her daughter to save him. Never stopped working toward the day she could bring him home.",
    backstory: `Melea was trained to fight before most children learn to read.

Her father had no sons. Rather than lament that, he taught his daughter everything he knew about the blade and the power of the Almighty. He told her from the time she was small that her greatness would be needed someday. She believed him because she had no reason not to.

She married Lux at thirteen. By then she was already exceptional. Together, they were something different. He led with charisma and presence. She led with precision and foresight. The clan was stronger for having both.

When the curse took the men, it found her at the edge of the forest with her children, listening to a battle she could not see. She felt the Staff of the Almighty fire. She felt the silence that followed.

She did not know yet.

Emerald showed her. Placed two fingers on her temples and shared the vision. Melea saw everything. The battle. The curse. Her husband disappearing. The Staff launching itself into a distant garden.

She cried exactly once. Then she stood up.

Three months later she addressed the clan from a rock at the edge of the Forbidden Forest and led them in. She built a new home, a new order, and a new generation of warriors. The Hogo-sha. Firstborn daughters trained as guardians. She taught them everything her father had taught her and everything Lux had added.

The world thought the Light Walker Clan was a myth.

Melea was fine with that.`,
    abilities: `Warrior training from childhood. Exceptional with the blade. One of the few people in the Baransu Realm who fully understands how to harness the power of the Almighty.

Psychic connection to Emerald, her daughter. They can project thoughts and visions directly into each other's minds. This link saved them both more than once.

Strategic leader. Built a functioning society in the Forbidden Forest from nothing. Trained an entire generation of warrior women who became the most capable fighters in the realm.`,
  },

  {
    id: ID.VI,
    name: "Vi",
    title: "Wild Lux",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.SOULLESS,
    is_featured: false,
    sort_order: 4,
    description:
      "Younger brother of Sensei Lux. Wild, care-free, always ready for a fight and somehow always finding the absurd angle in a catastrophic situation. Named a beast in eternal purgatory. His name was Chuck.",
    backstory: `Vi has never been the kind of person who approaches a crisis with gravity.

This is not because he does not understand what is happening. He understands perfectly. He just believes that if you are going to be trapped in a limbo between realms for an indeterminate amount of time with no sunrise and no way home, you might as well have a good attitude about it.

He fought alongside his brother in the valley of Zillarnia. He was one of the 5,555 who disappeared. The Soulless Citadel received him with the same damp walls and existential darkness it offered everyone else.

Vi received it like it was a mildly inconvenient camping trip.

He learned the Arena. He kept his mind sharp. He refused, absolutely refused, to let the Dark Whisper find a crack. When the Whisper came to Vi, it found a man so genuinely untroubled that it had nothing to work with.

The most documented moment of his time in the Citadel: when locked in a cage with a collection of deformed beasts, Vi not only found a way to make peace with one of them but mounted it, declared that he was a five-legged beast kind of person, and named the beast Chuck.

Sean witnessed this.

Sean was very concerned.`,
    abilities: `Wields double Dragon Daggers that ignite with bluish-yellow light when he channels the power of the Almighty. Exceptional close-range fighter. Fearless in ways that occasionally cross into reckless.

His greatest skill may be psychological. He cannot be rattled. The Dark Whisper tried. It failed. You cannot use despair against someone who finds the situation genuinely interesting.`,
  },

  {
    id: ID.KILIAN,
    name: "Kilian Hikari",
    title: "The Wanderer",
    faction: "Tenshi Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.TENSHI,
    is_featured: false,
    sort_order: 5,
    description:
      "Son of the Tenshi Clan leader. Desert traveler. Definitely not a warrior. Carried an ancient prophecy scroll without knowing what it meant, walked into the Forbidden Forest, and changed everything.",
    backstory: `Kilian was not supposed to be part of this story.

He was the son of a Tenshi Clan leader who had been given a scroll and told to keep it safe. He crossed the desert of Setra looking for something he could not quite name and found trouble instead, specifically the kind of trouble that has teeth and runs in packs.

Emerald pulled him out of that. He landed in the Forbidden Forest confused, grateful, and quickly in over his head.

The scroll named her as the chosen one. He knew it the moment he read it aloud in front of her, and he watched her face go through six different emotions in four seconds. He wanted to help. He genuinely did.

The Dark Ones found him. They had his family. They told him to lead the party to the gemstones and keep reporting back, or his family would die. He made the worst decision of his life and then lived with it through every campfire and every close call and every conversation with Emerald that felt more real than anything he had felt before.

When the truth came out, she did not want to hear his explanation.

He did not blame her.

What he did at the end, grabbing the Eternal Blade from her hands as it was destroying her and absorbing its force himself, was not strategy or sacrifice or heroism. It was the last honest thing he could do for someone he had hurt. He knew exactly what the blade would do to him. He chose it anyway.`,
    abilities: `Not a trained warrior. Compensates with quick thinking, terrain awareness, and a willingness to take risks that more experienced fighters would recognize as dangerous.

Carries ancestral knowledge of the Tenshi Clan traditions, including navigation across the desert of Setra and understanding of the ancient prophecy. His family line was entrusted with the scroll for a reason, though he does not fully understand why.`,
  },

  {
    id: ID.KAGE,
    name: "Kage Akatsuki",
    title: "The Huntress",
    faction: "The Dark Ones",
    era_id: ERA.CURSED,
    people_group_id: GROUP.DARK_ONES,
    is_featured: false,
    sort_order: 6,
    description:
      "Her name means shadow. She was born into the Light Walker Clan and trained as a Hogo-sha. Then she crossed over. No one knows exactly why. That is part of what makes her dangerous.",
    backstory: `Kage grew up alongside Emerald. Same training. Same forest. Same nights watching the same stars through the same canopy.

She was exceptional. Everyone knew it. Melea knew it. The other Hogo-sha knew it. Kage knew it too, and somewhere in the gap between her ability and the recognition she felt she deserved, something shifted.

The Dark Whisper does not need a door. It finds the hairline crack and speaks through it.

What she was told. What she was promised. How those promises compared to what she actually received when she crossed over. That is between her and the Whisper.

What the clan knows is that she left. That she brought knowledge of the Forbidden Forest with her. That the attack that forced Emerald and Kilian to begin the quest came, in part, because someone told the Dark Ones where to look.

She is not mindless. She is not a creature. She is a former Hogo-sha warrior with every technique and every piece of training the Light Walker Clan possesses, now working for the other side. That makes her exactly as dangerous as it sounds.`,
    abilities: `Full Hogo-sha warrior training. Elite Light Walker combat techniques, including how to channel the power of the Almighty, though she has suppressed or corrupted that connection through her alignment with the Dark Ones.

Exceptional hunter and tracker. Silent, patient, precise. Knows the terrain of the Forbidden Forest better than almost anyone outside the clan. Deeply skilled in stealth and ambush tactics.`,
  },

  {
    id: ID.GRUMMEL,
    name: "Grummel",
    title: "Keeper of the Emerald",
    faction: "Montes Giants",
    era_id: ERA.CURSED,
    people_group_id: GROUP.MONTES,
    is_featured: false,
    sort_order: 7,
    description:
      "The smallest of the Montes Giants at eight feet. The wisest. Keeper of the Emerald of Wisdom. Has the energy of a grandfather who finds your problems genuinely interesting and sincerely believes you can solve them.",
    backstory: `The Montes were transformed into rock giants by the Almighty as a consequence of their pride. The relationship was simple: the greater the pride, the greater the giant. Some Montes stood forty feet tall and could not remember what humility felt like.

Grummel stood eight feet.

This was not celebrated among the Montes. Being small meant being humble, which meant you were admitting something the other giants did not want to admit. Grummel did not mind. He had watched the tall ones argue for centuries about things that did not matter and found the whole business exhausting.

He was made keeper of the Emerald of Wisdom for reasons that surprised everyone except Grummel. Wisdom and humility tend to go together. The Almighty apparently noticed.

He had known Sensei Lux. This fact connected him to Emerald in a way that went beyond the quest. When she arrived at the Upper Mountains with Kilian and answered the riddle well, Grummel joined them before she finished speaking. He had been waiting for something like this for a long time.

He was the one who saved her from drowning at Lake Shamakai. He dove after her without thinking. He pulled her out unconscious and held her on the surface until she breathed again.

He did not consider it heroic. He considered it obvious.`,
    abilities: `Physical strength of a Montes Giant, though significantly less than the larger ones. Stone-strong body that can take significant damage. Carries the Emerald of Wisdom and understands its power better than anyone alive.

Deep attunement to the Almighty's presence. Recognized it in Emerald before she recognized it in herself. His sense for where the power is moving has made him an invaluable navigator in the spiritual dimensions of the quest.`,
  },

  {
    id: ID.KHAONAI,
    name: "Khaonai",
    title: "Ruler of the Shadow Realm",
    faction: "Dark Ones",
    era_id: ERA.ORIGINS,
    people_group_id: GROUP.UNDYING,
    is_featured: true,
    sort_order: 8,
    description:
      "The greatest of the Robur. The first to fall. The one who decided the Almighty was withholding from him and chose to take it by force. Created the Dark Magic. Created the Bident. Started everything.",
    backstory: `In the beginning, the Almighty created three groups of Undying Ones and gave each a gift.

The Montes received wisdom. The Lacus received loyalty. The Robur received strength.

Khaonai was the greatest of the Robur. The strongest being in the Upper Realm outside the Almighty himself. He was given a gemstone containing the essence of strength, the same as all the Robur, and for a time that was enough.

Then it was not.

He could not point to the exact moment it changed. It was slow. A question here. A comparison there. Why did the Almighty receive worship while the Robur served? Why were their gifts contained within the gems rather than limitless? What exactly was the Almighty protecting?

The answers he found were the answers he was looking for, not the true ones.

He believed the Almighty was withholding power that was rightfully his. He believed he could take it. He raised a rebellion in the Upper Realm with a weapon he forged himself: the Bident of Khaonai, the first instrument of Dark Magic.

He lost.

The Almighty cast the entire Robur to the Shadow Realm as consequence. Khaonai became its ruler by default, the most powerful prisoner in a prison built specifically to contain him.

He has been there ever since. Working through the Dark Whisper. Corrupting those he can reach. Waiting.

The Eternal Blade is the key to his cell.`,
    abilities: `Creator and master of Dark Magic. The original source from which all dark power in the Baransu Realm flows. The Bident of Khaonai is his primary weapon and acts as a conduit for his power even when wielded by others.

Essentially omnipresent within the Shadow Realm. Extends his influence through the Dark Whisper, a voice that can reach into any sufficiently broken heart across all realms.

Imprisoned but not diminished. His power through intermediaries is still capable of shaping events across the Baransu Realm from within his cell.`,
  },

  {
    id: ID.TENEBRIS,
    name: "Tenebris",
    title: "The Warlord of Darkness",
    faction: "The Dark Ones",
    era_id: ERA.DESTRUCT,
    people_group_id: GROUP.DARK_ONES,
    is_featured: false,
    sort_order: 9,
    description:
      "He was Turkan once. Brother of Sensei Murakai. Chosen by the Almighty. Then the Dark Whisper found a crack and widened it for centuries. By the time he reached Zillarnia, there was nothing left of the man he had been.",
    backstory: `Turkan and Murakai were brothers. The Almighty chose them both, called them to walk the Baransu Realm as leaders, and gave them power that most mortals only heard about in stories.

Murakai accepted the call with gratitude.

Turkan accepted it with ambition.

The distinction did not matter at first. Ambition can serve good ends. But the Dark Whisper understood that ambition without anchor eventually becomes resentment. It spoke to Turkan in moments of comparison. When Murakai received honor and Turkan felt overlooked. When the Staff of the Almighty stayed with Murakai's line and Turkan felt passed over.

The process took decades. Centuries. The Dark Whisper is patient.

By the time Turkan became Tenebris, the man was gone. What remained was a warlord who commanded Forgotten Ones and wielded the ancient Bident of Khaonai and had one objective: break the power of the Almighty's chosen people.

He almost did it. He rode into Zillarnia on a deformed beast and leveled hundreds of Light Walkers with a single wave of the Bident. He drove Sensei Lux into the earth.

But Lux got to the Staff first.

Tenebris used his last breath for the curse. Then the light took him.

He was cast to the Shadow Realm. Not destroyed. Contained. Which means, eventually, the door could open again.`,
    abilities: `Wields the Bident of Khaonai with devastating effectiveness. Each wave can level hundreds of enemies simultaneously. Commands Forgotten Ones, the dark horde of deformed beasts that serve as his army.

The Bident channels Khaonai's Dark Magic directly, giving Tenebris access to power far beyond a typical mortal. Can curse individuals and bloodlines with effects that persist across generations.`,
  },

  {
    id: ID.ANTONIA,
    name: "Captain Antonia",
    title: "Pirate Queen",
    faction: "Pirates of Fukushu",
    era_id: ERA.CURSED,
    people_group_id: GROUP.PIRATES,
    is_featured: true,
    sort_order: 10,
    description:
      "Melea's younger sister. Former Light Walker. Keeper of the Baransu Ruby and the Eternal Blade. Captain of the Pirates of Fukushu. Has been through more than most people survive and is carrying none of it quietly.",
    backstory: `Antonia was always the one reaching for the thing just out of range.

She was the younger sister. Chaska was the responsible one. Antonia was the one who wandered too far, loved too easily, and believed people before she had reason to.

She met Vegas on one of her adventures. He saved her life. She brought him home. Her father opened his arms. The clan accepted him. Antonia thought she had found everything.

One night, the Ruby was gone. Vegas was gone.

She found him on a boat. He had taken the gem for them, he said. Their future. Their child. She told him it was not too late. He reached for her. An arrow hit him in the chest. Chaska lowered her bow on the shore.

Antonia drifted out to sea on the same boat with no food and no water. She screamed at the Almighty until she had nothing left. He answered. He told her her son would live. He told her no one would be able to defeat him.

A sea creature the size of a ship rose beneath the boat and carried her to land.

She built a life in a port town. Made swords. Raised Benaijah. Kept the Ruby hidden.

The Ruby eventually gave up its hiding place and shone a beacon into the night sky. Pirates came. She fought. They took her. The last thing she saw before the dark was a pirate captain crouching over her looking extremely uncertain.

Davie gave her back her son and asked her for help.

She kept both the Ruby and the Eternal Blade until the right person came along. When Emerald arrived, she knew in an instant.

That was her niece. That was the power of the Almighty on her. She handed over the blade and the gem without hesitation.

Then she sailed a ship through the sky to arrive at the battle just in time.`,
    abilities: `Channels the power of the Almighty in combat. Trained from childhood as a Light Walker, though she has spent years away from formal practice. Naturally gifted and fully capable of drawing on that power when the moment demands it.

Expert swordswoman and sailor. Years commanding on the water made her one of the most capable captains in the Fukushu Sea.

Keeper of the Baransu Ruby, which responds to her specifically. She is one of very few people who can harness its full power.`,
  },

  {
    id: ID.DAVIE,
    name: "Captain Davie",
    title: "The Reluctant Captain",
    faction: "Pirates of Fukushu",
    era_id: ERA.CURSED,
    people_group_id: GROUP.PIRATES,
    is_featured: false,
    sort_order: 11,
    description:
      "Son of Blackbeard. Raised on a pirate ship. Chose a different life. His father took that life away in a single afternoon. He made a deal with a dead man's crew to get it back.",
    backstory: `Davie was born to Morgana in a tavern on Turtle Island. Blackbeard took him young. He grew up on the Queen Anne's Revenge learning piracy because there was nothing else on offer.

He became Captain Davie. He was good at it.

Then Blackbeard sent him to an island to find a compass and he ended up in a jungle that swallowed his crew one by one. The Lacus people found what was left of him. Half man, half fish, living between land and water. Loyal and kind in a way he had never encountered before.

He found the compass. He read Captain Julius's journal. He learned exactly who his father was and what Julius's crew had sacrificed to stop him.

He left the island the opposite direction from his father and never looked back.

He went to Tarian. Found love. Had a daughter. Lived quietly for years.

Blackbeard sailed into port and ended all of it in one day.

Davie took the map to where Julius's ship went down, sailed out at night, and convinced a crew of angry dead men to help him get his daughter back. He promised to take their duty guarding the portal when it was over. Julius marked his chest with the same scar his crew carried.

He found Antonia in Turtle Harbor. She did not trust him. He did not blame her.

Together they finished it. He did not kill his father when he had the chance. That surprised even him.`,
    abilities: `Skilled sailor and combat fighter, trained in pirate warfare from childhood. Quick tactician on the water. Carries the protection of Blackbeard's bloodline, which makes him untouchable by Julius's cursed crew.

After taking Julius's mark, he is bound by the same compact as the crew: duty to guard the portal between realms. Marked with the scar on his chest that sealed the deal.`,
  },

  {
    id: ID.VANE,
    name: "Captain Vane",
    title: "Blackbeard",
    faction: "Dark Pirates",
    era_id: ERA.CURSED,
    people_group_id: GROUP.DARK_PIRATES,
    is_featured: false,
    sort_order: 12,
    description:
      "The most feared pirate in the Fukushu Sea. Obsessed with returning to the realm of man to take his revenge on the Royal Navy. Will do anything to anyone to get there. Including sacrifice his own son.",
    backstory: `Vane was already a legend before he was trapped.

The Queen Anne's Revenge. The Forgotten Ones under his command. A name that made other pirates go quiet. He had been building toward something enormous, the kind of power that would make the Royal Navy look small.

Captain Julius of the Rogue Navy sacrificed himself and his entire crew to stop it. He took his ship through the portal between realms and sealed it shut, trapping Blackbeard in the Realm of Elohim along with himself.

That was the moment Vane became something worse.

Already prone to cruelty, already listening to the Dark Whisper, he spent decades in the other realm becoming exactly the thing the Whisper wanted to make him. His obsession with returning narrowed to a single point. The compass. The portal. The Ruby. Everything else existed only as a means toward those.

He sent his own son Davie into a jungle to find a compass knowing Davie might not come back. He killed Davie's wife and took his granddaughter to use as leverage. He moved through the Fukushu Sea leaving nothing but wreckage.

He came closest to the portal at Turtle Harbor, where the Ruby and the compass nearly converged.

He did not make it back.`,
    abilities: `Commands Forgotten Ones alongside his pirate crew. Wields the Bident of Khaonai on loan from the Dark Ones during his most powerful engagements. Decades of piracy have made him one of the most experienced and ruthless combatants on the water.

The Dark Whisper has significantly amplified his natural abilities. He is stronger, faster, and more durable than he should be for a mortal man of his age.`,
  },

  {
    id: ID.JULIUS,
    name: "Captain Graydon Julius",
    title: "Captain Julius",
    faction: "Rogue Navy",
    era_id: ERA.CURSED,
    people_group_id: GROUP.ROGUE_NAVY,
    is_featured: false,
    sort_order: 13,
    description:
      "Prominent captain of the Royal Navy. Sacrificed himself and his entire crew to trap Blackbeard in the Realm of Elohim. Cursed to guard the portal ever after. Has been dead longer than most civilizations have existed.",
    backstory: `Julius was relentless in the pursuit of pirates. Vane in particular. He had been tracking him for years, watching the destruction pile up, building a case for justice.

The day he caught Vane on the open water, he had him. The Royal Navy had him.

Then the portal opened.

Julius made a decision in the space of a breath. He turned his ship directly into the portal mouth and took Vane with him into the Realm of Elohim. His crew went with him. None of them were consulted. None of them were given a choice.

His loyal companion Cornelius sent the compass and Julius's journal out with him in the night before the crew fractured completely. The last entry in the journal was not written by Julius.

The cursed crew guarded the portal. They could not die. They could not leave. They could not touch Vane because of the bloodline protection that ran through him. They could only sail.

For a very long time.

When Davie appeared on the deck and offered to take their duty, Julius listened. He looked at the son of the man they had been forced to guard and saw something his father was not.

He made the deal.

When it was finished, Julius and his crew walked off the ship for the first time in longer than any of them could count. Where they went after that, no one knows.`,
    abilities: `Master naval tactician. His strategic decision to sacrifice his ship to trap Vane was one of the most consequential moves in the history of the Fukushu Sea. The curse made him and his crew unkillable within the Realm of Elohim, though unable to touch those protected by Vane's bloodline.

The mark he branded on Davie's chest carries the weight of the compact, binding the new guardian to the portal duty.`,
  },

  {
    id: ID.KUROGAMI,
    name: "Kurogami",
    title: "The Fallen Blacksmith",
    faction: "Fukushu Ancients",
    era_id: ERA.ORIGINS,
    is_featured: false,
    sort_order: 14,
    description:
      "The greatest dragon blacksmith the Baransu Realm ever knew. Noble. Wise. Beloved. Then the Dark Whisper found him and the most dangerous weapon in existence was forged.",
    backstory: `Children used to ride on his back in the sea.

That is the detail that makes Kurogami's story hard to sit with. He was not simply powerful. He was good. He spent his days protecting people and crafting things of beauty and function. He was the kind of being you built stories around because he made you believe the world could be right.

The Dark Whisper found him slowly.

It started with a question he could not quite shake: the five gemstones the Almighty had given the Undying Ones held enormous power. Why were they sitting unused in the Upper Realm while the Baransu Realm suffered? Kurogami knew of the gems. He knew their potential. He knew Khaonai was imprisoned in the Shadow Realm.

He thought he was reasoning his way to a solution. He was being led.

He descended to the underwater volcano Erdekan at the bottom of the Fukushu Sea and worked in secret for a long time. The blade he forged there was designed to hold all five gemstones simultaneously. Combined, they could open the Shadow Realm and free Khaonai.

He called it the Eternal Blade.

His sister Ryujinshi found out.

They fought until it was over. She won. She took the blade and disappeared into the underground lava tubes running along the eastern coast of Baransu. She vowed to protect it with her life.

Kurogami was broken by what he had become. His fate after the battle is not recorded. His weapon endured. Eventually it found its way to the only hands that could turn it toward the light.`,
    abilities: `Master blacksmith capable of creating relics of incomparable power. His connection to the forge was absolute. The Eternal Blade is the greatest work of his life and the proof of his fall.

Dragon physiology: immense physical strength, fire breathing, the ability to move through both water and air. Before the Whisper, he used these gifts to protect. After, he bent them toward destruction.`,
  },

  {
    id: ID.RYUJINSHI,
    name: "Ryujinshi",
    title: "The Noble Protector",
    faction: "Dragons of the Sea",
    era_id: ERA.ORIGINS,
    is_featured: false,
    sort_order: 15,
    description:
      "Kurogami's sister. The one who stood in his way when no one else could. She did not stop him because she hated him. She stopped him because she loved him too much to let him become what he was becoming.",
    backstory: `Ryujinshi knew her brother.

She knew the quality of him before the Whisper got to him, and she watched the change happen the way you watch something you cannot stop and cannot look away from. The questions he started asking. The certainty that replaced his humility. The way his eyes went somewhere else when she tried to reach him.

She went to him when she understood what he had built.

The battle was catastrophic. She did not want to fight him. She fought him anyway because the alternative was watching him tear open the Shadow Realm and let Khaonai walk free. She knew what that would mean for every living thing in the Baransu Realm.

She won. She took the Eternal Blade.

She did not destroy it. The blade could not be destroyed. It was too perfectly made, which is the particular tragedy of a gifted craftsman falling to darkness: the work endures.

She disappeared into the lava tubes along the eastern coast of Baransu and made her vow. The blade would not fall into wrong hands again. Not while she lived.

The world forgot her. The world forgot Kurogami. The blade moved through time in ways neither of them fully foresaw, eventually arriving at the gates of the Soulless Citadel in the hands of an eighteen-year-old girl who broke the curse and saved her father.

Ryujinshi would have approved.`,
    abilities: `Dragon warrior of exceptional skill. Matched her brother in combat despite the power he had accumulated in the forge. Deeply attuned to the Almighty's presence, which gave her the strength to face something she loved and stop it.

Guardian of the Eternal Blade for centuries. Her connection to the blade's hiding place in the lava tubes suggests a continued protection that extends beyond her last known appearance.`,
  },

  {
    id: ID.NANA,
    name: "Nana Shiko",
    title: "The Wise One",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.LIGHT_WALKER,
    is_featured: false,
    sort_order: 16,
    description:
      "In her 80s. Mother of Sensei Lux. Grandmother to Emerald. Head of the Wise Council. Hears the Almighty's voice clearer than anyone else in the clan. Also not above catching her granddaughter trying to steal a dragon egg.",
    backstory: `Nana Shiko has been many things.

She was a warrior when the Light Walker Clan needed warriors. She became a council leader when they needed wisdom. She became a grandmother when Emerald needed someone who remembered her father before the curse made him a story.

She is in her eighties. She moves like the years are a minor inconvenience.

The clan calls her The Wise One because she hears the Almighty's voice clearer than anyone else. She does not trumpet this. She treats it as a practical fact, the same way she treats everything else. You need to hear something, she listens. She tells you what she hears. She drinks her tea.

She was the one who caught Emerald at the cliffside trying to steal a dragon egg. She stood there watching for fifteen minutes. When Emerald asked how her father had done it in the bedtime stories, Nana laughed and admitted that Lux had been embellishing considerably.

Emerald was deeply disappointed.

Nana considers this one of her better grandmother moments.`,
    abilities: `Deep prophetic connection to the Almighty. Hears his voice and interprets his intent with a clarity that most people in the Baransu Realm only access under extreme circumstances. Leads the Wise Council, the body within the clan responsible for interpreting the Almighty's guidance.

Experienced warrior in her past, though she primarily operates as a strategic and spiritual advisor now.`,
  },

  {
    id: ID.ALMIGHTY,
    name: "The Almighty",
    title: "Creator of All Realms",
    faction: "Almighty",
    era_id: ERA.ORIGINS,
    is_featured: false,
    sort_order: 17,
    description:
      "The Almighty is. The Almighty has always been. The Almighty will forever be. Creator of the Upper Realm, the Baransu Realm, the Shadow Realm, and every living thing within them.",
    backstory: `In the beginning, the Almighty created the Undying Ones.

Three groups. Three gifts. The Montes received wisdom. The Lacus received loyalty. The Robur received strength. Each gift was instilled into a gemstone of singular beauty.

He made the realms. The Upper Realm as his domain. The Baransu Realm for the mortals he would create. He gave the Novus People free will, which was the most generous and most dangerous thing he could have offered. No inborn gifts. No certainty. Just choice.

When Khaonai rebelled, the Almighty responded. The Robur were cast to the Shadow Realm. The Montes were transformed into stone giants whose size reflected the scale of their pride. The Lacus were stationed at Lake Shamakai to guard the boundary between realms.

When Tenebris cursed the Light Walker Clan, the Almighty did not immediately intervene. This is a question the Soulless warriors asked themselves many times in the Citadel. The answer is not simple. The Almighty operates on a timeline that does not match human expectation.

He carried Antonia to shore on the back of a sea creature when she had nothing left.

He answered Davie's prayer in the bottom of a dead man's ship.

He told Emerald, through her drowning father's voice at the bottom of a lake, not to give up.

He has a plan. He always has a plan. He just does not always explain it in the moment.`,
    abilities: `Omnipotent. Omnipresent. Created all things. His power flows through the Staff, through the gemstones, through chosen individuals who align themselves with his presence. The Eternal Blade itself was made from a design only possible because Kurogami understood how the Almighty structured power.

The Dark Whisper exists as a counterfeit of his voice. Every lie the Whisper tells is a distortion of something the Almighty actually offers.`,
  },

  {
    id: ID.WHISPER,
    name: "The Dark Whisper",
    title: "Voice of Khaonai",
    faction: "The Dark Ones",
    era_id: ERA.ORIGINS,
    people_group_id: GROUP.DARK_ONES,
    is_featured: false,
    sort_order: 18,
    description:
      "Not a person. Not a creature. A voice. It knows everything about you. Your thoughts, your failures, your desires. It has been talking to people since the Shadow Realm was sealed and it has gotten very good at it.",
    backstory: `The Dark Whisper does not announce itself.

It does not arrive in fire or shadow or with the thunder that announces something powerful. It arrives in the quiet. In the moment after a disappointment. In the space between who you are and who you thought you would be.

It is the voice of Khaonai's influence extending through the sealed wall of the Shadow Realm. Not Khaonai himself. Something he developed or became capable of during his imprisonment. A reach.

It knows your name. It knows the name of the person who hurt you. It knows what you wanted and what you got instead and it knows exactly how to frame the difference in the way most likely to make you act on your worst impulses.

It found Turkan and made him Tenebris. It found Kurogami and made him forge the Eternal Blade for the wrong reasons. It found warriors in the Soulless Citadel and turned them against each other. It found Kage in a moment of feeling unseen.

It does not need weapons. It needs access.

It sounds reasonable. That is the point. The promises it makes are wrapped in logic that sounds almost right. Freedom. Recognition. Power given to those the Almighty overlooked. The offer always sounds like justice.

It is never justice.`,
    abilities: `No physical form. Cannot be fought directly. Reaches into the hearts of individuals who have an open wound and speaks through that opening with knowledge that feels supernatural because it is.

Can mimic the voice of people the target trusts. Can see clearly into the desires and fears of anyone it has chosen to approach. Weakest against those with genuine contentment and those who actively choose gratitude.

Vi was one of the only people it approached and completely failed to gain any ground with.`,
  },
];

// ─── New characters to insert ─────────────────────────────────────────────────
const newCharacters = [
  {
    name: "Kuso",
    title: "The Fallen Light Walker",
    faction: "The Dark Ones",
    era_id: ERA.CURSED,
    people_group_id: GROUP.DARK_ONES,
    is_featured: false,
    sort_order: 19,
    description:
      "Former Light Walker. She did not defect out of hatred. She defected out of desperation. She had watched people she loved wait for a rescue that never came and decided to find another way. The Dark Whisper gave her one.",
    backstory: `Kuso was a Hogo-sha. One of the best. She trained alongside Emerald and Kage in the Forbidden Forest and understood the weight of what they were preparing for.

The difference between Kuso and the others was that she had watched someone she loved cross the threshold at eighteen. She knew exactly what the curse did. She had held the person she could not protect and felt the specific helplessness of watching something inevitable happen.

She started looking for alternatives.

The Dark Whisper found her at that exact moment. Logically, patiently, it offered her a path. The Eternal Blade could free the Soulless. The gemstones were accessible if you knew where to look. The prophecy said a Light Walker could wield the blade. Kuso was a Light Walker.

What the Whisper did not fully explain was what wielding the blade for the Dark Ones would actually accomplish. What Kuso thought was freedom for her loved ones and what Kuso was being used for were not the same thing.

By the time she understood the gap, she had committed too much to find her way back.

She hunted Emerald across the quest. She broke the Emerald of Wisdom. She drove a blade into Antonia's side. She killed Kilian.

At the bottom of Lake Shamakai, she found the Eternal Blade after the garden crumbled. She picked it up. She walked through the door to the Shadow Realm.

She opened the way to Khaonai.

The story is not over.`,
    abilities: `Full Hogo-sha training. The same technique set as the top Light Walker warriors, now bent entirely toward Dark One objectives. Capable of channeling the Almighty's power in a corrupted form.

Can shatter objects imbued with the Almighty's power through a concentrated dark curse, which she used to destroy the Emerald of Wisdom. Strategic, patient, and willing to wait for the moment of maximum impact before striking.`,
  },

  {
    name: "Sensei Murakai",
    title: "The First Sensei",
    faction: "Light Walker Clan",
    era_id: ERA.DAWN,
    people_group_id: GROUP.LIGHT_WALKER,
    is_featured: false,
    sort_order: 20,
    description:
      "The original leader of the Light Walker Clan. Brother of Turkan, who became Tenebris. He accepted the Almighty's call with gratitude when his brother accepted it with ambition. The Staff was given to his line. The consequences lasted for generations.",
    backstory: `Murakai and Turkan were chosen together.

The Almighty called them both to walk the Baransu Realm as leaders. He gave them power and presence and the expectation of wisdom. Murakai accepted with his eyes on the people he was meant to serve. Turkan accepted with his eyes on what the power would make him.

For a time, they worked together well.

The first sign of the split was subtle. A difference in how they made decisions. Murakai consulted the Almighty and waited. Turkan consulted his own judgment and moved quickly. Neither was wrong initially. The gap between them widened slowly.

The Staff of the Almighty was given to Murakai's line. This was not an honor Murakai requested. The Almighty gave it and Murakai accepted it with appropriate gravity.

Turkan noticed.

The rest of Turkan's story is Tenebris's story.

Murakai built the Light Walker Clan. He established the traditions, the training methods, the relationship with the power of the Almighty that all subsequent Hogo-sha and Sensei drew from. His tomb at the bottom of Lake Shamakai holds the first door the Almighty used to bestow the Staff.

Emerald found it. The blade fit the door. The garden rose.

Murakai's line and the Almighty's promise held. Across centuries of darkness, it held.`,
    abilities: `First and most direct wielder of the Staff of the Almighty. His understanding of the Almighty's power shaped everything that came after in the Light Walker Clan. Extraordinary combat skill. The founding techniques of the Hogo-sha all trace back to his training methods.`,
  },

  {
    name: "Chaska",
    title: "Elder of the Light Walker Clan",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.LIGHT_WALKER,
    is_featured: false,
    sort_order: 21,
    description:
      "Antonia's older sister. Responsible, precise, and deeply protective of the clan. Shot the man her sister loved to protect a sacred gem. Has carried the weight of that decision ever since.",
    backstory: `Chaska was the kind of person other people trusted with difficult things.

She was the older sister. Steady. Clear-headed. When Antonia brought Vegas home and the family opened their arms, Chaska kept hers at her sides. She tolerated him out of love for her sister. She watched. She paid attention.

She was right.

The night the Ruby disappeared, Chaska woke Antonia before anyone else knew what had happened. She found Vegas on the boat before he could get far. She put an arrow in his chest before he finished his speech about doing it for them.

She watched Antonia sail away on the same boat.

She has never spoken publicly about what that cost her. She went back to the clan. She led a section of the Light Walker women during the years in the Forbidden Forest. She was good at it. She still is.

The split between protecting the clan and protecting her sister is a math she has never been able to fully resolve. She chose the clan. She believes she was right.

She has not stopped thinking about it.`,
    abilities: `Elite archer. The shot that took Vegas was difficult by any measure and she made it under duress. Fully trained Light Walker warrior with extensive combat experience. Natural leader who commands respect through consistency rather than charisma.`,
  },

  {
    name: "Vegas",
    title: "The Wanderer Who Stole the Ruby",
    faction: "Novus People",
    era_id: ERA.CURSED,
    people_group_id: GROUP.NOVUS,
    is_featured: false,
    sort_order: 22,
    description:
      "A man from another land who saved Antonia's life and won her heart. He was welcomed into the Light Walker Clan family. Then one night he took the Baransu Ruby and ran. The story of whether he loved her is more complicated than it looks.",
    backstory: `Vegas came from somewhere outside the Light Walker Clan's territory.

He saved Antonia on one of her adventures. She brought him home. Lux trained him. The clan accepted him. He was charming and capable and Antonia was in love with him in the way that makes everything else seem smaller.

When he took the Ruby, he had reasons. He laid them out for Antonia when she found him on the boat. Power, security, a future for their child that he could not provide any other way. He was not lying about all of it.

He also was not telling the whole truth about what he intended to do with the gem.

She asked him to come back. He almost reached for her hand. Chaska's arrow found him first.

He told Antonia he loved her. He touched her stomach. He died on the boat in her arms.

The question of whether he was a man who made one catastrophic mistake or a man whose character was always this is a question Antonia has never fully answered. She has had a long time at sea to think about it.`,
    abilities: `Skilled traveler and survivor. Fast on his feet and capable in a crisis, which is how he was able to save Antonia when they first met. No combat training in the Light Walker tradition.`,
  },

  {
    name: "Tika Lux",
    title: "Firstborn Son of the Great Lux",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.SOULLESS,
    is_featured: false,
    sort_order: 23,
    description:
      "Sensei Lux's firstborn son. He was a baby when the curse began. He grew up with the knowledge that his eighteenth birthday would take him. His father's voice was a whisper his mother kept alive for him until the day arrived.",
    backstory: `Tika was a baby on the morning of the battle.

His father held him before the house came down. Whispered to him that he would be mighty. That he would lead with strength. That Lux would teach him the ways of the Almighty.

Then the house collapsed and Lux did not make it through the door and Tika grew up in the Forbidden Forest with his mother and sister and the weight of knowing what was coming.

He grew up knowing exactly what happened to firstborn sons of the Light Walker Clan on their eighteenth birthday. His mother told him the truth because Melea believed in the truth. She trained him as much as the curse allowed. She told him stories about his father.

She told him the one about breakfast and rice and fried eggs so many times that Tika memorized it before he was ten.

On his eighteenth birthday, the Soulless Citadel received him.

He arrived in the dark with his father's voice in his memory and his mother's training in his hands.

He was not alone. His father was already there.

When the curse broke and the Light Walkers reappeared in the Forbidden Forest, Tika was among them.`,
    abilities: `Raised with as much Light Walker training as the curse's restrictions allowed. Carries the Almighty's power in him by birthright, though it was suppressed in the Citadel. His deep knowledge of his father's stories and his mother's teachings gave him a psychological grounding the Citadel could not erode.`,
  },

  {
    name: "Benaijah",
    title: "Son of the Sea",
    faction: "Pirates of Fukushu",
    era_id: ERA.CURSED,
    people_group_id: GROUP.PIRATES,
    is_featured: false,
    sort_order: 24,
    description:
      "Son of Antonia and Vegas. The Almighty told Antonia before he was born that he would be a wild man in constant struggle with all people, but that no one would be able to defeat him. He is living up to that description completely.",
    backstory: `Benaijah grew up in a port town that asked no questions.

His mother made swords. She was quiet and kept to herself and taught him to do the same. He did not. He was loud and curious and always in some situation that should not have been survivable and was.

The Almighty's word about him was specific: wild. In constant struggle with all people. Undefeatable.

The first two characteristics were obvious from early childhood.

He was in the tree his mother hid him in when the pirates came and the Forgotten Ones took her. He stayed in the tree until the noise stopped. Then he climbed down and tried to find her.

He did not find her that night.

Captain Davie eventually returned him to Antonia. By then, Benaijah had opinions about pirates and about port towns and about the kinds of situations his mother kept getting herself into.

He is not wrong about any of it.

He sails with Antonia now. The Almighty said no one would defeat him. So far, the Almighty is correct.`,
    abilities: `Natural fighter with no formal training and an instinct for survival that borders on unreasonable. The Almighty's blessing on him has manifested as a consistency in coming through things that should not have been survivable. He does not know how to explain this and has stopped trying.`,
  },

  {
    name: "The Lacus Queen",
    title: "Guardian of Lake Shamakai",
    faction: "Lacus People",
    era_id: ERA.DAWN,
    people_group_id: GROUP.LACUS,
    is_featured: false,
    sort_order: 25,
    description:
      "Leader of the Lacus People at Lake Shamakai. The Almighty stationed the Lacus at the boundary between realms after Khaonai's rebellion. She has guarded that boundary for longer than most civilizations have existed.",
    backstory: `When the Almighty cast the Robur to the Shadow Realm and the dust settled from the war in the Upper Realm, he turned to the Lacus.

He gave them a post. The door between realms at Lake Shamakai. Their gift was loyalty, and their assignment tested that gift completely. Guard the boundary. Keep it sealed. Allow no crossing without authority.

They have not left since.

The Lacus Queen inherited leadership of the guardianship at a point so far back that the precise history is more myth than record. She does not rule the Lacus in the way kings rule kingdoms. She is more of a living institution: the embodiment of the compact made with the Almighty, maintained through centuries of faithfulness.

She gave Emerald the magical air bubble that allowed her to reach the bottom of Lake Shamakai. She warned her about Takai, the giant eel who guarded the Pearl of Honor at the deepest crevasse. She told her she would have to pass the test.

She did not offer to make the test easier. That was not her role.

When the Pearl was claimed and the quest moved forward, she watched. She had been watching for a very long time.`,
    abilities: `Keeper of the Pearl of Honor. Deep attunement to the boundary between realms, which she monitors continuously. Her loyalty to the Almighty's compact is the foundation of everything. Centuries of faithful post have given her an authority in the spiritual dimensions of the Baransu Realm that few others can match.`,
  },

  {
    name: "Takai",
    title: "Guardian of the Pearl",
    faction: "Lacus People",
    era_id: ERA.DAWN,
    people_group_id: GROUP.LACUS,
    is_featured: false,
    sort_order: 26,
    description:
      "The giant eel who guards the Pearl of Honor at the bottom of Lake Shamakai. Does not make the test easy. That is the whole point.",
    backstory: `Takai waits at the bottom of the deepest crevasse in Lake Shamakai.

He has been there since before anyone alive can remember. Whether he is mortal or something else, no one who has attempted the descent has felt comfortable asking.

His role is simple. The Pearl of Honor cannot be taken. It must be earned. The test he administers is not combat. It is truth. He looks at the person descending and identifies what they are most afraid of. Then he confronts them with it directly.

When Emerald reached the bottom, Takai popped her air bubble.

She panicked. She almost drowned. Grummel dove after her and pulled her to the surface unconscious.

In the moments between waking and darkness, she connected with her father at the bottom of Lake Shamakai. Lux told her not to give up.

She went back down. The second time, she moved through her fear rather than away from it. She reached the Pearl.

Takai watched her take it. He did not stop her.

He had been waiting for someone who could pass for a very long time. He went back to waiting.`,
    abilities: `Size and physical strength far beyond any natural eel. Ability to assess the deepest fear of any individual who enters his territory. The test he administers is spiritual as much as physical. He can be circumvented only by someone who has genuinely faced what he shows them.`,
  },

  {
    name: "Kaito",
    title: "The Spaceman",
    faction: "Light Walker Clan",
    era_id: ERA.CURSED,
    people_group_id: GROUP.LIGHT_WALKER,
    is_featured: false,
    sort_order: 27,
    description:
      "Light Walker firstborn son who refused to wait for his eighteenth birthday. Went through the portal between realms and became an astronaut in the other world. Is studying quantum physics to find the Soulless Citadel. He believes it exists in the quantum space between light and darkness.",
    backstory: `Kaito was fourteen when he worked out what the Soulless Citadel was.

Every firstborn son in the clan knew the story. You trained. You waited. At eighteen, the curse took you. You went to the Citadel. That was the deal whether you agreed to it or not.

Kaito did not agree to it.

He had gotten hold of a book about the realm beyond the portal, the place some called the realm of man. The book described a field of science called quantum mechanics. The behavior of particles in the space between defined states. Objects that exist in two places at once until someone observes them. States that are neither one thing nor another.

The Soulless Citadel was described as between light and darkness.

Kaito read that phrase and put it next to the quantum description and spent three days very quiet.

He told his mother the night before he left. She cried. She was proud. He crossed through the portal at dawn.

On the other side, he learned the language. He studied. He worked. He built a life aimed entirely at a single understanding: where is the Citadel, what is it made of, and how do you reach into a quantum state and pull someone out.

He has not come back yet.

He has not forgotten what he is looking for.`,
    abilities: `Exceptional analytical mind. Trained Light Walker warrior, though he left before completing the full Hogo-sha program. Extensive knowledge of quantum physics and theoretical frameworks for understanding the space between realms.

The specific skill set he has developed may be the key to understanding the Citadel's mechanics in ways that traditional combat and power approaches cannot reach.`,
  },

  {
    name: "Captain Maccray",
    title: "The Pirate Hunter",
    faction: "Rogue Navy",
    era_id: ERA.CURSED,
    people_group_id: GROUP.ROGUE_NAVY,
    is_featured: false,
    sort_order: 28,
    description:
      "A pirate who turned on Vane and paid a permanent price for it. Vane's sword left a curse on him. He became the Pirate Hunter. He came to the Baransu Realm looking for Vane to settle the account.",
    backstory: `Maccray sailed under Vane for years.

He was good at it. Vane was effective if you kept your head down and did not ask questions. Maccray eventually asked the wrong question at the wrong time, or pushed back when Vane's orders crossed a line Maccray was not willing to cross.

The details of the falling out are not widely known. What is known is the consequence.

Vane's sword carries a darkness from the Whisper's influence. When Vane turned it on Maccray, the wound did not heal the way wounds are supposed to. It changed him. The curse took root.

He became the Pirate Hunter. Not because he was asked to. Because something in the curse redirected him. He hunts pirates now, specifically the ones who serve the Dark Ones. He found his way to the Baransu Realm following the trail of the Forgotten Ones and the reports of Vane's movements.

He is looking for Vane.

He has found a lot of other things along the way.`,
    abilities: `Experienced sailor and pirate-turned-hunter. Knows the tactics, the hiding spots, the supply chains, and the psychology of piracy from the inside. The curse Vane left on him has given him an unnatural ability to track those who serve the Dark Ones, a kind of dark intuition that points him in the right direction.

It costs him something to use it. He uses it anyway.`,
  },
];

// ─── Run ──────────────────────────────────────────────────────────────────────
async function main() {
  let passed = 0;
  let failed = 0;

  // Update existing characters
  console.log(`Updating ${updates.length} existing characters...`);
  for (const char of updates) {
    const { id, ...fields } = char;
    const { error } = await supabase
      .from("characters")
      .update(fields)
      .eq("id", id);
    if (error) {
      console.error(`  FAIL ${char.name}: ${error.message}`);
      failed++;
    } else {
      console.log(`  OK   ${char.name}`);
      passed++;
    }
  }

  // Insert new characters
  console.log(`\nInserting ${newCharacters.length} new characters...`);
  const { data: inserted, error: insertErr } = await supabase
    .from("characters")
    .insert(newCharacters)
    .select("id, name");

  if (insertErr) {
    console.error(`  FAIL insert: ${insertErr.message}`);
    failed++;
  } else {
    inserted.forEach((c) => console.log(`  +    ${c.name}`));
    passed += inserted.length;
  }

  console.log(`\nDone. ${passed} succeeded, ${failed} failed.`);
}

main();
