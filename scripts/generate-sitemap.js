const fs = require('fs');
const path = require('path');

const downloads = path.join(process.env.HOME || '', 'Downloads', 'movies.json');
const fallback = path.join(process.cwd(), 'public', 'movies.json');

function readMovies() {
  const file = fs.existsSync(downloads) ? downloads : fallback;
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw);
}

function moviePath(id) { return `/movie/${id}`; }

function movieUrl(id, host) {
  const base = host || process.env.NEXT_PUBLIC_SITE_URL || '';
  if (!base) return moviePath(id);
  return `${base.replace(/\/$/, '')}${moviePath(id)}`;
}

function build() {
  const movies = readMovies();
  const host = process.env.NEXT_PUBLIC_SITE_URL || '';
  const urls = movies.map(m => {
    const loc = host ? movieUrl(m.id, host) : movieUrl(m.id);
    return `<url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  const out = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, xml, 'utf8');
  console.log('Wrote', out);
}

if (require.main === module) build();

module.exports = { build };
