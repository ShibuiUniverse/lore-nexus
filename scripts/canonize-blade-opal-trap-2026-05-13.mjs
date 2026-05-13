// Lore canonization on 2026-05-13. Tightens the Eternal Blade / Opal of
// Strength / Double Prophecy framing around a single core idea James
// settled on: the Blade was *designed* as Khaonai's escape mechanism.
//
// The Whisper had a singular purpose — free Khaonai from the Shadow Realm.
// In Kurogami it found the hand that could forge the key: a blade capable
// of wielding all five of the Almighty's gemstones. Four of those stones
// the Almighty placed in Baransu. The fifth — the Opal of Strength — He
// sealed in the Shadow Realm with Khaonai himself, not as punishment but
// as containment, so its corrupting power could touch no other heart.
//
// The trap: gathering the four Baransu gemstones and wielding them through
// the Eternal Blade would carry power enough to tear open the door between
// realms. Free Khaonai. Add the fifth. Wield the weapon in its true form.
// That was always the plan.
//
// The Double Prophecy presents two ends: a Tenebris-bloodline descendant
// will complete the trap (4 → open door → 5 → chaos), or a Murakai-bloodline
// descendant will gather the four with restraint, wield the Blade in light,
// break the curse, and restore balance — without ever opening the door.
//
// Idempotent. Re-running re-sets these exact values.

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
      lore_content: `Kurogami, once a wise and noble dragon and the greatest blacksmith ever to walk the Baransu Realm, fell into the deceit of the Dark Whisper. The Whisper had a singular purpose — to free its master, Khaonai, from the Shadow Realm — and in Kurogami it found the hand that could forge the key. He set himself to make a weapon no mortal had ever dared: a blade capable of wielding all five gemstones of the Almighty at once.

He descended to the underwater volcano Erdekan, deep in the Fukushū Sea, and there, in the heat of the earth's core, hammered out the Eternal Blade.

The Emerald of Wisdom. The Pearl of Honor. The Baransu Ruby. The Almighty Diamond. Four stones placed in the Baransu Realm — and a fifth, the Opal of Strength, sealed in the Shadow Realm with Khaonai himself. Gather the four. Wield them as one. The Eternal Blade would carry power enough to tear open the door between realms. Free Khaonai. Add the fifth. Wield the weapon in its true form. That was always the plan.

Before Kurogami and the dark ones could begin their hunt for the gemstones, his own sister — Ryujinshi — stood in their path. The battle between them was brutal and bloody. In the end, Ryujinshi prevailed. Heartbroken, she vanished into the underground lava tubes of the eastern Baransu coast, swearing to protect the Blade with her life.

The Double Prophecy speaks of two ends. One from the bloodline of Tenebris will wield the Blade as it was forged — to free Khaonai and bring chaos and destruction across all realms. The other, a direct descendant of Sensei Murakai, born of pure heart and chosen by the Almighty, will gather the four stones of Baransu, wield the Blade, and turn its darkness to light — breaking the curse, restoring balance, freeing all people from the Whisper's grasp without ever unsealing the Shadow Realm.

The blade does not choose its wielder. The wielder chooses themselves.`,
      power_description:
        "Wields the five gemstones of the Almighty. In dark hands, the four Baransu stones tear open the Shadow Realm and complete the weapon with the Opal — chaos and destruction across all realms. In the hands of the Chosen, the four are wielded with restraint — turning the Blade's darkness to light, breaking ancient curses, restoring balance without ever freeing Khaonai.",
    },
  },
  {
    table: "artifacts",
    id: "5e5a1183-6d0e-484e-8311-c825bb550cf6",
    label: "Opal of Strength",
    fields: {
      description:
        "The gemstone of strength, sealed in the Shadow Realm with Khaonai. Beyond mortal reach — by the Almighty's design.",
      lore_content: `The Almighty gave the Opal of Strength to the Robur — the Undying Ones who bore his strength. It was meant to be a gift, a channel for power used in service and protection. Then Khaonai happened.

When the Robur rose with him in rebellion and were banished to the Shadow Realm, the Almighty made a choice. He sent the Opal in with them.

Not as punishment. As containment.

The Opal of Strength is the most dangerous of the five gemstones — raw power without wisdom, without honor, without the anchor of the Almighty's nature. In the wrong hands it could reshape a battlefield; in the wrong heart it could corrupt anything the wielder touched. So the Almighty placed it where the door between realms would seal it away. No mortal would carry that power. No corruption would spread from its hand.

But the Whisper found a way around that. Kurogami, the cursed dragon-blacksmith, forged the Eternal Blade to gather the four gemstones still in Baransu — knowing that wielding the four together would carry power enough to tear open the door to the Shadow Realm itself. And on the other side of that door, Khaonai waited. The Opal in his keeping. The Blade nearly complete.

Free Khaonai. Add the fifth. Wield the weapon in its true form.

That was always the plan.`,
      origin_story:
        "Given by the Almighty to the Robur — the Undying Ones who bore his strength. After Khaonai's rebellion, sealed by the Almighty in the Shadow Realm with the banished Robur, so that its corrupting power could touch no other heart in the Baransu Realm. It is held by Khaonai now.",
      power_description:
        "Channels the raw strength of the Robur — the most physical and destructive of the Almighty's gifts. The fifth and forbidden gemstone of the Eternal Blade. Locked in the Shadow Realm with Khaonai, beyond any mortal hand.",
    },
  },
  {
    table: "prophecies",
    id: "5b63e9dc-b83b-4d59-b18a-9b4ac982911e",
    label: "Double Prophecy of the Eternal Blade",
    fields: {
      interpretation: `The prophecy is called "double" for a reason — it doesn't promise a hero. It promises a choice between two people from two bloodlines, and the outcome has never been guaranteed.

The dark side: a direct descendant of Turkan — the man who became Tenebris — consumed by rage and pain, will gather the four gemstones placed in Baransu and wield the Eternal Blade to tear open the door to the Shadow Realm. Khaonai walks free. The fifth stone, the Opal of Strength, is added. The weapon stands complete. Everything breaks.

The light side: a direct descendant of Sensei Murakai, born to royal blood and a pure heart, will win the favor of the Undying Ones, gather the same four Baransu gemstones, and wield the same Blade — but in restraint. The Opal remains where the Almighty sealed it. The door stays shut. Khaonai stays bound. The Blade's darkness turns to light. The Whisper's hold breaks. Balance is restored without buying it at the cost of the world.

The scroll was carried from the Tenshi Prophets of the Desert of Setra by Kilian, who had kept it as his most guarded secret. When he revealed it to the Light Walker Clan, they recognized both sides of it immediately. The light side named Emerald. The dark side pointed to Kage — a Light Walker turned to darkness after losing everything.

The prophecy was always a coin. What side will it land on, if any at all?`,
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
