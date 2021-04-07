import YAML from 'yaml'
import fs from 'fs';

export function get({ params }) {
    const content = fs.readFileSync(`static/produits/${params.slug}.md`, 'utf8').toString()
    if (content) {
        return {
            body: YAML.parseAllDocuments(content)[0] //fm(content).attributes
        }
    }
    return {
		status: 404
	};
}