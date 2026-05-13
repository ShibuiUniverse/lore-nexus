// Upload artifact art to Supabase storage and wire URLs into the artifacts table.
// One image can map to multiple artifacts (e.g. the three Baransu gemstones
// share emerald-opal-pearl.jpg per James, 2026-05-13).
//
// Run: node --env-file=.env scripts/upload-artifact-images.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join, extname } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing env (need VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");

const supabase = createClient(URL, KEY);

const SRC_DIR = "/Users/shibuilabs/projects/lore-nexus/images-to-upload/artifacts";
const BUCKET  = "lore-images";

// File-to-artifact manifest. `slug` becomes the storage object name.
// `artifacts` is an array — one image can serve multiple records.
const MANIFEST = [
  { file: "almighty-diamond.png",      slug: "almighty-diamond",      artifacts: ["Almighty Diamond"] },
  { file: "baransu-ruby.jpg",          slug: "baransu-ruby",          artifacts: ["Baransu Ruby"] },
  { file: "bident-of-khaonai.jpg",     slug: "bident-of-khaonai",     artifacts: ["Bident of Khaonai"] },
  { file: "emerald-opal-pearl.jpg",    slug: "emerald-opal-pearl",    artifacts: ["Emerald of Wisdom", "Opal of Strength", "Pearl of Honor"] },
  { file: "eternal-blade-concept.png", slug: "eternal-blade",         artifacts: ["The Eternal Blade"] },
  { file: "staff-of-the-almighty.png", slug: "staff-of-the-almighty", artifacts: ["Staff of the Almighty"] },
];

const contentTypeFor = (file) => extname(file).toLowerCase() === ".png" ? "image/png" : "image/jpeg";

// ── 1. Resolve artifact ids ──────────────────────────────────────────────────
const { data: rows, error: artErr } = await supabase.from("artifacts").select("id, name");
if (artErr) throw artErr;
const idByName = Object.fromEntries(rows.map((r) => [r.name, r.id]));

const wanted = [...new Set(MANIFEST.flatMap((m) => m.artifacts))];
const unresolved = wanted.filter((n) => !idByName[n]);
if (unresolved.length) {
  console.error("\n[fatal] unresolved artifact names:");
  for (const n of unresolved) console.error(`  - ${n}`);
  process.exit(1);
}

// ── 2. Upload + patch ────────────────────────────────────────────────────────
const results = { uploaded: 0, patched: 0, failed: 0 };

for (const item of MANIFEST) {
  const localPath = join(SRC_DIR, item.file);
  const ext       = extname(item.file).toLowerCase();
  const objPath   = `artifacts/${item.slug}${ext}`;

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

  for (const artifactName of item.artifacts) {
    const { error: patchErr } = await supabase
      .from("artifacts")
      .update({ image_url: publicUrl })
      .eq("id", idByName[artifactName]);
    if (patchErr) {
      console.error(`  ✗ ${artifactName}: patch failed — ${patchErr.message}`);
      results.failed += 1;
      continue;
    }
    results.patched += 1;
    console.log(`  ✓ ${artifactName} ← ${item.file}`);
  }
}

console.log(`\nUploaded: ${results.uploaded} files | Patched: ${results.patched} artifacts | Failed: ${results.failed}`);
