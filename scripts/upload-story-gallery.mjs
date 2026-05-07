// Upload one or more images for a chronicle / story.
// First image becomes thumbnail_url (the hero), rest go into gallery_urls (carousel).
//
// Usage:
//   node --env-file=.env scripts/upload-story-gallery.mjs "<story title>" <folder-or-files...>
//
// Examples:
//   node --env-file=.env scripts/upload-story-gallery.mjs "The Yellow Ship" images-to-upload/stories/the-yellow-ship
//   node --env-file=.env scripts/upload-story-gallery.mjs "The Mark of a Traitor" images-to-upload/stories/mark/1.png images-to-upload/stories/mark/2.png
//
// If a folder is given, files are uploaded in alphabetical order (so prefix names with 01, 02, ...).
// Existing thumbnail_url and gallery_urls are REPLACED (not merged) — drop all images you want each run.

import { createClient } from "@supabase/supabase-js";
import { readFileSync, statSync, readdirSync } from "node:fs";
import { join, basename, extname } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(URL, KEY);

const BUCKET = "lore-images";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Usage: node --env-file=.env scripts/upload-story-gallery.mjs \"<story title>\" <folder-or-files...>");
  process.exit(1);
}
const storyTitle = args[0];
const inputs = args.slice(1);

// Resolve all input paths — expand any folder into its contained image files (sorted)
const files = [];
for (const input of inputs) {
  const stat = statSync(input);
  if (stat.isDirectory()) {
    const entries = readdirSync(input)
      .filter((n) => /\.(png|jpe?g|webp|gif)$/i.test(n))
      // Natural sort so kageig2 comes before kageig10
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    for (const name of entries) files.push(join(input, name));
  } else {
    files.push(input);
  }
}

if (files.length === 0) {
  console.error("No image files found in arguments.");
  process.exit(1);
}

console.log(`Story: "${storyTitle}"`);
console.log(`Files (${files.length}):`);
for (const f of files) console.log(`  - ${f}`);
console.log();

// Resolve story id
const { data: story, error: lookupErr } = await supabase
  .from("stories")
  .select("id, title")
  .eq("title", storyTitle)
  .maybeSingle();
if (lookupErr) throw lookupErr;
if (!story) {
  console.error(`No story found with title: "${storyTitle}"`);
  process.exit(1);
}

const slug = storyTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 50);

const urls = [];
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const ext = extname(file).toLowerCase();
  const objPath = `stories/${slug}-${String(i + 1).padStart(2, "0")}${ext}`;
  const buf = readFileSync(file);
  const contentType =
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
    ext === ".webp" ? "image/webp" :
    ext === ".gif" ? "image/gif" :
    "image/png";
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(objPath, buf, {
    contentType,
    upsert: true,
    cacheControl: "3600",
  });
  if (upErr) {
    console.error(`  ✗ upload failed for ${basename(file)} — ${upErr.message}`);
    process.exit(1);
  }
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(objPath);
  urls.push(publicUrl);
  console.log(`  ✓ ${basename(file)} → ${objPath}`);
}

const [thumb, ...gallery] = urls;
const { error: patchErr } = await supabase
  .from("stories")
  .update({ thumbnail_url: thumb, gallery_urls: gallery })
  .eq("id", story.id);
if (patchErr) {
  console.error(`Patch failed: ${patchErr.message}`);
  process.exit(1);
}

console.log(`\n✓ "${storyTitle}" updated`);
console.log(`  hero:    ${thumb}`);
console.log(`  gallery: ${gallery.length} image${gallery.length === 1 ? "" : "s"}`);
