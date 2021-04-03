import fm from 'front-matter';
import fs from 'fs';

export function get({ params }) {
    const content = fs.readFileSync(`static/produits/${params.slug}.md`, 'utf8').toString()
    if (content) {
        return {
            body: fm(content).attributes
        }
    }
    return {
		status: 404
	};
}