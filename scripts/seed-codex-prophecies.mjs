import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gthubyikarkgxxppaign.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHVieWlrYXJrZ3h4cHBhaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQxNjQ5OSwiZXhwIjoyMDg2OTkyNDk5fQ.g7kVyiJjNGH4oPbmglHl8v7EPLyrEsR3phZ_ZLcNXYY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const prophecies = [
  {
    name: "The Double Prophecy of the Eternity Blade",
    prophecy_text: `Marked long ago in our Universe's past,
A prophecy of dual fate was cast.
Ancient bloodlines intertwined,
A tale unfolds of great power and darkness' hold.

A descendent of Tenebris himself, consumed by raging fire and vengeful desire —
The Blade of Eternity, created of a lust for power and greed,
Shall open the Shadow Realm, for chaos to feed.

The Realms will tremble, darkness' might.
Khaonai's revenge — an eternal fight.
As the doors unseal, hell breaks loose,
Darkness rises, seeking to seduce.

Yet in the shadow of this darkest hour,
A glimmer of hope, a tale of power.
Born of Sensei Murakai's noble kin,
A chosen one, a path to begin.

A royal heart, pure and true,
Named by wisdom, destiny in view.
Through light and darkness, two sides revealed,
A tale of balance, the coin's concealed.

Marked by the undying ones' decree,
Gems of power, they'll gather to see.
With the Blade of Eternity, dark and dire,
Transformed to light, its purpose will inspire.

In a redemption quest, darkness they'll thwart,
From the Whisper's grasp, all people brought.
Restoring harmony, the prophecy's aim,
A savior rising to reclaim.

Through the eons, these tales resound,
A double prophecy, fate's profound.
Two descendants, two destinies entwined,
The Universe's balance, in their hands combined.

—

A blade forged in darkness.
Only the Chosen can harness.
By the Almighty's Power within.
Dark to Light, anew we begin.`,
    interpretation: `The prophecy is called "double" for a reason — it doesn't promise a hero. It promises a choice between two people from two bloodlines, and the outcome has never been guaranteed.

The dark side: a direct descendant of Turkan — the man who became Tenebris — consumed by rage and pain, will gather the Almighty's five gemstones and wield the Eternal Blade to tear open the door to the Shadow Realm. Khaonai walks free. Everything breaks.

The light side: a direct descendant of Sensei Murakai, born to royal blood and a pure heart, will win the favor of the Undying Ones, gather the same five gemstones, wield the same Blade — and instead of destruction, bring restoration. Freeing all people from the Whisper's hold.

The scroll was carried from the Tenshi Prophets of the Desert of Setra by Kilian, who had kept it as his most guarded secret. When he revealed it to the Light Walker Clan, they recognized both sides of it immediately. The light side named Emerald. The dark side pointed to Kuso — a Light Walker turned to darkness after losing everything.

Both sides have now played out. Emerald gathered the gemstones and broke the curse of the Soulless Citadel. But in the chaos of that final battle, Kuso recovered the Blade and used it at the bottom of Lake Shamakai to unlock the Shadow Realm's ancient door.

The prophecy was always a coin. It just landed on both sides at once.`,
    status: "partially_fulfilled",
    source:
      "The Tenshi Prophets of the Desert of Setra. Carried to the Light Walker Clan by Kilian of the Tenshi Clan.",
    is_featured: true,
    sort_order: 1,
  },
  {
    name: "The Curse of the Soulless Citadel",
    prophecy_text: `I curse you, Sensei Lux and the Light Walker Clan.
Every warrior who stood this day.
Every firstborn son of every generation to come.
None shall see the glory of the Heavens.
Trapped between light and darkness —
Soulless you shall become!

I shall return.
My name shall rule these lands again.`,
    interpretation: `Tenebris was moments from defeat when he spat these words. His horde was ash. The Staff of the Almighty had pushed back his darkness. He was going to the Shadow Realm and he knew it. So he did the only thing left to him — he cursed them.

And it worked.

Every warrior who fought in the Great Battle vanished into thin air moments after their victory, absorbed into the Soulless Citadel — a dark fortress hovering in the limbo between realms. Not dead. Not alive. Just... trapped. The curse didn't stop at the battlefield. Every firstborn son of the Light Walker Clan, on his 18th birthday, was taken next. Generation after generation, the Citadel filled with men who had done nothing wrong except be born into the wrong bloodline.

5,555 souls in total. Some kept their hope. Others let the Dark Whisper in, and the Citadel's darkness slowly changed them — rage and despair rotting something inside them over the long years.

For ten years after the curse, the Light Walker women rebuilt. They went into hiding in the Forbidden Forest, trained in secret, and tried to find a way to break it. None could, until the Double Prophecy surfaced and Emerald's path became clear.

The curse was finally broken when Emerald wielded the Eternal Blade — Killian giving his life to absorb the sword's final shockwave. The men returned. The families reunited. Sensei Lux held his daughter again for the first time since she was six years old.

As for Tenebris's second line — "I shall return, my name shall rule these lands again" — that part of the curse is still unresolved. He was cast to the Shadow Realm. And Kuso has now opened the door.`,
    status: "partially_fulfilled",
    source:
      "Tenebris — the Dark Warlord, born Turkan, brother of Sensei Murakai — with his last breath after his defeat in the Great Battle of Zillarnia.",
    is_featured: true,
    sort_order: 2,
  },
  {
    name: "The Vow of Sensei Murakai",
    prophecy_text: `We shall protect his creation and bring harmony to the realms.
We have kept that vow.
The Staff and its sacred charge shall be handed down,
From generation to generation.

It has been said — when the days reach their darkest,
The Almighty will choose again a number of his faithful
And train them to wield his very power.
Their path will be through fire, and their burden crushing.

Our people have longed for the day of rescue from Tenebris' scourge —
That day when all will be set right.
But the wise know there is more to defeat than Tenebris and his horde.
We have all heard the Whisper —
And in our weakness, danced with the Dark Magic.
Invited, the darkness creeps in… plotting against us.

The greatest battle may yet be mastery of the foe within.
And the day of that conquest — or defeat — will be like none other.
That day when we, by the Almighty's power, will overcome and be free once again…
Or slip into the chasm of death unending.`,
    interpretation: `This is not a prophecy in the traditional sense — no oracle spoke it, no scroll carries it. It is the founding vow of the Light Walker Clan, spoken by Sensei Murakai when the Almighty first entrusted him with the Staff. It was passed down through generations as both promise and warning.

The first part is a vow of protection — the Light Walkers would guard the Almighty's creation and hand the Staff down from Sensei to Sensei. That vow was kept for centuries.

The second part is a prophecy embedded in the vow itself. The Almighty told Murakai that when the darkness reached its worst, he would choose again — raise up a new group to wield his power. It would cost them. Enormously. But the day would come.

That day arrived in Emerald's generation.

The final lines cut to something deeper than any battle — the warning that the real enemy isn't Tenebris or Khaonai. It's the Whisper. The thing that got Khaonai in the first place. The thing that turned Turkan into Tenebris. The thing that took Kuso. Every person in the Baransu Realm has heard it. Many have listened. The greatest test the Almighty's people face isn't an army outside the gates — it's the voice inside that says it would all be easier if you just stopped fighting for the light.

Whether that battle is won or lost has not yet been written.`,
    status: "partially_fulfilled",
    source:
      "Sensei Murakai — the first Sensei of the Light Walker Clan, chosen and trained by the Almighty himself in the early age of the Baransu Realm.",
    is_featured: false,
    sort_order: 3,
  },
];

async function seed() {
  console.log(`Inserting ${prophecies.length} prophecies...`);

  const { data: existing } = await supabase
    .from("prophecies")
    .select("name")
    .in(
      "name",
      prophecies.map((p) => p.name)
    );

  const existingNames = new Set((existing || []).map((r) => r.name));
  const toInsert = prophecies.filter((p) => !existingNames.has(p.name));

  if (toInsert.length === 0) {
    console.log("All prophecies already exist — nothing to insert.");
    return;
  }

  if (existingNames.size > 0) {
    console.log(
      `Skipping ${existingNames.size} already-existing: ${[...existingNames].join(", ")}`
    );
  }

  const { data, error } = await supabase
    .from("prophecies")
    .insert(toInsert)
    .select("name");

  if (error) {
    console.error("Insert error:", error.message);
    process.exit(1);
  }

  console.log(`✓ Inserted ${data.length} prophecies:`);
  data.forEach((p) => console.log(`  • ${p.name}`));
}

seed();
