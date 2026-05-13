// Walk the lore-images bucket. Any object > 500KB gets downloaded,
// re-encoded as JPEG at quality 80, and resized to a max 1600px on the
// longer side. The compressed version overwrites the original (or replaces
// it under a .jpg extension if the original was .png/.webp). Any DB row
// (across all 6 tables that hold image_url, plus stories.gallery_urls)
// that referenced the old URL is patched to the new one. Old objects are
// then removed from storage.
//
// Idempotent across reruns: if a file is already smaller than the threshold
// or if compression would actually make it bigger, it's left alone.
//
// Run: node --env-file=.env scripts/compress-storage-images.mjs

import { createClient } from "@supabase/supabase-js";
import { execSync } from "node:child_process";
import { writeFileSync, readFileSync, mkdirSync, statSync } from "node:fs";
import { extname, basename } from "node:path";

const URL = process.env.VITE_SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) throw new Error("Missing env (need VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)");

const supabase = createClient(URL, KEY);
const BUCKET = "lore-images";
const FOLDERS = ["artifacts", "characters", "locations", "people_groups", "prophecies", "stories"];
const SIZE_THRESHOLD = 500 * 1024;   // 500KB
const MAX_DIMENSION  = 1600;
const QUALITY        = 80;
const TMP_DIR        = "/tmp/compress-storage";
mkdirSync(TMP_DIR, { recursive: true });

// Tables with image_url columns + stories.thumbnail_url + stories.gallery_urls
const SCHEMA = [
  { table: "characters",    fields: ["image_url"] },
  { table: "locations",     fields: ["image_url"] },
  { table: "artifacts",     fields: ["image_url"] },
  { table: "people_groups", fields: ["image_url"] },
  { table: "prophecies",    fields: ["image_url"] },
  { table: "stories",       fields: ["thumbnail_url"], arrayFields: ["gallery_urls"] },
];

const stats = { scanned: 0, skipped: 0, compressed: 0, totalSavedKB: 0, dbPatched: 0, oldDeleted: 0 };

for (const folder of FOLDERS) {
  console.log(`\n=== ${folder} ===`);
  const { data: objects, error } = await supabase.storage.from(BUCKET).list(folder, { limit: 500 });
  if (error) { console.error(`  list error: ${error.message}`); continue; }

  for (const obj of objects || []) {
    if (obj.id === null) continue; // sub-folder marker
    const oldPath = `${folder}/${obj.name}`;
    const sizeBytes = obj.metadata?.size || 0;
    stats.scanned += 1;

    if (sizeBytes < SIZE_THRESHOLD) {
      stats.skipped += 1;
      continue;
    }

    // Download
    const { data: blob, error: dlErr } = await supabase.storage.from(BUCKET).download(oldPath);
    if (dlErr) { console.error(`  ✗ ${obj.name}: download — ${dlErr.message}`); continue; }
    const inExt = extname(obj.name).toLowerCase() || ".bin";
    const stem  = basename(obj.name, inExt);
    const tmpIn  = `${TMP_DIR}/in-${stem}${inExt}`;
    const tmpOut = `${TMP_DIR}/out-${stem}.jpg`;
    writeFileSync(tmpIn, Buffer.from(await blob.arrayBuffer()));

    // Compress: resize to fit 1600 on longer side + jpeg q80
    try {
      execSync(`sips -Z ${MAX_DIMENSION} -s format jpeg -s formatOptions ${QUALITY} "${tmpIn}" --out "${tmpOut}"`, { stdio: "pipe" });
    } catch (e) {
      console.error(`  ✗ ${obj.name}: sips failed — ${e.message.slice(0, 100)}`);
      continue;
    }

    const newSize = statSync(tmpOut).size;
    if (newSize >= sizeBytes) {
      console.log(`  · ${obj.name}: compression no help (${(sizeBytes/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB) — left alone`);
      stats.skipped += 1;
      continue;
    }

    // Upload as .jpg
    const newPath = `${folder}/${stem}.jpg`;
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(newPath, readFileSync(tmpOut), {
      contentType: "image/jpeg",
      upsert: true,
      cacheControl: "3600",
    });
    if (upErr) { console.error(`  ✗ ${obj.name}: upload — ${upErr.message}`); continue; }

    const { data: { publicUrl: newUrl } } = supabase.storage.from(BUCKET).getPublicUrl(newPath);
    const { data: { publicUrl: oldUrl } } = supabase.storage.from(BUCKET).getPublicUrl(oldPath);

    // Patch DB references if URL changed (ext changed)
    if (newPath !== oldPath) {
      for (const { table, fields, arrayFields } of SCHEMA) {
        for (const field of fields) {
          const { data: rows } = await supabase.from(table).select("id").eq(field, oldUrl);
          for (const row of rows || []) {
            await supabase.from(table).update({ [field]: newUrl }).eq("id", row.id);
            stats.dbPatched += 1;
          }
        }
        for (const arrField of (arrayFields || [])) {
          const { data: rows } = await supabase.from(table).select(`id, ${arrField}`).contains(arrField, [oldUrl]);
          for (const row of rows || []) {
            const newArr = row[arrField].map((u) => u === oldUrl ? newUrl : u);
            await supabase.from(table).update({ [arrField]: newArr }).eq("id", row.id);
            stats.dbPatched += 1;
          }
        }
      }

      // Delete old object
      const { error: delErr } = await supabase.storage.from(BUCKET).remove([oldPath]);
      if (!delErr) stats.oldDeleted += 1;
    }

    const savedKB = (sizeBytes - newSize) / 1024;
    stats.compressed += 1;
    stats.totalSavedKB += savedKB;
    console.log(`  ✓ ${obj.name}  ${(sizeBytes/1024).toFixed(0)}KB → ${(newSize/1024).toFixed(0)}KB  (saved ${savedKB.toFixed(0)}KB)${newPath !== oldPath ? "  [path changed]" : ""}`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Scanned:    ${stats.scanned}`);
console.log(`Compressed: ${stats.compressed}`);
console.log(`Skipped:    ${stats.skipped}`);
console.log(`Saved:      ${(stats.totalSavedKB / 1024).toFixed(1)} MB`);
console.log(`DB rows patched: ${stats.dbPatched}`);
console.log(`Old objects removed: ${stats.oldDeleted}`);
