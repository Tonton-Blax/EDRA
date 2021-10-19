import { promises } from 'fs';
import { getPosts } from './src/lib/get-posts.js'
import { website } from './src/lib/info.js'
import path from 'path';

const __dirname = path.resolve();
const sitemapFile = path.join(__dirname, 'static/sitemap.xml');


async function gensm () {
  const posts = await getPosts()
  const pages = [{url : `concept`,pri : 0.9},{url : 'mentions',pri : 0.1},{url : 'contact',pri : 0.8},{url : 'produits', pri : 0.7}]
  const body = sitemap(posts, pages)
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  }
  return body;
  /*
  return {
    headers,
    body,
  }
  */
}

const sitemap = (
  posts,
  pages
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${website}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  ${pages
    .map(
      page => `
  <url>
    <loc>${website}/${page.url}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page.pri}</priority>
  </url>
  `
    )
    .join('')}
  ${posts
    .map(post =>`
  <url>
    <loc>${website}/produits/${post.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}
</urlset>`

async function generate () {
    const xml = await gensm();
    await promises.writeFile(sitemapFile, xml, 'utf-8');
};

generate();