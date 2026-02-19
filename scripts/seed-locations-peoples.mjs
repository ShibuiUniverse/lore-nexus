/**
 * Seeds locations (realms/map regions) and people group descriptions.
 * Adds new locations from the Baransu map and enriches all people groups.
 * Usage: node --env-file=.env scripts/seed-locations-peoples.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// ─── Existing location IDs ────────────────────────────────────────────────────
const LOC = {
  FUKUSHU_BAY:     "eb4a5ca3-c902-4056-8d72-33886cff64e1",
  LW_NEW_VILLAGE:  "e9d8ae7e-644b-4468-9a74-911a248461db",
  LW_OLD_VILLAGE:  "5b01257e-6fc4-47ab-a52c-29278cd91bc8",
};

// ─── Existing people group IDs ────────────────────────────────────────────────
const GROUP = {
  KUBU:         "171eb3f9-93fc-47b0-b7f6-65f2ca87008f",
  LACUS:        "d74692b3-f0e0-4d61-84f1-6dcb92d2faba",
  LIGHT_WALKER: "36c41662-3c0e-4731-817d-980816cfb9ff",
  MONTES:       "ab99d79f-0d09-4993-8734-7afa87d7786e",
  NOVUS:        "d6101ab2-43c1-416a-98e1-e459c0917eab",
  PIRATES:      "c0a8152a-5588-449e-ba9a-1642bf011ab9",
  ROGUE_NAVY:   "1843bfc4-7da6-4c67-ab37-187f5ccadfe7",
  SOULLESS:     "4ecde5da-8ded-4790-9484-9f79bbb9dd1f",
  TENSHI:       "a765d20b-c1ca-4179-95bf-af644464dcc0",
  DARK_ONES:    "f52c1558-7e25-4031-9162-7ec01676d7a4",
  UNDYING:      "2dd456af-7cf4-4f1b-b33d-391d491e8a3f",
  DARK_PIRATES: "4f2fb7c6-6ab8-40ff-9b7b-8ce9cc56e13f",
};

// ─── 1. Update existing locations ─────────────────────────────────────────────
const locationUpdates = [
  {
    id: LOC.FUKUSHU_BAY,
    name: "Fukushū Bay",
    region: "Fukushū Sea",
    description: "A wild place with a law of its own.",
    history: `Nobody owns Fukushū Bay. That is the point.

The bay carved out its reputation the same way it carves its coastline — slowly, relentlessly, and with no concern for anyone's opinion. Outcasts, runaways, pirates, merchants who ask too few questions — they all end up here eventually. The jagged rocks that line the harbor entrance have claimed more ships than any battle. The ones that make it through are the ones that belong here.

The town built itself around the bay over generations with no plan and no authority. It grew the way things grow when nobody is telling them what to do. Crooked, loud, and surprisingly resilient.

The Pirates of Fukushū rule the surrounding waters. They do not rule the bay itself. Nobody does. That distinction matters to the people who live here.`,
    culture: `If you have a problem with someone in Fukushū, you solve it yourself. There are no courts. There is no guard. There is a code, unwritten and enforced by reputation alone, and it works because everyone here has something to lose.

The bay celebrates strength, cunning, and loyalty to your crew above everything else. Betrayal is the only true crime. Everything else is business.`,
  },
  {
    id: LOC.LW_NEW_VILLAGE,
    name: "Light Walker Village",
    region: "The Forbidden Forest",
    description: "Hidden deep inside the Forbidden Forest. The clan rebuilt here after the curse drove them from the Valley. The forest protects them. Most of the time.",
    history: `When Tenebris unleashed the curse and the men of the Light Walker Clan were taken to the Soulless Citadel, the women and children who remained had two choices. Surrender or disappear.

They disappeared into the Forbidden Forest.

The forest is not easy to live in. The trees shift. The paths change. Animals that would flee from any other human presence stay close to the Light Walkers, as if recognizing something in them. Melea led the survivors deeper in than most people dare to go, and they built something new in the heart of it.

The village has no fixed address on any map. That is by design.`,
    culture: `The village runs on the Hogo-sha tradition. Every firstborn daughter trains as a guardian from the time she can hold a blade. The Almighty's power flows through their training. The forest teaches the rest.

The clan's lullabies are their history. The old songs carry names and battles and warnings in melodies that children memorize before they can read. Sensei Lux used those same songs to hold the men together inside the Soulless Citadel.`,
  },
  {
    id: LOC.LW_OLD_VILLAGE,
    name: "Light Walker Old Village",
    region: "The Valley of Zillarnia",
    description: "The ancestral home of the Light Walker Clan. Once the heart of the realm. Now silent.",
    history: `Sensei Murakai himself chose this place. He walked the entire Valley of Zillarnia before settling here, and when he found the right ground he stopped and said this was it. For generations, the Light Walker Clan built their lives around that choice.

The village sat at the crossroads of the most fertile land in Baransu. Other peoples traded with them. Children grew up knowing the names of every neighbor for a day's walk in any direction. It was not just a village. It was an idea — that people of different kinds could live close to the Light and be safe.

Then Tenebris came.

The curse took every man. The women who remained tried to hold on, but the village without its guardians became impossible to defend. They made the choice to leave rather than be picked apart. They left everything standing. They walked into the forest and did not look back.

The buildings are still there. The fire pits. The training grounds. The mark of generations of Light Walkers carved into the great tree at the village center. Just empty.`,
    culture: `The old village culture lives on in the new one. The Hogo-sha tradition started here. The vow Sensei Murakai made to the Almighty was made on this ground. The Light Walkers who grew up in the new village have never seen this place, but they know every corner of it from the songs.`,
  },
];

// ─── 2. New locations to insert ───────────────────────────────────────────────
const newLocations = [
  {
    name: "Lake Shamakai",
    region: "The Forbidden Forest",
    description: "The oldest and purest freshwater source on Baransu. Sacred. Dangerous. Home to the Lacus People.",
    history: `The Almighty placed the Lacus at Lake Shamakai for a reason. Beneath the surface of the water lies the door to the Shadow Realm. The Lacus guard it. They have guarded it since the beginning. Since Khaonai and the Robur were banished.

The lake is vast and still in a way that makes people uneasy. The water is clear enough to see deep, but the depths keep going past where light reaches. The Shamakai Eel Dragon hunts below the surface. It is ancient and territorial and not something a reasonable person goes near.

The Pearl of Honor rests with the Lacus at the bottom of this lake. Emerald had to earn the right to even speak to the Lacus Queen before she could ask for it.`,
    culture: `The Lacus do not come to the surface often. They do not need to. Their loyalty runs deep — to the Almighty, to their duty, to each other. They are the most ancient people in Baransu and they know it. Not with pride. With weight.`,
    is_featured: true,
    sort_order: 2,
  },
  {
    name: "The Forbidden Forest",
    region: "Central Baransu",
    description: "It functions like a single living organism. The trees communicate. The paths shift. Nothing enters or leaves without the forest knowing.",
    history: `The first Baransu Elm grew from a seed the Almighty planted himself. Every tree that came after grew from that one. Which means the forest is not just a forest. It is one thing, connected root to root across hundreds of miles, aware of everything that moves through it.

The Light Walker Clan learned to read the forest early. They learned which shifts in the canopy meant danger was close and which meant something sacred was nearby. The forest protected them in return. When the clan fled the Valley of Zillarnia, the forest opened for them and closed behind them.

The Dark Ones cannot navigate it. Every attempt to push through ends the same way — lost, disoriented, turned around. The forest does that deliberately.

The Canyon of Despair sits in the forest's heart. Beautiful and deadly, where dragons nest.`,
    culture: `The Forbidden Forest has no culture of its own. It has something better. Memory. It remembers every person who has ever walked through it. The Light Walkers say you can feel the difference between a tree that has seen peace and one that has witnessed battle. They are probably right.`,
    is_featured: true,
    sort_order: 3,
  },
  {
    name: "The Desert of Setra",
    region: "Western Baransu",
    description: "Desolate and unending. Few return from it. The ancient prophets called it home once. They are gone now.",
    history: `There is a reason prophets chose this place. The desert strips everything away. No comfort, no distraction, nothing between a person and whatever they are searching for. The Tenshi Clan's ancestors crossed it on foot generations ago and came out the other side with scrolls full of prophecies that the rest of Baransu has been trying to understand ever since.

The prophets are gone. What happened to them is not fully known. Some say they found what they were looking for. Some say the desert consumed them the way it consumes everything eventually.

The scroll Kilian carried across the desert named Emerald as the chosen one. His father gave it to him and told him to find her. He crossed Setra to do it.`,
    culture: `The Tenshi Clan navigated the desert through tradition and training passed down through generations. They memorized star charts and pressure changes and the sounds the sand makes before a storm hits. They were never a large people. They were a precise one.`,
    is_featured: false,
    sort_order: 7,
  },
  {
    name: "The Dragon Islands",
    region: "Southern Baransu",
    description: "Dragons are the smiths of all weapons of power in Baransu. These islands are their forge.",
    history: `Every weapon of real power in Baransu came from here. The dragons who inhabit the islands have been crafting since before the Novus People existed. Some dwell in the forests of the upper islands. The Sea Dragons live in the volcano-carved southern isles, building their forges inside Erdekan, the underwater volcano.

Not every dragon forges. Not every dragon can be worked with. The ones that will work with you demand something in return, and what they demand is never simple.

The Eternal Blade was forged in these islands. That is not a thing people say casually.`,
    culture: `Dragons do not have culture the way people do. They have allegiances. Some serve the Almighty. Some serve themselves. Some have made arrangements with people or factions that outsiders do not know about. The islands are not a place you visit without knowing who you are going to meet.`,
    is_featured: true,
    sort_order: 8,
  },
  {
    name: "Canyon of Despair",
    region: "The Forbidden Forest",
    description: "Beautiful. Lush. The most dangerous place in the Forbidden Forest. Dragons nest here.",
    history: `It has that name because of the people who came looking for the beauty and found the dragons instead. The canyon is genuinely stunning. Waterfalls, old growth, light cutting through the canopy in ways that make people stop and stare. They are staring when the dragons find them.

The dragons who nest here are not the forging kind. They are territorial and ancient and they do not negotiate. The Light Walkers know to go around. Everyone else learns the hard way.`,
    culture: `No one lives in the Canyon of Despair. The dragons made sure of that.`,
    is_featured: false,
    sort_order: 9,
  },
  {
    name: "The Portal to Realms",
    region: "Baransu — location shifts",
    description: "Unpredictable and dangerous. A gateway that moves between realms on its own schedule. The Dark Pirates have been hunting the ruby that controls it.",
    history: `No one built the portal. It has always been there, or rather, it has always been somewhere. The portal moves. It does not announce where it is going or when. People have stumbled into it by accident and never come back. People have searched for it their whole lives and never found it.

The Baransu Ruby allegedly controls its movement — whoever holds the ruby can direct where and when the portal opens. That is why Vane's Dark Pirates want it. That is why their masters want them to find it.

Kaito went through the portal as a young man. He was looking for his father. He came out the other side in a different realm entirely and spent years trying to understand where he was and how to get back.`,
    culture: `The portal is not a place anyone lives. It is a fact of Baransu. Something the Lacus People know about, something the old prophets wrote about, something that shapes the politics of the realm from a distance.`,
    is_featured: true,
    sort_order: 5,
  },
  {
    name: "Reckoning Island",
    region: "Northern Sea",
    description: "Remote. Ice-prone. Accessible only in warm seasons. The sky does things above this island that it does nowhere else.",
    history: `The island sits far enough north that most sailors consider it not worth the journey. The waters around it are cold and unpredictable. Sea creatures that do not appear anywhere else in Baransu patrol those waters.

In the darkest part of winter, the sky above the island fills with light. Colors that have no names. The Light Walkers have a word for it but they do not share it with outsiders. Whatever the lights mean, people have been making the difficult journey to see them for generations.

No permanent settlement has survived here long. The island does not seem to want one.`,
    culture: `No permanent people. Occasional visitors. The island belongs to itself.`,
    is_featured: false,
    sort_order: 10,
  },
  {
    name: "The Soulless Citadel",
    region: "Upper Realm border — floating",
    description: "A floating fortress that holds no one in but lets no one go free. Every Light Walker man is trapped inside it. Sensei Lux leads them from within.",
    history: `Tenebris cursed the Light Walker men into the Soulless Citadel before he was himself cast down to the Shadow Realm. The curse was precise and cruel. The men are alive. They are together. They cannot leave.

Inside, the Dark Whisper works constantly. It finds the cracks in a man and speaks through them. Promises freedom. Promises revenge. Promises anything. Many have fallen to it. The fallen become part of the Citadel's dark horde — still alive, barely recognizable.

Sensei Lux created the Arena. No death in the Arena, only will. Every day the men who have not fallen train and fight and refuse to surrender. They sing the old lullabies. They carry the sun in their chests when there is no sun to see.

No sunrise. No sunset. No days. But Lux is in there. And Lux does not quit.`,
    culture: `Two groups inside the Citadel: the ones still fighting, and the ones the Whisper has taken. Lux keeps the border between them. The song of the Light Walkers is the weapon. It reminds the men who they are when the darkness tries to make them forget.`,
    is_featured: true,
    sort_order: 6,
  },
  {
    name: "Bay of Monsters",
    region: "Eastern Sea",
    description: "The most dangerous stretch of water in Baransu. Home to creatures that have no name. The legendary Shadow hunts these waters.",
    history: `Ships that enter the Bay of Monsters do so knowing the risk. The bay has its own economy built around that risk — people willing to cross it for the right price, guides who claim to know the safe routes, insurance brokers in Fukushū who will write you a policy and pray you do not collect.

The Shadow is real. It is enormous enough to blot out the sun when it surfaces. Sailors argue about what it is. They do not argue about whether it is. Everyone who has seen it agrees on the size. Most of them do not agree on anything else, because most of them do not survive long enough to compare notes.`,
    culture: `The bay has no inhabitants. It has survivors.`,
    is_featured: false,
    sort_order: 11,
  },
  {
    name: "The Kubu Forest",
    region: "Upper Mountains — southern border",
    description: "A dense bamboo grove at the foot of the Upper Mountains. The Kubu People protect it. Their magic is peculiar and extremely effective.",
    history: `The Kubu Forest does not look dangerous. That is by design. The Kubu People cultivated it over generations, weaving their particular magic into every root and stalk until the forest became something more than a forest. It became a maze for anyone who enters without permission, and a safe passage for anyone the Kubu choose to help.

When Emerald and Kilian were fleeing the Dark Ones after the ambush on the Upper Mountains, the Kubu opened the forest for them. The Dark Ones chasing them entered the same forest and were immediately lost.

The Kubu do not explain how their magic works. They do not need to.`,
    culture: `The Kubu are elusive. They are not unfriendly — they are selective. They protect the Almighty's creation. They take that charge seriously. Anyone who respects the forest and comes in peace will find them generous. Anyone who comes with harm in mind will find the bamboo has closed behind them and the paths have stopped making sense.`,
    is_featured: false,
    sort_order: 12,
  },
  {
    name: "The Valley of Zillarnia",
    region: "Central Baransu",
    description: "Once the most fertile and peaceful land in Baransu. Home to generations of Light Walkers and countless others. The valley still stands. Most of its people do not.",
    history: `Sensei Murakai chose the Valley of Zillarnia as the heart of the realm because it was the best land in Baransu. Good soil. Clean water. Mountain ranges on either side that broke the worst storms. He built the Light Walker Clan's first permanent home here and invited other peoples to settle nearby.

For generations it worked. The valley became the closest thing Baransu had to a center. Trade routes ran through it. Children grew up knowing the names of peoples their grandparents had never met. The Light Walkers guarded it and everything around it.

Then the war came. Then the curse. Then the men were gone and the women took the children into the forest and the valley emptied out. It has been mostly silent since.

The old village stands untouched in the valley's heart. Nobody has claimed it. Nobody has burned it. It waits.`,
    culture: `The valley has no active culture now. It carries the memory of one. The ruins of different peoples' settlements, different architectural styles, different planting patterns — it is a record of what Baransu was before the darkness.`,
    is_featured: true,
    sort_order: 1,
  },
  {
    name: "The Upper Mountains",
    region: "Northern Baransu",
    description: "Where the Montes Giants live. The mountains are their home and their punishment — shaped to match the size of their pride.",
    history: `The Almighty sent the Montes to the Baransu Realm because even the faithful had their problems. The Montes had wisdom. They also had pride in their wisdom, which is a different thing entirely. The Almighty transformed them into giants — their physical size a reflection of how large they thought themselves.

Every Montes's stature is in direct proportion to their pride. Grummel, the smallest among them at eight feet, is also the wisest. He is the only Montes to have made a vow against violence, and the only one who recognized Emerald's father as someone worth knowing.

The Emerald of Wisdom is kept in the Upper Mountains. The Montes do not give it away. Earning it is a test.`,
    culture: `The Montes are proud. That is the whole problem and the whole point. Their wisdom is real — they remember things that happened before the Novus People existed. Their pride gets in the way of sharing it usefully. The ones who have started to address the pride become smaller. None of them like to talk about that.`,
    is_featured: false,
    sort_order: 4,
  },
];

// ─── 3. People group updates ──────────────────────────────────────────────────
const groupUpdates = [
  {
    id: GROUP.LIGHT_WALKER,
    name: "Light Walker Clan",
    description: "Chosen by the Almighty. Protectors of the realm. Guardians of the Staff. Currently split between those trapped in the Soulless Citadel and the women holding everything together in the Forbidden Forest.",
    culture_text: `The Light Walker Clan traces its origin to Sensei Murakai, the first man the Almighty personally trained in Baransu. Murakai made a vow to protect the realm and pass the Almighty's power to those who came after him. Every generation of Light Walkers has lived inside that vow.

The Hogo-sha are the clan's guardians — elite warriors trained in combat and in channeling the Almighty's power. Traditionally the firstborn daughter of each family. After the curse took the men, every woman in the clan became Hogo-sha.

The clan's culture runs through its songs. The lullabies carry history, names, battles, and warnings. Children memorize them before they learn to read. Sensei Lux used those same songs inside the Soulless Citadel to keep the men from losing themselves.

They do not fight for glory. They fight because someone has to.`,
    traditions: `The Almighty's power flows through the clan's training. They learn to channel it through their blades and bodies from a young age. The power is not automatic — it requires discipline, faith, and a clear enough mind to hold it. The Whisper goes after the mind first because it knows that.

The clan's vow, made by Murakai and renewed by every Sensei since, commits them to protecting Baransu as long as they draw breath. It is not conditional. That is the point.`,
  },
  {
    id: GROUP.LACUS,
    name: "Lacus People",
    description: "One of the three original Undying Ones. Loyal, honorable, ancient. They guard the door between the Shadow Realm and Baransu from the depths of Lake Shamakai.",
    culture_text: `The Almighty created the Lacus to bear loyalty and honor. They are the only Undying Ones who did not fail him. When Khaonai rebelled, the Lacus fought alongside the Almighty. When it was over, the Almighty honored their faithfulness by giving them purpose — guarding the door between the Shadow Realm and Baransu at Lake Shamakai.

They have been there ever since. The Shadow Realm has not breached. That is entirely because of the Lacus.

They hold the Pearl of Honor. Not as a prize — as a charge. The Pearl was given to them because they earned it.`,
    traditions: `The Lacus do not surface often. Their world is the water, the depth, the watch. They are not unfriendly but they are not social. They have had the same purpose for longer than most peoples have existed and they take it seriously in a way that can make conversation difficult.

Visitors to Lake Shamakai who come with respect may earn an audience. Coming without it is a shorter story.`,
  },
  {
    id: GROUP.MONTES,
    name: "Montes Giants",
    description: "The Undying Ones of wisdom. Transformed into giants by the Almighty — their size a direct reflection of their pride. They keep the Emerald of Wisdom in the Upper Mountains.",
    culture_text: `The Almighty created the Montes to bear his wisdom and knowledge. They were faithful in the rebellion. They fought alongside him against Khaonai. But even before the battle was over, the pride was already growing.

So the Almighty sent them to the Baransu Realm and transformed them. Every Montes is as large as their pride is great. The tallest among them can barely move through the mountain passes they call home. Grummel, eight feet tall, is the smallest — and the most interesting to talk to.

The Montes remember things no one else does. Ancient history, forgotten magic, the names of things that existed before Baransu had people in it. The pride makes them difficult. The wisdom makes them worth the difficulty.`,
    traditions: `The Montes do not give their knowledge away. They test for it. Earning the Emerald of Wisdom requires winning the clan's respect, which means dealing with their pride directly. Most people do not survive the conversation long enough to get to the test.

Grummel is the exception. He made a vow against violence generations ago and kept it. The other Montes think he is eccentric. He might be the only truly wise one among them.`,
  },
  {
    id: GROUP.NOVUS,
    name: "Novus People",
    description: "Humans. Made by the Almighty as a new beginning after the Undying Ones failed him. Given free will above all else — no inborn gifts, no divine loyalty, just choice.",
    culture_text: `The Almighty grieved the Undying Ones. He wanted something different. So he made the Novus People in the Baransu Realm — not eternal, not gifted with power, but free. Free to choose their own paths. Free to seek the Almighty or turn away. Free to build or destroy.

Their choices bring life eternal or never-ending death. That weight is built into who they are, whether they know it or not.

Most of the peoples of Baransu are Novus. The Light Walkers. The Tenshi Clan. The Pirates. The people of Fukushū. The farmers in the Valley of Zillarnia before the curse. All of them are Novus People first, and whatever else they became second.`,
    traditions: `No single tradition. The Novus People are defined by their diversity more than anything else. What they share is the capacity for choice — for good and for catastrophic wrong. The Almighty walks in Baransu still, watching what they do with it.`,
  },
  {
    id: GROUP.TENSHI,
    name: "Tenshi Clan",
    description: "The prophets of the Desert of Setra. A small, precise people who crossed the western desert and came back with scrolls full of things no one else knew yet.",
    culture_text: `The Tenshi Clan's ancestors crossed the Desert of Setra on purpose. They went looking for something — clarity, truth, whatever the desert strips away comfort to reveal — and came back with prophecies that have been shaping Baransu's events ever since.

They are not warriors. They are not traders. They are keepers of knowledge that other people do not want to know yet. Kilian's father was the Tenshi Clan leader who had been entrusted with a prophecy scroll for generations. He gave it to his son and told him to cross the desert and find the girl it named.

The clan is small and deliberate. Every action is considered.`,
    traditions: `The Tenshi hold prophecy as sacred trust, not personal power. The scroll is not theirs. They are its guardians. When the time comes, they deliver it to the right hands and step back. That is the tradition. Kilian's entire arc started because his father did exactly that.`,
  },
  {
    id: GROUP.KUBU,
    name: "Kubu People",
    description: "The elusive guardians of the Kubu Forest. Their magic is peculiar, practical, and impossible to understand from the outside. They protect the Almighty's creation.",
    culture_text: `The Kubu do not announce themselves. You know you are in Kubu territory when the forest stops making sense — when paths you walked ten minutes ago no longer go where they went, when the bamboo seems closer than it was. If the Kubu want you lost, you are lost. If they want you through, you are through.

They protect the forest because the forest is part of what the Almighty made. They take that charge as seriously as the Lacus take their watch at Lake Shamakai.

Their magic is woven through the forest itself — roots, stalks, soil. They did not build this magic overnight. Generations of cultivation.`,
    traditions: `The Kubu are selective about contact. They helped Emerald and Kilian escape the Dark Ones through the forest without a word of explanation — opened the path, closed it behind them, and vanished. That is how they operate. They observe before acting. They act quietly. They do not explain themselves afterward.`,
  },
  {
    id: GROUP.PIRATES,
    name: "Pirates of Fukushū",
    description: "Raiders of the Fukushū Sea. Not mindless — principled, in their own way. Captain Antonia leads them now. They ended up in the middle of a war that is bigger than treasure.",
    culture_text: `The Pirates of Fukushū are not just criminals. They have a code. It is not the realm's law, but it is a law, and they enforce it among themselves with the same ferocity they bring to the water.

Crew loyalty is everything. Betray your captain, betray your ship, and you are done in these waters. Betray your crew's families, and you are done everywhere else too. The pirates have long memories.

They started as outcasts. People who could not or would not fit inside the realm's structures, who found their way to Fukushū and discovered that the bay did not care about their histories.`,
    traditions: `The sea is their home. They know it the way the Light Walkers know the forest — not from maps but from time. The rocks, the currents, the creatures, the seasons. That knowledge is passed down crew to crew.

Captain Antonia brought them into a war against the Dark Ones they did not sign up for. They stayed anyway. That says more about her than about the code.`,
  },
  {
    id: GROUP.DARK_PIRATES,
    name: "Vane's Dark Pirates",
    description: "Pirates who serve something darker than treasure. Captain Vane's crew hunts the Baransu Ruby — the key to controlling the Portal to Realms — on behalf of masters they do not name.",
    culture_text: `Where the Pirates of Fukushū have a code, the Dark Pirates have a contract. They serve the Dark Ones and the interests behind them. The Baransu Ruby would give their masters the ability to open and direct the Portal to Realms — which would change everything about the balance between Baransu and the Shadow Realm.

Most of the crew does not fully understand what they are helping to accomplish. Some do. The ones who do have made a choice that is hard to walk back from.`,
    traditions: `Vane runs a tight ship. Ruthless, effective, and willing to do things the Fukushū pirates will not. The line between privateers and agents of the dark side is one that Vane crossed and has not looked back from.`,
  },
  {
    id: GROUP.ROGUE_NAVY,
    name: "Rogue Navy",
    description: "The remnants of Baransu's old naval order — now unmoored from any realm authority. Captain Maccray leads them as hunters. The Pirates of Fukushū are their primary target.",
    culture_text: `The Rogue Navy was once the realm's legitimate maritime force. When the political structures of Baransu fractured — curse, war, power vacuums — the navy lost its chain of command. Different captains went different directions. Captain Maccray took what remained of the order fleet and turned it into a pirate-hunting operation.

They are not criminals. They are not heroes. They are professionals who decided their purpose was pursuit, and they are very good at it.`,
    traditions: `Navy discipline. Naval hierarchy. Naval tactics adapted for pursuing a fleet that knows the sea as well as they do. Maccray demands precision from his crew. He is not popular. He is respected.`,
  },
  {
    id: GROUP.DARK_ONES,
    name: "The Dark Ones",
    description: "Servants of Khaonai and the Dark Whisper. Former Baransu people, twisted by dark magic. Relentless, organized, and growing. Kage leads them into the field.",
    culture_text: `The Dark Ones are not born. They are made. Dark magic is a corruption — it finds people at their lowest, in their grief or anger or despair, and offers them something. Power. Revenge. Relief from pain. The ones who take it become part of the horde.

Some were once Light Walkers. Some were farmers. Some were traders who made one wrong deal. The transformation is not instant. The Whisper is patient. It cultivates.

Khaonai and Tenebris sit at the top. Below them, the Dark Whisper moves between the cracks in people's faith. Below that, the Dark Ones themselves — a hierarchy of the fallen, the converted, and the corrupted.`,
    traditions: `There is no tradition. There is hierarchy and there is obedience. The Dark Ones who retain enough of their original mind become the Trackers, the Hunters, the ones with names and missions. The ones who fall further become the horde — still alive, barely recognizable, used as a weapon.`,
  },
  {
    id: GROUP.SOULLESS,
    name: "The Soulless",
    description: "Light Walker men taken by the Whisper inside the Soulless Citadel. Still alive. No longer themselves. The thing they have become is the greatest weapon the Citadel has.",
    culture_text: `The Soulless did not choose this. That is the most important thing to understand about them. They were men. Fathers, brothers, sons. They were taken by the curse against their will and put inside a place designed to break them.

Many of them held on for a long time. The Whisper is patient and it had nothing but time. For some, there was a crack it eventually found. One conversation, one memory it weaponized, one night when the despair got heavier than the faith. And then they were gone — still walking, still fighting, but working for the other side.

Sensei Lux keeps them in the dungeon when he can. He does not give up on them. The lore does not say if any of them have ever come back.`,
    traditions: `None remaining. The Soulless are used as a horde by the Citadel itself. Their knowledge of Light Walker fighting techniques makes them dangerous in ways regular Dark Ones are not.`,
  },
  {
    id: GROUP.UNDYING,
    name: "Undying Ones",
    description: "The three original peoples created by the Almighty in the Upper Realm. Eternal beings made to bear his gifts. The Robur betrayed him. The Montes drifted. The Lacus stayed true.",
    culture_text: `The Almighty made three groups of Undying Ones and gave each a gift from his nature. The Montes bore wisdom and knowledge. The Lacus bore loyalty and honor. The Robur bore strength.

To each he gave a precious gemstone instilled with the essence of their gift.

The Robur's greatest, Khaonai, wanted more than his gift. His ambition birthed Dark Magic. He led the Robur in rebellion. The Montes and the Lacus fought alongside the Almighty. Khaonai lost.

The Robur were banished to the Shadow Realm. The Montes were sent to Baransu as giants. The Lacus were made guardians at Lake Shamakai.

The Undying Ones are not extinct. They are distributed. Two of the three groups still serve the Almighty's purposes, whether they know it or not.`,
    traditions: `Each group retained its gift through the judgment. The Montes still carry wisdom — buried under pride, but there. The Lacus still carry loyalty — expressed through an eternal watch. The Robur's strength is in the Shadow Realm, weaponized, waiting.`,
  },
];

// ─── Run it ───────────────────────────────────────────────────────────────────
async function main() {
  let ok = 0;
  let fail = 0;

  // 1. Update existing locations
  console.log("Updating existing locations...");
  for (const { id, ...fields } of locationUpdates) {
    const { error } = await supabase.from("locations").update(fields).eq("id", id);
    if (error) { console.error(`  FAIL ${fields.name}: ${error.message}`); fail++; }
    else { console.log(`  OK   ${fields.name}`); ok++; }
  }

  // 2. Insert new locations and capture IDs for homeland assignments
  console.log("\nInserting new locations...");
  const { data: inserted, error: insertErr } = await supabase
    .from("locations")
    .insert(newLocations)
    .select("id, name");

  if (insertErr) {
    console.error("  FAIL inserting new locations:", insertErr.message);
    fail += newLocations.length;
  } else {
    inserted.forEach(l => console.log(`  +    ${l.name}`));
    ok += inserted.length;

    // Build a name -> id map for homeland assignments
    const locByName = {};
    inserted.forEach(l => { locByName[l.name] = l.id; });
    // Also include existing locations
    locByName["Fukushū Bay"] = LOC.FUKUSHU_BAY;
    locByName["Light Walker Village"] = LOC.LW_NEW_VILLAGE;

    // Assign homelands
    const homelands = [
      { id: GROUP.LACUS,        loc: "Lake Shamakai" },
      { id: GROUP.LIGHT_WALKER, loc: "Light Walker Village" },
      { id: GROUP.MONTES,       loc: "The Upper Mountains" },
      { id: GROUP.PIRATES,      loc: "Fukushū Bay" },
      { id: GROUP.DARK_PIRATES, loc: "Fukushū Bay" },
      { id: GROUP.ROGUE_NAVY,   loc: "Fukushū Bay" },
      { id: GROUP.TENSHI,       loc: "The Desert of Setra" },
      { id: GROUP.KUBU,         loc: "The Kubu Forest" },
    ];

    console.log("\nAssigning homelands...");
    for (const { id, loc } of homelands) {
      const homeland_id = locByName[loc];
      if (!homeland_id) { console.log(`  SKIP ${loc} (id not found)`); continue; }
      const { error } = await supabase.from("people_groups").update({ homeland_id }).eq("id", id);
      if (error) { console.error(`  FAIL homeland for ${loc}: ${error.message}`); fail++; }
      else { console.log(`  OK   ${loc}`); ok++; }
    }
  }

  // 3. Update people groups
  console.log("\nUpdating people groups...");
  for (const { id, ...fields } of groupUpdates) {
    const { error } = await supabase.from("people_groups").update(fields).eq("id", id);
    if (error) { console.error(`  FAIL ${fields.name}: ${error.message}`); fail++; }
    else { console.log(`  OK   ${fields.name}`); ok++; }
  }

  console.log(`\nDone. ${ok} succeeded, ${fail} failed.`);
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
