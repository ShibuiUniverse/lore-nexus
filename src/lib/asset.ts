// Resolves a static asset URL against Vite's base path so the same code works
// in dev (BASE_URL = "/") and in the path-based prod deploy (BASE_URL = "/lorekeeper/").
// Use for runtime references to anything in /public — `<source src>`, `playMusic`,
// `preloadMusic`, etc. Tags written into index.html and ESM `import` URLs are
// already handled by Vite, so they don't need this helper.
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
