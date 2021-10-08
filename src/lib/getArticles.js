import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';

let produits, table;
export const getAllPosts = (tableOnly) => {
	try {
		if (tableOnly && table)
			return table;
		else if (!tableOnly && produits) return produits
		else
		return fs.readdirSync('static/produits').map((fileName) => {
			//const slug = fileName.slice(0, -3);
			const file = fs.readFileSync(
				path.resolve(`static/produits/`, fileName),
				'utf-8'
			);
			const mattered = grayMatter(file);
			return tableOnly ? { 
				title: mattered.data.title, 
				slug : mattered.data.slug,
				thumbnail : mattered.data.thumbnail,
				vignette : mattered.data.vignette || null,
				famille : mattered.data.famille
			} : mattered.data;
		});
	} catch (e) {
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};


export const getPost = (slug) => {
    try {
		if (!produits)
			produits = getAllPosts()
        return produits.find(a => a.slug === slug)
	} catch (e) {
		if (e.code == 'ENOENT') {
			return false;
		}
		return [];
	}
};
