/**
 * Seeds all Armory items (weapons + sidekicks) across three collections.
 * Uses artifact_type "armory_weapon" / "armory_sidekick" to distinguish from Codex items.
 * power_description stores the collection slug.
 * Usage: node --env-file=.env scripts/seed-armory.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const DAVIE_ID = "17ace758-6396-4916-aeaf-da3735d7c1e4";
const VANE_ID  = "d5841464-658a-454b-9eeb-fdbd19be93a3";

const W = "armory_weapon";
const S = "armory_sidekick";
const SC = "soulless_citadel";
const WW = "women_warriors";
const PF = "pirates_of_fukushu";

const items = [

  // ════════════════════════════════════════════════════════════
  // SOULLESS CITADEL — WEAPONS
  // ════════════════════════════════════════════════════════════
  {
    name: "Spear",
    artifact_type: W, power_description: SC, sort_order: 1,
    description: "Light, deadly, with a sneaky long reach. Forged by Grand Smith Vulcannon after a humbling lesson from a young warrior.",
    lore_content: `These spears made in my forge are light and deadly with a sneaky long reach. They have become quite popular. I decided to make them after a humbling experience I had that fateful day of the battle. I was helping the clan warriors get ready, since I was staying behind on account of mah bum leg. I told a boy "You can't just tie a knife to a stick and call it a spear". I know I was too far away to tell for sure but I swear that kid stared me down as he killed a half dozen of them dark beasts in a single strike. I figured his design was worth a second look.`,
    origin_story: "~Written by Grand Smith Vulcannon underneath the designs for this spear. Taken from his personal sketchbook.",
  },
  {
    name: "Double Katana",
    artifact_type: W, power_description: SC, sort_order: 2,
    description: "Bestowed upon firstborns of the Murakami Family. Rumored to be infused with light and darkness, forged in secret.",
    lore_content: `This Blade is typically bestowed upon a firstborn in the Murakai Family. On rare occasions, they may be gifted to those who helped the family as a reward for their actions. These perfect swords are made in secret by the smiths of their family forges. Few weapons I have seen are as well made as these katanas, but what's most impressive is the skill of those who wield them. I have tried myself to copy their design and never come close to their quality. It drives me mad. I once heard a rumor in the pub; a local said he heard it from an old smith of theirs. The process to forge them has something to do with the sword somehow being infused with light and darkness. Something about allowing the wielder to find a perfect center. Sounded like a bunch of hogwash to me.`,
    origin_story: "~Written by Grand Smith Vulcannon underneath a sketching of the double katanas. Taken from his personal sketchbook.",
  },
  {
    name: "Bow and Arrow",
    artifact_type: W, power_description: SC, sort_order: 3,
    description: "The weapon that makes a warrior a hunter. Makes you overwatch. Makes the enemy doubt before they charge.",
    lore_content: `"The bow you are now holding is your best friend. It's what sets you apart from the rest of the clan warriors. It makes you a hunter. It makes you overwatch. It makes you the reason the enemy has doubt in their hearts when they charge. We will practice daily until you are good enough to clip a fly's wings."`,
    origin_story: "~Master Archery Instructor Missy Hunter, addressing her class.",
  },
  {
    name: "Katana Sword",
    artifact_type: W, power_description: SC, sort_order: 4,
    description: "The traditional weapon of the Murakami family rank and file. Mass-produced at high quality. Also used as a ceremonial gift.",
    lore_content: `This single-edged curved blade is the traditional weapon of the Murakami family's rank and file warriors. Their mythical forges are able to mass produce these swords, and at a high quality as well. Besides their use as a staple of the family forces, they have also been known to be used as ceremonial gifts, given to friends or heads of other families.`,
    origin_story: "~History of the Murakami Family, Vol. I",
  },
  {
    name: "Medieval Axe",
    artifact_type: W, power_description: SC, sort_order: 5,
    description: "Lead-weighted axe heads. No shield, no sword, no prayer will save you from the overhead strike.",
    lore_content: `This design is one of mah favorites. To me, there is no better feeling than the sudden realization in an enemy's face as an overhead axe strike comes crashing down on his head. The way these boys swing 'em these days, it doesn't matter if the enemy is blocking with a sword or even a shield! Their only hope is to dodge. I mean, especially after I started weighting the axe heads with lead!`,
    origin_story: "~Written by Grand Smith Vulcannon underneath the early designs for this axe. Taken from his personal sketchbook.",
  },
  {
    name: "Skull Crusher",
    artifact_type: W, power_description: SC, sort_order: 6,
    description: "One massive blow. Bear stew for dinner. The Skull Crusher does not negotiate.",
    lore_content: `"Well there I were out in the forest ya see. I were out collecting mushrooms and tubers for stew since the crack o' dawn. Due to the dry season I 'ave had to move farther and farther from my house. Before I knew it I was lost, but that wasn't even the worst of it. I spied a particularly large and juicy mushroom and bent to pluck it from a mossy log, when WHAM. I was thrown off my feet by a large angry bear who flew in and knock'd me from behind. That's when he showed up, the Lightwalker. One massive blow from that giant mace o' his and he was invited over for bear stew! Aint no bear gone fly away from that Skull Crusher!"`,
    origin_story: "~Overheard in a Zillarnia pub.",
  },
  {
    name: "Lumberjack Axe",
    artifact_type: W, power_description: SC, sort_order: 7,
    description: "He left with his lumber axe in hand. She swore she would hold the village until he returned. That was years ago.",
    lore_content: `"I remember the day that loathsome fiend Tenebris crossed over our mountains. The life of every clan member was drastically changed in just a handful of hours. My husband was out logging at a camp nearby when the alarm sounded. We always knew this day would come, but part of me thought I would have more time with him. My love burst through our door, chest heaving as he gasped to catch his breath. I was in the middle of stringing my bow. He looked at me and told me to 'hold down the village' for him. I swore to him that I would until the moment he returned to me. He gave me a smile and a wink, and he left with his lumber axe in hand. Here I am years later, still holding. Still waiting."`,
    origin_story: "~Missy Hunter, Master Archer.",
  },
  {
    name: "Spear (Variant II)",
    artifact_type: W, power_description: SC, sort_order: 8,
    description: "Inspired by a secretive tribe Vulcannon called the Hidden Village. Copper upgraded to steel. The tribe may be the Kubu People.",
    lore_content: `The design for this spear originally came from a classic hunting spear used by a local tribe we traded with. They were very secretive, we dealt in barter only, and spoke through gestures. We came to call them the Hidden Village. The Hidden Village spear was strong, lightweight, and flexible. The spearhead was forged of copper, which I have since upgraded to steel. It's been many years since we last were in contact with that tribe, I wonder if they have made any improvements of their own?`,
    origin_story: "~Written by Grand Smith Vulcannon underneath a sketching of this spear. Taken from his personal sketchbook.",
  },
  {
    name: "Double Indo Sword",
    artifact_type: W, power_description: SC, sort_order: 9,
    description: "Gold-trimmed elk horn grips. A fluid style more akin to dancing than swordsmanship. Not for those who favor brute force.",
    lore_content: `"These dual curved swords are hilted with a beautiful gold trimmed elk horn grip. Users of these blades traditionally follow a fluid fighting style, more akin to dancing than more traditional sword styles. I have dabbled in these blades myself, but have found that I prefer an approach with less… finesse shall we say."`,
    origin_story: "~Antares Marcus, Master of the Sword.",
  },
  {
    name: "Noble Wield",
    artifact_type: W, power_description: SC, sort_order: 10,
    description: "The blade that made Antares Marcus never want to put down a sword again. Jeweled hilt. Ornate curved crossguard.",
    lore_content: `"I remember the day that Vulcannon finished the first one of these fine blades. I was much younger back then, and as the golden light of the sun gleamed off its polished edge, I knew that I would become a master of the sword. Its exquisite jeweled hilt had a pleasantly ornate curved crossguard. It made me never want to put down a sword again."`,
    origin_story: "~Antares Marcus, Master of the Sword.",
  },
  {
    name: "Dragon Daggers",
    artifact_type: W, power_description: SC, sort_order: 11,
    description: "Impossible alloy. Dragon-head hilts. Forged with mountain ore and metal from the bottom of Khaom Lake. Only the Lacus could make this trade possible.",
    lore_content: `When my mother first suggested that I keep a journal, I was not really into the idea of spending time writing down boring thoughts that nobody would ever read other than myself. I thought it to be a waste. That time would be better spent training, hunting, or racing those silly boys. After we lost my father, like so many of our clan did, I saw the value in recording those little details. Today is one day that I wanted to remember clearly. I turned eighteen and with careful and almost reverent hands, she held something wrapped in silk and tied with a bit of snake skin. Beneath it were the most beautiful pair of daggers I'd ever seen. Ornate beyond compare, with intricate gold inlays and skillfully set gemstones. The hilts were shaped to resemble twin dragon heads. Master Vulcannon said they were forged from an "impossible alloy" — one made up of extremely rare metals. No forge in Zillarnia could produce a flame hot enough to create this alloy. Not his forge, not even those of the Murakami family. Even my mother couldn't tell me how my father came to possess them, but said she did remember some old tales telling of a pair just like them. In the tales, the daggers were said to belong to the very first Sensei.`,
    origin_story: "~From the journal of Lilliana, woman warrior of the Lightwalkers.",
  },
  {
    name: "Golden Trident",
    artifact_type: W, power_description: SC, sort_order: 12,
    description: "Traded by the Lacus People at Lake Shamakai. You can feel the electricity arcing across your skin the moment you touch one.",
    lore_content: `"Oh, the tridents? Certainly I can tell yah the tale! I remember it like it were just yesterday. Me and the boys were on a trading expedition to the shore of Lake Shamakai, to meet up with the Lacus people. Those be some strange folk, living underwater and all. They didn't speak a word to us the whole time either! Rumor has it they been guarding something in that lake for centuries. Anyways, there we were, dropping off crates of who knows what to the Lacus. In return, they pulled a giant shell of some sort from the water's edge. It were filled with them shiny gold tridents! Craziest thing I ever saw, I tell yah. Between you and me, I picked one up when nobody was looking. The power those things hold is not something I'll soon forget. I could feel the electricity arcing across my skin, aching to be unleashed upon a foe."`,
    origin_story: "~Korin the Quartermaster, Lightwalker Village.",
  },
  {
    name: "Widow Maker",
    artifact_type: W, power_description: SC, sort_order: 13,
    description: "Two dozen armed men against one Lightwalker. It still wasn't a fair fight.",
    lore_content: `"You want to know about the time I met a Lightwalker? I'd be glad to tell you about it of course. After all, it was the day I faced death and lived to tell the tale. They had already torn through the town and my house was their last stop. Me and my entire family were on our knees, watching as they stole what little we had. It was a full moon that night. Right before they put the torch to our home, a cloud happened to pass overhead. We heard yelling and fighting, but it was too dark to see anything. There he was, standing over us, sword in hand. Tears streamed down my face as I saw our savior — he was one of the legendary Lightwalkers! Those unlucky bastards had quickly met the edge of his blade, the 'Widow Maker' he called it. There wasn't even a scratch on him. Hard to believe that it was two dozen men armed to the teeth against one Lightwalker, and it still wasn't a fair fight. It's been about ten years now, and we haven't had bandits since!"`,
    origin_story: "~A true account, told by a local town magistrate.",
  },
  {
    name: "Slice 'Em",
    artifact_type: W, power_description: SC, sort_order: 14,
    description: "Option 1: walk away peacefully. Option 2: the Lightwalker would come inside and slice 'em up like a Sunday ham. All three men left town in a dead sprint.",
    lore_content: `The Zillarnia Post has received firsthand accounts concerning yesterday's hostage situation at the jeweler's shop on the main street. After hours of unsuccessful negotiation, the standoff had unfortunately moved no closer to a resolution. It was then that the decision was made to call in a Lightwalker. Eyewitnesses say that the sword wielding man shouted to the criminals inside, and gave them two options. Option 1: Walk away peacefully now and forever, or Option 2: The Lightwalker "Would come inside and slice em up like a Sunday ham." The report states the three men left town immediately, and in a dead sprint.`,
    origin_story: "~A front page news story featured in The Zillarnia Post. An all too common joke Pak Matisi would tell the younger generation.",
  },

  // ════════════════════════════════════════════════════════════
  // SOULLESS CITADEL — SIDEKICKS
  // ════════════════════════════════════════════════════════════
  {
    name: "Monkey with Sword",
    artifact_type: S, power_description: SC, sort_order: 15,
    description: "Tiny. Cute. Glowing eyes. A knife. Moving very, very fast. Send backup now.",
    lore_content: `Unit Thirteen, we just got a report of a dangerous primate in a residential neighborhood. Please respond.

This is Unit Thirteen, en route now.

[Long pause] [Static]

Station, come in. This is Unit Thirteen.

Go ahead Thirteen.

This call looks bogus, it's just a tiny little monkey. Sorry Thirteen, did you say it's a tiny monkey?

Yeah, that's right. Gotta say, it's actually pretty damn cute. Got these weird glowing eyes though. Hold on a second Station, please stand by.

What's going on Thirteen?

[Scream comes over the radio]

It's got a damn knife! ALMIGHTY SAVE ME, IT'S FAST. SEND BACKUP NOW!`,
    origin_story: "~Recorded call from Zillarnia Animal Control, dated centuries after the first Lightwalkers were cursed.",
  },
  {
    name: "Snake",
    artifact_type: S, power_description: SC, sort_order: 16,
    description: "Western king cobra. Number 3 on Zillarnia's most venomous list. Unless you are a snake tamer of the Lightwalker Clan, steer clear.",
    lore_content: `Crickey! Look at this. What we have here is a western king cobra. This shifty sheila ranks at number 3 on Zillarnia's list of top 10 most venomous snakes. Woah! She almost got me there. You can see by her hood that she's a bit riled up because I'm disturbing her. This viper is known for its aggression, deadly venom, and lightning quick strike. Unless you are one of the snake tamers of the Lightwalker Clan, I suggest you steer clear of this beauty.`,
    origin_story: "~Sir Winters, Animal Enthusiast, said to his team while on expedition.",
  },
  {
    name: "Octopus",
    artifact_type: S, power_description: SC, sort_order: 17,
    description: "Eight tentacles, a beak that puts hunting falcons to shame, jet black ink at five yards, and smarter than most people. Why choose an octopus? Exactly.",
    lore_content: `Why choose an octopus? Because my good man, it's basically the ultimate ninja master of the sea! This squishy guy can blind you with jet black ink from five yards out. If that isn't enough, he's also able to expertly camouflage himself, so you will never even see it coming. Under his eight deceivingly strong tentacles, he boasts a razor sharp beak that puts hunting falcons to shame. And not to pile on but he's smarter than most people I've met. Ever been punched by one? Pray to the Almighty you never experience it.`,
    origin_story: "~A Lightwalker, after being teased for his pet.",
  },
  {
    name: "Droid with Laser (LUMEN-700)",
    artifact_type: S, power_description: SC, sort_order: 18,
    description: "Fully charged before battle. Never expose to moisture. Give VERY clear firing instructions. If it becomes self-aware, find cover immediately.",
    lore_content: `LUMEN-700 — Operating Manual — Revision G

When using and operating the LUMEN-700, the user must ensure proper maintenance and must adhere to the following steps in order to safely and effectively utilize the highly advanced features of this model.

1. Ensure the LUMEN-700 is fully charged before taking it into battle.
2. Never expose the unit to moisture. Doing so may void the manufacturer's warranty.
3. IMPORTANT: IT IS DEADLY CRITICAL TO GIVE CLEAR INSTRUCTIONS WHEN USING THE LUMEN-700'S EQUIPPED LASER. Failing to provide clear guidance will almost certainly cause unacceptable levels of collateral damage to both organic and inorganic matter in the area. This is due to the highly destructive capabilities of the built-in quantum-photon class laser.
4. In the event your unit becomes self aware, the user should quickly find cover and initiate the unit's self destruct protocol.`,
    origin_story: "~A page torn from an operating manual. It is the only known copy.",
  },

  // ════════════════════════════════════════════════════════════
  // WOMEN WARRIORS — WEAPONS
  // ════════════════════════════════════════════════════════════
  {
    name: "Bow and Arrow",
    artifact_type: W, power_description: WW, sort_order: 1,
    description: "Ten years of patience in every arrow. The bow does not care how strong you are. It cares how patient you are.",
    lore_content: `"When I was a girl, my father handed me a bow that was taller than I was. I could barely draw it back. He told me, 'The bow does not care how strong you are. It cares how patient you are.' I didn't understand him then. I do now. Every arrow I loose carries ten years of patience with it. Ten years of waiting in this forest. Ten years of watching the tree line for shadows that shouldn't move. Patience is what keeps us alive. Patience is what will bring our men home."`,
    origin_story: "~Missy Hunter, Master Archer and member of the Wise Counsel, addressing new Hogo-sha recruits in the Forbidden Forest.",
  },
  {
    name: "Brute Axe",
    artifact_type: W, power_description: WW, sort_order: 2,
    description: "Born out of necessity. Same tool for clearing timber and killing Dark Ones. The Hogo-sha who favor this weapon — you hear them before you see them.",
    lore_content: `When the women first took up arms in the Forbidden Forest, not every weapon was forged with grace in mind. The Brute Axe was born out of necessity — heavy timber needed clearing, and Dark Ones needed killing. Same tool for both. Melea's smiths took the old logging axes the men had used to build the village and reforged them with a wider blade and a counterweighted pommel. What they lacked in elegance, they made up for in stopping power. The Hogo-sha who favor this weapon tend to be the ones you hear before you see. And by the time you see them, you've already lost.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Brute Banger",
    artifact_type: W, power_description: WW, sort_order: 3,
    description: `She calls it her "conversation ender." She swung it into a fallen oak and split the trunk clean in half. Her eyes didn't laugh when she explained why.`,
    lore_content: `There is a woman in the Forbidden Forest who carries a weapon that looks like it was pulled from the earth itself. Thick-headed, iron-banded, ugly as sin. She calls it her "conversation ender." I watched her train with it once from behind the tree line. She swung it into a fallen oak and split the trunk clean in half. When I asked what possessed her to wield such a thing, she simply said, "My husband used to split logs with his bare hands. I needed something to keep up." She laughed when she said it. But her eyes didn't.`,
    origin_story: "~Kilian of the Tenshi Clan, personal journal entry, written during his early days among the Light Walkers.",
  },
  {
    name: "Crossbow",
    artifact_type: W, power_description: WW, sort_order: 4,
    description: `Missy Hunter's innovation. "Not every warrior has the arms of an ox. But every warrior deserves to kill at range." The tree line is no longer safe at three hundred paces.`,
    lore_content: `The crossbow was not part of the old Light Walker tradition. It was Missy Hunter's innovation — born from watching her students struggle with draw strength during their early years of training. "Not every warrior has the arms of an ox," she told the Wise Counsel. "But every warrior deserves to kill at range." The design uses a mechanism carved from the ironwood trees deep in the Forbidden Forest. One pull of the trigger and the bolt flies true. The Dark Ones learned quickly that the tree line was no longer safe, not even at three hundred paces.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Double Golden Scorpion",
    artifact_type: W, power_description: WW, sort_order: 5,
    description: "Twin blades that curve like a scorpion's tail. Forged from gold alloy through the Kubu network. The gold resonates with the Almighty's power in the hands of the pure.",
    lore_content: `These twin blades curve backward like the tail of a scorpion poised to strike. Forged by the women's smiths using gold alloy traded through the Kubu People's network, they are as beautiful as they are vicious. The fighting style that accompanies them is one of the most difficult to master — requiring the wielder to fight in constant motion, circling their opponent like a predator tightening its coil. Only a handful of Hogo-sha have ever earned the right to carry them. The gold is not decorative. It is said to resonate with the power of the Almighty when wielded by one whose heart is pure.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Double Light Katana",
    artifact_type: W, power_description: WW, sort_order: 6,
    description: `"The men fought like mountains. Our way is different. We are the river." Forged by Melea in the early days of the forest.`,
    lore_content: `My mother carried two katanas. Not the heavy Murakami blades the men once wielded, but something new. Something lighter. She had them forged in the early days of the forest, when the women were still figuring out what kind of warriors they would become. "The men fought like mountains," she told me once, while cleaning the blades by the lake. "Immovable. Unbreakable. That was their way. Our way is different. We are the river. We move around the obstacle. We flow through the gap. And when we strike, we strike twice before they know we've moved." I think about that every time I draw my own.`,
    origin_story: "~From the personal writings of Emerald, daughter of Sensei Lux and Melea.",
  },
  {
    name: "Double Sai",
    artifact_type: W, power_description: WW, sort_order: 7,
    description: "Originally a farming tool. A Dark One scouted too close. Haruki grabbed two from the rack and never went back to the fields.",
    lore_content: `The sai was never meant to be a weapon. Its original design was a farming tool, used in the fields the men tended after the curse stripped them of the blade. When a Dark One scouting party breached the forest's outer edge, one of the field workers — a woman named Haruki — grabbed two sai from the tool rack and drove them into the creature's throat before it could raise the alarm. Melea had Haruki's sai reforged the next morning. Heavier. Sharper. Balanced for both blocking and killing. Haruki never went back to the fields.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Double Sided Axe",
    artifact_type: W, power_description: WW, sort_order: 8,
    description: "Cuts on both ends. Spin it, swing it, let it carry you through the fight like a wheel of iron. Kind of like everything else in life.",
    lore_content: `"There's a reason the Almighty gave us two hands, little sister. One to hold, one to swing? That's a waste. This axe cuts on both ends. You spin it, you swing it, you let it carry you through the fight like a wheel of iron. The trick is learning when to let go and when to hold on tighter. Kind of like everything else in life, I suppose."`,
    origin_story: "~Fortifina, Legendary Hogo-sha Warrior and member of the Wise Counsel, during training.",
  },
  {
    name: "Dragon Bō",
    artifact_type: W, power_description: WW, sort_order: 9,
    description: "Carved from a branch of the great Baransu Elm by Melea herself. It will not break. It will not burn. Some say it hums when danger is near.",
    lore_content: `The Bō staff has been part of Light Walker tradition since before the first Sensei walked the realm. But the Dragon Bō is something else entirely. Carved from a single branch of the great Baransu Elm at the heart of the Forbidden Forest, the staff was shaped by Melea herself and imbued through days of prayer and meditation with the power of the Almighty. The wood will not break. It will not burn. Some say it hums when danger is near. Others say that's nonsense and Melea just hits things really hard with it. Both are probably true.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Dual Katana",
    artifact_type: W, power_description: WW, sort_order: 10,
    description: "Melea adapted the Murakami twin blade tradition for the Hogo-sha. A dual katana is not a title given. It is a title survived.",
    lore_content: `The Murakami family's twin blade tradition was once exclusive to their firstborn sons. When the curse took those sons, the technique was thought to be lost. But Melea had trained alongside Murakami swordsmen in her youth — her father had insisted on it. She adapted their forms for the Hogo-sha, favoring speed over raw power, and precision over brute force. The new dual katana style became the signature of the Women Warriors' most elite fighters. A Hogo-sha carrying twin katanas has earned them through years of discipline and blood. It is not a title given. It is a title survived.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Forest Watcher Crossbow",
    artifact_type: W, power_description: WW, sort_order: 11,
    description: "Scope carved from Baransu quartz. A bolt through a Dark One's eye socket at a hundred paces in near-total darkness. The reason no enemy has ever found the hidden village.",
    lore_content: `The Forest Watchers are the eyes and ears of the Forbidden Forest. They patrol the canopy, the underbrush, the places where the trees talk to each other in ways only Melea fully understands. Their crossbow is specially modified for forest combat — shorter bolt, tighter draw, fitted with a scope carved from polished Baransu quartz. The Watchers can place a bolt through a Dark One's eye socket from a hundred paces in near total darkness. They are the reason the Dark Ones fear the tree line. They are the reason no enemy has ever found the hidden village.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Golden Scorpion",
    artifact_type: W, power_description: WW, sort_order: 12,
    description: "Single blade. Rewards patience over constant motion. The difference between a storm and a lightning bolt.",
    lore_content: `A single-blade variant of the Double Golden Scorpion, favored by warriors who prefer a shield or free hand in combat. The curved blade is forged from the same Kubu-traded gold alloy and carries the same resonance with the Almighty's power. Where the double variant demands constant motion, the single Golden Scorpion rewards patience — waiting for the perfect opening, then delivering a single devastating strike. Missy Hunter once said that the difference between the two styles is the difference between a storm and a lightning bolt. Both will kill you. One just takes longer.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Grim Reaper",
    artifact_type: W, power_description: WW, sort_order: 13,
    description: "Nobody calls it the Grim Reaper to her face. A war scythe that can cut through three Dark Ones in a single pass. The name is about the woman who carries it.",
    lore_content: `Nobody calls it the Grim Reaper to her face. That's just what the younger Hogo-sha whisper when they see her carry it to the tree line at dusk. The weapon itself is a war scythe — long-handled, curved blade, weighted for sweeping strikes that can cut through three Dark Ones in a single pass. Its original owner fashioned it from the same tools the women used to harvest grain in the forest clearing. She said she liked the irony. The Dark Ones come to reap the Light Walkers. She reaps them instead. The younger warriors think the name is about the weapon. It isn't. It's about the woman who carries it.`,
    origin_story: "~Overheard among Hogo-sha trainees in the Forbidden Forest.",
  },
  {
    name: "Lion Fang",
    artifact_type: W, power_description: WW, sort_order: 14,
    description: "Ugly, unbalanced. Catches a Dark One's blade, locks it, drives a knee into its throat. One strike. The Counsel approved it that afternoon.",
    lore_content: `When Fortifina first presented this weapon to the Wise Counsel, half of them thought she'd lost her mind. It was a short, thick blade with a hooked tip — ugly, unbalanced, nothing like the elegant weapons they'd trained with. "It's not meant to be pretty," Fortifina told them. "It's meant to catch a Dark One's blade between the hook and the edge, lock it in place, and let you drive your knee into its throat while it tries to figure out what happened." The Counsel approved its design that afternoon. The name came later, after a hunting party watched Fortifina use one to kill a mountain cat that had wandered too close to the village. One strike. Between the ribs. The cat never made a sound.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Spear",
    artifact_type: W, power_description: WW, sort_order: 15,
    description: "The first weapon every Hogo-sha learns. Reach keeps you alive. The Kubu taught the women how to treat bamboo so it will not break. That is not a boast.",
    lore_content: `The spear is the first weapon every Hogo-sha learns. Before the katana, before the bow, before any of it. Melea insists on this. "Reach keeps you alive," she tells every new class. "The enemy cannot kill what the enemy cannot touch." The Women Warriors' spears are lighter than the old clan spears Vulcannon once forged — crafted from the hard bamboo that grows along the forest's southern border near Kubu territory. The Kubu People taught the women how to treat the bamboo with a resin that makes it harder than most metals. A Hogo-sha spear will not break. That is not a boast. It is a fact.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Pottery Basher",
    artifact_type: W, power_description: WW, sort_order: 16,
    description: `"It started as a joke." A clay pot. Three Dark Ones. Melea didn't laugh — she had the smiths forge a proper one. "If it works," she said, "make it work better."`,
    lore_content: `"It started as a joke, if I'm being honest. We were in the middle of a supply run — sneaking through the outskirts of an abandoned village near old Zillarnia to scavenge what we could. A Dark One patrol found us. I'd left my blade back at camp like an idiot. All I had was a clay pot I'd been carrying. So I cracked it over the first one's skull and used the broken handle like a mace for the other two. When I got back to the forest, the girls wouldn't stop laughing. Melea didn't laugh, though. She had the smiths forge me a proper one — same shape as the pot handle, but iron, with a weighted head. 'If it works,' she said, 'make it work better.' That's Melea for you."`,
    origin_story: "~Anonymous Hogo-sha warrior, retold around the campfire.",
  },
  {
    name: "The Protector",
    artifact_type: W, power_description: WW, sort_order: 17,
    description: "The oldest weapon in the Women Warriors' armory. Forged by Melea. Named by the Wise One. Both weapon and title — the bearer is always the leader of the Hogo-sha.",
    lore_content: `This broad-bladed sword was forged by Melea in the first year of the Forbidden Forest, before the women's smiths had fully established their forge. It is the oldest weapon in the Women Warriors' armory and the only one that carries a name bestowed by the Wise Counsel itself. Melea used it to defend the village when the first organized Dark One assault broke through the forest's outer defenses. She stood alone at the village gate for nearly an hour, blade in hand, until reinforcements arrived. When the battle ended and the last Dark One fell, the Wise One — Nana — took the sword from Melea's hands, held it up before the clan, and declared: "This blade shall be known as The Protector. And so shall she who wields it."`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Women's Golden Trident",
    artifact_type: W, power_description: WW, sort_order: 18,
    description: "Three golden tridents appeared on the lake shore one morning. No message. No envoy. The Lacus had been watching and recognized the women's fight as their own.",
    lore_content: `The Lacus People do not speak the common tongue. They do not trade with outsiders willingly. They guard secrets at the bottom of Lake Shamakai that no Baransu-born has ever seen. And yet, in the third year of the Forbidden Forest, three golden tridents appeared on the shore of the lake nearest to the Women Warriors' hidden village. No message. No envoy. Just three weapons, gleaming in the morning mist, laid out on a bed of lake reeds. Melea believes it was a gift — that the Lacus had been watching, and that they recognized the women's fight as their own. The tridents carry the same electric charge that Korin the Quartermaster once described. Lightning in your hands. The Almighty's power, channeled through Lacus craft. Only three exist among the Hogo-sha. They are not earned. They are chosen for you.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Metallic Scooner",
    artifact_type: W, power_description: WW, sort_order: 19,
    description: "Part weapon, part grappling tool. Hooks branches and launches you through the canopy. One Hogo-sha described it as controlling an angry snake made of iron.",
    lore_content: `The Metallic Scooner is the strangest weapon in the Hogo-sha arsenal and nobody can quite agree on where it came from. It's a curved, sickle-like blade attached to a reinforced chain — part weapon, part grappling tool. The forest patrol teams use it to swing between the massive Baransu Elms during pursuit, hooking branches and launching themselves through the canopy at terrifying speed. In combat, the chain extends the blade's reach and allows for unpredictable striking angles. One Hogo-sha described fighting with it as "trying to control an angry snake made of iron." The Dark Ones have no answer for it. By the time they hear the chain rattling through the branches above them, the fight is already over.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },

  // ════════════════════════════════════════════════════════════
  // WOMEN WARRIORS — SIDEKICKS
  // ════════════════════════════════════════════════════════════
  {
    name: "Bald Eagle",
    artifact_type: S, power_description: WW, sort_order: 20,
    description: "The eagles watch from the canopy. Not to attack — to warn. Melea says the Almighty speaks through His creation when He chooses.",
    lore_content: `High above the canopy of the Forbidden Forest, where the tallest Baransu Elms pierce through the green into open sky, the eagles watch. They have nested in this forest since before the Light Walkers arrived, and they did not leave when the women came. If anything, they drew closer. The Forest Watchers were the first to notice. An eagle would circle above a patrol, drifting lazily — until a Dark One patrol approached from the east. Then it would dive. Not to attack. To warn. A sharp cry, a flash of white and brown through the canopy, and the Watchers knew to change course. Melea says the Almighty speaks through His creation when He chooses. The eagles chose the Hogo-sha. Nobody argues with her on this.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "Parrot",
    artifact_type: S, power_description: WW, sort_order: 21,
    description: "It repeats everything. Including the time you tripped over your own spear. But it also woke the whole village when a Dark One breached the perimeter at 3am. The parrot stays.",
    lore_content: `"Alright, before you say anything — yes, the parrot talks. Yes, it repeats everything. YES, it told the entire training yard that I tripped over my own spear during night patrol. But let me tell you something about this bird. Three weeks ago, a Dark One got past the outer perimeter. Quiet one. Shadow type. Would've made it all the way to the sleeping quarters if this little loudmouth hadn't started screaming 'DARK ONE, DARK ONE, DARK ONE' at the top of its lungs at three in the morning. Woke up the whole village. Fortifina had the thing gutted before it reached the gate. So yeah, the parrot stays. And yeah, it still won't shut up about the spear thing."`,
    origin_story: "~Anonymous Hogo-sha warrior. The parrot in question has not been named, on purpose.",
  },
  {
    name: "Sly Fox",
    artifact_type: S, power_description: WW, sort_order: 22,
    description: "The Kubu People call them Yaran — the watching ones. They cannot be tamed. But they can be befriended, and they will never switch sides.",
    lore_content: `The foxes of the Forbidden Forest are not like the foxes outside its borders. They are larger, quieter, and their eyes carry a light that shouldn't be there — a faint glow, like moonlight trapped in amber. The Kubu People call them "Yaran" — the watching ones. They cannot be tamed, and nobody is foolish enough to try. But they can be befriended. A handful of Hogo-sha scouts have earned the trust of a forest fox through years of patient offering — a bit of meat left at the same spot, at the same time, night after night. The foxes that choose to walk alongside a warrior become something between a companion and a shadow. The Dark Ones have a saying: if you see the fox, the warrior is already behind you.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "The Cat",
    artifact_type: S, power_description: WW, sort_order: 23,
    description: "Melea's cat appeared the morning after Lux was taken. Black as midnight, jade eyes. It followed her through every battle and every sleepless night since.",
    lore_content: `Melea's cat has been with her since before the forest. Nobody knows where it came from. It appeared on the doorstep of her home in the old village the morning after Lux was taken to the Citadel. Black as midnight, with eyes like polished jade. It followed Melea into the Forbidden Forest, through every battle, every council meeting, every sleepless night spent staring at the stars and wondering if her husband could see the same ones. The cat does not fight. It does not hunt. It simply stays. Nana — the Wise One — once said that the Almighty sends comfort in forms we don't expect. Melea never confirmed or denied this. She just scratched behind the cat's ears and changed the subject.`,
    origin_story: "~The Women Warriors — A New Chapter in Clan History.",
  },
  {
    name: "The Cat (Laser Eyes Variant)",
    artifact_type: S, power_description: WW, sort_order: 24,
    description: "Eyes blazing like two little suns. Twenty Dark Ones froze. Five seconds of staring. Fortifina's squad hit them from the flank. Some things in this forest are better left unexplained.",
    lore_content: `"You want to know about the cat with the glowing eyes? Yeah, everyone wants to know about the cat with the glowing eyes. Here's what I know: it showed up one night during a breach. Full Dark One assault, twenty of them through the eastern perimeter. We were scrambling — half our patrol was on the far side of the forest. And then this cat just... walked out of Melea's quarters. Eyes blazing like two little suns. The Dark Ones stopped dead. Every single one of them. Frozen. The cat sat there, staring at them, for maybe five seconds. Then Fortifina's squad hit them from the flank and it was over. Was it the Almighty's power? Was it something the cat just... does? I have no idea. And honestly? I don't want to know. Some things in this forest are better left unexplained."`,
    origin_story: "~Overheard among Hogo-sha sentries during a shift change.",
  },

  // ════════════════════════════════════════════════════════════
  // PIRATES OF FUKUSHŪ — CAPTAIN LEGENDARY WEAPONS
  // ════════════════════════════════════════════════════════════
  {
    name: "Captain Davie's Fukushu Double Katana & \"Me Sheilas\"",
    artifact_type: W, power_description: PF, sort_order: 1,
    current_holder_id: DAVIE_ID,
    description: "Twin Murakami-forged katanas from Antonia, plus twin pistols found in a chest marked DO NOT OPEN — CURSED. The katanas are for when things get personal. The Sheilas are for making a point from distance.",
    lore_content: `"People always ask me about the katanas first. Fair enough — twin Murakami-forged blades in the hands of a pirate? It gets attention. Antonia gave them to me the day I joined her crew. Said they belonged to a Lightwalker who traded them for passage across the Fukushu Sea, long before the curse. She told me a blade remembers every hand that held it, and that these ones were ready for a new story.

But the katanas aren't my favorite weapons. My girls are.

I call 'em 'me Sheilas.' Found them in the wreck of a merchant vessel we salvaged off the coast of the Bay of Monsters. They were in a chest marked 'DO NOT OPEN — CURSED.' Well, that's basically an invitation, innit? Turns out they weren't cursed at all. Just really, really loud. First time I fired one, Antonia thought the ship was under attack. Nearly threw me overboard. But the accuracy? Mate, I can clip a barnacle off a hull at fifty paces in a crosswind. The katanas are for when things get personal. The Sheilas are for when I want to make a point from a distance."`,
    origin_story: "~Captain Davie, recounted to his crew over rum.",
  },
  {
    name: "Captain Vane's Rifle and Cursed Sword",
    artifact_type: W, power_description: PF, sort_order: 2,
    current_holder_id: VANE_ID,
    description: "A rifle from the old world with barrel symbols that appeared after the blood oath. A black sword bound to Khaonai's influence. The wounds it leaves never heal. Maccray knows this better than anyone.",
    lore_content: `The rifle is a relic from the old world — the only firearm Vane carried through the Devil's Eye that survived the crossing intact. Its barrel is etched with symbols that weren't there before Vane made his blood oath with the dark figure in Baransu. The shots it fires don't behave like normal lead. They trail black smoke, and the wounds they leave don't heal the way wounds should.

But it's the sword that men truly fear.

Vane's Cursed Sword was forged in darkness — bound to Khaonai's influence through the blood oath Vane swore upon his arrival in the Baransu Realm. The blade is black as a starless night, and its edge never dulls. Those cut by it carry the mark of Vane's curse — an unnatural chill that settles in the bones and whispers terrible things in the dead of night. Captain Maccray, the Pirate Hunter, knows this better than anyone. He turned on Vane once. Once. The wound on his arm has never healed, and the whisper never stops.`,
    origin_story: "~Compiled from accounts across Fukushu Bay taverns.",
  },

  // DARK PIRATE WEAPONS
  {
    name: "Belting Stick",
    artifact_type: W, power_description: PF, sort_order: 10,
    description: "The weapon of a bully. No craft. No art. Just blackened gnarled wood and whatever is left of a cursed crew.",
    lore_content: `The belting stick is the weapon of a bully. No craft. No art. Just a length of gnarled wood, blackened by whatever foul energy courses through Vane's cursed crew. The Dark Pirates who carry them use them to beat prisoners, intimidate dockworkers, and settle disputes among themselves. There is nothing noble about it. But then again, there is nothing noble left in them.`,
    origin_story: "~Observations of the Fukushu Dark Fleet, author unknown. Found in a bottle washed ashore.",
  },
  {
    name: "Clapper",
    artifact_type: W, power_description: PF, sort_order: 11,
    description: "A hinged jaw with iron teeth that snaps shut on the railing. Before the crew can pry it loose, three cursed pirates have already swung aboard.",
    lore_content: `A hinged wooden jaw fitted with iron teeth — designed to snap shut on a hand, a wrist, a throat. The Dark Pirates use it to board enemy vessels. They throw the clapper onto the railing, it bites into the wood, and a chain follows. Before the crew can pry it loose, three cursed pirates have already swung aboard. The sound it makes when it snaps shut is the last thing a lot of sailors hear. The name doesn't come from the weapon. It comes from the teeth. They clap together like a jaw.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Dark Bow and Arrow",
    artifact_type: W, power_description: PF, sort_order: 12,
    description: "Grown from dead tree roots, not crafted. Bone-tipped arrows that blacken the flesh. Inaccurate. Fired in swarms. Quantity has a quality all its own.",
    lore_content: `The Dark Pirates' bows are not crafted — they are grown. Twisted from the roots of dead trees that line the cursed shores where Vane's fleet makes anchor, these bows look more like the rib cage of some drowned creature than a weapon. The arrows are tipped with bone, not metal, and they carry a faint residue of dark energy that causes the flesh around the wound to blacken and rot. They are inaccurate at range and brittle in cold weather. But the Dark Pirates don't need precision. They fire in swarms, darkening the sky over an enemy vessel like a plague of locusts. Quantity has a quality all its own.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Dark Gaff",
    artifact_type: W, power_description: PF, sort_order: 13,
    description: "A fisherman's hook turned into something worse. Once it sinks in, it doesn't come out clean. The Dark Pirates call it a gaff. To them, people are just another catch.",
    lore_content: `A gaff is a fisherman's tool — a curved hook on a pole, used to haul heavy catches aboard. The Dark Pirates turned it into something worse. Their version is longer, heavier, and the hook is barbed so that once it sinks into flesh, it doesn't come out clean. They use them to drag sailors off the decks of boarded ships and into the water below, where the things that follow Vane's fleet are always waiting. The fishermen of Fukushu Bay call it "the dragger." The Dark Pirates just call it a gaff. To them, people are just another catch.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Dark Samurai",
    artifact_type: W, power_description: PF, sort_order: 14,
    description: "An insult to the Murakami name. Crude imitation, pitted steel, a permanent rust-brown stain. The cursed edge creeps through wounds like frost.",
    lore_content: `It insults the Murakami name to even call it a samurai blade. The Dark Pirates' version is a crude imitation — a single-edged curved sword forged from salvaged metal and quenched in seawater tainted by the dark energy that pools wherever Vane's fleet lingers. The blade is pitted, uneven, and stained a permanent rust-brown that no amount of cleaning removes. What it lacks in quality, it compensates for in menace. The cursed steel carries a chill that creeps through a wound like frost. Murakami smiths would weep at the sight of it. Or burn it. Probably both.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Dark Scythe",
    artifact_type: W, power_description: PF, sort_order: 15,
    description: "Designed for fear, not combat. The Dark Pirates swing it slowly at the prow during approach. Theatre. By the time boarding begins, half the crew has already abandoned ship.",
    lore_content: `The Dark Scythe was not designed for combat. It was designed for fear. A long curved blade mounted on a pole of blackened driftwood, it sweeps across the deck of a boarded ship like the arm of death itself. The Dark Pirates who carry it stand at the prow of Vane's ships during approach, silhouetted against the dark sky, swinging it slowly back and forth. It's theatre. Psychological warfare. By the time the boarding begins, half the enemy crew has already abandoned ship. The other half wishes they had.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Dark Triple Scythe",
    artifact_type: W, power_description: PF, sort_order: 16,
    description: "Three blades. Overkill. Each represents one of the three curses from Vane's blood oath — loyalty, memory, mercy. The wielders have none of the three.",
    lore_content: `Three blades on one shaft. Overkill? Obviously. But the Dark Pirates stopped being practical a long time ago. The triple scythe is ceremonial — carried by the highest-ranking cursed pirates in Vane's inner circle. Each blade represents one of the three curses Vane uttered when he made his blood oath: one for loyalty, one for memory, one for mercy. The wielders of this weapon have none of the three.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Evil Hand Wrap",
    artifact_type: W, power_description: PF, sort_order: 17,
    description: "The curse has changed their hands. The wraps hold back the corruption. Without them, the darkness spreads faster. With them, they can pretend — for a little while longer.",
    lore_content: `Some of the Dark Pirates don't bother with weapons at all. The curse has changed their hands — their fingers are longer than they should be, the nails are thickened to black points, and their grip carries an unnatural strength that can crush a wooden beam. The hand wraps are strips of sailcloth soaked in dark brine, wound tight around the forearms and fists. They don't protect the wearer. They protect what's left of their humanity. Without the wraps, the corruption spreads faster. With them, the pirates can pretend, for a little while longer, that they still have hands and not claws.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Evil Hook",
    artifact_type: W, power_description: PF, sort_order: 18,
    description: "Not a prosthetic. Fused to the bone. They feel through it, grip with it, kill with it. It's the only part of them that doesn't decay.",
    lore_content: `Not every Dark Pirate lost their hand in battle. Some lost it to the curse itself — the dark energy eating away at flesh until the bone crumbled to dust. What replaced the hand is worse. The hooks the Dark Pirates wear are not prosthetics. They are fused to the stump — iron driven into bone, held in place by whatever unholy power keeps Vane's crew walking. The hook becomes part of the body. They feel through it, grip with it, kill with it. Removing it would mean removing the arm. Not that they'd want to. The hook is the only part of them that doesn't decay.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Grieving Spear",
    artifact_type: W, power_description: PF, sort_order: 19,
    description: "A hollow shaft with holes that wail as it flies. Dozens planted upright on the deck at night, their moaning filling the air like a funeral dirge that never ends.",
    lore_content: `This weapon earned its name from the sound it makes. The shaft is hollow — perforated with small holes along its length. When swung or thrown, the wind passes through the holes and produces a low, moaning wail that carries across the water. The Dark Pirates launch them from ship to ship during naval engagements, and the sound — like a chorus of the damned — is enough to freeze a sailor's blood before the spear even lands. Prisoners taken by Vane's fleet have described nights aboard the cursed ships where dozens of grieving spears are planted upright in the deck, their wailing filling the air like a funeral dirge that never ends.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Pit Viper",
    artifact_type: W, power_description: PF, sort_order: 20,
    description: "Serrated dagger coated with venom from the actual vipers in Vane's hold. A scratch gives you ten minutes before your legs stop working. Used to capture, not kill.",
    lore_content: `A short, serrated dagger with a handle wrapped in snake skin. The blade is coated with venom milked from the actual pit vipers that nest in the hold of Vane's flagship. The bite of the blade mirrors the bite of the snake — a burning pain that spreads quickly, followed by paralysis. The Dark Pirates don't use it to kill. They use it to capture. A scratch from the Pit Viper and you've got maybe ten minutes before your legs stop working. The antivenom exists, but the Dark Pirates aren't known for sharing.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Whacking Bat",
    artifact_type: W, power_description: PF, sort_order: 21,
    description: "A bat. Studded with nails. Nothing poetic. Sometimes the simplest tool sends the clearest message.",
    lore_content: `It's a bat. Studded with nails. There's nothing poetic about it. The Dark Pirates use it when they want to make noise, break things, and remind everyone on the dock that subtlety died when Vane made his oath. You'd think a nail bat would be beneath a cursed pirate with access to dark magic. You'd be wrong. Sometimes the simplest tool sends the clearest message.`,
    origin_story: "~Overheard at a Fukushu Bay dockside tavern.",
  },
  {
    name: "Dark One Trident",
    artifact_type: W, power_description: PF, sort_order: 22,
    description: "A twisted mockery of the Lacus golden tridents. Black iron and malice instead of gold and honor. The Lacus regard these weapons as a personal insult. The Lacus do not forget insults.",
    lore_content: `A twisted mockery of the Lacus People's golden tridents. Where the originals channel the Almighty's power through gold and honor, the Dark One Trident channels Khaonai's corruption through black iron and malice. The prongs are uneven, jagged, as though the metal itself rejected the shape it was forced into. Dark Pirates who carry these tridents can conjure small bursts of dark energy on impact — not the clean lightning of the Lacus weapons, but something sicker. A crackling black discharge that leaves the victim shaking and disoriented. The Lacus People regard the existence of these weapons as a personal insult. And the Lacus do not forget insults.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Death Adder",
    artifact_type: W, power_description: PF, sort_order: 23,
    description: "The most common weapon in Vane's crew. Not a good sword — chips easily, dull after a dozen swings. But the dark energy gives it unnatural sharpness for the first few strikes.",
    lore_content: `A short, thick-bladed cutlass with a slight curve and a weighted pommel shaped like a coiled serpent. The Death Adder is the most common weapon among Vane's crew — mass produced in the crude forges aboard his flagship using scavenged metal and dark fire. It's not a good sword. It chips easily, the balance is off, and the edge dulls after a dozen swings. But the dark energy infused during forging gives the blade an unnatural sharpness for its first few strikes — enough to cut through ship's rope, leather armor, and bone. After that, it's just a heavy piece of cursed metal. The Dark Pirates don't care. They have plenty more.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Double Boned",
    artifact_type: W, power_description: PF, sort_order: 24,
    description: "Blades forged from sea creature bones. Lighter and more responsive to cursed strength. A Murakami blade would snap them in half without slowing down.",
    lore_content: `Two blades forged from the bones of sea creatures — ground down, shaped, and hardened through a process that only the Dark Pirates know and nobody else wants to learn. The bone absorbs dark energy better than metal, making these blades lighter and more responsive to the cursed strength of their wielders. The downside is that bone shatters when it meets proper steel. A Murakami blade would snap a Double Boned in half without slowing down. But proper steel is hard to come by in the Fukushu Sea, and most of what the Dark Pirates fight isn't carrying Murakami blades.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Double Samurai",
    artifact_type: W, power_description: PF, sort_order: 25,
    description: "Pure aggression, no defense. They don't block. They don't parry. They don't feel pain. They don't stop until the fight is over or their bodies physically fall apart.",
    lore_content: `Two Dark Samurai blades wielded together — a fighting style that is pure aggression with no defense. The pirates who carry two don't block. They don't parry. They swing both blades in wide, reckless arcs and trust the curse to keep them standing long enough to overwhelm their opponent through sheer violence. It works more often than it should. The cursed don't feel pain. They don't tire. They don't stop until the fight is over or their bodies physically fall apart. Fighting a dual-wielding Dark Pirate is less like a sword fight and more like trying to survive a storm with blades.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Marlin Bone",
    artifact_type: W, power_description: PF, sort_order: 26,
    description: "The bill of a monstrous Fukushu Sea marlin — reinforced with iron banding. Dense enough to pierce ship hulls. What it does to a person doesn't bear describing.",
    lore_content: `The marlins of the Fukushu Sea grow to monstrous size — some large enough to capsize a rowboat with a single breach. When one washes up dead on the cursed shores, the Dark Pirates strip it. The bill — that long, spear-like nose — is prized as a weapon. Reinforced with iron banding and fitted with a leather grip, the Marlin Bone becomes a stabbing weapon of terrifying length and sharpness. The bone is naturally dense enough to pierce ship hulls. What it does to a person doesn't bear describing.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Single Boned",
    artifact_type: W, power_description: PF, sort_order: 27,
    description: "One-arm variant for the ones the curse left broken. Some Dark Pirates etch symbols into the bone's surface. What they mean, only Vane knows.",
    lore_content: `The single-blade variant of the Double Boned. Preferred by Dark Pirates who've lost the use of one arm — which is more common than you'd think, given the state the curse leaves their bodies in. The single bone blade is thicker and heavier than its twin counterpart, designed for powerful overhead strikes rather than the frenzied dual-wielding style. Some Dark Pirates etch symbols into the bone's surface — not words, exactly, but marks that pulse faintly with dark energy. What they mean, only Vane knows. And Vane isn't talking.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Spike Bat",
    artifact_type: W, power_description: PF, sort_order: 28,
    description: "Iron spikes through petrified driftwood. Too heavy to swing without cursed strength. One hit can buckle a ship's door or end a fight nobody wants to witness.",
    lore_content: `The Spike Bat is the Whacking Bat's angrier older brother. Iron spikes driven through a length of petrified driftwood, the whole thing weighing enough to require cursed strength just to lift. It is not swung so much as hurled — a full-body motion that carries the weight of the bat and the fury of the curse behind it. One solid hit can buckle a ship's door, collapse a wooden barrier, or end a fight in a way that nobody wants to witness. The Dark Pirates who favor this weapon are usually the largest of Vane's crew — the ones the curse has bloated and twisted into something barely recognizable as human.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "The Scorpion",
    artifact_type: W, power_description: PF, sort_order: 29,
    description: "A curved blade with a retractable spike at the hilt. Block it and the spike drives through your guard. The rule in Fukushu Sea: don't parry. Run.",
    lore_content: `The Scorpion is the deadliest weapon in the Dark Pirate arsenal, and only a handful exist. A curved blade fitted with a secondary retractable spike near the hilt — when the main blade is blocked, the wielder triggers the spike, which drives forward through the guard and into the defender's hand or wrist. It's a cheat. A dirty, cruel trick designed to punish anyone who tries to fight back. Sailors across the Fukushu Sea know the rule: if you see The Scorpion, don't parry. Dodge. Run. Jump overboard. Anything but block.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },
  {
    name: "Welding Axe",
    artifact_type: W, power_description: PF, sort_order: 30,
    description: "Heavy axe that heats up to fuse metal on contact. The Dark Pirates use it to seal prisoners inside cargo holds by melting the door hinges shut.",
    lore_content: `A brutal, heavy axe forged from ship's anchor chain and hammered into shape over the dark fires of Vane's forge. The Welding Axe is the Dark Pirates' breaching tool — used to chop through locked doors, reinforced hatches, and the masts of captured ships. The name comes from its secondary function: the blade heats up when charged with dark energy, hot enough to fuse metal on contact. Dark Pirates use it to seal prisoners inside cargo holds by melting the door hinges shut. The screaming from below deck is something the crew of captured vessels never forget.`,
    origin_story: "~The Pirate's Almanac — Weapons of the Fukushu Sea.",
  },

  // DARK PIRATE SIDEKICKS
  {
    name: "Black Parrot",
    artifact_type: S, power_description: PF, sort_order: 50,
    description: "The curse turned them black, hollow-eyed, and silent. They don't eat. They don't die. Nobody talks freely when one is perched nearby — just in case Vane is watching through them.",
    lore_content: `The parrots that perch on the shoulders of Vane's crew are not alive. Not in the way that matters. They were once ordinary birds — bright-feathered, loud, obnoxious — the kind every pirate in the Fukushu Sea keeps for luck. The curse changed them. Their feathers turned black, their eyes went hollow, and they stopped eating. But they didn't die. They just kept watching. Kept listening. Some say Vane uses them as spies — that he can see through their dead eyes and hear through their silent beaks. Others say that's paranoid nonsense. But nobody talks freely when a black parrot is perched nearby. Just in case.`,
    origin_story: "~Whispered among Fukushu Bay fishermen.",
  },
  {
    name: "Dark Ferret",
    artifact_type: S, power_description: PF, sort_order: 51,
    description: "Larger, faster, blindly aggressive. A security system that runs loose below decks at night. Their bite festers. By the time you scream, the crew already knows you're aboard.",
    lore_content: `Quick, vicious, and impossible to catch. The dark ferrets that skitter through Vane's ships are ratcatchers turned predators. The curse has made them larger, faster, and blindly aggressive. Their teeth carry the same rot as the cursed blades — a bite from one will fester and spread if not treated quickly. The Dark Pirates keep them loose aboard their ships, not as pets but as a security system. Try to sneak aboard Vane's fleet at night, and the ferrets will find you long before the crew does. The crew will hear you scream, though.`,
    origin_story: "~The Pirate's Almanac — Creatures of the Cursed Fleet.",
  },
  {
    name: "Dark Monkey",
    artifact_type: S, power_description: PF, sort_order: 52,
    description: "The oldest living creature in the Dark Fleet. Was with Vane before the blood oath. Too large, too strong, eyes that glow. Not even Vane's senior officers will touch it.",
    lore_content: `The monkey that clings to the rigging of Vane's flagship is the oldest living creature in the Dark Fleet — if "living" is the right word. It was with Vane before the Devil's Eye, before the blood oath, before any of it. The curse has twisted it into something unrecognizable — too large, too strong, with eyes that glow faintly in the dark. It moves through the ship like it owns the place, and not even Vane's most senior officers will touch it. Rumor has it the monkey carries a small blade — taken from the first sailor it killed after the curse took hold. Whether it kills out of malice or instinct, nobody's been brave enough to study the difference.`,
    origin_story: "~The Pirate's Almanac — Creatures of the Cursed Fleet.",
  },
  {
    name: "Dark Octopus",
    artifact_type: S, power_description: PF, sort_order: 53,
    description: "Tentacles long enough to reach the deck from the waterline. It serves Vane — or at least respects him. Everyone else's ship is fair game.",
    lore_content: `Something lives in the waters beneath Vane's fleet. The sailors call it the Dark Octopus, though "octopus" doesn't begin to describe what it's become. Its tentacles are long enough to reach the deck from the waterline, and they surface without warning — sometimes to drag a barrel of supplies below, sometimes to drag a person. The creature seems to serve Vane, or at least respect him. It never touches his ship. Everyone else's is fair game. Fishermen who've encountered it at a distance describe the water around it turning black — not ink, something darker. Something that doesn't dissipate with the current.`,
    origin_story: "~Whispered among the sailors of Fukushu Bay.",
  },
  {
    name: "TipRat",
    artifact_type: S, power_description: PF, sort_order: 54,
    description: "The vermin of the cursed fleet — enormous, intelligent, and one step ahead of the crew. When TipRats swarm to one side, abandon ship. Vane respects this.",
    lore_content: `The TipRats are the vermin of the cursed fleet — enormous, mangy, and far too intelligent for a rat. They infest every ship in Vane's fleet and seem to multiply faster than the crew can kill them. But here's the thing the Dark Pirates have learned: the TipRats know when a ship is about to sink before the crew does. When the rats start swarming to one side of the vessel, the pirates know to abandon ship. It's happened enough times that even Vane respects it. "Follow the rats," he tells new recruits — the ones who still have enough mind left to follow orders. "They'll keep you floating longer than your own instincts will."`,
    origin_story: "~The Pirate's Almanac — Creatures of the Cursed Fleet.",
  },

  // ROUGE NAVY WEAPONS
  {
    name: "Albino Viper",
    artifact_type: W, power_description: PF, sort_order: 60,
    description: "Bleached white by the curse. Worn coiled around the forearm. Strikes on command — not through training, but through shared suffering between officer and snake.",
    lore_content: `A pale-scaled serpent, bleached white by whatever curse transformed Julius's crew. The Rouge Navy officers who carry these vipers wear them coiled around their forearms like living weapons. The snake strikes on command — or at least, it seems to. The bond between the cursed sailors and their vipers is not one of training. It is one of shared suffering. The venom paralyzes but does not kill. Julius forbade killing where he could, even after the curse. Old habits die hard. Even when the man who holds them is barely a man anymore.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Glory Glow",
    artifact_type: W, power_description: PF, sort_order: 61,
    description: "A lantern-like device producing something older than fire. The Dark Pirates recoil from it instinctively. Julius's officers hold the line between the portal and the darkness.",
    lore_content: `A lantern-like device mounted on a short handle, the Glory Glow is the Rouge Navy's answer to the darkness that follows Vane's fleet. The light it produces is not fire — it is something older, something the cursed sailors discovered when they first began patrolling the waters near the portal they're bound to guard. The glow repels dark energy the way a torch repels shadow, and the Dark Pirates recoil from it instinctively. Julius's officers carry them during engagements with Vane's fleet, holding the line between the portal and the darkness that wants so desperately to reach it.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Golden Hand Wrap",
    artifact_type: W, power_description: PF, sort_order: 62,
    description: "Gold thread woven from Lacus trade. Channels defensive energy — enough to deflect a cursed blade. Not weapons of attack. Weapons of endurance. That is all they have left.",
    lore_content: `Where the Dark Pirates' hand wraps hold back corruption, the Rouge Navy's golden wraps channel something different entirely. The fabric is woven with fine gold thread — traded, it is believed, from the Lacus People in exchange for the Rouge Navy's eternal vigil over the waters near their domain. The wraps enhance the wearer's grip and allow them to channel small bursts of defensive energy — enough to deflect a cursed blade or push back a dark creature. They are not weapons of attack. They are weapons of endurance. And endurance is all the Rouge Navy has left.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Golden Hook",
    artifact_type: W, power_description: PF, sort_order: 63,
    description: "Lost to battle, not to the curse. Forged from Lacus gold alloy. Sailors who wear them say they can feel the phantom fingers. A small mercy in a sea of none.",
    lore_content: `Unlike the Dark Pirates' fused hooks of corruption, the Rouge Navy's golden hooks are crafted with purpose and precision. Forged from the same gold alloy that appears in Lacus weaponry, these prosthetics replace hands lost not to the curse but to battle — to the endless, thankless war Julius's crew wages against Vane's fleet. The gold resonates faintly with light energy, and sailors who wear them say they can feel their missing hand — the phantom fingers flexing, reaching, remembering what it felt like to be whole. It is a small mercy. But in the Fukushu Sea, small mercies are all there is.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Golden Telescope",
    artifact_type: W, power_description: PF, sort_order: 64,
    description: "Through this lens you can see dark energy trailing Vane's ships, the portal's seal beneath the waves, and the ghostly afterimage of what Julius's crew once looked like.",
    lore_content: `Standard naval issue, or it was, once. The telescope Julius carried through the Devil's Eye has been transformed by the same curse that binds his crew to the portal. Through its lens, the viewer can see things that shouldn't be visible — the faint outline of dark energy trailing behind Vane's ships, the shimmer of the portal's seal beneath the waves, the ghostly afterimage of what the Rouge Navy sailors looked like before the curse took their youth, their color, their lives. Julius uses it every morning at dawn. He stands at the bow and looks through the lens at the horizon, searching for something. His crew says he's watching for Vane. But the way he holds the telescope — hands trembling, jaw tight — suggests he's looking for something he lost a long time ago.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Golden Trident (Rouge Navy)",
    artifact_type: W, power_description: PF, sort_order: 65,
    description: "Gifted directly by the Lacus People to Julius's three most trusted officers. The lightning can permanently destroy a Dark One creature, not merely disperse it.",
    lore_content: `The same Lacus-forged golden tridents that appear in Light Walker lore, but these were given to Julius's crew directly. The Lacus People recognized the Rouge Navy's role as portal guardians — a duty that mirrors their own. Three tridents were gifted, carried by Julius's three most trusted officers. The electricity they carry is identical to the originals described by Korin the Quartermaster. In the Rouge Navy's hands, they serve as both weapon and ward — their lightning discharge is one of the few things that can permanently destroy a Dark One creature rather than simply dispersing it.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Golden Triple Scythe",
    artifact_type: W, power_description: PF, sort_order: 66,
    description: `Three blades for the three things Julius refuses to abandon: duty, honor, hope. "We were Navy before we were damned. And we will be Navy after."`,
    lore_content: `The Rouge Navy's answer to the Dark Pirates' triple scythe. Same three-bladed design, but forged in gold alloy and wielded with discipline rather than fury. Where the Dark version represents the three things Vane surrendered in his oath, the golden version represents the three things Julius refuses to abandon: duty, honor, and hope. It is ceremonial as much as practical — carried during the formal patrols that Julius insists his crew maintain, even centuries into their curse. "We were Navy before we were damned," he tells them. "And we will be Navy after."`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Rouge Pick Axe",
    artifact_type: W, power_description: PF, sort_order: 67,
    description: "Boarding tool, ice-breaker, emergency weapon. Julius's philosophy: every tool serves multiple purposes. Nothing fancy. Just effective.",
    lore_content: `Boarding tool, emergency weapon, and ice-breaker for the frozen waters near the portal during Baransu's cold season. The Rouge Navy's pick axe is practical above all else — a reflection of Julius's philosophy that every tool should serve multiple purposes. The crew uses them to breach enemy hulls below the waterline, chip through ice that threatens to trap their ships, and in desperate close-quarters combat where reach matters more than finesse. Nothing fancy. Just effective.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Rouge Pistol",
    artifact_type: W, power_description: PF, sort_order: 68,
    description: "Maintained like they were still alive. Modified over centuries with Baransu materials. Shot soaked in Lacus waters — probably superstition, but the Rouge Navy isn't willing to test by stopping.",
    lore_content: `The Rouge Navy carried their firearms through the Devil's Eye, and unlike Vane's crew, they maintained them. Julius ran his cursed ship the same way he ran his Royal Navy vessel — with discipline, maintenance schedules, and consequences for neglect. The pistols are flintlock design, modified over the centuries with materials sourced from the Baransu Realm. They fire lead shot that has been blessed — or at least soaked — in the waters near the Lacus domain. Whether this actually enhances their effectiveness against dark creatures or whether it's just superstition, the Rouge Navy isn't willing to test by stopping.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Rouge Samurai Sword",
    artifact_type: W, power_description: PF, sort_order: 69,
    description: "Murakami curve married to Western naval cutlass weight. Julius carries one, though he hasn't drawn it in years. He says he's saving it.",
    lore_content: `Julius's crew didn't know what a samurai sword was when they arrived in Baransu. They learned fast. The Murakami family's reputation preceded their blades, and when the Rouge Navy began trading with coastal settlements, samurai-style swords were the first things they sought. Their versions are hybrid — Murakami curve and edge married to the heavier Western naval cutlass weight and crossguard. The result is a blade that feels familiar to a sailor's hand but cuts like nothing they wielded in the old world. Julius himself carries one, though he hasn't drawn it in years. He says he's saving it.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Rouge Spear",
    artifact_type: W, power_description: PF, sort_order: 70,
    description: "Gold alloy reinforced. Used in formation — a wall of spear points no Dark Pirate charge has ever broken. Julius drills his crew on spear formations twice a week. Centuries of it.",
    lore_content: `Long reach for repelling boarders. Standard naval tactic, older than any curse. The Rouge Navy's spears are reinforced with the same gold alloy that runs through their other weapons, and they're used in formation — a wall of spear points that no Dark Pirate charge has ever broken. Julius drills his crew on spear formations twice a week. Centuries of drilling the same formations. The cursed sailors never complain. They don't remember how to.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Swinger",
    artifact_type: W, power_description: PF, sort_order: 71,
    description: "A weighted chain with a spiked ball. Swings from the rigging and clears the deck below. Miss the release and you crash into the mast. The Rouge Navy has centuries of practice. They don't miss.",
    lore_content: `A weighted chain with a spiked ball at the end — naval boarding weapon adapted from old world designs. The Rouge Navy uses it to clear enemy decks from the rigging above. A sailor swings from the mast, the chain whips in a wide arc, and everything standing on the deck below is no longer standing. It requires enormous strength and timing — miss the release and you crash into the enemy mast. Hit it right and you've cleared a landing zone for your boarding party. The Rouge Navy has had centuries to practice. They don't miss.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "The Rouge Sword",
    artifact_type: W, power_description: PF, sort_order: 72,
    description: "Not special. Not magical. Not legendary. Holds an edge. Doesn't rust. Balances well in a tired hand. Sometimes that is the most dangerous thing on the water.",
    lore_content: `The standard-issue sidearm of every Rouge Navy sailor. A straight-bladed naval sword with a basket hilt, forged from steel sourced in Baransu and finished with a gold-washed crossguard. It is not special. It is not magical. It is not legendary. What it is, is reliable. It holds an edge. It doesn't rust in saltwater. It balances well in a tired hand. And every single one of Julius's crew carries one, maintained to the same standard they held when they were still alive. In a fleet of cursed weapons and dark magic, sometimes the most dangerous thing on the water is a simple, well-maintained sword in the hand of a disciplined sailor who has nothing left to lose.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Boned Axe",
    artifact_type: W, power_description: PF, sort_order: 73,
    description: "The Rouge Navy learned bone-forging from the Dark Pirates — then did it better. Gold dust and Lacus salt. Julius approved reluctantly. 'We are not them. But we will use what works.'",
    lore_content: `The Rouge Navy learned bone-forging from observing the Dark Pirates — then did it better. Their bone axes are harvested from the same massive sea creatures, but the bone is treated with gold dust and salt from the Lacus waters, hardening it beyond what the Dark Pirates' dark-fire process achieves. The result is a lighter, sharper axe that doesn't carry the taint of Khaonai's corruption. Julius approved the technique reluctantly. "We are not them," he told his quartermaster. "But we will use what works."`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Double Golden Samurai",
    artifact_type: W, power_description: PF, sort_order: 74,
    description: "Julius's personal guard only. Combat-trial certified. The style was adapted from watching Davie fight. Julius would never admit to learning from a pirate.",
    lore_content: `Twin gold-alloy samurai blades — the Rouge Navy's most prestigious weapons. Only Julius's personal guard carries them, and only after proving their skill in combat trials that Julius himself oversees. The dual-blade style was adopted from watching Davie fight — Julius would never admit to learning from a pirate, cursed or not, but his officers aren't blind. The golden blades carry a faint warmth to them, a counterpoint to the unnatural cold of the Dark Pirates' cursed steel. In battle, the two styles clash like opposing forces — darkness and whatever the Rouge Navy has managed to hold onto that isn't quite light, but refuses to be dark.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Double Golden Triumph",
    artifact_type: W, power_description: PF, sort_order: 75,
    description: "Julius's personal weapons. Never drawn. Spotless. Either they are ceremonial, or Julius is waiting for the day he faces Vane for the final time.",
    lore_content: `A matched pair of heavy cutlasses, gold-washed and ornate, carried only by Julius himself. He has never drawn them in the memory of his current crew. They hang at his sides, spotless, untouched. Some believe they are ceremonial — relics of his naval commission that he refuses to soil with cursed blood. Others believe he is waiting for the day he faces Vane for the final time, and that the Triumph will be the last weapon Vane ever sees. Julius has never confirmed either theory. He simply keeps them polished and waits.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Glow Bow",
    artifact_type: W, power_description: PF, sort_order: 76,
    description: "Arrows tipped with Lacus crystal that detonate in a burst of radiance. One of the few things that can permanently destroy a Dark One. Three arrows per engagement. No exceptions.",
    lore_content: `The Glow Bow fires arrows tipped with the same light energy that powers the Glory Glow lanterns. On impact, the arrowhead detonates in a burst of radiance that burns Dark Ones from the inside out. It is the Rouge Navy's most effective ranged weapon against Vane's cursed creatures, and their supply of ammunition is desperately limited. Each arrow requires a shard of Lacus crystal, and the Lacus do not trade those freely. Julius rations them carefully — three arrows per engagement, no exceptions. "Waste one," he tells his archers, "and you fight the next battle with your bare hands."`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Golden Spear",
    artifact_type: W, power_description: PF, sort_order: 77,
    description: "Planted at the bow during formal engagements. Visible for miles. A declaration: the Rouge Navy is here, and they have not fallen to the dark.",
    lore_content: `A ceremonial weapon that doubles as a signal standard. The Golden Spear is planted at the bow of Julius's flagship during formal engagements and its gold tip catches sunlight in a way that makes the ship visible for miles. It serves as a rallying point and a declaration: the Rouge Navy is here, and they have not fallen to the dark. In combat, it functions as a devastating thrusting weapon — the gold tip channels light energy on impact, and a single clean thrust can disperse a Dark One permanently.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Golden Wielding Axe",
    artifact_type: W, power_description: PF, sort_order: 78,
    description: "The counterpart to the Dark Pirates' Welding Axe. This one breaks prisoners out, not seals them in. Julius insists on this distinction.",
    lore_content: `The counterpart to the Dark Pirates' Welding Axe. Where the dark version heats up to seal prisoners in cargo holds, the golden version heats up to break them out. The Rouge Navy uses this axe to breach sealed hatches, melt through chains, and free the prisoners that Vane's crew leaves behind on captured vessels. It is a rescue tool first and a weapon second. Julius insists on this distinction. His crew carries it into every boarding action — not to conquer, but to liberate. Whatever Julius was before the curse, whatever sins brought him to this sea, this is who he has chosen to be now.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Rifle",
    artifact_type: W, power_description: PF, sort_order: 79,
    description: "Modified with Baransu hardwood. Sharpshooters in every crow's nest. 'Kill the hand on the wheel,' Julius says, 'and the ship is yours.'",
    lore_content: `Standard naval long-range firearm, maintained with the same obsessive discipline as every other weapon in the Rouge Navy's arsenal. Modified with a Baransu-sourced hardwood stock and fitted with a longer barrel for accuracy at sea. The Rouge Navy's sharpshooters can hit a target on a moving ship at distances that make Davie's "me Sheilas" look like toys. Julius stations two riflemen in every crow's nest, with standing orders to target Dark Pirate helmsmen and rigging operators first. "Kill the hand on the wheel," he says, "and the ship is yours."`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Rouge Double",
    artifact_type: W, power_description: PF, sort_order: 80,
    description: "The rank-and-file dual wield. One blade blocks while the other strikes. A line of cursed hollow-eyed sailors moving in perfect unison, their blades rising and falling like the tide.",
    lore_content: `A matched pair of medium-weight cutlasses, the Rouge Navy's standard dual-wield option. Less refined than the Double Golden Samurai but more practical for everyday combat. The Rouge Double is what the rank-and-file sailors carry when the Dark Pirates come calling — which is often. The blades are steel with a gold wash on the crossguard, and they're designed to work in tandem: one blade blocks while the other strikes, alternating in a rhythm that Julius's crew has practiced for longer than most civilizations have existed. There's something haunting about watching it — a line of cursed, hollow-eyed sailors moving in perfect unison, their blades rising and falling like the tide.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Slicem",
    artifact_type: W, power_description: PF, sort_order: 81,
    description: "Short, wide blade for fighting below decks where long swords get you killed. Razor-sharp one side, serrated the other. Nobody's thought of a better name in three hundred years.",
    lore_content: `A short, wide-bladed cutlass designed for close-quarters combat below decks. The Slicem is the Rouge Navy's weapon of choice for boarding actions — where corridors are narrow, ceilings are low, and a long sword will get you killed faster than no sword at all. The blade is razor-sharp along one edge and serrated along the other, allowing the wielder to cut rope, canvas, and chain as easily as flesh. It's called the Slicem because that's what the old crew called it before the curse, and nobody's thought of a better name in three hundred years.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },
  {
    name: "Speargun",
    artifact_type: W, power_description: PF, sort_order: 82,
    description: "Lacus fishing technology adapted for underwater combat. Gold-tipped spears that keep wounds from healing. The only thing between the divers and whatever Vane has swimming patrol.",
    lore_content: `Adapted from Lacus fishing technology — a compressed-air driven spear launcher that works above and below the waterline. The Rouge Navy uses it to engage Dark One sea creatures that lurk beneath Vane's fleet. A direct hit can pin a creature to the hull of its own ship, and the gold-tipped spears carry enough light energy to keep the wound from healing. Julius's divers — the few cursed sailors brave enough to enter the water — carry spearguns as their primary weapon. Down there, in the dark water beneath the ships, it's the only thing between them and whatever Vane has swimming patrol.`,
    origin_story: "~The Pirate's Almanac — The Rouge Navy.",
  },

  // ROUGE NAVY SIDEKICKS
  {
    name: "Fuku Octopus",
    artifact_type: S, power_description: PF, sort_order: 90,
    description: "Nested in the gold-infused hulls of Julius's ships for as long as anyone remembers. Fiercely territorial. When they go silent, something bad is coming from the deep.",
    lore_content: `The Fuku Octopus is the only creature in the Fukushu Sea that the Rouge Navy trusts. Named for the bay itself, these smaller octopi are drawn to the gold-infused hulls of Julius's ships and have nested in the barnacle-crusted wood for as long as anyone can remember. They are intelligent, curious, and fiercely territorial — attacking anything that approaches the hull uninvited. The sailors consider them good luck. Julius considers them the first line of defense. When the Fuku Octopi suddenly retract into their crevices and go silent, the crew knows something bad is coming up from the deep.`,
    origin_story: "~The Pirate's Almanac — Creatures of the Rouge Navy.",
  },
  {
    name: "Golden Ferret",
    artifact_type: S, power_description: PF, sort_order: 91,
    description: "Golden-furred, warm-glowing eyes, fearless against Dark Ferrets. The only creatures on Julius's ship that still seem genuinely happy. The crew bets on them during downtime.",
    lore_content: `Faster than the Dark Ferrets and twice as clever, the Golden Ferrets aboard Julius's ships are ratcatchers, scouts, and — according to the crew — the only creatures on board that still seem genuinely happy. Their fur has taken on a golden sheen from living among the gold-washed weapons and equipment, and their eyes glow with a faint warm light. They are fearless when confronting Dark Ferrets, and the two species despise each other on sight. Julius's crew has been known to stage ferret encounters during rare moments of downtime, betting on which ferret reaches the other first. It's the closest thing to entertainment the Rouge Navy has.`,
    origin_story: "~The Pirate's Almanac — Creatures of the Rouge Navy.",
  },
  {
    name: "Golden Monkey",
    artifact_type: S, power_description: PF, sort_order: 92,
    description: "With Julius since Nassau. Pale gold fur, steady warm glow. Acts as lookout from the highest mast. When it shrieks, the crew goes to battle stations. It has never been wrong.",
    lore_content: `Julius's monkey has been with him since Nassau. Unlike Vane's corrupted primate, Julius's monkey weathered the curse differently — perhaps because Julius's oath was one of duty rather than darkness. The monkey's fur has turned a pale gold, its eyes carry a steady warm glow, and it moves through the rigging with a grace that the cursed sailors have long since lost. It acts as Julius's lookout, perched at the highest point of the mainmast, scanning the horizon with eyes sharper than any telescope. When the monkey shrieks, the crew goes to battle stations. It has never been wrong.`,
    origin_story: "~The Pirate's Almanac — Creatures of the Rouge Navy.",
  },
  {
    name: "Golden Parrot",
    artifact_type: S, power_description: PF, sort_order: 93,
    description: "Repeats Julius's commands across the ship. Once interrupted a speech with 'VANE IS A COWARD' and the crew cheered so loud the Dark Fleet three miles out heard them. Julius did not correct the bird.",
    lore_content: `The Golden Parrot perches on Julius's shoulder during formal addresses and repeats his commands across the ship in a voice that carries like a bell. Its feathers are a burnished gold — the opposite of the Dark Fleet's black parrots in every way. Where the black parrots spy and stay silent, the Golden Parrot announces, declares, and occasionally editorializes. It once interrupted Julius mid-speech with "VANE IS A COWARD" and the crew cheered so loudly that the Dark Fleet three miles out heard them. Julius did not correct the bird.`,
    origin_story: "~The Pirate's Almanac — Creatures of the Rouge Navy.",
  },

  // TOWNSMEN ITEMS
  {
    name: "Golden Flute",
    artifact_type: W, power_description: PF, sort_order: 100,
    description: "Nobody knows his name. He doesn't speak. He just plays at the docks every evening. If the music has stopped, you don't dock. You sail on and pray.",
    lore_content: `There is a man in Fukushu Bay who plays a golden flute at the docks every evening. Nobody knows his name. He doesn't speak. He just plays. The melody changes with the tide — something fast and bright when the water is high, something slow and mournful when it recedes. Sailors swear the flute keeps the sea creatures calm. Whether that's true or superstition, nobody docks in Fukushu Bay without first listening for the flute. If the music has stopped, you don't dock. You sail on and pray.`,
    origin_story: "~Fukushu Bay — A Traveler's Guide (Unofficial).",
  },
  {
    name: "Fishing Pole",
    artifact_type: W, power_description: PF, sort_order: 101,
    description: "Old Makaro. Same dock for longer than anyone remembers. He pulls up fish that shouldn't exist from water too dark and too cursed to hold anything alive. Even Vane's crew leaves him alone.",
    lore_content: `"You want to know the most dangerous weapon in Fukushu Bay? It ain't a sword. It ain't a pistol. It's old Makaro's fishing pole. That man has been sitting on the same dock for longer than anyone can remember, pulling fish out of water that should be too dark and too cursed to hold anything alive. He catches things that shouldn't exist. Last week he pulled up a fish with three eyes and what looked like armor plating. Ate it for dinner. Said it tasted like regret. The Dark Pirates leave him alone. Even Vane's crew leaves him alone. I don't know why. I don't want to know why."`,
    origin_story: "~Overheard at a Fukushu Bay tavern.",
  },
  {
    name: "Stein",
    artifact_type: W, power_description: PF, sort_order: 102,
    description: "Thick ceramic, iron-banded, heavy enough to crack a skull. In Fukushu Bay, bar fights are nightly. The rule: if the stein is empty, they're toasting you. If it's full, run.",
    lore_content: `The drinking steins of Fukushu Bay's taverns are weapons in their own right — thick ceramic, iron-banded, heavy enough to crack a skull. And they have. Many times. Bar fights in Fukushu are a nightly occurrence, and the stein is the weapon of choice for anyone too drunk to find their sword. The tavern keepers don't bother replacing them anymore. The unofficial rule in Fukushu Bay: if someone raises a stein to you, check if it's full first. If it's empty, they're toasting you. If it's full, they're about to waste perfectly good rum on your forehead.`,
    origin_story: "~Fukushu Bay — A Traveler's Guide (Unofficial).",
  },

  // TOWNSMEN SIDEKICKS
  {
    name: "Ferret",
    artifact_type: S, power_description: PF, sort_order: 110,
    description: "Every ship keeps one. Traded like currency. A good ratter fetches the price of a new sail. In a place where loyalty is bought and sold, the ferret never switches sides.",
    lore_content: `Every ship in Fukushu Bay keeps a ferret. Not for companionship — for survival. The rats in the bay are enormous, aggressive, and rumored to carry diseases that make the curse look pleasant. A good ship's ferret keeps the rats in check and the crew's food supply intact. The ferrets of Fukushu Bay are traded like currency, and a particularly skilled ratter can fetch the price of a new sail. Sailors name them, spoil them, and mourn them when they die. In a place where loyalty is bought and sold, the ferret is the one companion that never switches sides.`,
    origin_story: "~Fukushu Bay — A Traveler's Guide (Unofficial).",
  },
  {
    name: "Parrot",
    artifact_type: S, power_description: PF, sort_order: 111,
    description: "A parrot on your shoulder means you sailed far enough to find one and survived long enough to keep it. Captain Davie's parrot can swear in four languages. Only two have been identified.",
    lore_content: `Standard pirate companion. Loud, colorful, and utterly useless in a fight. But in Fukushu Bay, a parrot on your shoulder means you've sailed far enough to find one and survived long enough to keep it. It's a status symbol, plain and simple. The more exotic the bird, the more dangerous the sailor. Captain Davie keeps a parrot that can swear in four languages, only two of which anyone has identified.`,
    origin_story: "~Fukushu Bay — A Traveler's Guide (Unofficial).",
  },
];

async function main() {
  console.log(`Inserting ${items.length} armory items...`);

  // Insert in batches of 50
  const BATCH = 50;
  let ok = 0, fail = 0;

  for (let i = 0; i < items.length; i += BATCH) {
    const batch = items.slice(i, i + BATCH);
    const { data, error } = await supabase.from("artifacts").insert(batch).select("id, name");
    if (error) {
      console.error(`  FAIL batch ${i}-${i + BATCH}: ${error.message}`);
      fail += batch.length;
    } else {
      data.forEach(r => console.log(`  +  ${r.name}`));
      ok += data.length;
    }
  }

  console.log(`\nDone. ${ok} inserted, ${fail} failed.`);
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
