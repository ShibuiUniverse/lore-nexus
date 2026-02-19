/**
 * Import Supabase CSV exports back into the database.
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env
 *
 * Usage: node scripts/import-csv.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EXPORT_DIR = `${process.env.HOME}/Downloads/supabase export`;

if (!SERVICE_ROLE_KEY) {
  console.error("❌  SUPABASE_SERVICE_ROLE_KEY is missing from .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Import order respects foreign key dependencies
const IMPORT_ORDER = [
  "eras",
  "locations",
  "people_groups",
  "characters",
  "timeline_events",
  "artifacts",
  "prophecies",
  "stories",
  "character_events",
  "character_people_groups",
  // Skip profiles + user_roles — user IDs won't match the new auth account
];

function parseCSV(filePath) {
  const raw = readFileSync(filePath, "utf-8");

  // Parse the entire file character-by-character to handle multi-line quoted fields
  const rows = [];
  let current = "";
  let inQuotes = false;
  let fields = [];

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const next = raw[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        // Escaped quote inside a quoted field
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ";" && !inQuotes) {
      fields.push(current);
      current = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      // Skip \r in \r\n line endings
      if (ch === "\r" && next === "\n") continue;
      fields.push(current);
      current = "";
      if (fields.some((f) => f !== "") || rows.length === 0) {
        rows.push(fields);
      }
      fields = [];
    } else {
      current += ch;
    }
  }
  // Push last field/row
  if (current || fields.length) {
    fields.push(current);
    if (fields.some((f) => f !== "")) rows.push(fields);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim());

  return rows.slice(1).map((values) => {
    const row = {};
    headers.forEach((h, i) => {
      const val = values[i] ?? "";
      if (val === "") {
        row[h] = null;
      } else if (val === "true") {
        row[h] = true;
      } else if (val === "false") {
        row[h] = false;
      } else {
        row[h] = val;
      }
    });
    return row;
  });
}

function findCSV(tableName) {
  const files = readdirSync(EXPORT_DIR);
  const match = files.find((f) => f.startsWith(`${tableName}-export`));
  return match ? join(EXPORT_DIR, match) : null;
}

async function importTable(tableName) {
  const csvPath = findCSV(tableName);
  if (!csvPath) {
    console.log(`⚠️  No CSV found for ${tableName} — skipping`);
    return;
  }

  const rows = parseCSV(csvPath);
  if (rows.length === 0) {
    console.log(`⚪  ${tableName}: empty, skipping`);
    return;
  }

  // Upsert in batches of 100 to avoid request size limits
  const BATCH = 100;
  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase
      .from(tableName)
      .upsert(batch, { onConflict: "id" });

    if (error) {
      console.error(`❌  ${tableName} batch ${i}-${i + BATCH}:`, error.message);
      return;
    }
    inserted += batch.length;
  }

  console.log(`✅  ${tableName}: ${inserted} rows imported`);
}

async function main() {
  console.log("🚀  Starting import...\n");

  for (const table of IMPORT_ORDER) {
    await importTable(table);
  }

  console.log("\n✨  Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
