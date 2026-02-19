/**
 * Seeds all canonical Shibui Universe timeline events from /docs lore.
 * Skips the 5 already seeded (aaaaaaaa- prefix).
 * Usage: node --env-file=.env scripts/seed-timeline-full.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const ERA = {
  ORIGINS:  "11111111-1111-1111-1111-111111111111",
  DAWN:     "22222222-2222-2222-2222-222222222222",
  DESTRUCT: "33333333-3333-3333-3333-333333333333",
  PEACE:    "44444444-4444-4444-4444-444444444444",
  CURSED:   "177d017d-45b0-40dc-8ca3-4a3475e01527",
};

const events = [

  // ─── AGE OF ORIGINS ──────────────────────────────────────────────────────────

  {
    id: "bbbbbbbb-0001-0001-0001-000000000001",
    title: "The Three Undying Ones Are Made",
    year: 1,
    era_id: ERA.ORIGINS,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 1,
    show_lore_badge: true,
    reading_time: 2,
    description: "Before humans. Before time as we know it. The Almighty made three peoples in the Upper Realm and gave each a gift from his own nature.",
    full_content: `The Almighty is. The Almighty has always been. The Almighty will forever be.

He made all that is. The heavens and the depths. The elements and the creatures and the beings. All of it.

Then he made the Undying Ones. Three peoples. Each one given a piece of who he is.

The Montes were given wisdom and knowledge.
The Lacus were given loyalty and honor.
The Robur were given strength.

And to each group, the Almighty gave a precious gemstone. The stone held the essence of the gift inside it. A physical piece of something divine.

There was peace. There was harmony. There was plenty.

None of them feared death. They were Undying Ones.

That was the world before everything went wrong.`,
  },

  {
    id: "bbbbbbbb-0002-0002-0002-000000000002",
    title: "The Celestial War",
    year: 350,
    era_id: ERA.ORIGINS,
    category: "battle",
    event_type: "event",
    is_featured: true,
    sort_order: 2,
    show_lore_badge: true,
    reading_time: 3,
    description: "Khaonai leads the Robur against the Almighty. The heavens shake. The land splits. Nothing survives this unchanged.",
    full_content: `Khaonai didn't just rebel quietly. He challenged the Almighty outright.

He led the entire Robur people into battle. The greatest warrior in all of creation, commanding the strongest beings that had ever existed, going to war against their maker.

The Montes and the Lacus stayed faithful. They fought alongside the Almighty.

The heavens shook. The depths were torn apart. Animals that had never known fear scattered in every direction, terrified of their masters for the first time. The seas roiled. The land splintered. The Upper Realm itself was cracking at the seams.

The Almighty and the faithful won.

But the Dark Magic had already spread. Like a sickness. Like smoke that gets into everything before you realize the fire started. Khaonai may have lost the battle, but the thing he created was already loose in the world.

The Almighty couldn't kill his Undying Ones. That was not within his design. So he did the next thing. He built a prison for them.`,
  },

  {
    id: "bbbbbbbb-0003-0003-0003-000000000003",
    title: "The Shadow Realm Is Created",
    year: 380,
    era_id: ERA.ORIGINS,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 3,
    show_lore_badge: true,
    reading_time: 2,
    description: "Unable to destroy his own creation, the Almighty does the only thing he can. He builds a third realm and locks the Robur inside it.",
    full_content: `He could not kill them.

That was the problem. They were Undying Ones. Immortal by design. The Almighty had made them that way, and he does not undo his own work.

So he created a new place. A third realm. The Shadow Realm.

No light. No glory. No peace. Nothing like the Upper Realm they had known. Khaonai and the Robur were sent there and the door was sealed behind them.

The betrayers would never stand in the Upper Realm again.

The Almighty knew keeping them contained would require more than just a locked door. The threat of what was sealed in the Shadow Realm would shape everything that came next.`,
  },

  {
    id: "bbbbbbbb-0004-0004-0004-000000000004",
    title: "The Montes Are Transformed",
    year: 400,
    era_id: ERA.ORIGINS,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 4,
    show_lore_badge: true,
    reading_time: 2,
    description: "The Montes stayed faithful during Khaonai's war. But pride is its own kind of poison. The Almighty sees it growing and acts.",
    full_content: `The Montes were faithful. They fought alongside the Almighty and didn't break. That counts for something.

But faithfulness doesn't make you immune to your own flaws.

The Montes were the bearers of wisdom. And wisdom, when it goes unchecked, turns into something ugly. Pride. The quiet certainty that you are better than everyone else because you know more than they do.

The Almighty saw it. He always sees it.

He created a new realm called Baransu. He sent the Montes there. And when they arrived, they found themselves transformed. Giants. Enormous. Their outside finally matching the size of the pride that had been growing on the inside.

It wasn't punishment. It was honesty.`,
  },

  {
    id: "bbbbbbbb-0005-0005-0005-000000000005",
    title: "The Lacus Take Their Post at Lake Shamakai",
    year: 420,
    era_id: ERA.ORIGINS,
    category: "alliance",
    event_type: "event",
    is_featured: false,
    sort_order: 5,
    show_lore_badge: true,
    reading_time: 2,
    description: "The Lacus kept their honor through the war. Their reward is an eternal post at the bottom of Lake Shamakai, guarding the door to the Shadow Realm.",
    full_content: `Loyalty and honor. That was the Lacus. That was always the Lacus.

Through everything, they stayed true. No Whisper reached them. No ambition pulled them sideways. They fought with the Almighty and they kept their nature clean.

Their reward was a job.

The Almighty stationed them at the bottom of Lake Shamakai in the Baransu Realm. Guardians of the door between the Shadow Realm and Baransu. Their entire existence became about making sure Khaonai and the Robur never breached that door.

Not a glamorous assignment. Not a throne or a victory parade.

But the Lacus understood something the Montes had forgotten and the Robur had rejected: real honor isn't about what you gain. It's about what you protect.

They took their post.

They have held it ever since.`,
  },

  // ─── ERA OF THE DAWN OF BARANSU ─────────────────────────────────────────────

  {
    id: "bbbbbbbb-0006-0006-0006-000000000006",
    title: "The Almighty Walks Among the Novus",
    year: 560,
    era_id: ERA.DAWN,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 6,
    show_lore_badge: true,
    reading_time: 2,
    description: "The Almighty wants to walk closely with his new creation. So he does something unexpected. He comes down. In human form. In disguise.",
    full_content: `He didn't stay distant.

That's the thing people miss when they think about the Almighty. He didn't create the Novus People and then sit back and watch them figure it out alone.

He came down.

Human form. No divine reveal. No glowing entrance. He concealed who he was and walked among them. He wanted to teach the Novus how to wield his power. He wanted to watch over his creation up close.

He found two brothers. Sensei Murkai, pure of heart. And Turkan, his brother, driven and strong-willed.

He trained them. Prepared them. Took them into his confidence further than anyone before.

Nobody knew they were being taught by the Almighty himself.

Not even Turkan fully understood what he was receiving. And that would matter later. It would matter a lot.`,
  },

  {
    id: "bbbbbbbb-0007-0007-0007-000000000007",
    title: "The Staff of the Almighty Is Forged",
    year: 610,
    era_id: ERA.DAWN,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 7,
    show_lore_badge: true,
    reading_time: 2,
    description: "Dark Magic is loose in Baransu. The Almighty answers with his own weapon. The Staff is forged to hold the darkness at bay and one day bring restoration to the realm.",
    full_content: `The Dark Magic was already in the world. The Almighty knew what that meant.

He forged a weapon of his own.

The Staff of the Almighty. A direct counterforce to the Bident of Khaonai. Something made from his power rather than the corruption of it. It could hold Tenebris at bay. More than that, the Almighty said it would one day bring restoration and peace to the entire realm.

He did not say when.

He chose Sensei Murkai and the Light Walker Clan as the keepers of the Staff. The condition was simple: walk with the Almighty. Follow his way. The moment they stopped, the agreement was void.

He also gave them a gemstone. Like the ones given to the Undying Ones, this stone would reveal the truth of who he was to anyone willing to look.

Murkai took the Staff. Made his vow. And the Light Walker Clan began.`,
  },

  // ─── AGE OF DESTRUCTION ──────────────────────────────────────────────────────

  {
    id: "bbbbbbbb-0008-0008-0008-000000000008",
    title: "Tenebris Begins His Reign of Terror",
    year: 1215,
    era_id: ERA.DESTRUCT,
    category: "battle",
    event_type: "event",
    is_featured: true,
    sort_order: 8,
    show_lore_badge: true,
    reading_time: 3,
    description: "Turkan is gone. Tenebris has arrived. For centuries, he walks through Baransu like a plague, turning people into hollow creatures built only to serve him.",
    full_content: `He didn't waste any time.

Tenebris transported himself back to Baransu and immediately started destroying things. For centuries. That's not an exaggeration. Centuries of terror.

He turned his victims into the Forgotten Ones. Mindless beasts. Deformed and obedient. Shadows of people who had once been alive and real. Tenebris built an entire army this way, one broken soul at a time.

The people of Baransu called him Tenebris because it means "darkness comes." An appropriate name for something that arrived without warning and left nothing standing.

The Light Walkers resisted. They were the only organized force that could. The Staff of the Almighty was their weapon and they wielded it as best they could. But holding back a force that had been building for centuries, that didn't need sleep or mercy or a reason to stop, was a different kind of fight.

Baransu survived. Barely. And only because the Almighty had prepared for this exact moment.`,
  },

  {
    id: "bbbbbbbb-0009-0009-0009-000000000009",
    title: "Kurogami Falls to the Dark Whisper",
    year: 1300,
    era_id: ERA.DESTRUCT,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 9,
    show_lore_badge: true,
    reading_time: 3,
    description: "Kurogami was the greatest blacksmith in Baransu. Noble. Gifted. Then the Dark Whisper found him, and everything he could have been got swallowed by obsession.",
    full_content: `Kurogami was a dragon. Not just any dragon. The master blacksmith of Baransu. His work was legendary, his skill unmatched, his character something people pointed to as an example.

Then the Dark Whisper found him.

It started quietly. A voice at the edge of his thoughts. Telling him that the gemstones given to the Undying Ones held power no one fully understood. That someone with his skills could do something extraordinary with them. That he wasn't being greedy. He was being practical.

Kurogami listened.

Obsession is a slow fire. It doesn't announce itself. It just keeps burning until one day you look up and realize the person you were is gone.

He became consumed with obtaining the gemstones. The noble dragon everyone had respected turned into something else entirely. Something the Dark Magic had designed him to become.

His sister Ryujinshi watched it happen. She tried to stop it. She was too late to save him, but not too late to stop what he was building.`,
  },

  {
    id: "bbbbbbbb-0010-0010-0010-000000000010",
    title: "Kurogami Forges the Eternity Blade",
    year: 1320,
    era_id: ERA.DESTRUCT,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 10,
    show_lore_badge: true,
    reading_time: 3,
    description: "In the fires of an underwater volcano at the bottom of the Fukushu Sea, Kurogami forges something that was never meant for his hands. The Eternity Blade.",
    full_content: `He chose the Erdekan. An underwater volcano in the depths of the Fukushu Sea. The only forge in existence hot enough to do what he needed.

Kurogami worked in secret. The blade was designed for one purpose: to hold all five gemstones given by the Almighty. If someone wielded the Blade with all five stones seated in their place, the power would be unlike anything Baransu had ever seen.

He wasn't building it to protect anyone.

He was building it for the power itself.

But even in corruption, Kurogami was the greatest smith alive. The blade he made was extraordinary. The craftsmanship was flawless. The design was perfect. And somewhere underneath the obsession and the Dark Magic, a piece of his original character was still in there, still working, still demanding that whatever he built would be done right.

The Eternity Blade came out of that forge perfect.

It would outlast him. It would outlast everyone who tried to claim it. And one day it would end up in hands the Almighty had chosen long before the blade existed.`,
  },

  {
    id: "bbbbbbbb-0011-0011-0011-000000000011",
    title: "Ryujinshi Defeats Kurogami",
    year: 1325,
    era_id: ERA.DESTRUCT,
    category: "battle",
    event_type: "event",
    is_featured: false,
    sort_order: 11,
    show_lore_badge: true,
    reading_time: 3,
    description: "Kurogami's sister faces him. She wins. And then she disappears with the Eternity Blade into the volcanic tunnels beneath Baransu, vowing to protect it with her life.",
    full_content: `She didn't want to fight her brother.

Ryujinshi had watched Kurogami's descent with grief, not judgment. She knew what the Dark Whisper did to people. She had seen it. But she also knew the Eternity Blade could not be allowed to stay in his hands.

So she faced him.

The battle between them was devastating. Two dragons. One corrupted and driven by obsession, one clear-eyed and heartbroken and refusing to back down.

Ryujinshi won.

She took the Eternity Blade. She stood over her defeated brother and made a decision. She couldn't destroy him and she couldn't trust anyone else with what she now held. There was only one option.

She disappeared into the underground lava tubes along Baransu's eastern coast. Took the blade with her. Made a vow to protect it with her last breath.

For centuries, the location of the Eternity Blade was unknown to everyone except the Almighty.

Which is exactly how it was supposed to be.`,
  },

  // ─── AGE OF PEACE ────────────────────────────────────────────────────────────

  {
    id: "bbbbbbbb-0012-0012-0012-000000000012",
    title: "First Victory Against Tenebris",
    year: 1460,
    era_id: ERA.PEACE,
    category: "battle",
    event_type: "event",
    is_featured: true,
    sort_order: 12,
    show_lore_badge: true,
    reading_time: 2,
    description: "After centuries of holding the line, the Light Walkers push Tenebris back. Not destroyed. Not gone. But retreating. For now, Baransu can breathe.",
    full_content: `Centuries of resistance. Generations of Light Walkers who picked up the Staff and kept the vow and held the line against something that never got tired and never felt remorse.

And then it shifted.

The Light Walkers drove Tenebris back. It wasn't clean. It wasn't a single legendary moment. It was the accumulation of every sacrifice made by every generation before, finally reaching the weight needed to move something enormous.

Tenebris retreated to the Portal of Realms.

Not destroyed. The Undying Ones cannot be killed. But retreating, which for something like Tenebris was almost as good.

Baransu entered a period of restoration. Peace. The kind of quiet that feels unreal after you've lived with war so long you forgot what silence sounds like.

It would last for centuries.

It would not last forever.`,
  },

  {
    id: "bbbbbbbb-0013-0013-0013-000000000013",
    title: "The Long Restoration",
    year: 1470,
    era_id: ERA.PEACE,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 13,
    show_lore_badge: true,
    reading_time: 2,
    description: "Baransu rebuilds. Cities rise. The Light Walkers stand watch at Zillarnia. The realm experiences something it hasn't known in generations. Peace.",
    full_content: `When the fighting stopped, the work began.

Real peace is not just the absence of war. It's the long, unglamorous project of rebuilding everything that war destroyed. Cities. Families. Trust. The sense that tomorrow might actually be better than today.

Baransu did the work.

The Light Walkers led the restoration from Zillarnia. They kept their vow. They patrolled the borders, held the lines, and watched the horizon for any sign that Tenebris was gathering strength again.

Generations lived and died in that peace. Children grew up without knowing what a Forgotten One looked like in person. That was the gift.

Sensei Lux was born into this era. He trained in it. He believed in it. He built a family inside it.

He had no idea what was coming back.`,
  },

  // ─── THE CURSED ──────────────────────────────────────────────────────────────

  {
    id: "bbbbbbbb-0014-0014-0014-000000000014",
    title: "Tenebris Returns to Baransu",
    year: 2000,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 14,
    show_lore_badge: true,
    reading_time: 2,
    description: "The peace ends. Tenebris has been gathering strength in the Shadow Realm for centuries. Now he comes back. And he brings everything with him.",
    full_content: `He never stopped. That was the mistake everyone made during the Age of Peace. They thought his retreat meant something. That he had been beaten in a permanent way.

He had been regrouping.

Centuries in the Shadow Realm. Building. Corrupting. Assembling a horde of Forgotten Ones that dwarfed anything Baransu had faced before. Tenebris had patience. He had nothing but time and a very long memory.

When he crossed back into Baransu, the realm felt it.

The Light Walkers had been watching for exactly this. Sensei Lux received the reports and gathered his warriors. The Hogo-Sha prepared. Every Light Walker who had trained for a battle they hoped would never come was about to find out whether the training was enough.

Zillarnia was about to become the most important place in the world.`,
  },

  {
    id: "bbbbbbbb-0015-0015-0015-000000000015",
    title: "Sensei Lux Wields the Staff Against Tenebris",
    year: 2001,
    era_id: ERA.CURSED,
    category: "battle",
    event_type: "event",
    is_featured: true,
    sort_order: 15,
    show_lore_badge: true,
    reading_time: 3,
    description: "The battle rages at Zillarnia. Sensei Lux takes the Staff and charges Tenebris directly. Light and Dark meet at full force and the outcome changes everything.",
    full_content: `The horde hit Zillarnia like a wave that had no end.

Forgotten Ones. Thousands of them. Every one of them had been a person once. The Light Walkers knew that going in. They fought anyway.

Sensei Lux moved through the battle with the Staff of the Almighty and it was unlike anything his warriors had seen. Every strike pushed back a piece of the darkness. The Staff blazed with the power the Almighty had put in it centuries ago and it had lost none of its force.

He charged Tenebris directly.

Light and Dark collided. The earth cracked beneath them. The sky above the battlefield split between two weathers, neither natural.

Lux drove the Staff into the ground and released everything the weapon had in it.

The power radiated outward. Tenebris was pushed back. The Forgotten Ones evaporated. The horde collapsed.

They had won.

Lux stood in the silence after the battle, breathing hard, and allowed himself one moment of relief.

Then the air changed.`,
  },

  {
    id: "bbbbbbbb-0016-0016-0016-000000000016",
    title: "The Staff of the Almighty Vanishes",
    year: 2002,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 16,
    show_lore_badge: true,
    reading_time: 2,
    description: "After the battle, the Staff falls to the ground. And then it doesn't stay there. It rises, breaks free of Baransu, and flies toward the horizon. Nobody knows where it went.",
    full_content: `The curse took the men. The Staff did not go with them.

It fell to the battlefield ground in the silence after the warriors vanished. The women who remained looked at it lying there and felt a complicated kind of hope. The Staff was still here. The weapon of the Almighty was still in Baransu.

Then it started to glow.

It levitated. Rose slowly off the ground. And then it moved. Not slowly. Lightning fast, blazing through the sky, heading toward the horizon and gone from sight in seconds.

Nobody could follow it.

Nobody knew where it went.

Melea saw it leave. She remembered what it looked like in Lux's hands and she stood there in the wreckage of the battlefield, covered in the dust of a war that had just ended and somehow left them with nothing, and she made herself keep standing.

Later, some of the women would receive visions. A lush garden somewhere in Baransu. The Staff hovering over it.

But no one could find the garden. Not yet.`,
  },

  {
    id: "bbbbbbbb-0017-0017-0017-000000000017",
    title: "Melea Becomes Sensei",
    year: 2002,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 17,
    show_lore_badge: true,
    reading_time: 2,
    description: "The men are gone. The clan is in shock. Melea steps forward and says the thing nobody else is willing to say. We keep moving.",
    full_content: `She didn't ask for the role.

The men were gone. Sensei Lux was gone. Every Light Walker warrior who had fought at Zillarnia was gone, pulled to the Soulless Citadel by a curse that none of them had seen coming. The women and children who remained stood in the aftermath of a battle they had just won and tried to understand how winning could feel like this.

Melea addressed the clan.

Her voice was steady. Her grief was visible. She didn't pretend otherwise and she didn't let it stop her.

She told them the men were not dead. They were trapped. There is a difference. And if they were trapped, there was a way out. They had to find it.

She told them the Light Walker Clan was still the Light Walker Clan. That didn't change because the men were gone. The vow Sensei Murkai made was still in effect.

She told them to get up.

They got up.`,
  },

  {
    id: "bbbbbbbb-0018-0018-0018-000000000018",
    title: "The Light Walkers Enter the Forbidden Forest",
    year: 2002,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 18,
    show_lore_badge: true,
    reading_time: 2,
    description: "Zillarnia isn't safe anymore. Melea leads the clan into the Forbidden Forest to regroup. What they find inside will become their new home.",
    full_content: `Staying in Zillarnia was not an option.

The curse was still active. Any firstborn male who reached his 18th birthday would disappear. The city was a target now. Too exposed. Too well known to the Dark Ones who had served Tenebris.

Melea led the clan into the Forbidden Forest.

The forest had a reputation. The kind of place people told stories about to keep their children from wandering. Nobody went in voluntarily. Which made it perfect.

They pushed through the dense, dark outer layers and kept going until the forest opened into something unexpected. A lush clearing. A beautiful lake. Clean water. Shelter. Enough space to build something real.

It felt intentional. Like it had been waiting for them.

They made it their home. Hidden from the world outside. Safe, for now, from the forces that would hunt them if they knew where to look.

Training began the next morning.`,
  },

  {
    id: "bbbbbbbb-0019-0019-0019-000000000019",
    title: "The Firstborn Curse Manifests",
    year: 2003,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 19,
    show_lore_badge: true,
    reading_time: 2,
    description: "The first Light Walker boy turns 18 after the battle. And then he's gone. Tenebris's curse wasn't just for the warriors. It is for every firstborn son in every generation.",
    full_content: `They had hoped Tenebris's curse was limited to the warriors who fought at Zillarnia.

It was not.

The first boy to turn 18 after the battle was named Doros. He was a gentle kid. Everyone liked him. He woke up on his birthday, came to breakfast, and disappeared between one moment and the next. One second he was reaching for the bowl. The next the chair was empty.

No warning. No transition. Just gone.

The women who watched it happen did not scream. They had run out of that kind of shock a year earlier.

They added it to the growing list of things they were fighting against. And they trained harder.

The Soulless Citadel was real and it was hungry and it did not make exceptions for boys who were not yet warriors.

Somewhere in a hellish limbo between realms, Doros arrived and found the men who had gone before him.

Somewhere in the Forbidden Forest, his mother decided she would break this curse or die before it.`,
  },

  {
    id: "bbbbbbbb-0020-0020-0020-000000000020",
    title: "The Rise of the Hogo-Sha",
    year: 2005,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 20,
    show_lore_badge: true,
    reading_time: 3,
    description: "Three years into hiding, the women of the Light Walker Clan have transformed. They are the Hogo-Sha now. The fiercest warriors Baransu has ever seen.",
    full_content: `Three years.

That is what it took to turn grief into something that could fight back.

Melea trained them in the ancient ways of the Light Walker Clan. Every firstborn daughter became a Hogo-Sha, a guardian. They learned the blade, the bow, hand-to-hand combat, the strategies Sensei Lux had used in a hundred smaller battles before Zillarnia. They learned from each other. They pushed each other.

Quietly, in the heart of the Forbidden Forest, something extraordinary was being built.

The girls who had watched their fathers and brothers vanish were becoming something their fathers and brothers had never been. They were fighting not out of tradition or duty. They were fighting out of love and fury and a refusal to accept that this was how the story ended.

By year three, anyone who had the bad judgment to find the Light Walker village learned immediately that bad judgment had consequences.

The Hogo-Sha were ready.

They were still waiting for the answer to the only question that mattered: how do you break a curse that exists between realms?`,
  },

  {
    id: "bbbbbbbb-0021-0021-0021-000000000021",
    title: "Young Antonia Leaves Zillarnia",
    year: 2005,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 21,
    show_lore_badge: true,
    reading_time: 3,
    description: "Melea's sister Antonia fell in love with the wrong person. Vegas was charming and mysterious and from somewhere no one could quite place. Her family had concerns. She didn't listen.",
    full_content: `Every family has a story like this.

The one person everyone could see was trouble, the one person who was clearly there for the wrong reasons, and the one family member who was absolutely certain they were different. That the love was real. That everyone else was wrong.

Antonia was that person.

Vegas arrived in Zillarnia and nobody could quite figure out where he came from. He was charming. He was attentive. He paid attention to Antonia in a way that felt like being the only person in a room. Her sister Melea had a bad feeling about him from day one. Her family said as much.

Antonia married him.

She wasn't stupid. She wasn't weak. She was a young woman who believed in something and she paid the price that people pay when they believe the wrong thing about someone.

Vegas would reveal what he actually was. It just took time.

And when it happened, the fallout would send Antonia on a path that eventually put her exactly where the Almighty needed her to be.`,
  },

  {
    id: "bbbbbbbb-0022-0022-0022-000000000022",
    title: "Vegas Steals the Baransu Ruby",
    year: 2007,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 22,
    show_lore_badge: true,
    reading_time: 2,
    description: "The truth about Vegas comes out in the worst possible way. Antonia finds him with the Baransu Ruby in his hands and everything she believed about him collapses.",
    full_content: `He had a plan the whole time.

Vegas wasn't in Zillarnia because he fell in love. He was in Zillarnia because the Baransu Ruby was there. A sacred gemstone. A piece of the Almighty's original gifting to the realm. Worth more to the right people than anything else in Baransu.

Antonia found him with it.

She was pregnant. She had built a life with this man. She had defended him to her family, her sister, her friends. She had chosen him again and again every time someone told her she shouldn't.

And there he was, with the stone that belonged to her people, about to run.

The look on his face when she walked in told her everything. Not guilt. Calculation. He was already figuring out his next move.

She stepped in front of him.

The confrontation that followed was brief. Her sister Chaska, who had never trusted Vegas, had been closer than either of them knew.`,
  },

  {
    id: "bbbbbbbb-0023-0023-0023-000000000023",
    title: "Chaska Kills Vegas",
    year: 2007,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 23,
    show_lore_badge: true,
    reading_time: 2,
    description: "Chaska had one job in her mind. Protect her sister. She did it. It did not make anything better.",
    full_content: `Chaska had been watching Vegas since the day he arrived.

She was not subtle about her distrust. She had tried to warn Antonia. She had tried to warn her family. Nobody wanted to hear it.

When she heard the confrontation, she moved.

She killed Vegas.

Antonia did not thank her.

Grief does not run on logic. Antonia knew Vegas had betrayed her. She knew Chaska had done what she believed she had to do. She knew all of that. And she still felt the loss like a physical thing, still felt the version of Vegas she had believed in collapse completely and take pieces of her with it.

She took the Baransu Ruby. She found a boat.

She left.

Chaska stood on the shore and watched her sail away into a sea that had no good answers at the end of it, and understood that protecting someone sometimes means watching them need to go somewhere you can't follow.`,
  },

  {
    id: "bbbbbbbb-0024-0024-0024-000000000024",
    title: "Antonia's Prayer at Sea",
    year: 2007,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 24,
    show_lore_badge: true,
    reading_time: 3,
    description: "She is alone. Pregnant. Nearly dead from thirst and exposure. She has nothing left. So she calls out to the Almighty. And something answers.",
    full_content: `She had been at sea for too long.

The food was gone. The water was gone. She was pregnant and dehydrated and her body was starting to make decisions for her. The sea was flat and indifferent in every direction.

She had told herself she wasn't the praying type. She had drifted from the faith of her clan after everything that happened. But when you are out of every other option, you find out what you actually believe.

She cried out to the Almighty.

Not gracefully. Not with the right words or the right posture. Desperate and raw and completely out of choices.

The symbol of the Almighty on her wrist began to glow.

The ocean moved beneath her boat in a way that the wind wasn't causing. Something enormous rose from the depths and lifted the hull. Not roughly. Carefully. Like something that understood she was fragile.

It carried her to land.

She gave birth on solid ground. The baby was healthy.

Antonia lay there looking at her child and decided that if the Almighty had kept her alive for something, she was going to find out what it was.`,
  },

  {
    id: "bbbbbbbb-0025-0025-0025-000000000025",
    title: "Antonia Becomes a Blacksmith in Port Town",
    year: 2008,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 25,
    show_lore_badge: true,
    reading_time: 2,
    description: "Antonia builds a new life. Quietly. A blacksmith in a port town, raising her son, keeping the Baransu Ruby hidden in a vase, and trying to put the past somewhere she doesn't have to look at it.",
    full_content: `She didn't become a pirate right away.

First she became a blacksmith.

She was good with metal. Always had been. She found a port town, set up a forge, and built a life around the practical work of making things. Her son grew up next to the forge. She was good at her work and fair with her prices and people respected her without knowing anything about where she came from.

The Baransu Ruby stayed hidden in a vase.

She didn't take it out. Didn't look at it much. It was a reminder of too many things at once and she had enough to manage without adding grief to the workday.

But it was always there. Waiting. Glowing faintly sometimes in a way that suggested it had opinions about being stored in a vase.

The Almighty had carried her across the sea and she had arrived with a baby and a stolen gemstone and no plan.

She was working on the plan.`,
  },

  {
    id: "bbbbbbbb-0026-0026-0026-000000000026",
    title: "Young Emerald Tries to Steal a Dragon Egg",
    year: 2009,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 26,
    show_lore_badge: true,
    reading_time: 3,
    description: "The night before her 14th birthday, Emerald sneaks out of the village to prove she's ready to become a Hogo-Sha. Her plan involves the Canyon of Despair and a dragon egg. It does not go perfectly.",
    full_content: `She had a plan. Mostly.

The Canyon of Despair had a nest in the upper cliffs. Dragon eggs were the most dangerous thing you could try to take in Baransu without a death wish or a very specific kind of confidence. Emerald had the second one.

She told herself it would prove she was ready. That when she walked back into the village with an egg, nobody could question whether she belonged among the Hogo-Sha.

She made it to the nest. She got her hands on an egg. She started the climb back down.

That's when the All-Mother Dragon came back.

What followed was not a dignified retreat. It was fast and loud and involved Emerald learning several things about herself very quickly, including that she was better at improvising than she had any right to be given the situation.

Her grandmother Nana was waiting at the village edge when she came running back.

The expression on Nana's face communicated something that did not require words.

Emerald never did get the egg. But the story follows her everywhere and she has mostly stopped being embarrassed about it.`,
  },

  {
    id: "bbbbbbbb-0027-0027-0027-000000000027",
    title: "Blackbeard's Ship Sails Toward Devil's Eye",
    year: 2005,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 27,
    show_lore_badge: true,
    reading_time: 3,
    description: "Captain Blackbeard has made a deal he should not have made. He wants to go home. The Dark Whisper showed him a way. His son Davie is on the ship and has no idea what his father agreed to.",
    full_content: `Blackbeard was not always the man his crew feared.

He had come to Baransu from somewhere else. Another world, another time. He had been pulled through the Devil's Eye by accident years ago and he had never stopped trying to get back. The obsession had curdled into something the Dark Whisper recognized and fed.

He made a deal.

The details of what he traded were not shared with his crew. His son Davie, who grew up on the ship believing his father was simply hard and difficult and cold, did not know that the deal involved him specifically.

The Whisper promised a way through the Devil's Eye. It would cost exactly what the Whisper always costs: something that was not supposed to be the Dark Whisper's to take.

Blackbeard sailed toward the portal anyway.

Captain Julius of the Royal Navy had been tracking Blackbeard for months. He was close. And Blackbeard was sailing directly toward the most dangerous body of water in any realm.

The blood moon was rising.`,
  },

  {
    id: "bbbbbbbb-0028-0028-0028-000000000028",
    title: "Both Ships Are Pulled Through Devil's Eye",
    year: 2005,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 28,
    show_lore_badge: true,
    reading_time: 3,
    description: "The Devil's Eye opens during a blood moon eclipse. Blackbeard's ship goes through. Julius follows. Both crews end up somewhere none of them planned.",
    full_content: `The blood moon turned the water red.

The Devil's Eye was a maelstrom. Not a natural one. Something ancient and dimensional that opened and closed on its own schedule. When it opened fully during the eclipse, it wasn't just a whirlpool. It was a door.

Blackbeard aimed his ship straight at it.

Captain Julius, close enough behind to see what was happening and too committed to the pursuit to pull back, made the decision in seconds. He followed.

Both ships went through.

The crossing was violent. Sea monsters moved through the edges of the maelstrom. Men were lost. Wood splintered. The laws of physics that both crews had spent their entire lives trusting stopped applying for several terrifying minutes.

Then it was over.

They were somewhere else. Baransu. A world that did not match anything either crew had maps for.

Young Davie, Blackbeard's son, went into the water during the crossing.

He washed up on a shore a long way from where he started.`,
  },

  {
    id: "bbbbbbbb-0029-0029-0029-000000000029",
    title: "Davie Is Raised by the Lacus",
    year: 2005,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 29,
    show_lore_badge: true,
    reading_time: 2,
    description: "Davie washes ashore on the Island of Lost Hope with no memory of who he is. The Lacus people find him and take him in. He grows up not knowing his own name.",
    full_content: `He woke up on sand with no idea what his name was.

The crossing through the Devil's Eye had taken something from him. Not just the physical shock of it. The memory. Who he was, where he came from, the ship, his father. All of it gone. Like the water had washed it clean.

The Lacus found him.

They were the guardians of Lake Shamakai. Ancient beings, half-man and half-sea creature, bound by the Almighty's instruction to hold the door against the Shadow Realm. They were also, apparently, willing to adopt a confused boy with no past.

He grew up among them. Learned their ways. Fell in love with a girl from their community. Built a life in a place he had no memory of arriving at.

Captain Julius' journal was on the island. It would eventually tell Davie things about himself he hadn't known to wonder about.

But that was later. For years, the boy who would become central to the pirate storyline lived peacefully among the Lacus, with no idea of the name Blackbeard or what it meant to him.`,
  },

  {
    id: "bbbbbbbb-0030-0030-0030-000000000030",
    title: "The Baransu Ruby Glows and Shatters Its Vase",
    year: 2015,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 30,
    show_lore_badge: true,
    reading_time: 2,
    description: "After years of sitting quietly in a vase, the Baransu Ruby decides it has been patient enough. The vase does not survive the decision.",
    full_content: `One morning the vase exploded.

Antonia had kept the Baransu Ruby stored away for years. She had a life. A business. A son. She was not interested in being reminded of everything the stone represented. The vase had seemed like a reasonable solution.

The stone disagreed.

The glow built for days, her son reported later. She had not noticed because she was not looking. Then it got bright enough to be undeniable, and then the vase shattered clean across the floor.

The old blind man that the locals called Uncle had been sitting nearby. He did not look surprised.

He told her it was time. Her family's calling had found her again. She could feel that something was approaching on the water. Something that had been pointed in her direction for longer than she knew.

Antonia looked at the Ruby sitting in the broken pieces of the vase and felt the thing she had been carefully not feeling for years.

She was ready.

She just needed a ship.`,
  },

  {
    id: "bbbbbbbb-0031-0031-0031-000000000031",
    title: "Kilian Arrives with the Scroll",
    year: 2012,
    era_id: ERA.CURSED,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 31,
    show_lore_badge: true,
    reading_time: 3,
    description: "A stranger walks into the Forbidden Forest pursued by the Dark Ones. Emerald saves him. He carries an ancient scroll from the Tenshi Prophets. And the scroll has her name in it.",
    full_content: `He came in hot.

Kilian of the Tenshi Clan, from the Desert of Setra, arrived in the Forbidden Forest the way most important things arrive in Baransu: at a full run with something dangerous right behind him.

Emerald saw the Dark Ones chasing him and made a decision that her mother would have objected to and did not ask permission for. She went out and got him.

He was alive. He had a scroll.

The scroll was old. Old in the way that things from the Tenshi Prophets are old, which is a completely different category from the old that applies to furniture or buildings. This was the kind of old that belongs to things the Almighty made sure would survive long enough to be found.

It carried a prophecy.

And somewhere in that prophecy, there was a description that matched Emerald exactly. Her lineage. Her nature. Her connection to the Light Walker Clan.

She read it three times. She looked up at Kilian. She looked back at the scroll.

She said no. Not my problem. Find someone else.

She meant it.

She would change her mind.`,
  },

  {
    id: "bbbbbbbb-0032-0032-0032-000000000032",
    title: "The Prophecy of the Eternity Blade Revealed",
    year: 2012,
    era_id: ERA.CURSED,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 32,
    show_lore_badge: true,
    reading_time: 4,
    description: "There are two sides to the prophecy. One is a warning about destruction. The other is a promise of restoration. Both sides are already in motion.",
    full_content: `The prophecy had two parts. That was the first thing to understand.

First part: a descendant of Tenebris would get their hands on the Eternity Blade. They would use it to free Khaonai from the Shadow Realm. And Khaonai, the original betrayer, the one who created the Dark Magic, would be loose in Baransu for the first time in history.

Second part: a descendant of Sensei Murkai, the first Light Walker Sensei, born to royal blood and a pure heart, would gather the five original gemstones given by the Almighty. This person would seat them in the Eternity Blade and turn the weapon to the light. The curse would break. The realm would be freed.

Two possible futures. One blade. A race between them.

Kilian pointed at Emerald.

She was the second part. Her lineage ran directly to Sensei Murkai. She was the heir of the Light Walker Clan. The prophecy described her.

But Kuso, a Light Walker who had turned to the dark, was the first part. And Kuso was already moving.

Emerald looked at the scroll for a long time. She thought about her father trapped in the Citadel. She thought about every firstborn son who had vanished since the curse started.

She thought about being 18 years old and being the answer to a problem this large.

She hated everything about it.

But she understood.`,
  },

  {
    id: "bbbbbbbb-0033-0033-0033-000000000033",
    title: "The Dark Ones Attack the Forbidden Forest",
    year: 2012,
    era_id: ERA.CURSED,
    category: "battle",
    event_type: "event",
    is_featured: false,
    sort_order: 33,
    show_lore_badge: true,
    reading_time: 2,
    description: "Kilian's arrival brought the Dark Ones straight to the village. Emerald had been planning to say no to the prophecy. The attack makes the decision for her.",
    full_content: `The Forbidden Forest was supposed to be a secret.

Kilian had been tracked. He knew it and was hoping the forest would shake the pursuit. It did not.

The Dark Ones found the village.

They hit it fast. The Hogo-Sha responded. They were trained for this and they proved it. But the attack made one thing clear: the village was no longer safe. The location had been compromised. Staying meant more attacks, each one better planned than the last.

Emerald was in the middle of the fight when she made the decision. Not a dramatic moment. Not a quiet prayer. Just the clarity that comes when the alternative is watching your home get destroyed by something you might be able to stop.

She found Kilian in the chaos.

She told him she was in.

They left before the battle finished settling, which her mother was not happy about and which Emerald did not wait around to discuss.

The quest for the gemstones had started.`,
  },

  {
    id: "bbbbbbbb-0034-0034-0034-000000000034",
    title: "The Journey to the Upper Mountains",
    year: 2012,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 34,
    show_lore_badge: true,
    reading_time: 3,
    description: "The first gemstone is the Emerald of Wisdom, held by the Montes Giants in the Upper Mountains. Getting it requires climbing, a riddle, and the right answer.",
    full_content: `The Montes Giants were prideful. That was baked into them. When the Almighty transformed them and sent them to Baransu, the pride came with them.

They didn't just hand over sacred gemstones to travelers who showed up asking nicely.

They asked a riddle.

Emerald and Kilian climbed the Upper Mountains. The cold was serious, the altitude was unforgiving, and the Montes who came out to meet them were the size of small buildings with the kind of patience that comes from being ancient and immortal and extremely aware of it.

They posed their riddle.

Emerald answered well.

The Giants were satisfied. Not effusive about it. Not celebratory. But satisfied, which from a Montes giant is approximately equivalent to a standing ovation from anyone else.

They agreed to give her the Emerald of Wisdom. But the gemstone had a keeper: Grummel. The smallest of the Montes Giants. The most humble. He had been waiting for this moment longer than Emerald had been alive.

He joined the quest.

They descended the mountains with the first gemstone and one very short giant who turned out to be exactly the right companion.`,
  },

  {
    id: "bbbbbbbb-0035-0035-0035-000000000035",
    title: "Ambush in the Kubu Forest",
    year: 2012,
    era_id: ERA.CURSED,
    category: "battle",
    event_type: "event",
    is_featured: false,
    sort_order: 35,
    show_lore_badge: true,
    reading_time: 2,
    description: "Kuso and the Dark Ones were waiting at the base of the mountains. The party barely makes it out. The Kubu people, protectors of the Almighty's creation, make the difference.",
    full_content: `Kuso was learning.

She had been chasing Emerald since the beginning and she was getting better at predicting where the party would be. The base of the Upper Mountains was an obvious chokepoint. There was only one route down.

The ambush hit them hard.

Kuso brought the Dark Ones in full force. She wanted the Emerald of Wisdom. She wanted to stop the prophecy before it got any further.

The Kubu people appeared from the forest.

Nobody had seen them. Nobody had heard them coming. They were the protectors of the Almighty's creation and they moved through the wild places of Baransu like part of the landscape.

They flanked the Dark Ones. The pressure broke.

The party ran. The Kubu covered their retreat.

Emerald was grateful and slightly out of breath and aware that this was only going to get harder. They had one gemstone. Four to go. And Kuso was not going to keep making the same mistakes.`,
  },

  {
    id: "bbbbbbbb-0036-0036-0036-000000000036",
    title: "Emerald Meets Captain Antonia",
    year: 2012,
    era_id: ERA.CURSED,
    category: "alliance",
    event_type: "event",
    is_featured: true,
    sort_order: 36,
    show_lore_badge: true,
    reading_time: 4,
    description: "Stranded on a rowboat in the Fukushu Sea, the party encounters the Pirates of Fukushu. Their captain turns out to be someone Emerald never expected to meet.",
    full_content: `They were on a rowboat in the middle of the Fukushu Sea with no particular plan.

The pirate ship came over the horizon and Emerald had a few seconds to decide how to feel about that. She settled on cautious.

Captain Antonia came aboard from the pirate vessel and the first thing Emerald noticed was the way she moved. Like someone who had survived things and incorporated the survival into how she stood.

They talked. Cautiously at first. And then Emerald said something about her mother, about Melea and the Light Walker Clan and Zillarnia, and Antonia went very still.

Melea was her sister.

They had been separated since Antonia left. Since Vegas and the Ruby and the boat and the sea and everything after. Melea had not known what happened to her. Antonia had not known if Melea was still alive.

They were both alive. And the niece of one and daughter of the other was standing on a pirate ship in the middle of the ocean holding the first gemstone of a prophecy that Antonia recognized.

Antonia told Emerald she was the Baransu Ruby's keeper. She had been carrying it since she left Zillarnia.

She also told her she had the Eternity Blade.

Antonia gave both to her niece. And then she told Emerald to go finish what the prophecy started.`,
  },

  {
    id: "bbbbbbbb-0037-0037-0037-000000000037",
    title: "Kilian's Betrayal",
    year: 2012,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 37,
    show_lore_badge: true,
    reading_time: 3,
    description: "Kilian had been leading the Dark Ones to the party the whole time. The Dark Ones had his family. Emerald discovers the truth and it destroys her.",
    full_content: `She found the tracker whistle.

It was small. Easily hidden. The kind of thing you wouldn't notice unless you were looking for an explanation for why Kuso kept finding them no matter how carefully they moved.

Kilian didn't deny it.

The Dark Ones had his family. They had made it simple: lead them to the Eternity Blade and the gemstones, or his family dies. He had been trying to find a way out of the situation without more people getting hurt, and he kept not finding it, and in the meantime he had been doing what they asked.

Emerald listened to all of it.

She didn't care. Not in that moment. She had trusted him. She had let him in. She had started to feel something for him that she had not been planning to feel.

Captain Antonia made a practical decision. Kilian walked the plank. He was left in the middle of the Fukushu Sea with his guilt and his regrets and a long swim ahead of him.

Antonia told Emerald the mission wasn't over. That heartbreak was allowed. That stopping wasn't.

Emerald kept going.

She did not forgive him. Not yet.`,
  },

  {
    id: "bbbbbbbb-0038-0038-0038-000000000038",
    title: "The Trial at Lake Shamakai",
    year: 2012,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 38,
    show_lore_badge: true,
    reading_time: 4,
    description: "The Pearl of Wisdom is at the bottom of Lake Shamakai. The Lacus Queen will give it, but the guardian of the Pearl demands a test. Emerald's deepest fear is the test.",
    full_content: `The Lacus Queen was ancient and direct.

She told Emerald the Pearl of Wisdom was not hers to simply hand over. It was protected by the guardian Takai, a giant Eel at the bottom of the lake's deepest crevasse. Takai would give the Pearl only to someone who could face their deepest fear.

She gave Emerald a magical air bubble. One breath of air, enough to get to the bottom.

Emerald went in.

Takai met her at the bottom and looked at her for a long time. Then he popped the air bubble.

Emerald panicked.

Not metaphorical panic. Real, immediate, drowning terror. The cold dark water, the distance to the surface, her lungs starting their calculation. The fear was exactly what it always was and she was not ready for it to be now.

Grummel pulled her out.

She was unconscious when she reached the surface. And in the dark between conscious and not, she reached her father. Sensei Lux, somewhere in the Soulless Citadel, heard her. He told her not to give up. He told her she was close.

She woke up. She looked at the lake.

She dove again.

This time she didn't panic. She connected to the Almighty's power and let it steady her and she reached the bottom and she took the Pearl.

Takai let her.`,
  },

  {
    id: "bbbbbbbb-0039-0039-0039-000000000039",
    title: "The Staff's Tomb Rises from Lake Shamakai",
    year: 2012,
    era_id: ERA.CURSED,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 39,
    show_lore_badge: true,
    reading_time: 4,
    description: "Following a cryptic clue, Emerald returns to the lake depths and finds something that has been waiting there since the time of Sensei Murkai. The past rises to meet her.",
    full_content: `Return to the past to prevail in the future.

The Lacus Queen had said it like it was a straightforward instruction. Emerald had nodded and filed it away and spent a while being uncertain about what it actually meant.

She dove again.

Deeper this time. Following something she could not see but could feel. The connection to the Almighty that had been building since she first picked up the Eternity Blade.

She found a tomb.

Not a grave. A sealed chamber, ancient beyond measuring, carved with Light Walker markings she recognized from her training. This was where the Almighty had first given the Staff to Sensei Murkai. The beginning of the entire Light Walker lineage, preserved at the bottom of a lake.

She placed the Eternity Blade into the lock carved into the door.

It opened.

The chamber shuddered. The water around it moved. And then the entire structure began to rise, pulling up from the lakebed, carrying Emerald with it.

It broke the surface.

A lush garden. Impossible at the center of a lake. Green and alive and warm, and in the middle of it, floating in mid-air, the Staff of the Almighty.

It had found its way back.`,
  },

  {
    id: "bbbbbbbb-0040-0040-0040-000000000040",
    title: "The Eternity Blade Is Complete",
    year: 2012,
    era_id: ERA.CURSED,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 40,
    show_lore_badge: true,
    reading_time: 3,
    description: "Emerald takes the Almighty Diamond from the Staff. Five gemstones. Five settings. The Eternity Blade is fully assembled for the first time in history.",
    full_content: `The Almighty Diamond was still in the Staff. Waiting.

Emerald took it.

She stood in the middle of that impossible garden, holding a gemstone that had been hidden since before her great-great-grandmother was born, and looked at the Eternity Blade.

Four stones were already seated. The Emerald of Wisdom that the Montes Giants had entrusted to Grummel. The Baransu Ruby that Antonia had protected for years in a port town vase. The Pearl of Wisdom from the depths of Lake Shamakai.

She placed the Almighty Diamond into the final setting.

The blade changed.

Something that had been dormant in it woke up. The power that Kurogami had designed this weapon to hold was finally, fully present. Five stones. Five gifts. The complete expression of what the Almighty had put into the world at the beginning.

Emerald held the completed Eternity Blade and felt the weight of every person who needed this to work.

Her father. Every first born son taken by the curse. Every woman who had been holding the clan together waiting for this moment.

She needed to get to the Soulless Citadel.

Kuso was already coming.`,
  },

  {
    id: "bbbbbbbb-0041-0041-0041-000000000041",
    title: "The Final Battle at Lake Shamakai",
    year: 2012,
    era_id: ERA.CURSED,
    category: "battle",
    event_type: "event",
    is_featured: true,
    sort_order: 41,
    show_lore_badge: true,
    reading_time: 5,
    description: "Kuso brings the full Dark Ones horde to Lake Shamakai. Captain Antonia arrives with her ship sailing through the sky. The battle for the realm begins.",
    full_content: `Kuso had found them. Again.

She came with everything she had. The Dark Ones poured toward the lakeshore with the kind of commitment that makes it clear this is the last time anyone is pulling back. Kuso had watched Emerald collect stone after stone and she was done waiting.

And then Antonia's ship came over the treeline.

Floating. Carrying. Moving through the sky on the power of the Almighty in a way that had no natural explanation and did not require one.

The battle erupted.

Antonia's crew against the dark horde, everywhere at once, in the air and on the ground. Grummel fought with the weight of a giant and the heart of someone who had waited centuries for this exact moment. The Eternity Blade was blazing in Emerald's hands.

Kilian appeared.

His hands were tied. He had been brought by the Dark Ones as leverage. He got free during the chaos and he went straight for Kuso because Emerald was in her sights and he had already made his decision about what he was willing to do about that.

Kuso cut him down.

Emerald saw it.

What happened inside her in that moment was not grief. Grief comes after. What happened first was something older and quieter and much more dangerous. The Almighty's power running through her, and a clarity that she had not felt before.

She turned toward Kuso.`,
  },

  {
    id: "bbbbbbbb-0042-0042-0042-000000000042",
    title: "Kilian's Sacrifice",
    year: 2012,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 42,
    show_lore_badge: true,
    reading_time: 4,
    description: "Emerald is about to be consumed by the Blade's power. Kilian makes the only choice he has left. The curse needs a sacrifice. He gives it freely.",
    full_content: `The Eternity Blade's power had grown beyond what one person could contain.

Emerald was channeling it. She had driven the blade's tip into the earth and the Almighty's power was radiating outward, pushing back Kuso and the horde, and simultaneously destroying her.

The Soulless Citadel's gates had opened. But the warriors were still chained.

Grummel knew what was needed. A curse of this size could only be broken with an equal sacrifice. Someone willing to give their own life in exchange.

Emerald had already decided it was going to be her. She had made her peace with it.

Kilian understood the same math.

He was bleeding from what Kuso had done to him. He did not have long. He used what he had left to get to Emerald.

He grabbed the sword.

He took it from her hands and he absorbed the force that was going to kill her and he let it take him instead. He knew exactly what he was doing. He had chosen to betray the people she cared about once. He was choosing something different this time.

The sword's power consumed him.

His body disintegrated.

Emerald watched the person she had tried not to love disappear in a surge of light and she understood, for the rest of her life, what a real choice actually looks like.`,
  },

  {
    id: "bbbbbbbb-0043-0043-0043-000000000043",
    title: "The Light Walker Curse Breaks",
    year: 2012,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 43,
    show_lore_badge: true,
    reading_time: 3,
    description: "The shockwave from Kilian's sacrifice does what the power of the Eternity Blade could not do alone. The Soulless Citadel opens. The men come home.",
    full_content: `The shockwave hit the Soulless Citadel like the Almighty had been waiting for exactly this.

The chains broke.

The warriors began to appear. Not all at once. One by one, then in groups. Back in the Light Walker village in the Forbidden Forest. Standing in familiar places looking confused and overwhelmed and alive.

Ten years. Some of them had been there longer.

Their families found them. There are no words adequate to describe what those reunions looked like. Not the right ones. You had to be there.

Sensei Lux appeared in the village and stood there for a moment, blinking in the light of a world he had not seen in a decade.

Melea was there.

Emerald was not there yet. She was at Lake Shamakai, alone in the aftermath of the battle, fainting from the cost of everything she had carried to get to this moment.

When she came to in the village, her father was holding her hand.

She asked if it had worked.

He said yes.

She let herself feel that for a few seconds. Then she thought about Kilian and the feeling changed shape.

Lux held a ceremony. He stood before the reunited clan and named the fallen, including Kilian, who had started as a stranger with a scroll and ended as the reason any of them were standing there.

Emerald lit a firework. For Kilian. And for every version of this ending that didn't happen.`,
  },

  {
    id: "bbbbbbbb-0044-0044-0044-000000000044",
    title: "Kuso Unlocks the Door to Khaonai",
    year: 2012,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: true,
    sort_order: 44,
    show_lore_badge: true,
    reading_time: 3,
    description: "While the Light Walkers reunite, Kuso is at the bottom of Lake Shamakai. She found the Eternity Blade in the lakebed. And she knows exactly where it goes next.",
    full_content: `While the village celebrated, Kuso was working.

She had cut her way through Takai, the giant Eel guardian of the door to the Shadow Realm. She was bleeding and undeterred and moving with the focused efficiency of someone who has accepted that they will not be forgiven and has decided to go fully into what that means.

The Eternity Blade was in the lakebed where it had fallen after everything happened above.

She took it.

She approached the sealed door at the bottom of Lake Shamakai. The door that the Lacus had been guarding since the beginning. The barrier between the Baransu Realm and the Shadow Realm, sealed since the time of Khaonai's banishment.

The Eternity Blade found its place in the center of the door like it had been shaped for that exact slot.

The lock disengaged.

The gateway to the ancient betrayer opened.

Khaonai, who had been sealed in the Shadow Realm since the Celestial War, who had created the Dark Magic and lost to the Almighty and waited for exactly this moment, was no longer contained.

The celebration in the Forbidden Forest had just begun.

It was already late.`,
  },

  // ─── SOULLESS CITADEL SIDE STORIES ──────────────────────────────────────────

  {
    id: "bbbbbbbb-0045-0045-0045-000000000045",
    title: "Vi Names a Monster Chuck",
    year: 2008,
    era_id: ERA.CURSED,
    category: "event",
    event_type: "event",
    is_featured: false,
    sort_order: 45,
    show_lore_badge: true,
    reading_time: 2,
    description: "Inside the Soulless Citadel, the warriors find ways to survive the purgatory. Vi finds his own method. It involves a monster named Chuck.",
    full_content: `Nobody fully understood the Soulless Citadel.

It was not death. It was not life. It was something the Almighty had not designed and Tenebris had cobbled together from malice and the specific cruelty of making immortal people live in meaninglessness.

The warriors adapted.

Vi adapted faster than most and in a more specific direction than anyone else. He had the quality that some people call resilience and others call a complete refusal to accept that the situation he was in was actually the situation he was in.

The creature that lived in the eastern corridor of the Citadel was enormous and hostile and had killed three men the first week. Vi spent six months studying it instead of avoiding it.

He named it Chuck.

Chuck eventually stopped attacking when Vi came by. Nobody could explain it. Vi explained it as mutual respect, which was generous to Chuck's capacity for nuance but not technically disprovable.

The story traveled through the Citadel the way stories do when people need something to hold onto.

In a hellish eternal purgatory, a man had made a friend named Chuck.

It helped.`,
  },

  {
    id: "bbbbbbbb-0046-0046-0046-000000000046",
    title: "The Burning Mountain Expedition",
    year: 2010,
    era_id: ERA.CURSED,
    category: "discovery",
    event_type: "event",
    is_featured: false,
    sort_order: 46,
    show_lore_badge: true,
    reading_time: 3,
    description: "A floating Burning Mountain appears periodically near the Soulless Citadel. The warriors vote on whether to explore it. Vi votes yes with significant enthusiasm.",
    full_content: `The Burning Mountain appeared every few months.

Nobody was sure if time worked normally in the Soulless Citadel. But periodically, a floating mountain wreathed in fire would drift within reach of the Citadel walls and the warriors would debate whether to try it.

The vote usually came out cautious.

Until Vi reframed the question.

He pointed out that they were already in eternal purgatory. The risk calculus for exploring a Burning Mountain was genuinely different in that context.

They went.

The mountain was inhabited. A small demon, the kind that collects things, had filled it with caged creatures from across the realms. Every species imaginable, locked up and miserable, serving no purpose except the collector's sense of ownership.

The warriors freed them.

The creatures did not spend much time being grateful before turning their attention to the demon collector. That situation resolved itself.

Brother #2105, who had been killed by something in the mountain's interior, was avenged in the chaos that followed.

They climbed back down the mountain and returned to the Citadel with nothing to show for it except the knowledge that they had done something useful in a place that was designed to make usefulness impossible.

That mattered.`,
  },

  // ─── THE LEGEND OF KAITO ─────────────────────────────────────────────────────

  {
    id: "bbbbbbbb-0047-0047-0047-000000000047",
    title: "Kaito Escapes the Soulless Citadel",
    year: 2003,
    era_id: ERA.CURSED,
    category: "discovery",
    event_type: "event",
    is_featured: true,
    sort_order: 47,
    show_lore_badge: true,
    reading_time: 3,
    description: "A Light Walker boy named Kaito finds a quantum anomaly inside the Soulless Citadel and steps through it. He becomes the only person ever to escape. He ends up somewhere he could not have imagined.",
    full_content: `He was 18 when the curse took him.

Kaito arrived in the Soulless Citadel like every Light Walker firstborn before him. Confused. Grieving the life he had been pulled away from. Looking for a way out because that was in his nature.

Most of the men looked for a way out.

Kaito was the first to find one.

The quantum anomaly was in the lowest level of the Citadel. Not a door. Not a portal in any designed sense. A crack in the structure of the space between realms, the kind of flaw that should not exist in a prison but does because even Tenebris was working with materials the Almighty had made, and the Almighty builds things with nuance.

Kaito stepped through.

He did not end up in Baransu. He did not end up in the Upper Realm or the Shadow Realm.

He ended up somewhere that had electricity and metal machines that moved through the sky. He spent several weeks figuring out the basic geography of wherever he was and whether the people there were immediately dangerous.

They were not.

He enrolled in a university. He started studying quantum physics. He was going to understand what that anomaly was and he was going to get back and he was going to tell the other men how to follow him.

That was the plan.

The plan took a long time.`,
  },
];

async function main() {
  console.log(`Seeding ${events.length} timeline events...\n`);

  const BATCH = 20;
  let total = 0;

  for (let i = 0; i < events.length; i += BATCH) {
    const batch = events.slice(i, i + BATCH);
    const { error } = await supabase
      .from("timeline_events")
      .upsert(batch, { onConflict: "id" });

    if (error) {
      console.error(`❌  Batch ${i} error:`, error.message);
      process.exit(1);
    }
    total += batch.length;
    console.log(`  ✓ ${total}/${events.length}`);
  }

  console.log(`\n✅  Done. ${total} events seeded.`);
}

main();
