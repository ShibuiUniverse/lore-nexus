import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const SUPABASE_URL = "https://gthubyikarkgxxppaign.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHVieWlrYXJrZ3h4cHBhaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQxNjQ5OSwiZXhwIjoyMDg2OTkyNDk5fQ.g7kVyiJjNGH4oPbmglHl8v7EPLyrEsR3phZ_ZLcNXYY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const replaceBlackbeard = (str) => {
  if (!str) return str;
  return str
    .replace(/Captain Blackbeard/g, "Captain Vane")
    .replace(/Blackbeard's/g, "Vane's")
    .replace(/blackbeard's/g, "Vane's")
    .replace(/trap Blackbeard/g, "trap Vane")
    .replace(/Blackbeard/g, "Vane")
    .replace(/blackbeard/g, "Vane");
};

async function fixBlackbeardsEntries() {
  // ── 1. Fetch existing content ──────────────────────────────────────────────
  const { data: story } = await supabase
    .from("stories")
    .select("title, description, content")
    .eq("id", "07662096-8946-4528-8a72-51bd7bde1025")
    .single();

  const { data: event } = await supabase
    .from("timeline_events")
    .select("title, description, full_content")
    .eq("id", "bbbbbbbb-0027-0027-0027-000000000027")
    .single();

  // ── 2. Update story ────────────────────────────────────────────────────────
  const { error: e1 } = await supabase
    .from("stories")
    .update({
      title: replaceBlackbeard(story.title),
      description: replaceBlackbeard(story.description),
      content: replaceBlackbeard(story.content),
    })
    .eq("id", "07662096-8946-4528-8a72-51bd7bde1025");

  if (e1) console.error("Story update error:", e1.message);
  else console.log("✓ Fixed story: Davie's Quest: The Son of Vane");

  // ── 3. Update timeline event ───────────────────────────────────────────────
  const { error: e2 } = await supabase
    .from("timeline_events")
    .update({
      title: replaceBlackbeard(event.title),
      description: replaceBlackbeard(event.description),
      full_content: replaceBlackbeard(event.full_content),
    })
    .eq("id", "bbbbbbbb-0027-0027-0027-000000000027");

  if (e2) console.error("Timeline event update error:", e2.message);
  else console.log("✓ Fixed timeline event: Vane's Ship Sails Toward Devil's Eye");

  // ── 4. Fix Captain Vane's title ────────────────────────────────────────────
  const { error: e3 } = await supabase
    .from("characters")
    .update({ title: "Pirate King of the Caribbean" })
    .eq("id", "d5841464-658a-454b-9eeb-fdbd19be93a3");

  if (e3) console.error("Character update error:", e3.message);
  else console.log("✓ Fixed Captain Vane's title: Pirate King of the Caribbean");
}

const newChronicles = [
  {
    title: "The Yellow Ship",
    description:
      "McCray turned on Vane once. Vane found out. The wound on McCray's chest has never healed, his crew's skin has never stopped yellowing, and they have never found a shore to call home.",
    content: `Fresh from their latest raid, the notorious pirate fleet of Captain Vane let down their guard at Crooked Island. Rum free-flowed throughout the fleet. Vane checked his reflection in his sword and wiped the blood of an unlucky Spaniard from his brow. It was no ordinary blade — given to him by the witch of Cat Island, rumored to have been crafted by dark magic to make curses and to break them. Vane sensed its power was far older, and far more dangerous, than any witch.

"Navy ships to the fleet stern!"

The men jolted into action. Vane knew they were outgunned, but the pirate sloops were swifter. He ordered the fleet to run.

McCray's ship, the Plover, was bringing up the rear. The youngest captain in the fleet, McCray had taken to sea for the Navy in the Spanish War as a mere lad. What he lacked in years he made up for in courage and a short fuse. Three Navy ships were closing in fast. He had seconds to decide.

He ran. But it wasn't fast enough.

---

The Navy cornered the Plover and boarded her. McCray and his crew were brought in irons before the Magistrate of Kingston.

"You are hereby sentenced to imprisonment for the remainder of your lives. Or — if you accept His Majesty's mercy — by capturing and returning your former master Charles Vane, you will be granted pardon."

McCray stood. "Your Honor, you've shown us the error of our ways. I thank you kindly for your generous pardon. We'll find Vane and return him for justice."

His crew stared at him. Matthews gave them a look: *Trust your captain.*

"Wise choice," said the Magistrate. "Return with Vane — alive or dead — by Autumn's cool, or your men here will swing on All Hallow's Eve."

McCray's face fell as Matthews and seven of his crew were hauled away to be held as collateral. "Between the devil and the deep sea," he muttered as they made for Kingston Harbor.

---

Some days later, nearing the Cays, the Plover tucked into a quiet inlet for the night. McCray dreamed fitfully of a ghostly yellow ship sailing toward him. It would not slow. Would not change course. Got close enough for him to see a withered shade of a captain on deck, clutching his chest and telling him to turn around.

He woke in a sweat.

At dawn, he gave the order to press on.

As they rounded the last of the inlets to set sail on the open sea, they spotted the Phoenix — Vane's flagship — sitting alone at anchor. No fleet behind her. Just waiting.

McCray had more cannon than the Phoenix. His crew was already looking at him.

He ordered the cannon made ready.

It was then that McCray felt the familiar cold metal of a pistol barrel against his temple. It was Vane. He had boarded the Plover in secret to discover McCray's intentions.

"Thought you could bring me in, did ye, whelp?" Vane said quietly. Then louder, to the crew: "Your yellow-hearted captain turned on his own. And now you'll all pay for it."

"I swear — I had no idea they were tailing us!" McCray pleaded.

"You've betrayed your brethren, McCray," said Vane. "And now you'll pay."

He unsheathed his cursed sword with his other hand and drew blood in the shape of an X over McCray's heart. "This wound will never heal. It will fester. It will never kill you — but it will never let you die."

Then he raised his voice to the whole crew: "Your yellow-hearted captain will turn this ship, and you mates to wisps, shadows of yourselves — cursed to sail the sea forever with ne'er a shore to call home."

Vane sheathed his sword and launched himself over the deck into his landing boat.

McCray collapsed. His men rushed to him. Some tried to abandon ship, but the curse held them to the deck. Their skin began to yellow.

---

And now the yellowed Plover is a sailing graveyard for McCray and his crew — cursed as cowards to roam the seas forever, hunting for Vane and the pirate fleet. They can never fully die. They can never rest.

Not until Vane releases them.

Or until they hunt him down and deliver him to Kingston.

McCray still carries the X on his chest. It still festers. The wound is exactly where he was told it would be — never healing, never killing.

Some nights he stands at the bow of the yellowed ship and watches the horizon, waiting for the Phoenix to appear.

He is very patient now.

He has learned to be.`,
    story_type: "chronicle",
    is_featured: true,
    sort_order: 15,
  },
  {
    title: "Vane and the Devil's Eye",
    description:
      "Vane did not choose to come to Baransu. He was pulled through the Devil's Eye when the Royal Navy tried to trap him. He came through angry, obsessed with going back, and easy prey for the Dark Whisper. He made a deal he never fully understood. His son Davie was on the ship.",
    content: `Vane was not always the man his crew feared.

He had been the most feared pirate in the Caribbean — the name that made governors lock their ports and Navy captains second-guess their orders. He was fast, he was brutal, and he operated by a code that only he fully understood. The Crown wanted him dead. His own crew thought he was untouchable.

He had a sword given to him by the witch of Cat Island. Crafted with dark magic, she'd told him — made to break curses and make them. His men kept their distance from it. Vane felt its power and kept it close.

---

Captain Julius of the Royal Navy had been tracking Vane for months. He had a plan that he believed was foolproof.

He was wrong about that.

The trap was laid at the Devil's Eye — a churning vortex at the edge of charted water that sailors avoided with the same instinct they avoided cliffs. Julius believed he could drive Vane toward it with enough ships and enough cannon. Pin him against the Eye. No escape.

What Julius did not know was that Vane had been looking at the Devil's Eye for years.

A witch in Tortuga had told him there was something on the other side. Another realm. Creatures. Power. A compass somewhere in that realm that pointed to a portal between worlds, and a gem that controlled it. She had told him this in exchange for sparing her village, and Vane had filed it away in the back of his mind where he kept things he wasn't sure whether to believe.

When the Navy closed in, Vane made his choice. "Full sail toward the Eye."

His crew thought he had lost his mind.

His son Davie, just a boy on the ship, grabbed the railing and held on.

Julius, watching from the Monarch, ordered his ship to follow. He was not going to let Vane disappear through some supernatural vortex and escape justice. He took the Monarch in after them.

The Devil's Eye took them both.

---

On the other side was the Fukushū Sea. The colors were wrong. The stars were wrong. The creatures in the water were larger than anything in the Atlantic and considerably less afraid of ships.

Vane's crew emerged shaken, disoriented, and alive. Julius's crew emerged the same way, and the two ships that had been trying to destroy each other a minute ago floated in silence in a sea they did not recognize.

Julius made the decision that would define the rest of his existence: he moved his ship between Vane and the portal. Blocking the way back. If they were going through, they were going through on his terms.

The portal sealed behind them both.

---

That night, while his crew slept fitfully on the Fukushū Sea, Vane heard something.

*A Whisper.*

It had followed him through the Eye, or it had been waiting for him on the other side. He would never know which. It knew his name. It knew what he wanted. It told him there were people in this realm who could give him everything — the gem, the compass, the way home. All he had to do was swear his loyalty.

He made a blood oath with a dark figure he met at the edge of a black shore. The details of what he traded were not shared with his crew.

The sword at his hip — the witch's blade — went cold that night. From that moment on, those it cut did not heal the way wounds should. The wounds carried a whisper of their own.

His men woke the next morning to find their captain changed. Not obviously. Not in ways they could name immediately. Just — colder. More certain. Like something inside him that had still been weighing options had finally stopped.

Davie was twelve years old. He sat at the bow of the ship with his feet dangling over the dark water and watched his father give orders.

He did not know what his father had traded.

He would spend the rest of his life trying to be the opposite of whatever his father had become.

---

Vane never found the compass. Julius's cursed Navy kept it from him for centuries, guarding the portal and the waters around it with the terrible endurance of men who have nothing else left to do.

Vane's obsession with going home curdled into something else over the decades. The Whisper kept feeding it. The realm of Baransu gave him enemies and the Dark Ones gave him a horde and the Fukushū Sea gave him a hunting ground.

He stopped talking about going home.

He started talking about conquest instead.

The Whisper had won.`,
    story_type: "legend",
    is_featured: true,
    sort_order: 16,
  },
];

async function seedChronicles() {
  const { data: existing } = await supabase
    .from("stories")
    .select("title")
    .in(
      "title",
      newChronicles.map((s) => s.title)
    );

  const existingTitles = new Set((existing || []).map((r) => r.title));
  const toInsert = newChronicles.filter((s) => !existingTitles.has(s.title));

  if (toInsert.length === 0) {
    console.log("New chronicles already exist — skipping.");
    return;
  }

  const { data, error } = await supabase
    .from("stories")
    .insert(toInsert)
    .select("title");

  if (error) {
    console.error("Insert error:", error.message);
    return;
  }

  data.forEach((s) => console.log(`✓ Added chronicle: ${s.title}`));
}

async function run() {
  await fixBlackbeardsEntries();
  await seedChronicles();
  console.log("\nDone.");
}

run();
