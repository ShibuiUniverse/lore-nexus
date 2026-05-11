import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gthubyikarkgxxppaign.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHVieWlrYXJrZ3h4cHBhaWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQxNjQ5OSwiZXhwIjoyMDg2OTkyNDk5fQ.g7kVyiJjNGH4oPbmglHl8v7EPLyrEsR3phZ_ZLcNXYY";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const { data: rows, error: findErr } = await supabase
  .from("stories")
  .select("id, title, thumbnail_url, gallery_urls")
  .ilike("title", "%mark of a traitor%");

if (findErr) {
  console.error("Find failed:", findErr);
  process.exit(1);
}
if (!rows?.length) {
  console.error("No story matched 'Mark of the Traitor'.");
  process.exit(1);
}
if (rows.length > 1) {
  console.error("Multiple matches — aborting:", rows.map((r) => r.title));
  process.exit(1);
}

const story = rows[0];
console.log(`Found: "${story.title}" (${story.id})`);
console.log(`  thumbnail kept: ${story.thumbnail_url ?? "(none)"}`);
console.log(`  gallery before: ${story.gallery_urls?.length ?? 0} image(s)`);

const { error: updErr } = await supabase
  .from("stories")
  .update({ gallery_urls: [] })
  .eq("id", story.id);

if (updErr) {
  console.error("Update failed:", updErr);
  process.exit(1);
}

console.log("✓ gallery_urls cleared. Initial thumbnail remains.");
