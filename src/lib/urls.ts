export function moviePath(id: number | string) {
  return `/movie/${id}`;
}

export function movieUrl(id: number | string, origin?: string) {
  const base = origin ?? process.env.NEXT_PUBLIC_SITE_URL ?? '';
  if (!base) return moviePath(id);
  return `${base.replace(/\/$/, '')}${moviePath(id)}`;
}

export default { moviePath, movieUrl };
