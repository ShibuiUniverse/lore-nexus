// Upload character art to Supabase storage and wire URLs into the characters table.
//
// Run: node --env-file=.env scripts/upload-character-images.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing env");

const supabase = createClient(URL, KEY);

const SRC_DIR = "/Users/shibuilabs/projects/lore-nexus/images-to-upload/characters";
const BUCKET = "lore-images";

// File-to-character manifest. For characters with multiple files, the canonical pick is below.
const MANIFEST = [
  { file: "allmighty_humanform.png",         character: "The Almighty",            slug: "the-almighty" },
  { file: "antonia-1.png",                   character: "Captain Antonia",         slug: "captain-antonia" },
  { file: "captain-vane-complete.png",       character: "Captain Vane",            slug: "captain-vane" },
  { file: "Davie.png",                       character: "Captain Davie",           slug: "captain-davie" },
  { file: "emerald-2.png",                   character: "Emerald Lux",             slug: "emerald-lux" },
  { file: "grummel-2.png",                   character: "Grummel",                 slug: "grummel" },
  { file: "julius.png",                      character: "Captain Graydon Julius",  slug: "captain-graydon-julius" },
  { file: "kage.png",                        character: "Kage Akatsuki",           slug: "kage-akatsuki" },
  { file: "kaito.png",                       character: "Kaito",                   slug: "kaito" },
  { file: "Khaonai-concept.png",             character: "Khaonai",                 slug: "khaonai" },
  { file: "kilian.png",                      character: "Kilian Hikari",           slug: "kilian-hikari" },
  { file: "lux-main.png",                    character: "Sensei Lux",              slug: "sensei-lux" },
  { file: "melea.png",                       character: "Melea Lux",               slug: "melea-lux" },
  { file: "queen aurelia.png",               character: "The Lacus Queen",         slug: "the-lacus-queen" },
  { file: "vi.png",                          character: "Vi Lux",                  slug: "vi-lux" },
];

// ── 1. Resolve character ids ──────────────────────────────────────────────────
const { data: chars, error: charErr } = await supabase
  .from("characters")
  .select("id, name");
if (charErr) throw charErr;
const idByName = Object.fromEntries(chars.map((c) => [c.name, c.id]));

// Pre-flight: verify every manifest entry resolves to a character row
const unresolved = MANIFEST.filter((m) => !idByName[m.character]);
if (unresolved.length) {
  console.error("\n[fatal] unresolved character names:");
  for (const m of unresolved) console.error(`  - ${m.character} (file: ${m.file})`);
  console.error("\nKnown character names:");
  for (const c of chars) console.error(`  - ${c.name}`);
  process.exit(1);
}

// ── 2. Upload + patch ────────────────────────────────────────────────────────
const results = { uploaded: 0, patched: 0, failed: 0 };

for (const item of MANIFEST) {
  const charId = idByName[item.character];
  const localPath = join(SRC_DIR, item.file);
  const objPath = `characters/${item.slug}.png`;

  // Read file
  let fileBuffer;
  try {
    fileBuffer = readFileSync(localPath);
  } catch (err) {
    console.error(`  ✗ ${item.character}: read failed ${item.file} — ${err.message}`);
    results.failed += 1;
    continue;
  }

  // Upload (upsert in case we re-run)
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(objPath, fileBuffer, {
      contentType: "image/png",
      upsert: true,
      cacheControl: "3600",
    });
  if (upErr) {
    console.error(`  ✗ ${item.character}: upload failed — ${upErr.message}`);
    results.failed += 1;
    continue;
  }
  results.uploaded += 1;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(objPath);

  // Patch character record
  const { error: patchErr } = await supabase
    .from("characters")
    .update({ image_url: publicUrl })
    .eq("id", charId);
  if (patchErr) {
    console.error(`  ✗ ${item.character}: patch failed — ${patchErr.message}`);
    results.failed += 1;
    continue;
  }
  results.patched += 1;
  console.log(`  ✓ ${item.character.padEnd(28)} → ${item.slug}.png`);
}

console.log(`\n── Summary ──`);
console.log(`  uploaded:    ${results.uploaded}`);
console.log(`  patched:     ${results.patched}`);
console.log(`  failed:      ${results.failed}`);

// ── 3. Show characters still without images ──────────────────────────────────
const { data: stillMissing } = await supabase
  .from("characters")
  .select("name")
  .is("image_url", null)
  .order("sort_order", { ascending: true });
if (stillMissing && stillMissing.length) {
  console.log(`\nStill missing images (${stillMissing.length}):`);
  for (const c of stillMissing) console.log(`  - ${c.name}`);
}
