# Shibui Lorekeeper Proxy Worker

Reverse proxy that serves the Lorekeeper React app at
`shibuiuniverse.com/lorekeeper/*`. Strips the `/lorekeeper` prefix and
forwards to the Cloudflare Pages deployment that hosts the built React app.

```
[shibuiuniverse.com] → Cloudflare DNS → CF Worker (this)
                                          └─ /lorekeeper/* → Pages (React app)
[shibuiuniverse.com/* (everything else)] → Webflow (untouched)
```

## First-time setup

1. **Deploy the React app to Cloudflare Pages**
   - Cloudflare dashboard → Workers & Pages → Create → Pages → connect this repo
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Note the resulting URL (e.g. `https://shibui-lorekeeper.pages.dev`)

2. **Update `wrangler.toml`** if the Pages URL is anything other than
   `https://shibui-lorekeeper.pages.dev`:
   ```toml
   [vars]
   LOREKEEPER_HOST = "https://YOUR-PAGES-URL.pages.dev"
   ```

3. **Install + deploy this worker**
   ```bash
   cd cloudflare-worker
   npm install
   npm run deploy
   ```

4. **Verify the route binding**
   ```bash
   npx wrangler deployments list
   ```
   The route `shibuiuniverse.com/lorekeeper*` should show as bound.

5. **Test in production**
   - `https://shibuiuniverse.com/lorekeeper` → loader → home
   - `https://shibuiuniverse.com/lorekeeper/stories/the-mark-of-a-traitor` → story detail
   - `https://shibuiuniverse.com/og-image.jpg` proxies through Pages

## Subsequent deploys

The React app redeploys automatically on every push to `main` (via the
Pages GitHub integration). The Worker only needs redeploying when this
folder changes:

```bash
cd cloudflare-worker
npm run deploy
```

## Future: per-page social previews

Twitter, Facebook, and LinkedIn don't execute JavaScript, so client-side
meta updates can't change OG tags per-route. The Worker is the natural
place to do this: detect the URL pattern (e.g. `/lorekeeper/stories/:id`),
fetch the entity from Supabase, and stream-rewrite the upstream HTML to
inject proper `og:title` / `og:description` / `og:image`. Tracked as a
TODO comment in `src/index.ts`.

## Useful commands

```bash
npm run dev      # Local worker dev server (proxies to LOREKEEPER_HOST)
npm run tail     # Stream live logs from the deployed worker
npm run deploy   # Push current code to production
```
