import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gthubyikarkgxxppaign.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHVieWlrYXJrZ3h4cHBhaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQxNjQ5OSwiZXhwIjoyMDg2OTkyNDk5fQ.g7kVyiJjNGH4oPbmglHl8v7EPLyrEsR3phZ_ZLcNXYY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Strip the bare page-number lines (e.g. "37\n") that appear in the condensed book PDF
const stripPageNums = (s) => s.replace(/^\d+\s*$/gm, "").replace(/\n{3,}/g, "\n\n").trim();

const updates = [
  // ── 1. The Legend of the Soulless Citadel ──────────────────────────────────
  {
    id: "322288bc-b5f1-4391-ba5b-4c5b3600c53d",
    content: stripPageNums(`In a time long ago, there was peace, there was balance in a land called Zillarnia - where one's children could wander to the next village without a worry and be greeted with a warm meal and a smiling face. It is remembered as The Era of Balance. The people did not just survive, they thrived.

In the center of Zillarnia, was a people group called the Light Walker Clan. Led by the Benevolent Sensei Lux, they were the fiercest warriors in all the land and the protectors of all the people in The Baransu Realm. If you were lucky enough to be born into the Light Walker Clan, you were not raised like children in the surrounding villages, you were raised with the finest forged metals in the land and taught to wield them as if they were part of your own soul. You would have suckled your mother's breast while she hunted wild boar only to be withheld milk to make the killing blow on the wild animal. Survivors, innovators, poets, but at heart you were a warrior unafraid of death. Death only held glory in the Upper Realm for a Light Walker Warrior.

One day, a darkness covered the land - a darkness Zillarnia had heard of before but had yet to experience. This army had engulfed the surrounding countries in Baransu. This was a foe the Light Walker Clan had longed to test their will against. A dark hoard of deformed beasts clawed over the ridge surrounding Zillarnia. Their leader, Tenebris, wielded the ancient Dark Magic of Khaonai. Legend had been told for centuries that Tenebris would turn his enemies into the very beasts serving in his hoard - the Forgotten Ones.

The day had come for the Light Walker Clan to make their stand against the evil that had shamed these lands for centuries. A few thousand against a hoard of dark magic, the odds were not stacked in their favor.

The Light Walkers fought with valor, with seemingly superhuman strength as if they were pulling a power from another unseen source. The hoard fell by the thousands at the feet of The Light Walker Clan.

"Is it time for breakfast yet? I am starving and my wife awaits me in bed." Sensei Lux shouted with a smirk as he pulled a spear from a Forgotten One's chest.

There was laughter coming from the valley of the Light Walker Clan. Not a soul emitted fear, but a joy. A camaraderie to fight amongst their loved ones, doing the one thing they trained their whole lives for.

Furious, Tenebris had enough of this show. "These mere mortals, who do they think they are? They laugh?!!" It had been good entertainment for a moment, but his patience had worn thin. He would like these for his own hoard. He trampled down the valley cliffs on his deformed beast, holding the cursed Bident of Khaonai. With one wave of the Bident, hundreds of the Light Walkers were flattened.

Sensei Lux turned back to his men, "Bring the Staff of the Almighty! Tonight we end this! Tonight we get our Glory in the Heavens!" He turned, picked up a shield and bellowed towards Tenebris. As Tenebris pulled back his Bident to launch another deadly blow, Sensei Lux leaped. He stepped from head to head on top of the Forgotten One's brows. Honing in on Tenebris, he made one last leap and launched his spear towards the approaching Demon. Just as Tenebris finished his deadly blow, sending Sensei Lux flying backward, the spear lodged deep in between the dark eyes of Tenebris' beast. A shockwave rumbled through the valley. Slowly gaining back his consciousness, Sensei Lux could see a large dark figure approaching him, Tenebris. Lux slowly got his feet under him, his eyes were hazy.

"You will fall. You will all fall. Your women, your children, they will all be my slaves and you, my Hoard." Tenebris uttered, "I admit, it was nice to finally face a worthy adversary, but against my dark magic, you are but a child that needs correction."

"Sorry, I couldn't hear a thing you just said," Sensei Lux laughs, struggling to gain his balance, "I just can't stop thinking about breakfast... are you a rice guy or a stew guy? It's an important question. I'm personally a rice guy. You know, rice, a fried egg, some grilled onions, ah man, it's the best part of the day."

"Enough!" Tenebris echoes.

"Sheesh, ok, I'm just saying if you had breakfast first you might not be so grumpy all the time", said Lux.

Lux had been stalling and he knew the time was now. "Sensei!" A warrior shouted from behind while he heaved the Staff of The Almighty towards Lux. Lux reached out his right arm and clutched the Staff. The air warped around the staff as if matter bends at its very presence.

"Well, would you look at that," Sensei Lux smirked.

"It can't be!" shouted Tenebris as Sensei Lux slammed the bottom end of the staff into the earth. Light radiated from the white gem at the head of the staff exploding out into a forcefield-like dome engulfing the surrounding enemies and evaporating them to ash. Just before the light reached Tenebris, he slammed his bident into the earth emitting the same forcefield in black. The Light and darkness collided.

Shocked at what is unfolding, Tenebris cannot believe that this light is starting to overcome his darkness.

Knowing that his defeat was near, Tenebris spewed out one last curse. "I curse you Sensei Lux and the Light Walker Clan, every warrior and every first born son of every generation to come shall never see the glory of the Heavens. Trapped between light and darkness!" And with his last breath he muttered, "I shall return, my name shall rule these lands again, you're cursed Light Walkers, Soulless you shall become!"

Poof! Tenebris was cast to the Shadow Realm and the Forgotten Ones souls now free, ascended into glory of the Upper Realm where their loved ones had waited so long.

Sensei Lux pulled the staff from the earth and rested it on his shoulder. He turned to his men and smiled, "I think we're late for breakfast." Laughter broke out amongst the men. Sensei Lux wrapped his arms around a nearby friend as they began walking back to their village. But commotion broke out amongst the front of the pack. Men began to start disappearing leaving only a faint cloud of white dust. Lux, confused about what was unfolding, stepped on a nearby boulder to get a better view.

Lux saw an empty valley of dust for just a moment before he, too, joined his brothers and the Staff of the Almighty dropped to the valley floor.

And so the legend of the great Light Walker Clan warriors was born. Warriors and protectors of the light, cursed to suffer in limbo in the Soulless Citadel and withheld the glory to meet their loved ones in the Heavens. There are 5555 "Soulless" in the Citadel - the legendary warriors from that fateful day and generations of first born males of the Light Walker Clan, were all cursed to this Godforsaken Citadel. Some held onto hope of redemption, but others, consumed by their rage, began to change. Their hearts slowly let the Darkness creep in. Who will free The Soulless Citadel?`),
  },

  // ── 2. The Rise of the Women Warriors ─────────────────────────────────────
  {
    id: "91f88a84-f218-4727-877f-0b5aff815b71",
    content: `Back in the Light Walker village, brooding clouds covered the sky. The Darkness had arrived. It was still daytime, but the clouds were so thick that they banished the light. The villagers knew it was Tenebris and his dark magic. The women, children, and elderly gathered on the far side of the village near the forest as directed by Melea, Sensei Lux's wife.

The battle had begun. They could hear the clashing of steel, the screams of the lives being taken, and the growling of those horrific, forgotten ones. The foul smell of rotting flesh could be caught in a gust of wind, a stench by which one would always know the Darkness was near. They were nervous. Generation after generation had known that Tenebris would be coming for their lives, yet it was still unnerving for them to hope against hope that their training could overcome his growing Dark Magic.

Thunder boomed, and lightning crackled in the skies of the valley. They saw flashes of light clashing with the dark in the middle of the battlefield in the distance. Finally, the sky was filled with a light so bright that they had to look away. A thunderous crack filled their ears and shook the earth.

*The Staff of the Almighty!* Melea thought. She fell to her knees from the tremors. *Will I ever see my beloved husband again?* she pondered. *Was his training and teaching of the Almighty enough for this Dark Overlord?*

She looked up. The sky began to clear, the sounds of clashing steel from the battle, which had been deafening, had trailed off. It was silent a moment later. There were no more clouds, and the darkness was gone.

"They've done it!" Melea shouted.

The Light Walkers broke out in a war cry, filling the valley with shouts.

But Emerald, her daughter, where had she gone? She was nowhere to be seen in the surrounding faces. Worried, Melea got to her feet and ran towards the battlefield. "Emerald!" she shouted. "Emerald, where are you?"

Melea reached a small rock outcropping before the valley where the battle had taken place. She scaled up the rocks to see what had happened. Nestled in between two rocks near the top crouched Emerald. She had watched what had unfolded on the battlefield.

"Emerald, are you okay?" Melea asked, concerned. "What happened to you? Emy, talk to me!"

Emerald's face was white as the winter snow. Her eyes were blank and emotionless.

Melea saw the distress in her daughter's eyes and glanced toward the battlefield. There was no one. Not a soul left in that valley. Confused, concerned, and distraught -- she looked back at her daughter. She grabbed her with one palm on each cheek. "Emerald, what happened here?" A tear ran down her face and dripped off her chin to the dirt ground.

Emerald closed her eyes in pain, the first sign of emotion Melea had seen on her face since she found her. Emerald looked up into her mother's eyes. "They're all gone, Mother... Papa is gone." She broke down, now crying in her mother's arms -- the kind of cry that comes from within, where everything seems to break inside you as you well out in sorrow.

Melea held her head tight to her chest, still confused about what this all meant. She looked again towards the valley. It was empty, but she knew that the ground was still stained with blood from those that had given their lives in the glory of battle. *They couldn't have just disappeared?* she thought.

Emerald withdrew her face from her mother's breast and looked into her eyes.

Melea wiped her face clean with the sleeve from her gold-threaded kimono.

Seeing the confusion and despair on her mother's face, Emerald reached up towards her and placed her two index fingers on her mother's temples, one finger on each side. "Let me show you," she said. Using the power of the Almighty, Emerald projected what she had seen into her mother's thoughts.

Melea's eyes now glowed bright white. She saw everything. The battle, Tenebris's Dark Magic. Her husband and his cheeky remarks, just to piss off that foul beast. She smiled. She saw the final battle. Light versus Darkness. The day they all knew would come had played out like the prophecies had always foretold. She never thought in a million years that her beloved Lux would be the great warrior to finally face Tenebris in battle wielding the Staff. She saw Tenebris defeated, lying on the floor. *He was a weak and cowardly being,* she thought.

Now the curse. She heard him uttering that damning curse. White, glowing tears began to flow down her cheeks. She listened to the words ring in her head.

"I shall return! My name shall rule these lands again! You accursed Light Walkers, Soulless you shall become!"

She saw her Lux disappear. The love of her life, married at the age of 13, they vowed to never leave each other's side. He was gone now.

Emerald began to take her hands away from her mother's face.

"Wait!" Melea shouted.

There was something else. She saw the Staff of the Almighty fall onto the battlefield. It lay there for a moment, but soon after, it was gone. But it did not disappear like the men. Instead, it levitated off the ground, and then, as fast as lightning, it flew off into the distant sky -- far, far away from Zillarnia.

"Wait, I can still see it!" said Melea. "Don't stop, Emerald! I still have a vision of the Staff. It lay in a Garden. A lush garden. I see fruit trees and flowing waters. A great booming waterfall in the distance. I do not know this place. I have never seen this place, but it seems to still be in this realm. The Staff is still with us!"

Emerald took her hands off her mother's face.

Melea's eyes returned to normal, and tears ran down her cheeks. They embraced and cried for the loss of their father and their people.

"What now, Mother?" Emerald asked. "What do we do now?"

"I don't know, Emy. But we need to find the answer. We need to know more about this curse. Then, we will free your father, and we will be prepared for the return of Tenebris -- to end this once and for all."

---

*A few months later.*

Melea stood tall on a large rock in front of the whole Light Walker Clan. Behind her was the Forbidden Forest, as they called it -- a forest that was rumored to have a mind of its own. Constantly changing, you'd be lost and never return. She addressed her people.

"Our beloved warriors, husbands, and fathers are gone. They sacrificed so much for our safety, for us to live at peace again. They fulfilled the great prophecy of the battle of light and darkness, but the curse of Tenebris still haunts us. There is more to the curse than we could've imagined. It takes away our firstborn sons at the age of eighteen. For the men left in the Clan, if they so much as wield any weapon or practice in the ways of the Almighty, they turn to stone.

"So what are we to do? Are we to lie down and die? Would our husbands and fathers want to see us this way? NO! Women of the Light Walkers, we must rise! We must protect at all costs what is left... we must be fierce. We must be smart.

"But the world won't understand our curse; the world will not accept us. The Dark Ones who follow the teachings of Tenebris are still out there, searching for the Staff of the Almighty. Tenebris is still at work to destroy our Clan and the Power of the Almighty. I have trained day in and day out with my father as a child and with my beloved Lux. They've taught me how to harness the power of the Almighty. We know the blade, the blade favors our touch, but we need time. We must prepare for the return of Tenebris and find the Staff of The Almighty.

"This is how we free our loved ones. This is how we break the curse, but we must withdraw. To protect our Clan, keep our curse a secret and stay hidden until we are ready to fight again for our freedom! We must withdraw ourselves from our beloved Zillarnia."

Led by their new leader, Melea, the Light Walker Clan withdrew into the Forbidden Forest. It took them time to figure out how the forest moved and worked. It was as though it was a living being, reacting and moving to those that entered it. As she was able to connect with the forest's energy by using the power of the Almighty, Melea led the Clan to the center. To their surprise, there was a lush opening in the middle of the dense and almost impenetrable forest. The trees opened up, the sun shone through, and a beautiful, calm lake met their gaze on the far side of the cleared land.

*Here is where we will build back up,* thought Melea.

And that is just what the Light Walkers did. They did what they knew best -- they thrived. The land was fertile, the wood for crafting was plenty, and an underground spring that created this beautiful lake was unending. They had found their new home. The men took to the fields, building out their sustainability and crafting a new village, but they missed their training. They longed for their blades. A piece of their souls had been lost that day. The curse forbade them to learn the ways of the blade, but they would do anything for their people and their families.

The women, on the other hand, were set on a new path. They were to be the Clan's protectors, to prepare for the return of Tenebris, and to free their loved ones from The Citadel.

Unlike other women who trained the blade in simple ways to hunt and keep the tradition, Melea was trained as a young girl by her father to be one of the fiercest women warriors the Light Walkers had ever seen. Her father never had a son, so he turned to Melea, his firstborn daughter, and taught her the ways of the blade and the power of the Almighty.

Her father always said, "There will come a day, Melea, where you will need to pick up the blade for your family and for your people. Our training is not in vain. I feel the presence of the Almighty on you while we train. Don't lose heart -- for your greatness will be needed one day."

Melea remembered her father's words. She remembered her training. Even her beloved Lux always said, "You, my dear, are destined for greatness. There will come a day of darkness when you will need to be strong. You will need to step into a role that you may have never wanted, but you will be ready. You must be ready!"

*Was this all predestined to be?* she thought. *How did they always know? How were they so in touch with the Almighty, his power, and guidance?* She longed for that. She strived for that, and her time had come.

The new order was here, and things had to change fast. Every firstborn daughter of every family would become one of the *Hogo-sha* -- the guardians of the Clan. The elite ones, chosen to not only guard and defend the forest from the Dark Ones, but to be trained and understand the power of the Almighty.

The women grew strong. The ancient ways of Lux and his men -- the training, the diligence, the master of weaponry -- were all passed on to the women by their leader Melea. Their wits and stealthy physique were their weapons, but their strength from the Almighty grew and manifested in ways the Clan had never seen before. Day in and day out, training and honing their skills, they became the fiercest warriors the world had ever seen. But the world would never know them.

They were now the protectors of a lost people group that slowly, through generations and generations, disappeared from all historical Legends. They were a myth, but they still lived... deep in the Forgotten Forest... waiting for the day that they would find the Staff of the Almighty and break this damned curse for once and for all.`,
  },

  // ── 3. The Eternal Blade: Quest for Redemption ────────────────────────────
  {
    id: "16af6887-472d-4994-af3b-2267e2887e11",
    content: `Under the protection of the legendary Light Walker Clan, Baransu was a realm of peace, harmony, and beauty. But an ancient force of darkness rose against the people, bringing a fierce battle of blades, beasts, and magic. Led by Sensei Lux, the Light Walkers overcame the horde, but at a high cost - the warriors were cursed by the enemy to a hellish limbo at the Soulless Citadel - hovering between realms. This fate was not only for the Light Walker warriors that fought that day - but for every firstborn son in the clan - on his 18th birthday.

Without the men, Lux's wife, Melea, now leads the clan into the Forbidden Forest for refuge and to train. It is up to them now - the women must become the warriors - and they must discover the key to breaking the Citadel's curse. After ten years of living secretly in the forest, the women have become fierce fighters - but none has found a way to free their men.

When Emerald, Lux and Melea's impulsive daughter and heir of the Light Walker clan, saves a young outsider hunted by the Dark horde, an ancient prophecy carried by the youth (Kilian) is revealed: a Light Walker who can gather the original gemstones given by the Almighty may wield the Eternal Blade and free the realm of the curse and darkness. To her surprise, the Light Walker from the prophecy is her. Still haunted by her father's curse and afraid she doesn't have what it takes, Emerald resists the call. But a surprise attack on the hidden Light Walker clan in the Forbidden Forest forces Emerald and Kilian into action - they must find the gemstones before Kuso, a Light Walker turned dark, captures them to use the Blade to free Khaonai - the betrayer of the Almighty.

The quest leads Emerald and Kilian to the Upper Mountains to seek the Montes Giants and the Emerald of Wisdom they hold. They find favor with the Montes - answering their riddle well - and gain another to their party: Grummel, a small and humble giant who is the keeper of the Emerald. They descend the mountains no sooner than Kuso, and the Dark Ones ambush them. They narrowly escaped through a forest with the help of the Kubu people - protectors of the Almighty's creation.

Sailing in search of the following gem, the party gets stranded on a rowboat in the middle of the Fukushu Sea and has a run-in with the Pirates of Fukushu and Captain Antonia. When Emerald discovers that Captain Antonia is the long-lost sister of her mother, Melea, she shares about the prophecy and her quest. Sensing the Almighty's power on Emerald, Antonia reveals that she is the Baransu Ruby's keeper and possesses the Eternal Blade. She blesses her niece and entrusts her with both. Now there are two to find: the Pearl of Honor held by the Lacus People and the Almighty Diamond lost with the Staff of The Almighty - but unknown by Emerald; the Dark Ones follow closely, ready to strike and seize the gems for their own.

His affection having grown for Emerald, Kilian tries to reveal his secret to her - but before he can, she discovers the truth: Kilian had been leading the Dark Ones and Kuso to the party from the start. Emerald is crushed. Antonia and the Pirates of Fukushu make Kilian walk the plank and leave him stranded in the middle of the Fukushu Sea. Antonia encourages Emerald on her journey and reminds her that even though her heart is broken, she must continue this quest to save her father and break the curse.

Emerald and Grummel go to Lake Shamakai to meet with the Lacus Queen, who gives Emerald her blessing to take the Pearl of Honor but warns that it is only bestowed upon those who can pass the test and win the favor of its guardian, the giant Eel Takai, at the bottom of the Lake. The Queen gives Emerald a magical air bubble, and she reaches the bottom of the deep crevasse. Takai tells her she must face her deepest fear - he pops her air bubble, and she panics. Saved by Grummel moments before drowning, Emerald - unconscious - connects with her father in exile, who urges her not to give up. With courage and ambition restored, Emerald connects to the Almighty's Power, dives again, and retrieves the Pearl.

And now only the Almighty Diamond remains - but no soul knows where it lies. The only clue is from the Queen: "You must return to the past to prevail in the future..." Led by her connection with the Almighty, Emerald descends again into Lake Shamakai and finds the tomb where the Almighty bestowed his Staff to the first sensei - Sensei Murukai. Emerald places the Blade into the tomb door, and it unlocks.

Suddenly, the watery tomb shifts and rises from the depths and breaks forth into a lush garden - the Staff of the Almighty hovering in mid-air. Emerald grabs the Almighty Diamond from that Staff, places it into the Eternal Blade with the other gems, and transports her to the gates of the Soulless Citadel - the gates won't budge! But now Kuso and the Dark Ones have found them at Lake Shamakai. It is as Grummel feared: a curse of this significance can only be broken with an equal sacrifice - one must sacrifice one's own life.

Resolved to sacrifice herself, Emerald reconnects with her father telepathically at the gates of the Citadel to tell him she will soon break the curse, then teleports back to Lake Shamakai to join Grummel in the fight - the Almighty's power surging through her. Kuso comes to take Emerald down - Kilian in tow with his hands tied. Killian explains that the Dark Ones are holding his family hostage and would kill them if he didn't help them, but Emerald is too hurt to believe him. Kuso gains the upper hand and nearly kills Emerald, but Captain Antonia and the Pirates arrive - their ship floating majestically in the sky by the power of the Almighty. Now, the battle rages between our heroes and Antonia's crew against the dark horde as Emerald prepares again to break the curse. She wields the Eternal Blade and summons the power of the Almighty - knowing the power will destroy her. Shock waves pulse through the Soulless Citadel and even in the battle around her in Baransu, but though it opens the Citadel gate, Sensei Lux and the warriors are still bound by their chains.

Emerald is in shock - she was willing to sacrifice it all. Kuso shatters the Emerald of Wisdom with a dark curse and drives a blade into Antonia's side. Everything crumbling before her eyes, Emerald calls out to the Almighty as Kuso goes in for the kill. Emboldened, Killian breaks free and attacks Kuso to save Emerald - but Kuso cuts him down. Emerald is devastated - she loved Killian in spite of his betrayal. Enraged, she and Kuso face off - their power matched. When Kuso summons the horde to finish Emerald, the Light Walker heir calls upon the Almighty Diamond as her father did many years ago against Tenebris --- slamming the Blade's tip into the earth as the Almighty's power radiates and blasts Kuso and the horde away. In that moment, two voices battle in Emerald's spirit - the Dark Whisper that tells her the prophecy was false - and the Almighty's that tells her that she was the Key all along.

Emerald silences the dark whisper and perfectly pieces the many shards of the Emerald back together - as only she could do. Now reciting the words of the prophecy, Emerald's eyes glow, and things start to levitate - the sword drawing power from her.

Just before Emerald is overcome and at the edge of death, Killian convinces Grummel to help him get to Emerald. Killian grabs the sword from Emerald with his last strength and absorbs its force - its power has grown so great that it destroys him - taking the last of his life force. He knew what he was doing - he chose to sacrifice himself and to save Emerald. The sword's power explodes in a shock wave as Killian's body disintegrates. Emerald sees her love fade away as she faints in her weakness.

When she comes to, she is back in the Light Walker Village in the Forbidden Forest. Melea reassures her, but Emerald is heartbroken about Killian, and it doesn't seem like the sacrifice was worth it. But moments later, the Light Walker men begin to appear - the curse was broken after all! The Light Walker families finally reunite. With joy and a heavy heart, Sensei Lux holds a ceremony for the Village to remember the fallen warriors - and Emerald lights a firework for Killian - thanking him for the chance to be with her father again.

---

*At the Bottom of Lake Shamakai...*

Kuso slices her way out through the giant Eel, Takai, guarding the door to Shadow Realm. She holds the Eternal Blade, which she picked up after the garden crumbled back into the Lake, and approaches the sealed door to realms. Finding its intended home in the center of the door, it unlocks the gateway to the ancient Betrayer, Khaonai...`,
  },
];

async function run() {
  for (const { id, content } of updates) {
    const { data, error } = await supabase
      .from("stories")
      .update({ content })
      .eq("id", id)
      .select("title")
      .single();

    if (error) console.error(`Error updating ${id}:`, error.message);
    else console.log(`✓ Restored canon text: ${data.title}`);
  }
}

run();
