import fm from 'front-matter';
import glob from 'glob';
import { promises as fs } from 'fs';
import path from 'path';

export async function get() {

  const posts = await new Promise((resolve, reject) =>
    glob('static/produits/*.md', (err, files) => {
      if (err) 
        return reject(err);
      return resolve(files);
    })
  );

  const postsFrontMatter = await Promise.all(
    posts.map(async post => {
      const content = (await fs.readFile(post)).toString();
      return {...fm(content).attributes, slug: path.parse(post).name};
    }),
  );  

  postsFrontMatter.sort((a, b) => (a.date < b.date ? 1 : -1));
  return { body : JSON.stringify(postsFrontMatter) }
}





