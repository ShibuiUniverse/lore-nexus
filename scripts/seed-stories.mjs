/**
 * Seeds all canonical Shibui Universe stories / chronicles from /docs lore.
 * Usage: node --env-file=.env scripts/seed-stories.mjs
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

const stories = [
  // ─────────────────────────────────────────────────────────────────────────
  // LEGEND TIER
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "Kurogami and the Eternal Blade",
    story_type: "legend",
    era_id: ERA.ORIGINS,
    is_featured: true,
    sort_order: 1,
    description:
      "The dragon blacksmith Kurogami falls to the Dark Whisper and forges the most dangerous weapon in all the realms. His sister Ryujinshi stops him in a battle that costs them both everything.",
    content: `Before the wars. Before the curse. Before Emerald ever touched a sword. There was Kurogami.

He was the greatest blacksmith the Baransu Realm had ever seen. A dragon. Noble. Patient. Gifted. He spent his days protecting the innocent and crafting relics that became legend.

But legends have a way of eating the people inside them.

The Dark Whisper found Kurogami in a quiet moment. It did not come with threats or fire. It came with questions. Soft ones. Reasonable ones.

"You know of the five gemstones the Almighty gave the Undying Ones. You know their power. And yet they sit untouched. Locked away. For what? For whom?"

Kurogami had no good answer.

"You could do so much more. You could be so much more. Khaonai waits in the Shadow Realm. Free him. He will give you what the Almighty never offered."

A noble heart does not break all at once. It goes slowly. Conversation by conversation. Compromise by compromise. Until the day comes when you do not recognize the face in the water.

Kurogami descended to the underwater volcano Erdekan at the bottom of the Fukushu Sea. There, in the heat and darkness, he worked. He forged a blade unlike anything the realms had ever known. A blade built to hold all five gemstones of the Almighty. The Emerald of Wisdom. The Pearl of Honor. The Baransu Ruby. The Opal of Strength. The Diamond of the Almighty Staff.

Five stones. One blade. Enough power to tear open the Shadow Realm and free Khaonai himself.

He almost made it.

Ryujinshi found out.

His own sister. A dragon warrior who had looked up to him her whole life. She did not send a message. She did not warn him. She showed up at the doors of his forge with fury in her eyes and fire in her lungs.

The battle was catastrophic.

Brother against sister. Two ancient dragons fighting in the deep places of the world. The sea shook. The volcano cracked. And when it was over, Ryujinshi stood over her broken brother with the Eternal Blade in her hands and tears running down her face.

She did not destroy it. She could not. The blade was too powerful, too dangerous to simply unmake. So she disappeared into the underground lava tubes running along the eastern coast of Baransu and made a vow on her brother's name.

She would protect the blade until her last breath. She would never let it fall into the wrong hands again.

The world forgot Kurogami. The world forgot Ryujinshi.

But the blade remembered everything.`,
  },

  {
    title: "The Prophecy of the Eternity Blade",
    story_type: "legend",
    era_id: ERA.ORIGINS,
    is_featured: false,
    sort_order: 2,
    description:
      "Two bloodlines. Two fates. An ancient prophecy written in the stars foretells that the Eternal Blade will either free Khaonai and plunge the realms into darkness, or be turned to light by the chosen one and save every living soul from the Whisper's grip.",
    content: `A blade forged in darkness.
Only the Chosen can harness.
By the Almighty's Power within.
Dark to Light, anew we begin.

The words were old when the world was still young.

Two bloodlines. Two destinies. Written into the fabric of the Baransu Realm before either child was born.

The first: a descendant of Tenebris. Consumed by fire. Burning with revenge. They would gather the five gemstones and wield the Eternal Blade to crack open the Shadow Realm. Khaonai would walk free. Darkness would swallow everything.

The second: a descendant of Sensei Murakai. Pure of heart. Named by wisdom. They would gather the same stones, wield the same blade, and turn it to light. Every soul the Dark Whisper ever claimed would be brought back. The realms restored.

Same blade. Opposite fates. Everything depending on who got there first.

For generations, scholars argued about what "pure of heart" meant. Warriors trained their whole lives hoping the prophecy pointed to them. Leaders built kingdoms around the idea that they were the chosen one.

None of them were.

The chosen one was an eighteen-year-old girl who did not want the job.

She was scared. She was stubborn. She had lost her father to a curse she did not cause and was being asked to fix a wound that was not her fault.

The Almighty has a habit of choosing people like that.

The prophecy did not promise an easy path. It promised a true one. And somewhere between the mountains of the Montes giants and the bottom of Lake Shamakai, Emerald of the Light Walker Clan found out what those words actually meant.

Not power.

Not glory.

The willingness to lose everything for the people you love.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // THE SOULLESS CITADEL
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "The Legend of the Soulless Citadel",
    story_type: "legend",
    era_id: ERA.CURSED,
    is_featured: true,
    sort_order: 3,
    description:
      "Sensei Lux leads the Light Walker Clan against Tenebris and his dark horde in the valley of Zillarnia. They win the battle. But Tenebris gets one last word. And that word costs them everything.",
    content: `In a time long ago, there was peace. Balance. A land called Zillarnia where children wandered to the next village without worry and came home to warm meals and smiling faces. It was called The Era of Balance. The people did not just survive. They thrived.

At the center of Zillarnia stood the Light Walker Clan. Led by Sensei Lux, the fiercest and most joyful warriors the realm had ever produced. Protectors. Not by obligation. By calling.

Then the darkness came.

A horde of deformed beasts clawed over the ridge surrounding the valley. Thousands of them. At their front rode Tenebris, wielding the ancient Bident of Khaonai and the full weight of Dark Magic behind him.

The Light Walkers met them in the valley.

They fought like they were born to do it. Because they were. The Forgotten Ones fell by the thousands at their feet. And through it all, Sensei Lux moved through the battle with a smirk on his face.

"Is it time for breakfast yet?" he shouted, pulling a spear from a Forgotten One's chest. "I am starving and my wife awaits me in bed."

Laughter rang through the valley. Not bravado. Real laughter. These men were doing what they loved, fighting alongside the people they loved, for the people waiting at home.

Tenebris had never seen anything like it. He had crushed armies with fear. These men had no fear to crush.

Furious, he rode down from the ridge himself. One wave of the Bident and hundreds of Light Walkers were thrown flat.

Sensei Lux hit the earth hard. He scrambled to his feet and turned to his men. "Bring the Staff of the Almighty! Tonight we get our glory!"

A warrior heaved the Staff across the battlefield. Lux reached out and caught it. The air warped around it. Matter bent at its presence.

Tenebris went pale. "It can't be."

"Well, would you look at that," Lux said.

He drove the bottom of the Staff into the earth. Light exploded from the white gem at its head, a dome of pure radiance that swept across the battlefield and evaporated the Forgotten Ones to ash. Tenebris slammed his Bident into the ground. Black met white. Darkness met light. The collision shook the world.

Tenebris knew it was over. So he used his last breath for the one thing he had left.

A curse.

"I curse you, Sensei Lux. I curse the Light Walker Clan. Every warrior. Every firstborn son of every generation to come. You shall never see the glory of the Heavens. Trapped between light and darkness. Soulless you shall become."

Then he was gone. Cast to the Shadow Realm.

The Forgotten Ones dissolved. Their souls rose free into the Upper Realm where their loved ones had waited.

The valley was silent.

Sensei Lux pulled the Staff from the earth and rested it on his shoulder. He turned to his men. "I think we're late for breakfast."

The laughter started. And then it stopped.

Men began to disappear. One by one. Leaving nothing but small clouds of white dust where they had been standing.

5,555 warriors. Gone.

And so the Soulless Citadel was born. A prison between light and darkness where the greatest warriors the realm had ever known were trapped, waiting, hoping that somewhere out there someone would find a way to bring them home.`,
  },

  {
    title: "The Last Morning",
    story_type: "lore",
    era_id: ERA.CURSED,
    is_featured: false,
    sort_order: 4,
    description:
      "The morning before the battle. Sensei Lux, his wife Melea, and their children Emerald and baby Tika share one last ordinary breakfast together. Told quietly. Without a single warning of what is coming.",
    content: `It was a quiet day in the Light Walker village. Sun was shining. The wind was warm but refreshing. Village kids outside swinging wooden training swords at each other, arguing about who won.

Inside, Sensei Lux and his family were eating breakfast.

His favorite. White rice. Fried egg. Grilled onions. He reached out his right hand and slid the back of his fingers gently down his wife's jaw.

"Melea. What would I do without you?"

The sun came through the bamboo walls in long strips and landed on her face. Homemade plumeria perfume. Long black hair. Eyes that caught the light like stars. She was the most beautiful woman he had ever seen. But her mind. Her courage. Those were what he could not live without.

He looked at her and thought: "Why is she not the leader of this clan? She is better than I am."

He looked down at Emerald. Six years old. Legs crossed on the floor. Eating her rice with full concentration. "Thank the Almighty she looks like her mother," he thought.

Melea held baby Tika in her arms. Just a little bub. Lux leaned in close and whispered in his son's ear.

"My son. You will be mighty. You will lead with strength. I will teach you the ways of the Almighty."

Melea looked at him sideways. "You may be the fiercest warrior in the land. But on the inside, you are as soft as the center of that egg."

Lux opened his mouth to respond.

Then the earth shook.

A violent tremor. Walls cracking. Dust falling from the ceiling. Screams from outside.

"Outside! Everyone, quickly outside!"

He grabbed Emerald. Followed Melea to the front door. The structure groaned. Caved. He leaped forward and with everything he had, threw Emerald through the doorway ahead of him.

The house came down.

He never made it through the door.`,
  },

  {
    title: "The Rise of the Women Warriors",
    story_type: "chronicle",
    era_id: ERA.CURSED,
    is_featured: true,
    sort_order: 5,
    description:
      "After the curse takes the Light Walker men, Melea learns the truth through her daughter Emerald's vision. She stands before what remains of her clan on the edge of the Forbidden Forest and makes a decision that changes everything.",
    content: `The clouds came before the battle. Dark, thick, and wrong. It was the middle of the day but the sky looked like midnight. Everyone knew what it meant. They had heard stories of Tenebris and his dark magic. Now it was here.

Melea gathered the women, the children, the elderly at the far side of the village by the treeline. She told them to stay. She had given them that instruction a hundred times in training. Stay. Watch. Wait.

They heard everything. Steel hitting steel. Screams. The growling of Forgotten Ones and the foul smell of rotting flesh on the wind. Then flashes of light in the valley. Then a brightness so intense they had to look away.

The Staff of the Almighty.

Melea dropped to her knees. Will I ever see my husband again?

Then silence. The clouds pulled back. The darkness lifted. Someone in the crowd screamed with joy.

But where was Emerald?

Melea ran.

She found her daughter perched between two rocks above the valley, watching the battlefield below. Eyes wide. Face white as snow.

"Emerald. Talk to me. What happened?"

Her daughter looked up at her. Then closed her eyes.

"They're all gone, Mother. Papa is gone."

She broke. The kind of cry that comes from somewhere deep, where something inside you actually breaks. Melea held her. Then Emerald reached up and placed two fingers on her mother's temples.

"Let me show you."

Melea's eyes went white.

She saw everything. The battle. Tenebris. The Bident sweeping through their men. She saw Lux, her Lux, making jokes in the middle of a war because that was who he was. She saw the Staff. The light. The collision. And then she saw her husband disappear into nothing. The love of her life. Married at thirteen. Vowed to never leave each other's side.

Gone.

But there was one more thing.

She saw the Staff of the Almighty fall onto the battlefield. It rested for a moment. Then it rose. And like a bolt, it launched itself into the distant sky. She followed it with her eyes. It landed somewhere lush and green. Fruit trees. Flowing water. A great waterfall in the distance.

Melea's eyes came back. Tears running down both cheeks. They held each other for a long time.

"What do we do now, Mother?"

She did not have an answer that night.

But three months later, she stood on a rock at the edge of the Forbidden Forest with every woman in the clan in front of her.

"Our warriors are gone," she said. "They sacrificed everything. The curse still holds. It takes firstborn sons at eighteen. Any man in the clan who picks up a weapon turns to stone. So I ask you: are we going to lie down and die? Is that what our husbands would want to see?"

The silence that followed was not emptiness. It was an answer.

"Women of the Light Walkers. We rise. We withdraw from the world. We train in secret. The Dark Ones are still out there looking for the Staff of the Almighty. Tenebris is still working. And when he returns, we will be ready."

She led them into the forest that same day.

They found the center. A clearing. A calm lake. Trees opening up to let the sunlight in. Like the forest had been waiting for them.

Here, they built everything back from scratch. The land was fertile. The spring was endless. And the women, led by Melea, did what they had always watched their husbands do.

They trained. Every day. Without stopping. Without complaining.

Every firstborn daughter became a Hogo-sha. A guardian. Not just fighters. Warriors trained in the ways of the Almighty, able to harness the same power that had made the Light Walker men legendary.

The world had no idea they existed.

They were a myth. A whisper. Something men made up around campfires to scare each other.

But deep in the Forbidden Forest, the greatest warriors the realm would ever see were getting stronger every single day. Waiting for their chance to bring their people home.`,
  },

  {
    title: "A War of Minds: Life Inside the Soulless Citadel",
    story_type: "chronicle",
    era_id: ERA.CURSED,
    is_featured: true,
    sort_order: 6,
    description:
      "No sunrise. No sunset. No way to count time. Sensei Lux tries to hold 5,555 warriors together inside an eternal prison while the Dark Whisper picks them apart one by one. He creates the Arena. It may be the only thing keeping them sane.",
    content: `Every day is the same. No sunrise. No sunset. No way to count how long we have been here.

I have not heard the voice of the Almighty since that day. Not even the familiar surge through my veins. A connection I lived by, now stripped from my hands along with everything I love.

Where is my family? Are they safe? Does my daughter remember my face?

I keep asking questions I cannot answer. That is the real trap of this place. Not the walls. The questions.

There was something else in the Citadel with them. Not a person. Not a creature. A voice.

It came at your weakest. A shadow in the corner. A fog that moved wrong. And then, softer than anything you had ever heard, it spoke directly into the part of you that hurt most.

"Young man. If the Almighty cared so much for you, why would he not simply open the gate? He is all-powerful, is he not? He could free you with a thought. But that is assuming he thinks of you at all."

Many of the strongest warriors Lux had ever known fell to it. Division spread through the Citadel like a sickness. Men who had fought side by side for decades turned on each other. Accusations. Bitterness. Hopelessness dressed up as logic.

Lux had to do something.

He found an innocent who had just arrived, sitting alone, humming something barely audible.

"What is that song, brother?"

The young man startled. Bowed with respect. Wiped his eyes before Lux could see.

"It is the lullaby my mother sang. I hum it so I do not forget her voice."

That was when Lux understood what the Whisper was actually doing.

It was not just making men angry. It was making them forget. Forget who they were. Forget who was waiting for them. Forget that there was anything worth holding on to.

He called a new order. The Arena.

A place to fight. Not each other. The Whisper. Daily combat to keep the mind sharp and the heart focused on something true. Every day in the Arena was a vote against despair. A declaration that they were still warriors. Still alive. Still themselves.

"There is no death in this place!" Lux shouted the first day. "We have never feared death. What we fear is forgetting why we fight. Every man in this Arena plants his feet for one thing. Not for me. Not for glory. For the people waiting on the other side of that wall."

New generations kept arriving. Young men, firstborn sons of the Light Walker Clan, appearing in the Citadel on their eighteenth birthday with no warning and no preparation. The veterans took care of them. The Arena gave structure. The lullabies kept memory alive.

One particular new arrival changed the mood entirely.

He appeared wearing a bright red jacket with diamonds on it, looking extremely pleased with himself.

An older warrior studied him. "Son. May I ask how fond you are of that jacket?"

"Quite fond, actually. It is the King's Jacket."

"I see. I have been wearing this Yoroi for what feels like several lifetimes. We have a tradition here. The newcomer trades their best piece for something from one of ours. I am offering this Octopus as part of the deal. Do not eat him. We have become close."

Vi, who was watching from nearby, had already named the octopus.

Nobody asked him to. He just did it. That was Vi.

The Citadel was a war of minds. And they were determined to win it.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ETERNAL BLADE MANGA
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "The Eternal Blade: Quest for Redemption",
    story_type: "manga",
    era_id: ERA.CURSED,
    is_featured: true,
    sort_order: 7,
    description:
      "Emerald of the Light Walker Clan does not want to be the chosen one. She is eighteen, grieving her father, and afraid she does not have what it takes. The prophecy has different plans. The main manga of the Shibui Universe, five chapters published.",
    content: `Emerald did not ask for any of this.

She was eighteen. She had grown up in a hidden forest with a mother who trained her like a soldier and a father who existed only in stories and a small, persistent ache in her chest that never fully went away.

The Light Walker Clan had been hiding for years. Melea led them well. The women were fierce. They were ready. But no one had found a way to break the curse. Not yet.

Then Kilian stumbled into the forest.

He was being hunted by the Dark Ones. Emerald pulled him out of trouble before she thought about whether that was a good idea. When she found the scroll he was carrying, a prophecy written in ancient script, she read it expecting it to mean someone else.

It meant her.

A Light Walker who could gather the five original gemstones given by the Almighty might wield the Eternal Blade and free the realm from both the curse and the darkness. The Almighty's power would flow through them. And the realms would be made whole.

Her first reaction was to put the scroll down and walk away.

Then the Dark Ones attacked the hidden village. And running was no longer an option.

She and Kilian moved fast. North to the Upper Mountains to find the Montes Giants and the Emerald of Wisdom they protected. She answered their riddle well. Grummel, a small giant and keeper of the stone, joined them on the way down.

Kuso and the Dark Ones were waiting at the bottom of the mountain.

They barely escaped through a forest with help from the Kubu people. Then, drifting on a rowboat in the middle of the Fukushu Sea, they were found by pirates.

Captain Antonia.

Emerald's aunt.

Melea's younger sister, who had been exiled after a betrayal that had broken the family apart years ago. She had lived at sea ever since. She carried the Baransu Ruby. And she had kept the Eternal Blade hidden from the entire world.

She gave both to Emerald without hesitation. She looked at her niece and saw the Almighty's power on her. That was enough.

Two gems left. The Pearl of Honor from the Lacus People at Lake Shamakai. The Almighty Diamond, last seen with the Staff.

Before they reached the lake, the truth about Kilian came out.

He had been feeding information to the Dark Ones the whole journey. Not because he wanted to. Because they had his family.

Antonia made him walk the plank. Emerald did not argue.

She dove to the bottom of Lake Shamakai alone. Faced the giant eel Takai and her deepest fear. Nearly drowned. Connected with her father in a moment between consciousness and darkness. Came back with the Pearl.

One gem left.

The Lake gave her the answer. A tomb in its depths, where the Almighty had first given the Staff to Sensei Murakai. She placed the Blade in the door. It opened. The tomb rose from the water and became a garden. The Staff was there. Hovering. Waiting.

She took the Almighty Diamond. Placed all five stones in the Blade.

The gates of the Soulless Citadel appeared. They did not open.

Kuso arrived with the Dark Ones. Kilian was with them, hands tied.

In the battle that followed, Antonia's ship appeared in the sky, lifted by the power of the Almighty. Captain and pirates against the dark horde. Grummel fighting with everything he had.

Kuso broke the Emerald of Wisdom. Drove a blade into Antonia's side.

Kilian broke free. Went after Kuso to protect Emerald. Kuso cut him down.

Emerald, standing over everything she had almost lost, slammed the Blade into the earth.

The shockwave opened the Citadel. But the warriors were still in chains.

She called to the Almighty. She pieced the shattered Emerald back together, shard by shard, with a steadiness that surprised even her. She raised the Blade. Power surged through it. The Almighty Diamond blazed.

It was destroying her. She could feel it.

Kilian, barely alive, grabbed the sword from her hands. He looked at her once. Then he let it take him.

It was his choice. He made it fast so she could not stop him.

She woke up in the Forbidden Forest. Her mother's face above her. The familiar smell of the trees.

She did not understand. Kilian was gone. Was it worth it?

Then the men began to appear.

One by one. Out of the air. Warriors she had only heard stories about. Fathers. Brothers. Sons.

Her father last.

He crossed the clearing and held her for the first time since she was six years old.

Somewhere at the bottom of Lake Shamakai, Kuso walked through the door to the Shadow Realm with the Eternal Blade in her hand.

The story was not over.

But for one morning in the Forbidden Forest, everyone was home.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PIRATES OF FUKUSHU
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "Antonia's Journey: From Exile to Captain",
    story_type: "chronicle",
    era_id: ERA.CURSED,
    is_featured: true,
    sort_order: 8,
    description:
      "Antonia falls in love with a man from outside the clan, loses everything in a single night, and is cast out to sea alone and pregnant. What happens next is not what anyone expected, including her.",
    content: `Sensei Lux the Third had two daughters. Chaska and Antonia. Chaska was the oldest: responsible, careful, the kind of person who saw danger before it arrived. Antonia was the youngest: curious, warm, always reaching for the thing just out of range.

When Antonia was eighteen, she met a boy from another land on one of her adventures. He saved her life. She brought him home.

Her father opened his arms. Trained him. Treated him like a son.

Chaska never trusted him.

Vegas was his name. He was charming and easy and convincing. Everyone loved him. Antonia loved him most of all.

Then one night Chaska woke Antonia shaking her shoulders.

"The Ruby is gone. Vegas is gone."

Antonia could not speak. The bed was empty. The clan was out searching the forest and the town. She dressed and went alone to find her husband.

She found clues he had left for her along the path. She followed them, torn between hope and knowing, until she reached the water and saw him standing on a boat.

Smiling.

"I knew you would find me," he said. "Come with me. This gem will give us everything. Power. A future. Our child will never go without."

She looked at him for a long moment.

"That does not belong to us," she said. "Give it back. It is not too late."

He reached for her hand. "Your sister will never accept us. When your father is gone, she will make sure we are cast out. I did this for you."

An arrow hit him in the chest.

Antonia did not have to turn around to know who had loosed it.

She held him as he died. He told her he had loved her. He touched her stomach with his last breath. She sat on that boat with the Ruby in her hands as it drifted out to sea. Her sister stood on the shore watching.

She did not go back.

Days passed. The sun. The water. No food. No land. She lay in the bottom of the boat and felt herself going. She screamed at the Almighty. Every feeling she had, the grief and the rage and the guilt of it, she screamed it all into the open sky.

Then a stillness came.

The Almighty answered.

Your son will live. I will take care of you both. He will be a wild man. In constant struggle with the world. But no one will defeat him.

She felt peace for the first time since that night.

The water moved under the boat. Something enormous was rising beneath her. A sea creature, massive beyond anything she had ever imagined, gentle as a current, carrying her toward land. When the shore appeared, it slipped beneath the surface and was gone.

She hid the Ruby. She made swords. She raised her son Benaijah in a port town that asked no questions. She grew harder. More careful. More alone.

Then one night the Ruby glowed through its hiding place and shot a beam of light into the sky.

She ran. She hid Benaijah in a tree. She told him not to come down until he heard her voice.

She never came back for him.

The pirates took her. She fought them with everything she had and with the power of the Almighty surging through her hands, but there were too many. When she saw they had found her son, she lowered her weapons.

She went down calling his name.

The last thing she saw before the dark took her was a pirate captain crouching over her. He looked like he had never done anything this complicated in his life.

His name was Davie.

And their story was just getting started.`,
  },

  {
    title: "Davie's Quest: The Son of Blackbeard",
    story_type: "chronicle",
    era_id: ERA.CURSED,
    is_featured: true,
    sort_order: 9,
    description:
      "Davie was raised by the most feared pirate in the realms and never knew anything different. Until an island with no exits changed him. Now his father has taken his daughter, and the only people who can help him are already dead.",
    content: `Davie was born in a tavern called the Lost on Turtle Island. His mother's name was Morgana. She tried. It was not enough. Blackbeard took the boy to sea before he was old enough to understand what he was being taken from.

He grew up on the Queen Anne's Revenge. He learned everything his father knew. He became Captain Davie. He was good at it.

Then Blackbeard sent him to an island to find a compass.

Six men went in with him. The jungle swallowed them one by one. Davie roamed for days until he could not walk any further. Then the Lacus people found him.

Half man, half fish. Living between land and water. Loyal. Kind. The most peaceful community he had ever seen. They healed his wounds. Taught him to hunt. He forgot about the compass. He forgot about his father. For the first time in his life, he understood what a family was supposed to feel like.

Then he noticed the compass around the neck of one of the elders.

It came back fast. All of it.

The elder gave him a box. Inside was a journal from a man named Captain Julius, who had sacrificed himself and his entire crew to trap Blackbeard in the Realm of Elohim. A navigator named Cornelius had carried the compass and the journal to the island before the ship went down. These quiet people had been protecting it for years.

Davie read the whole journal.

Then he ripped out the page with the ship's location, pocketed it, and left the island from the opposite direction from his father.

He went to a far town called Tarian. Found a woman he loved. Had a daughter. Lived like he had forgotten who he was, which was mostly the point.

He should have known better.

He was on the water when he saw the Queen Anne's Revenge on the horizon.

He ran. He was too late.

His wife took her last breath in his arms. They took the compass. They took his daughter.

He stared at the map page for a long time.

He had heard the rumors. A cursed ship that appeared once a month at the coordinates where Julius went down. No one who investigated came back. He took his fishing boat and sailed at night.

The ship appeared. Dark. Silent. Apparently abandoned.

Something grabbed him from below and threw him onto the deck.

Captain Julius looked like his portrait in the journal but wrong. Eyes empty. Skin wrong. The crew gathered around chanting. Death. Death. Death.

Someone swung a sword at Davie's throat. It bounced off.

Blackbeard's protection. The blood they shared made him untouchable to Julius's crew.

They lashed a rock to his ankle instead.

"Wait," Davie said. "I can help you. I can free you."

Julius stopped. "How does the son of the man we are trapped for help us?"

"He killed my wife. He has my daughter. He will try to open the portal and go back. I will stop him. I will take your duty. I will guard this portal forever if you sail with me and help me get her back."

Julius looked at him for a long time.

"Even if you succeed. There is nothing for us to return to. Everyone we knew is gone."

"That is your choice to make," Davie said. "But it should be a choice."

They locked him below.

He prayed in the dark. It was not eloquent. It was just honest. He was not worthy of help and he knew it. But his daughter was innocent. That was the only argument he had.

He woke up to a bucket of water in his face.

Julius pulled him to his feet. Marked his chest with a burning symbol. The same mark on every man in the crew.

"We will help you," Julius said. "We need the Ruby before your father gets to it. There is a woman in Turtle Harbor. A Zillarnia warrior. Only she can wield it."

Davie looked back as they sailed. The sea creature that guarded the portal was following the ship.

He had made a deal with the dead. He was going to find his daughter.

Whatever it took.`,
  },

  {
    title: "The Pirates of Fukushu",
    story_type: "manga",
    era_id: ERA.CURSED,
    is_featured: true,
    sort_order: 10,
    description:
      "Two people running from their pasts collide on the sea. Antonia has the Ruby and no reason to trust anyone. Davie has nothing left to lose. Blackbeard is hunting both of them. And at the center of it all is a portal between worlds that must never open.",
    content: `Two stories. One sea. And a gem that glows when darkness is close.

Antonia had been running for years. Since the night Vegas died in her arms on a drifting boat. Since the Almighty carried her to shore on the back of a creature larger than any ship she had ever seen. She had built a life. A son. A reputation on the water. And a secret she told absolutely no one.

The Ruby was hers to guard. She understood that now. The Almighty had been clear.

Davie had been running too, just in the opposite direction. Away from his father's name. Away from the things he had learned on that ship. Toward something ordinary and decent. A town. A wife. A daughter.

Then Blackbeard took all of it.

So Davie sailed to find a dead ship guarded by a sea monster, talked the cursed crew into helping him, and set course for Turtle Harbor.

He found Antonia exactly where Julius said she would be. She was surrounded by Forgotten Ones and her son was missing and she was still fighting. Davie pulled her out of it.

She did not thank him.

She woke up on his ship suspicious of everything. She had every right to be. She did not know yet that the man who rescued her was the son of the man who had just tried to destroy her town.

When she found out, she was not happy.

But the Ruby was glowing. Blackbeard was coming. And neither of them had any better options.

They made an uneasy truce. Antonia would bring the Ruby. Davie would use Julius's crew to draw Blackbeard into the open. They would end this once and for all.

What neither of them expected was how much they would have to trust each other to survive.

Antonia learned that Davie had walked away from his father before he had anything to walk toward. He had chosen a different life at a cost that did not stop being paid.

Davie learned that Antonia had not gone bitter from what happened to her. She had gone honest. It was not the same thing.

The battle found them at a sea cave on the edge of the realm, where the portal between worlds waited beneath the water and the monster circled below.

Blackbeard with the compass. Julius's crew unable to touch him. The Forgotten Ones thick in the water.

Antonia waded in with the Ruby. It burned in her hands. The Almighty's power moving through her like a current.

Davie went for his father.

He could have killed him. He had the opening. He had the reason.

He did not.

He looked at the man who had taught him everything and chosen nothing for himself and chose something different instead.

When it was over, the portal was sealed. Julius and his crew were finally free. They walked away from that ship for the first time in longer than most of them could remember.

Antonia stood at the bow of the empty vessel.

"So," Davie said. "What now?"

She looked at the horizon.

"Someone has to guard this thing," she said. "The monster does not take orders from anyone. The portal needs a captain."

She picked up Julius's hat from the deck.

She put it on.

That is how Antonia became Captain of the Pirates of Fukushu. And how a man who had spent his whole life running from the sea finally found a reason to stay on it.`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SHORT STORIES / TWITTER STORY NIGHTS
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: "Emerald Steals a Dragon Egg",
    story_type: "short_story",
    era_id: ERA.CURSED,
    is_featured: false,
    sort_order: 11,
    description:
      "A Twitter Story Night. Young Emerald sneaks to the cliffside to steal a dragon egg from the All-Mother Dragon's nest. She almost makes it. Almost.",
    content: `She had been planning this for three days.

Her father used to tell her bedtime stories about stealing dragon eggs. The way he told it, he made it sound like nothing. Like breathing. Like any sensible person would just walk up to a dragon nest, take an egg the size of their own head, and stroll back to the village with it tucked under one arm.

She was going to do it better.

She had scouted the cliffside twice. She had waited for the wind to shift so her scent would not carry. She had picked the route with the best handholds. She had mentally rehearsed every step.

Now she was at the edge, moving carefully, minding each footfall, close enough to see the nest below.

A tiny pebble rolled under her heel and dropped down into it.

She froze.

In the nest, barely visible through the straw and dried leaves, was the prize. A dragon egg. Massive. Bigger than she had imagined. Bigger than her head by a lot.

All-Mother Dragon egg. It had to be.

She stared at it and let herself picture it for just a moment. Walking back into the village with this egg held out in front of her. The look on everyone's faces.

"What if the baby calls me Momma," she thought. "With its little dragon eyes staring up at me. Oh, that would be the best thing."

A wrinkled hand reached out, grabbed her ear, and pulled her back from the ledge.

"What in the Almighty are you doing out here, Oneesan?"

Emerald took a large breath. "Nothing, Nana."

"Nothing. I have been standing here for fifteen minutes and it looks a great deal like you were about to steal this poor mother's egg."

Old Nana pointed across the clifftop. About fifty meters away, a massive dragon blended nearly perfectly against the stone wall. Still as rock. Eyes tracking every movement within range of the nest.

"Oneesan. Your mother is going to hear about this."

Emerald barely registered the threat. She was still thinking about the egg.

"Nana. How did Father do it? In the bedtime stories he used to tell me. How did he steal the egg?"

Nana laughed, the full kind, from somewhere deep.

"Oh, that boy of mine. He did love his bedtime stories."

Emerald put her face in her hands.

"You have got to be kidding me."`,
  },

  {
    title: "Vi Names the Beast",
    story_type: "short_story",
    era_id: ERA.CURSED,
    is_featured: false,
    sort_order: 12,
    description:
      "A Twitter Story Night. Locked in a cage in the Soulless Citadel with a collection of deformed beasts, Vi makes a friend. He names him Chuck. This is peak Vi.",
    content: `The cage in the Soulless Citadel was supposed to be punishment.

Nobody had told Vi that.

When Sean rounded the corner and saw the scene, he stopped walking.

Vi was seated. On top of one of the beasts. Comfortable. Like this was a perfectly normal situation that any reasonable man might find himself in during eternal imprisonment in a dark limbo between realms.

The beast had five legs. Vi had apparently already noticed this and found it charming.

"I think I'm a five-legged beast kind of guy," Vi said, not looking up. "I've been going back and forth on it but yeah. This is my thing now."

Sean stared.

"I'm going to call him Chuck," Vi continued. "Yeah. Chuck. That's settled."

The beast made a sound. It was unclear whether the sound indicated acceptance or protest. Vi interpreted it as acceptance.

"Chuck agrees," Vi said.

Sean opened his mouth. Closed it. Opened it again.

"We are trapped in a cage," Sean said. "In eternal purgatory. Between light and darkness. With deformed beasts."

"Chuck is not deformed," Vi said firmly. "He is unique. There is a difference and I would appreciate it if you made it."

Sean walked away.

Vi and Chuck remained.

In the Soulless Citadel, where the Dark Whisper spent its time convincing warriors that hope was a form of stupidity, Vi named a beast Chuck and decided to have a good time about it.

Nobody could ever fully explain Vi. But everyone was a little grateful he existed.`,
  },

  {
    title: "Kaito and the Quantum Citadel",
    story_type: "lore",
    era_id: ERA.CURSED,
    is_featured: false,
    sort_order: 13,
    description:
      "Kaito was a Light Walker boy who decided he was not going to wait until his eighteenth birthday to disappear. He went through the portal between realms instead and became something nobody in the clan had a word for yet.",
    content: `Every firstborn son in the Light Walker Clan knew what was coming.

The eighteenth birthday. The curse. The Citadel.

Most of them spent those years training, hoping that somehow their skills would matter when the time came. Some spent them with their families, trying to hold on to everything worth remembering.

Kaito spent his running calculations.

He was fourteen when the idea came to him. The Soulless Citadel existed between realms. Between light and darkness. The Almighty described it that way. Tenebris described it that way. Even the old women in the clan described it that way when they thought the children were not listening.

Between.

Kaito wrote that word down and stared at it for three days.

In the realm that existed beyond the portal, the one where different rules applied, there was a field of science that described exactly this kind of space. He had read about it in a book Melea had recovered from a trader years ago. Quantum mechanics. The behavior of matter in the space between defined states. Particles that existed in two places at once until someone looked at them.

The Soulless Citadel was a quantum state.

He was fifteen when he made his decision. He was not going to wait. He was going through the portal, into the other realm, and he was going to learn everything that realm knew about quantum physics until he understood exactly where his father was and how to get him out.

He told his mother the night before he left.

She cried. She was proud. Those two things happened at the same time and she did not try to separate them.

He crossed through the portal at dawn.

On the other side, he was a boy in strange clothes in a stranger world. He learned the language. He learned the science. He studied at every institution that would have him, working jobs that paid in the currency they used, piecing together a life that moved toward one destination.

His father.

Light and darkness. A quantum superposition. Two states existing simultaneously until something collapsed the wave function.

He believed it could be done. He was not sure he would be the one to do it. But he was going to understand it fully before he decided.

Somewhere on the other side of the portal, a Light Walker boy sat in a library surrounded by equations and thought about his father's face.

He had not forgotten it yet.

He was not going to let himself.`,
  },
];

async function main() {
  console.log(`Seeding ${stories.length} stories...`);

  const { data, error } = await supabase
    .from("stories")
    .insert(stories)
    .select("id, title");

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }

  console.log(`\n  ${data.length} stories inserted:\n`);
  data.forEach((s) => console.log(`  + ${s.title}`));
  console.log();
}

main();
