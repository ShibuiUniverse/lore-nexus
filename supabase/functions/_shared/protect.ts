// Shared protection utilities for Shibui public-facing Edge Functions
// Rate limit keys use prefix "shibui:" to avoid collisions with Realmweaver ("rw:")

const ALLOWED_ORIGINS = [
  "https://shibuiuniverse.com",
  "https://www.shibuiuniverse.com",
  "https://lorekeeper.shibuiuniverse.com",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5173",
];

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_ITEMS  = 10;
const RATE_LIMIT         = 20;   // requests per window
const RATE_WINDOW_SEC    = 60;   // 1 minute

// ── Origin check ─────────────────────────────────────────────────────────────
// In production (Upstash configured) unknown origins are blocked.
// In dev (no Upstash) the check is skipped so curl testing still works.
export function checkOrigin(req: Request, isProduction: boolean): boolean {
  if (!isProduction) return true;
  const origin = req.headers.get("origin");
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

// ── Input validation ──────────────────────────────────────────────────────────
export function validateInput(
  message: unknown,
  history: unknown
): { valid: boolean; error?: string } {
  if (!message || typeof message !== "string") {
    return { valid: false, error: "message is required" };
  }
  if (message.trim().length === 0) {
    return { valid: false, error: "message cannot be empty" };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `message too long (max ${MAX_MESSAGE_LENGTH} characters)` };
  }
  if (history !== undefined && history !== null && !Array.isArray(history)) {
    return { valid: false, error: "history must be an array" };
  }
  return { valid: true };
}

// ── Sanitize history ──────────────────────────────────────────────────────────
export function safeHistory(history: unknown): { role: string; content: string }[] {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-MAX_HISTORY_ITEMS)
    .filter((m) => m && typeof m.role === "string" && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1000) }));
}

// ── IP-based rate limiter (Upstash Redis REST API) ────────────────────────────
// Fixed window: shibui:ip:{endpoint}:{ip} → count, TTL = RATE_WINDOW_SEC
// Returns { allowed, retryAfter? }
export async function checkRateLimit(
  req: Request,
  endpoint: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const redisUrl   = Deno.env.get("UPSTASH_REDIS_REST_URL");
  const redisToken = Deno.env.get("UPSTASH_REDIS_REST_TOKEN");

  // No Redis configured → dev mode, allow through with a warning
  if (!redisUrl || !redisToken) {
    console.warn(`[${endpoint}] Upstash not configured — rate limiting disabled`);
    return { allowed: true };
  }

  const ip  = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "127.0.0.1";
  const key = `shibui:ip:${endpoint}:${ip}`;

  const headers = { Authorization: `Bearer ${redisToken}` };

  try {
    // Increment counter
    const incrRes  = await fetch(`${redisUrl}/incr/${key}`, { headers });
    const incrData = await incrRes.json();
    const count    = incrData.result as number;

    // Set TTL only on first hit (avoids resetting window on every request)
    if (count === 1) {
      await fetch(`${redisUrl}/expire/${key}/${RATE_WINDOW_SEC}`, { headers });
    }

    if (count > RATE_LIMIT) {
      const ttlRes  = await fetch(`${redisUrl}/ttl/${key}`, { headers });
      const ttlData = await ttlRes.json();
      const retryAfter = Math.max(1, ttlData.result as number);
      console.warn(`[${endpoint}] Rate limit exceeded for IP ${ip} — retry in ${retryAfter}s`);
      return { allowed: false, retryAfter };
    }

    return { allowed: true };
  } catch (err) {
    // Redis error → fail open (don't block users if Redis is down)
    console.error(`[${endpoint}] Rate limiter error:`, err);
    return { allowed: true };
  }
}
