// Upload prophecy art to Supabase storage and wire URLs into the prophecies table.
//
// Run: node --env-file=.env scripts/upload-prophecy-images.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join, extname } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing env (need VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");

const supabase = createClient(URL, KEY);

const SRC_DIR = "/Users/shibuilabs/projects/lore-nexus/images-to-upload/prophecies";
const BUCKET  = "lore-images";

const MANIFEST = [
  { file: "double-prophecy.jpg", slug: "double-prophecy-of-the-eternal-blade", prophecies: ["The Double Prophecy of the Eternal Blade"] },
  { file: "murakai-vow.jpg",     slug: "vow-of-sensei-murakai",                prophecies: ["The Vow of Sensei Murakai"] },
  { file: "souless-citadel.jpeg", slug: "curse-of-the-soulless-citadel",       prophecies: ["The Curse of the Soulless Citadel"] },
];

const contentTypeFor = (file) => {
  const ext = extname(file).toLowerCase();
  if (ext === ".png")  return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
};

const { data: rows, error: pErr } = await supabase.from("prophecies").select("id, name");
if (pErr) throw pErr;
const idByName = Object.fromEntries(rows.map((r) => [r.name, r.id]));

const wanted = [...new Set(MANIFEST.flatMap((m) => m.prophecies))];
const unresolved = wanted.filter((n) => !idByName[n]);
if (unresolved.length) {
  console.error("\n[fatal] unresolved prophecy names:");
  for (const n of unresolved) console.error(`  - ${n}`);
  process.exit(1);
}

const results = { uploaded: 0, patched: 0, failed: 0 };

for (const item of MANIFEST) {
  const localPath = join(SRC_DIR, item.file);
  const ext       = extname(item.file).toLowerCase();
  const objPath   = `prophecies/${item.slug}${ext}`;

  let fileBuffer;
  try {
    fileBuffer = readFileSync(localPath);
  } catch (err) {
    console.error(`  ✗ ${item.file}: read failed — ${err.message}`);
    results.failed += 1;
    continue;
  }

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(objPath, fileBuffer, {
      contentType: contentTypeFor(item.file),
      upsert: true,
      cacheControl: "3600",
    });
  if (upErr) {
    console.error(`  ✗ ${item.file}: upload failed — ${upErr.message}`);
    results.failed += 1;
    continue;
  }
  results.uploaded += 1;

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(objPath);

  for (const name of item.prophecies) {
    const { error: patchErr } = await supabase
      .from("prophecies")
      .update({ image_url: publicUrl })
      .eq("id", idByName[name]);
    if (patchErr) {
      console.error(`  ✗ ${name}: patch failed — ${patchErr.message}`);
      results.failed += 1;
      continue;
    }
    results.patched += 1;
    console.log(`  ✓ ${name} ← ${item.file}`);
  }
}

console.log(`\nUploaded: ${results.uploaded} files | Patched: ${results.patched} prophecies | Failed: ${results.failed}`);
