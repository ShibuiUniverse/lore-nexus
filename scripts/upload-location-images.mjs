// Upload location art to Supabase storage and wire URLs into the locations table.
//
// Run: node --env-file=.env scripts/upload-location-images.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync, statSync, mkdtempSync } from "node:fs";
import { execSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, basename, extname } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(URL, KEY);

const SRC_DIR = "/Users/shibuilabs/projects/lore-nexus/images-to-upload/locations";
const BUCKET = "lore-images";
const RESIZE_THRESHOLD_BYTES = 3 * 1024 * 1024; // resize if > 3MB

const MANIFEST = [
  { file: "canyon-of-despaire.png",         location: "Canyon of Despair",        slug: "canyon-of-despair" },
  { file: "Citadel.png",                    location: "The Soulless Citadel",     slug: "the-soulless-citadel" },
  { file: "desert-of-setra.png",            location: "The Desert of Setra",      slug: "the-desert-of-setra" },
  { file: "forbidden-forest.png",           location: "The Forbidden Forest",     slug: "the-forbidden-forest" },
  { file: "fukushu-bay.png",                location: "Fukushū Bay",              slug: "fukushu-bay" },
  { file: "Light Walker Village new.png",   location: "Light Walker Village",     slug: "light-walker-village" },
  { file: "light-walker-old-village.jpeg",  location: "Light Walker Old Village", slug: "light-walker-old-village" },
  { file: "portal-to-realms.png",           location: "The Portal to Realms",     slug: "the-portal-to-realms" },
  { file: "upper-mountains.png",            location: "The Upper Mountains",      slug: "the-upper-mountains" },
  { file: "Zillarnia Valley.png",           location: "The Valley of Zillarnia",  slug: "the-valley-of-zillarnia" },
];

// Resolve location ids
const { data: rows, error: locErr } = await supabase.from("locations").select("id, name");
if (locErr) throw locErr;
const idByName = Object.fromEntries(rows.map((r) => [r.name, r.id]));

const unresolved = MANIFEST.filter((m) => !idByName[m.location]);
if (unresolved.length) {
  console.error("\n[fatal] unresolved location names:");
  for (const m of unresolved) console.error(`  - ${m.location} (file: ${m.file})`);
  console.error("\nKnown locations:", rows.map((r) => r.name).join(", "));
  process.exit(1);
}

const tmp = mkdtempSync(join(tmpdir(), "loc-"));

for (const item of MANIFEST) {
  const localPath = join(SRC_DIR, item.file);
  const ext = extname(item.file).toLowerCase();
  const objExt = ext === ".jpeg" ? ".jpg" : ext;
  const objPath = `locations/${item.slug}${objExt}`;
  const contentType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

  // Resize if file is too large
  let sourcePath = localPath;
  const size = statSync(localPath).size;
  if (size > RESIZE_THRESHOLD_BYTES) {
    sourcePath = join(tmp, basename(item.file));
    execSync(`cp ${JSON.stringify(localPath)} ${JSON.stringify(sourcePath)}`);
    execSync(`sips --resampleWidth 1920 ${JSON.stringify(sourcePath)}`, { stdio: "ignore" });
    const newSize = statSync(sourcePath).size;
    console.log(`  · resized ${item.file}: ${(size / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024 / 1024).toFixed(1)}MB`);
  }

  const buf = readFileSync(sourcePath);
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(objPath, buf, { contentType, upsert: true, cacheControl: "3600" });
  if (upErr) {
    console.error(`  ✗ ${item.location}: upload failed — ${upErr.message}`);
    continue;
  }
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(objPath);
  const { error: pErr } = await supabase.from("locations").update({ image_url: publicUrl }).eq("id", idByName[item.location]);
  if (pErr) {
    console.error(`  ✗ ${item.location}: patch failed — ${pErr.message}`);
    continue;
  }
  console.log(`  ✓ ${item.location.padEnd(30)} → ${item.slug}${objExt}`);
}

const { data: stillMissing } = await supabase
  .from("locations")
  .select("name")
  .is("image_url", null)
  .order("sort_order", { ascending: true });
if (stillMissing && stillMissing.length) {
  console.log(`\nStill missing images (${stillMissing.length}):`);
  for (const r of stillMissing) console.log(`  - ${r.name}`);
}
