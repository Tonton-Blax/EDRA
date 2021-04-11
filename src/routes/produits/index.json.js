import YAML from 'yaml';
import path from 'path';
import glob from 'glob';
import { promises as fs } from 'fs';

export async function get(req, res) {

  const posts = await new Promise((resolve, reject) =>
    glob('static/produits/*.md', (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    })
  );

  const processPosts = await Promise.all(
    posts.map(async post => {
      const content = (await fs.readFile(post)).toString();
      return {...YAML.parseAllDocuments(content)[0], slug : path.parse(post).name}
    }),
  );  

  processPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(processPosts));
}