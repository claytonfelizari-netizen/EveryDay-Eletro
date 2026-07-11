const SITE_BASE_PATH = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";

export function withSiteBasePath(path) {
  if (!path) return path;
  if (!SITE_BASE_PATH) return path;
  if (path.startsWith(SITE_BASE_PATH)) return path;
  if (!path.startsWith("/")) return `${SITE_BASE_PATH}/${path}`;
  return `${SITE_BASE_PATH}${path}`;
}
