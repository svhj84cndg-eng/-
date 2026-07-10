import { getMovies } from '@/lib/movies';
import { movieUrl } from '@/lib/urls';

export async function GET() {
  const movies = await getMovies();

  const host = process.env.NEXT_PUBLIC_SITE_URL ?? '';

  const urls = movies
    .map((m) => {
      const loc = host ? movieUrl(m.id, host) : movieUrl(m.id);
      return `<url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
