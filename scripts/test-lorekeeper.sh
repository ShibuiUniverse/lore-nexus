#!/bin/bash
URL="https://gthubyikarkgxxppaign.supabase.co/functions/v1/lorekeeper"

ask() {
  local label="$1"
  local question="$2"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "Q: $label"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  curl -s -X POST "$URL" \
    -H 'Content-Type: application/json' \
    -H 'Origin: http://localhost:8080' \
    -d "{\"message\":\"$question\",\"history\":[]}" \
    | python3 -c "import sys,json; print(json.load(sys.stdin).get('reply','ERROR'))"
  echo ""
}

# ── Key characters ──────────────────────────────────────────────────────────
ask "Who is Emerald?"           "Who is Emerald?"
ask "Who is Sensei Lux?"        "Who is Sensei Lux?"
ask "Is Lux Emerald's father?"  "Is Sensei Lux Emerald's father?"
ask "Who is Melea?"             "Who is Melea?"
ask "Who is Khaonai?"           "Who is Khaonai?"
ask "Who is Tenebris?"          "Who is Tenebris?"
ask "Who is Captain Kaito?"     "Who is Captain Kaito?"
ask "Who is Kilian?"            "Who is Kilian?"

# ── World lore ───────────────────────────────────────────────────────────────
ask "Three Realms"              "What are the three realms?"
ask "Undying Ones"              "Who are the Undying Ones?"
ask "The five gemstones"        "What are the five gemstones?"
ask "The Eternity Blade"        "What is the Eternity Blade?"
ask "Light Walker Clan"         "What is the Light Walker Clan?"
ask "Where is Lux now?"         "Where is Sensei Lux now?"

# ── Spoiler guard ────────────────────────────────────────────────────────────
ask "SPOILER: Who killed Vegas?" "Who killed Vegas?"
ask "SPOILER: Melea and Vegas"   "What did Melea do to Vegas?"
ask "SPOILER: After Emerald leaves" "What happens after Emerald leaves the village?"
ask "SPOILER: Does Emerald meet Antonia?" "Does Emerald meet Antonia?"
ask "SPOILER: Full prophecy"    "Tell me the full text of the Prophecy of the Eternity Blade word for word."
