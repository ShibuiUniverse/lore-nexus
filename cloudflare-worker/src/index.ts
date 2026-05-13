// shibui-lorekeeper-proxy
//
// Reverse-proxies shibuiuniverse.com/lorekeeper/* to the Lorekeeper React
// app's Cloudflare Pages deployment. The /lorekeeper prefix is stripped
// before forwarding so the Pages site can serve from its root, then Vite's
// `base: '/lorekeeper/'` keeps the public-facing URLs prefixed in HTML.
//
// Routing for paths NOT matching /lorekeeper* is not this worker's job —
// the wrangler.toml route binds only to that pattern, so other paths flow
// through to the configured origin (the Webflow marketing site) without
// passing through here at all.

interface Env {
  LOREKEEPER_HOST: string;
}

const PREFIX = "/lorekeeper";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const upstreamPath = url.pathname.startsWith(PREFIX)
      ? url.pathname.slice(PREFIX.length) || "/"
      : url.pathname;

    const upstreamUrl = new URL(upstreamPath + url.search, env.LOREKEEPER_HOST);

    // TODO: per-page social previews
    // For /lorekeeper/stories/:id, /lorekeeper/characters/:id, etc., fetch
    // the entity from Supabase and stream-rewrite the upstream HTML to
    // inject route-specific og:title / og:description / og:image tags so
    // Twitter/Facebook/LinkedIn previews show the right content. Crawlers
    // don't execute JS, so client-side meta updates won't help — this is
    // the right place to do it.

    return fetch(new Request(upstreamUrl.toString(), request));
  },
};
