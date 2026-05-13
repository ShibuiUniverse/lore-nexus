// Upload people group art to Supabase storage and wire URLs into the
// people_groups table.
//
// Run: node --env-file=.env scripts/upload-people-group-images.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { join, extname } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing env (need VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");

const supabase = createClient(URL, KEY);

const SRC_DIR = "/Users/shibuilabs/projects/lore-nexus/images-to-upload/people_groups";
const BUCKET  = "lore-images";

const MANIFEST = [
  { file: "darkones.png",             slug: "the-dark-ones",        peoples: ["The Dark Ones"] },
  { file: "Kubu People.jpeg",         slug: "kubu-people",          peoples: ["Kubu People"] },
  { file: "lacus.jpg",                slug: "lacus-people",         peoples: ["Lacus People"] },
  { file: "light-walkers.png",        slug: "light-walker-clan",    peoples: ["Light Walker Clan"] },
  { file: "montes.jpg",               slug: "montes-giants",        peoples: ["Montes Giants"] },
  { file: "novus.jpg",                slug: "novus-people",         peoples: ["Novus People"] },
  { file: "pirates-fukushu.png",      slug: "pirates-of-fukushu",   peoples: ["Pirates of Fukushū"] },
  { file: "rogue-navy.png",           slug: "rogue-navy",           peoples: ["Rogue Navy"] },
  { file: "soulless.png",             slug: "the-soulless",         peoples: ["The Soulless"] },
  { file: "tenshi.png",               slug: "tenshi-clan",          peoples: ["Tenshi Clan"] },
  { file: "undying-ones.jpg",         slug: "undying-ones",         peoples: ["Undying Ones"] },
  { file: "vane's-dark-pirates.png",  slug: "vanes-dark-pirates",   peoples: ["Vane's Dark Pirates"] },
];

const contentTypeFor = (file) => {
  const ext = extname(file).toLowerCase();
  if (ext === ".png")  return "image/png";
  if (ext === ".webp") return "image/webp";
  return "image/jpeg";
};

const { data: rows, error: pgErr } = await supabase.from("people_groups").select("id, name");
if (pgErr) throw pgErr;
const idByName = Object.fromEntries(rows.map((r) => [r.name, r.id]));

const wanted = [...new Set(MANIFEST.flatMap((m) => m.peoples))];
const unresolved = wanted.filter((n) => !idByName[n]);
if (unresolved.length) {
  console.error("\n[fatal] unresolved people group names:");
  for (const n of unresolved) console.error(`  - ${n}`);
  process.exit(1);
}

const results = { uploaded: 0, patched: 0, failed: 0 };

for (const item of MANIFEST) {
  const localPath = join(SRC_DIR, item.file);
  const ext       = extname(item.file).toLowerCase();
  const objPath   = `people_groups/${item.slug}${ext}`;

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

  for (const name of item.peoples) {
    const { error: patchErr } = await supabase
      .from("people_groups")
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

console.log(`\nUploaded: ${results.uploaded} files | Patched: ${results.patched} peoples | Failed: ${results.failed}`);
